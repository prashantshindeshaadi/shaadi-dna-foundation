// sh-profile-card — SwiftUI
// Spec: ../sh-profile-card.md · Figma node 2579:25592
//
// Built only from DNA components (each in its own folder, same module):
//   sh-photo-wrapper, sh-user-images, sh-overlay, sh-profile-card-info (sh-tag-profile, sh-info-detail,
//   sh-divider, sh-action-island, sh-action-note, sh-button, sh-icon-button-with-label), sh-icon-button, sh-icon.
// Needs dist/ios/SHTokens.swift and dist/sh-typo-kit/developer/ios/ShTypography.swift.
// Every value is a DNA token. Corners use .continuous (iOS corner smoothing).

import SwiftUI

// MARK: - Model

/// Figma property "Type". Each type sets the photo state, what the info shows and the actions.
public enum ShProfileCardType: String, CaseIterable {
    case connect, received, postConnect, gated, noPhoto, photoRequested, blocked, vip, withOverlay, declined
}

public struct ShProfileMember {
    public var name: String
    public var age: Int
    public var photo: Image?
    public var photoCount: Int
    /// Online / Offline status tag beside the name; nil hides it.
    public var status: ShTagProfileType?
    public var isVerified: Bool
    public var isPremium: Bool
    /// One inner array per detail row; the dot sits between facts, never after the last one.
    public var detailRows: [[String]]
    /// Profile tags under the details (You & Her, Astro).
    public var tags: [ShTagProfileType]
    /// The tag at top left (Promoted, Top Profile, Distance); nil hides it.
    public var topTag: ShTagProfileType?
    /// Text for a Distance top tag, e.g. "2 km away".
    public var topTagLabel: String?
    /// Pre-written message shown in the note (Connect, VIP, With Overlay).
    public var message: String

    public init(name: String, age: Int, photo: Image? = nil, photoCount: Int = 0, status: ShTagProfileType? = .online,
                isVerified: Bool = false, isPremium: Bool = false, detailRows: [[String]] = [],
                tags: [ShTagProfileType] = [], topTag: ShTagProfileType? = nil, topTagLabel: String? = nil,
                message: String = "") {
        self.name = name; self.age = age; self.photo = photo; self.photoCount = photoCount; self.status = status
        self.isVerified = isVerified; self.isPremium = isPremium; self.detailRows = detailRows; self.tags = tags
        self.topTag = topTag; self.topTagLabel = topTagLabel; self.message = message
    }
}

/// Content of the With Overlay type (sh-overlay Surface Photo, Type Message).
public struct ShProfileCardOverlay {
    public var icon: String
    public var message: String
    public var actionLabel: String
    public var actionIcon: String?
    public init(icon: String = "filled/photo-locked", message: String = "She has shared Photos\nwith Premium Members",
                actionLabel: String, actionIcon: String? = nil) {
        self.icon = icon; self.message = message; self.actionLabel = actionLabel; self.actionIcon = actionIcon
    }
}

/// Every tap the card can raise (the "Taps" and "Actions" lines of the blueprint).
public struct ShProfileCardActions {
    public var onViewPhotos: () -> Void = {}
    public var onMore: () -> Void = {}
    public var onEditMessage: () -> Void = {}
    public var onConnect: () -> Void = {}
    public var onAccept: () -> Void = {}
    public var onDecline: () -> Void = {}
    public var onChat: () -> Void = {}
    public var onWhatsApp: () -> Void = {}
    public var onCall: () -> Void = {}
    public var onUpgradeNow: () -> Void = {}
    public var onUpgradeToConnect: () -> Void = {}
    public var onRequestPhoto: () -> Void = {}
    public var onUnblock: () -> Void = {}
    public var onCallConsultant: () -> Void = {}
    public var onOverlayAction: () -> Void = {}
    public init() {}
}

// MARK: - Card

public struct ShProfileCard: View {
    public var type: ShProfileCardType
    public var member: ShProfileMember
    /// Figma property "Show top tags".
    public var showTopTags: Bool
    /// Figma property "Show photo actions".
    public var showPhotoActions: Bool
    /// No photo / Photo requested: the soft requested portrait the app ships
    /// (../../sh-user-images/assets/requested-female.jpg or requested-male.jpg), full width, top-aligned.
    public var requestedPortrait: Image?
    /// With Overlay: what the overlay says and its action.
    public var overlay: ShProfileCardOverlay?
    public var actions: ShProfileCardActions

    public init(type: ShProfileCardType, member: ShProfileMember, showTopTags: Bool = true, showPhotoActions: Bool = true,
                requestedPortrait: Image? = nil, overlay: ShProfileCardOverlay? = nil,
                actions: ShProfileCardActions = ShProfileCardActions()) {
        self.type = type; self.member = member; self.showTopTags = showTopTags; self.showPhotoActions = showPhotoActions
        self.requestedPortrait = requestedPortrait; self.overlay = overlay; self.actions = actions
    }

    public var body: some View {
        ZStack(alignment: .top) {
            ShPhotoWrapper(showTopScrim: true, showBottomScrim: true) {
                ShUserImage(photo, style: .normal)
            } overlay: {
                overlayView
            }
            VStack(spacing: 0) {
                Spacer(minLength: 0)
                info.padding(SH.Space.step12)
            }
            if showsTopRow {
                topRow.padding(SH.Space.step12)
            }
        }
        .aspectRatio(340.0 / 542.0, contentMode: .fit)                 // Figma frame proportion
        .clipShape(RoundedRectangle(cornerRadius: SH.Radius.lg, style: .continuous))
        .shShadow(SH.ShadowStyle.default)
        .accessibilityElement(children: .contain)
        .accessibilityLabel("\(member.name), \(member.age)")
    }

    // MARK: What each Type shows (as the Figma variants render)

    private var photo: Image? {
        switch type {
        case .noPhoto, .photoRequested: return requestedPortrait
        default: return member.photo
        }
    }
    private var showsTopRow: Bool { type != .noPhoto && type != .photoRequested }
    private var showsPhotoCount: Bool { type != .blocked }
    private var showsDetails: Bool { type != .postConnect }
    private var showsTags: Bool { type != .postConnect && type != .blocked }
    private var showsTrust: Bool { [.connect, .received, .postConnect, .vip, .withOverlay, .declined].contains(type) }
    private var badges: [ShProfileBadge] {
        guard showsTrust else { return [] }
        if type == .vip { return [.vip] }
        return member.isPremium ? [.premium] : []
    }

    // MARK: Photo overlay (sh-overlay)

    @ViewBuilder private var overlayView: some View {
        switch type {
        case .noPhoto:
            ShOverlay(surface: .photo, type: .noPhoto, title: "No Photo added yet",
                      action: ShOverlayAction(label: "Request a Photo", icon: "line/help-circle", action: actions.onRequestPhoto))
        case .photoRequested:
            ShOverlay(surface: .photo, type: .photoRequested, title: "Photo request sent")
        case .withOverlay:
            let o = overlay ?? ShProfileCardOverlay(actionLabel: "Upgrade to View", actionIcon: "line/premium")
            ShOverlay(surface: .photo, type: .message, icon: o.icon, message: o.message,
                      action: ShOverlayAction(label: o.actionLabel, icon: o.actionIcon, action: actions.onOverlayAction))
        default:
            EmptyView()
        }
    }

    // MARK: Top row

    private var topRow: some View {
        HStack(alignment: .top, spacing: SH.Space.step8) {
            if showTopTags, let tag = member.topTag {
                ShTagProfile(tag, label: member.topTagLabel)
            }
            Spacer(minLength: 0)
            if showPhotoActions {
                HStack(spacing: SH.Space.step8) {
                    if showsPhotoCount {
                        ShIconButton(icon: "filled/image", label: "View photos", type: .translucent, size: .small,
                                     badge: "\(member.photoCount)", action: actions.onViewPhotos)
                    }
                    ShIconButton(icon: "line/more-vertical", label: "More options", type: .translucent, size: .small,
                                 action: actions.onMore)
                }
            }
        }
    }

    // MARK: Info (sh-profile-card-info + sh-action-island)

    private var info: some View {
        ShProfileCardInfo(name: member.name, age: member.age, status: member.status,
                          tags: showsTags ? member.tags : [], verified: showsTrust && member.isVerified,
                          badges: badges, details: showsDetails ? member.detailRows : []) {
            island
        }
    }

    @ViewBuilder private var island: some View {
        let message = "Like this profile?"
        switch type {
        case .connect, .withOverlay:
            ShActionIsland(type: .messagePrimary, note: editNote, message: message,
                           primary: ShIslandButton(label: "Connect Now", icon: "filled/connect", action: actions.onConnect))
        case .received:
            ShActionIsland(type: .tertiaryPrimary,
                           primary: ShIslandButton(label: "Accept", icon: "filled/check", action: actions.onAccept),
                           secondary: ShIslandButton(label: "Decline", icon: "line/close", action: actions.onDecline))
        case .postConnect:
            ShActionIsland(type: .threeActions,
                           note: ShActionNote(cta: .upgrade, actionText: "To contact her directly", action: actions.onUpgradeNow),
                           actions: [ShIslandAction(label: "Shaadi Chat", icon: "line/chat-bubble", action: actions.onChat),
                                     ShIslandAction(label: "WhatsApp", icon: "line/whatsapp-02", action: actions.onWhatsApp),
                                     ShIslandAction(label: "Call", icon: "line/call", action: actions.onCall)])
        case .gated:
            ShActionIsland(type: .messagePremium, message: message,
                           primary: ShIslandButton(label: "Upgrade to Connect", action: actions.onUpgradeToConnect))
        case .noPhoto, .photoRequested:
            ShActionIsland(type: .messagePrimary, message: message,
                           primary: ShIslandButton(label: "Connect Now", icon: "filled/check", action: actions.onConnect))
        case .blocked:
            ShActionIsland(type: .messageTertiary, message: "You blocked her",
                           primary: ShIslandButton(label: "Unblock", action: actions.onUnblock))
        case .declined:
            ShActionIsland(type: .messageOnly, status: "She declined your Request to Connect")   // status only, no action
        case .vip:
            ShActionIsland(type: .secondaryPrimary, note: editNote,
                           primary: ShIslandButton(label: "Connect", icon: "filled/check", action: actions.onConnect),
                           secondary: ShIslandButton(label: "Call Consultant", sublabel: "VIP Managed Profile",
                                                     action: actions.onCallConsultant))
        }
    }

    private var editNote: ShActionNote {
        ShActionNote(cta: .edit, message: member.message, action: actions.onEditMessage)
    }
}

// MARK: - Preview

#if DEBUG
extension ShProfileMember {
    static let sample = ShProfileMember(
        name: "Sneha Kaul", age: 26, photoCount: 10, status: .online, isVerified: true, isPremium: true,
        detailRows: [["5′ 6″", "Kashmiri Pandit"], ["Pimpri-Chinchwad", "Software Developer"]],
        tags: [.youAndHer, .astro], topTag: .promoted,
        message: "Hey Sneha, I came across your profile. It felt true to me.")
}

#Preview("All types") {
    ScrollView {
        LazyVGrid(columns: [GridItem(.adaptive(minimum: 280))], spacing: SH.Space.step24) {
            ForEach(ShProfileCardType.allCases, id: \.self) { type in
                ShProfileCard(type: type, member: .sample, requestedPortrait: Image("sh-user-images/requested-female"))
            }
        }
        .padding(SH.Space.step16)
    }
}
#endif
