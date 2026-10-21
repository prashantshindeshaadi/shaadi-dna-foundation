// sh-profile-card — SwiftUI
// Spec: ../sh-profile-card.md · Figma node 2579:25592
//
// Needs, from `python3 tools/build.py`:
//   dist/ios/SHTokens.swift                               SH.Color / Space / Radius / Stroke / Icon / Opacity / Blur / Shadow / Gradient
//   dist/sh-typo-kit/developer/ios/ShTypography.swift     .shTextStyle(…) + Lexend-SH fonts
// Icons: add icons/<type>/<name>.svg to the asset catalogue as "sh-icon/<type>/<name>"
// (Preserve Vector Data, Render As Template). Badges: "sh-icon/misc/<name>" (Render As Original).
// Images: ../../sh-avatar-placeholder/assets/female-1x1@3x.png as "sh-avatar-placeholder/female-1x1";
// the requested portrait (../../sh-user-images/assets/requested-*.jpg) is passed in as `requestedPortrait`.
//
// Every colour, space, radius, stroke, blur, shadow and gradient is a DNA token.
// Corners use .continuous, which is iOS corner smoothing (FOUNDATION: 60 % smoothing).

import SwiftUI

// MARK: - Model

/// Figma property "Type". Each type sets the photo state, the note and the actions.
public enum ShProfileCardType: String, CaseIterable {
    case connect, received, connected, locked, noPhoto, photoRequested, blocked, hidden, vip
}

public enum ShProfileTopTag { case promoted, topProfile }
public enum ShProfileTag { case youAndHer, astro }

public struct ShProfileMember {
    public var name: String
    public var age: Int
    public var photo: Image?
    public var photoCount: Int
    public var isOnline: Bool
    public var isVerified: Bool
    /// One inner array per detail row; the dot sits between facts, never after the last one.
    public var detailRows: [[String]]
    public var tags: [ShProfileTag]
    public var topTag: ShProfileTopTag?
    /// Pre-written message shown on Connect and VIP.
    public var message: String

    public init(name: String, age: Int, photo: Image? = nil, photoCount: Int = 0, isOnline: Bool = false,
                isVerified: Bool = false, detailRows: [[String]] = [], tags: [ShProfileTag] = [],
                topTag: ShProfileTopTag? = nil, message: String = "") {
        self.name = name; self.age = age; self.photo = photo; self.photoCount = photoCount; self.isOnline = isOnline
        self.isVerified = isVerified; self.detailRows = detailRows; self.tags = tags; self.topTag = topTag; self.message = message
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
    public var onUpgradeToView: () -> Void = {}
    public var onUpgradeToConnect: () -> Void = {}
    public var onRequestPhoto: () -> Void = {}
    public var onUnblock: () -> Void = {}
    public var onUnhide: () -> Void = {}
    public var onCallConsultant: () -> Void = {}
    public init() {}
}

// MARK: - Card

public struct ShProfileCard: View {
    public var type: ShProfileCardType
    public var member: ShProfileMember
    /// Figma property "Show top tags".
    public var showTopTags: Bool = true
    /// Figma property "Show photo actions".
    public var showPhotoActions: Bool = true
    /// Photo requested only: the soft portrait the app ships, composed with the face at its centre
    /// (../../sh-user-images/assets/requested-female.jpg or requested-male.jpg).
    public var requestedPortrait: Image? = nil
    public var actions = ShProfileCardActions()

    public init(type: ShProfileCardType, member: ShProfileMember, showTopTags: Bool = true,
                showPhotoActions: Bool = true, requestedPortrait: Image? = nil,
                actions: ShProfileCardActions = ShProfileCardActions()) {
        self.type = type; self.member = member; self.showTopTags = showTopTags
        self.showPhotoActions = showPhotoActions; self.requestedPortrait = requestedPortrait; self.actions = actions
    }

    public var body: some View {
        ZStack(alignment: .bottom) {
            photo
            overlay
            VStack { topRow; Spacer(minLength: 0) }.padding(SH.Space.step12)
            info.padding(SH.Space.step12)
        }
        .aspectRatio(340.0 / 542.0, contentMode: .fit)        // Figma frame proportion
        .background(SH.Color.backgroundStrong.color)
        .clipShape(RoundedRectangle(cornerRadius: SH.Radius.lg, style: .continuous))
        .modifier(ShShadowDefault())
        .foregroundStyle(SH.Color.textOnImage.color)
        .accessibilityElement(children: .contain)
        .accessibilityLabel("\(member.name), \(member.age)")
    }

    // MARK: Photo (sh-photo-wrapper)

    @ViewBuilder private var photo: some View {
        GeometryReader { geo in
            ZStack(alignment: .top) {
                if let image = photoImage {
                    image.resizable().scaledToFill()
                        .frame(width: geo.size.width, height: geo.size.height)
                        // Photo requested: scaled from the bottom so the face sits mid photo area, above the info card
                        .scaleEffect(type == .photoRequested ? Self.requestedCrop : 1, anchor: .bottom)
                        .clipped()
                        .blur(radius: type == .locked ? SH.Blur.backgroundBlurStrong : 0)   // image Style=Blur
                }
                SH.Gradient.overlayTop.view.frame(height: SH.Space.step24)
                VStack { Spacer(); SH.Gradient.overlayBottom.view.frame(height: geo.size.height * 0.48) }   // 260 of 542
            }
        }
    }

    /// Figma crop of the requested portrait on the card (face centred above the info card).
    static let requestedCrop: CGFloat = 1.36

    private var photoImage: Image? {
        switch type {
        case .noPhoto: return nil
        case .photoRequested: return requestedPortrait
        default: return member.photo
        }
    }

    // MARK: Photo overlay (sh-overlay)

    @ViewBuilder private var overlay: some View {
        switch type {
        case .locked:
            overlayStack(background: SH.Color.overlayScrimDefault.color, top: SH.Space.step40 * 2) {
                ShIcon("filled/photo-locked", size: SH.Icon.size24)
                Text("She has shared photos with\nPremium members").shTextStyle(.bodyMd).multilineTextAlignment(.center)
                ShButton(.tertiary, "Upgrade to View", icon: "line/premium", small: true, action: actions.onUpgradeToView)
            }
        case .noPhoto:
            overlayStack(background: SH.Color.overlayImageBase.color, top: SH.Space.step40) {
                VStack(spacing: SH.Space.step12) {
                    illustration(Image("sh-avatar-placeholder/female-1x1"))          // the "No Photo Avatar"
                        .accessibilityLabel("No photo")
                    Text("No Photo added yet").shTextStyle(.bodyMd).modifier(ShShadowDefault())
                }
                ShButton(.tertiary, "Request a Photo", icon: "line/help-circle", small: true, action: actions.onRequestPhoto)
                    .modifier(ShShadowDefault())
            }
        case .photoRequested:
            // No background blur here: the soft portrait shows through the scrim; text carries sh-shadow/default.
            overlayStack(background: SH.Color.overlayScrimDefault.color, top: SH.Space.step40, blur: false) {
                VStack(spacing: SH.Space.step12) {
                    illustration(nil)                                                // empty slot keeps the text in place
                    Text("No Photo added yet").shTextStyle(.bodyMd).modifier(ShShadowDefault())
                }
                HStack(spacing: SH.Space.step4) {
                    ShIcon("filled/check", size: SH.Icon.size16)
                    Text("Photo Requested").shTextStyle(.buttonSm)
                }
                .foregroundStyle(SH.Color.indicatorSuccess.color)
                .modifier(ShShadowDefault())
                .padding(.vertical, SH.Space.step6)
            }
        default:
            EmptyView()
        }
    }

    /// 160 Icon/Illustration slot of sh-overlay. The placeholder art is drawn full width from the top, unclipped.
    private func illustration(_ image: Image?) -> some View {
        ZStack(alignment: .top) {
            if let image { image.resizable().aspectRatio(contentMode: .fit).frame(width: SH.Space.step80 * 2) }
        }
        .frame(width: SH.Space.step80 * 2, height: SH.Space.step80 * 2, alignment: .top)
    }

    private func overlayStack<C: View>(background: Color, top: CGFloat, blur: Bool = true,
                                       @ViewBuilder _ content: () -> C) -> some View {
        VStack(spacing: SH.Space.step8) { content(); Spacer(minLength: 0) }
            .padding(.top, top)
            .padding(.horizontal, min(SH.Space.pageMargin, SH.Space.step20))   // page/margin, capped inside a card
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background { if blur { Rectangle().fill(.ultraThinMaterial) } }    // sh-background-blur/uniform/strong
            .background(background)
    }

    // MARK: Top row

    private var topRow: some View {
        HStack(spacing: SH.Space.step8) {
            if showTopTags, let tag = member.topTag {
                ShTag(tag == .promoted ? "Promoted" : "Top Profile", icon: "tag/megaphone-03", style: .white)
            }
            Spacer(minLength: 0)
            if showPhotoActions {
                HStack(spacing: SH.Space.step8) {
                    if type != .blocked {
                        ShIconButton(icon: "filled/image", badge: "\(member.photoCount)", label: "View photos", action: actions.onViewPhotos)
                    }
                    ShIconButton(icon: "line/more-vertical", label: "More options", action: actions.onMore)
                }
            }
        }
    }

    // MARK: Info card (sh-profile-card-info)

    private var info: some View {
        VStack(alignment: .leading, spacing: SH.Space.step10) {
            VStack(alignment: .leading, spacing: SH.Space.step2) {
                nameRow.padding(.bottom, SH.Space.step2)
                VStack(alignment: .leading, spacing: SH.Space.step2) {
                    ForEach(member.detailRows.indices, id: \.self) { i in detailRow(member.detailRows[i]) }
                }
            }
            if !member.tags.isEmpty {
                HStack(spacing: SH.Space.step8) {
                    ForEach(member.tags.indices, id: \.self) { i in
                        member.tags[i] == .youAndHer
                            ? ShTag("You & Her", icon: "line/link-rings", style: .translucentLight)
                            : ShTag("Astro", icon: "line/astro", style: .translucentLight)
                    }
                }
            }
            Rectangle().fill(SH.Color.textOnImage.color).frame(height: SH.Stroke.default)
                .opacity(SH.Opacity.extraSoft)                                  // divider
            VStack(alignment: .leading, spacing: SH.Space.step12) {
                note
                actionRow
            }
        }
        .padding(.top, SH.Space.step14)
        .padding([.horizontal, .bottom], SH.Space.step16)
        .frame(maxWidth: .infinity, alignment: .leading)
        .modifier(ShGlass(radius: SH.Radius.lg))
    }

    private var nameRow: some View {
        HStack(spacing: SH.Space.step6) {
            Text(member.name).shTextStyle(.headingSm).lineLimit(1).truncationMode(.tail)   // long names cut before the age
            Text("\(member.age)").shTextStyle(.headingSm).fixedSize()
            if type == .vip { ShBadge("misc/vip-badge", label: "VIP") }
            if member.isOnline { ShTag("Online", icon: "tag/online", style: .translucentLight, pill: true, border: true) }
            Spacer(minLength: 0)
            if member.isVerified { ShBadge("misc/verified-badge", label: "Verified") }
        }
    }

    /// sh-info-detail (Mode On image, Size Medium): fact · fact, dot only between facts.
    private func detailRow(_ facts: [String]) -> some View {
        HStack(spacing: SH.Space.step8) {
            ForEach(facts.indices, id: \.self) { i in
                if i > 0 { Circle().frame(width: 3, height: 3).opacity(SH.Opacity.strong) }   // separator dot
                Text(facts[i]).shTextStyle(.bodyMd)
            }
        }
    }

    // MARK: Note (sh-action-note)

    @ViewBuilder private var note: some View {
        switch type {
        case .connect, .vip:
            HStack(spacing: SH.Space.step8) {
                Text(member.message).shTextStyle(.bodySm).italic().lineLimit(1).opacity(SH.Opacity.strong)
                Spacer(minLength: 0)
                ShTextLink("Edit", action: actions.onEditMessage)
            }
        case .connected:
            HStack(spacing: SH.Space.step8) {
                Text("To contact her directly").shTextStyle(.bodySm)
                Spacer(minLength: 0)
                ShTextLink("Upgrade Now", premium: true, action: actions.onUpgradeNow)
            }
        default:
            EmptyView()
        }
    }

    // MARK: Action row (sh-action-row)

    @ViewBuilder private var actionRow: some View {
        switch type {
        case .connect:
            single("Like this profile?", ShButton(.primary, "Connect", icon: "filled/check", action: actions.onConnect))
        case .received:
            HStack(spacing: SH.Space.step8) {
                ShButton(.tertiary, "Decline", icon: "line/close", fill: true, action: actions.onDecline)
                ShButton(.primary, "Accept", icon: "filled/check", fill: true, action: actions.onAccept)
            }
        case .connected:
            HStack(spacing: SH.Space.step8) {
                ShLabelledAction("Shaadi Chat", icon: "line/chat", action: actions.onChat)
                ShLabelledAction("WhatsApp", icon: "line/whatsapp", action: actions.onWhatsApp)
                ShLabelledAction("Call", icon: "line/phone", action: actions.onCall)
            }
        case .locked:
            single("Like this profile?", ShButton(.premiumSolid, "Upgrade to Connect", action: actions.onUpgradeToConnect))
        case .noPhoto, .photoRequested:
            single("Like this profile?", ShButton(.primary, "Connect Now", icon: "filled/check", action: actions.onConnect))
        case .blocked:
            single("You blocked her", ShButton(.tertiary, "Unblock", action: actions.onUnblock))
        case .hidden:
            single("You hid her profile", ShButton(.tertiary, "Unhide Her", action: actions.onUnhide))
        case .vip:
            HStack(spacing: SH.Space.step8) {
                ShButton(.secondary, "Call Consultant", sublabel: "VIP Managed Profile", fill: true, action: actions.onCallConsultant)
                ShButton(.primary, "Connect", icon: "filled/check", fill: true, action: actions.onConnect)
            }
        }
    }

    private func single(_ message: String, _ button: ShButton) -> some View {
        HStack(spacing: SH.Space.step16) {
            Text(message).shTextStyle(.bodyMdTight)
            Spacer(minLength: 0)
            button
        }
    }
}

// MARK: - Parts (named after their DNA components; move to their own folders when those get code)

/// Translucent dark glass: material blur + sh-gradient/translucent/dark/soft + light gradient edge.
struct ShGlass: ViewModifier {
    var radius: CGFloat
    var fill: SHGradient = SH.Gradient.translucentDarkSoft
    var edge: SHGradient = SH.Gradient.translucentBorderLight
    func body(content: Content) -> some View {
        let shape = RoundedRectangle(cornerRadius: radius, style: .continuous)
        content
            .background(fill.view.clipShape(shape))
            .background(.ultraThinMaterial, in: shape)
            .overlay(shape.strokeBorder(edge.layers[0].linear, lineWidth: SH.Stroke.default))
    }
}

/// sh-shadow/default as a drop shadow (text and glyphs on a photo).
struct ShShadowDefault: ViewModifier {
    func body(content: Content) -> some View {
        content.shadow(color: SH.Color.shadowDefaultColor.color, radius: SH.Shadow.defaultBlur / 2,
                       x: SH.Shadow.defaultX, y: SH.Shadow.defaultY)
    }
}

struct ShIcon: View {
    var name: String
    var size: CGFloat
    init(_ name: String, size: CGFloat) { self.name = name; self.size = size }
    var body: some View {
        Image("sh-icon/" + name).renderingMode(.template).resizable().scaledToFit()
            .frame(width: size, height: size).accessibilityHidden(true)
    }
}

struct ShBadge: View {
    var name: String
    var label: String
    init(_ name: String, label: String) { self.name = name; self.label = label }
    var body: some View {
        Image("sh-icon/" + name).renderingMode(.original).accessibilityLabel(label)
    }
}

/// sh-tag: White (Medium) on the photo, Translucent light (Small) on glass.
struct ShTag: View {
    enum Style { case white, translucentLight }
    var label: String
    var icon: String
    var style: Style
    var pill = false
    var border = false
    init(_ label: String, icon: String, style: Style, pill: Bool = false, border: Bool = false) {
        self.label = label; self.icon = icon; self.style = style; self.pill = pill; self.border = border
    }
    var body: some View {
        let shape = RoundedRectangle(cornerRadius: pill ? SH.Radius.full : SH.Radius.xs, style: .continuous)
        HStack(spacing: SH.Space.step2) {
            ShIcon(icon, size: SH.Icon.size12)
            Text(label).shTextStyle(.supportLabel).lineLimit(1)
        }
        .padding(.horizontal, SH.Space.step4)
        .padding(.vertical, SH.Space.step2)
        .foregroundStyle(style == .white ? SH.Color.textSecondary.color : SH.Color.textOnImage.color)
        .background {
            if style == .white { shape.fill(SH.Color.backgroundDefault.color) }
            else { SH.Gradient.translucentLightExtraSoft.view.clipShape(shape) }
        }
        .overlay {
            if style == .white { shape.strokeBorder(SH.Color.borderDefault.color, lineWidth: SH.Stroke.default) }
            else if border { shape.strokeBorder(SH.Gradient.translucentBorderLight.layers[0].linear, lineWidth: SH.Stroke.thin) }
        }
    }
}

/// sh-icon-button, Type Translucent, Size Small. 48 × 48 tap area.
struct ShIconButton: View {
    var icon: String
    var badge: String? = nil
    var label: String
    var action: () -> Void
    var body: some View {
        Button(action: action) {
            HStack(spacing: SH.Space.step4) {
                ShIcon(icon, size: SH.Icon.size16)
                if let badge { Text(badge).shTextStyle(.bodySm) }
            }
            .padding(SH.Space.step8)
            .foregroundStyle(SH.Color.iconOnImage.color)
            .modifier(ShGlass(radius: SH.Radius.full, edge: SH.Gradient.translucentBorderLightRing))
            .frame(minWidth: SH.Icon.targetDefault, minHeight: SH.Icon.targetDefault)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .accessibilityLabel(label)
    }
}

struct ShTextLink: View {
    var label: String
    var premium = false
    var action: () -> Void
    init(_ label: String, premium: Bool = false, action: @escaping () -> Void) { self.label = label; self.premium = premium; self.action = action }
    var body: some View {
        Button(action: action) {
            Text(label).shTextStyle(premium ? .buttonSm : .bodySm).underline()
                .foregroundStyle(premium ? SH.Color.premiumBackgroundSolidDefaultEnd.color : SH.Color.textOnImage.color)
                .opacity(premium ? 1 : SH.Opacity.strong)
                .frame(minHeight: SH.Icon.targetDefault).contentShape(Rectangle())
        }
        .buttonStyle(.plain)
    }
}

/// sh-button, Size Medium (Small on photo overlays). 40 tall, 48 tap area.
struct ShButton: View {
    enum Kind { case primary, secondary, tertiary, premiumSolid }
    var kind: Kind
    var label: String
    var icon: String? = nil
    var sublabel: String? = nil
    var small = false
    var fill = false
    var action: () -> Void
    init(_ kind: Kind, _ label: String, icon: String? = nil, sublabel: String? = nil, small: Bool = false,
         fill: Bool = false, action: @escaping () -> Void) {
        self.kind = kind; self.label = label; self.icon = icon; self.sublabel = sublabel
        self.small = small; self.fill = fill; self.action = action
    }
    var body: some View {
        Button(action: action) {
            VStack(spacing: 0) {
                HStack(spacing: SH.Space.step4) {
                    if let icon { ShIcon(icon, size: small ? SH.Icon.size12 : SH.Icon.size16) }
                    Text(label).shTextStyle(small ? .buttonSm : .buttonMd).lineLimit(1)
                }
                if let sublabel { Text(sublabel).shTextStyle(.supportMeta).foregroundStyle(SH.Color.buttonSecondaryTextSubtext.color) }
            }
            .padding(.horizontal, SH.Space.step12)
            .padding(.vertical, small ? SH.Space.step6 : SH.Space.step10)
            .frame(maxWidth: fill ? .infinity : nil)
            .frame(minHeight: small ? nil : SH.Space.step40)
            .foregroundStyle(foreground)
            .background(background)
            .frame(minHeight: SH.Icon.targetDefault)                     // 48 tap area
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
    }
    private var foreground: Color {
        switch kind {
        case .primary: return SH.Color.buttonPrimaryTextDefault.color
        case .secondary: return SH.Color.buttonSecondaryTextDefault.color
        case .tertiary: return SH.Color.buttonTertiaryTextDefault.color
        case .premiumSolid: return SH.Color.premiumTextOnSolid.color
        }
    }
    @ViewBuilder private var background: some View {
        let shape = Capsule(style: .continuous)
        switch kind {
        case .primary: SH.Gradient.brandDefault.view.clipShape(shape)
        case .secondary: shape.fill(SH.Color.buttonSecondaryBackgroundDefault.color)
        case .tertiary: shape.fill(SH.Color.buttonTertiaryBackgroundDefault.color)
            .overlay(shape.strokeBorder(SH.Color.borderDefault.color, lineWidth: SH.Stroke.default))
        case .premiumSolid: SH.Gradient.premiumDefault.view.clipShape(shape)
        }
    }
}

/// sh-icon-button-with-label (Connected: Shaadi Chat, WhatsApp, Call).
struct ShLabelledAction: View {
    var label: String
    var icon: String
    var action: () -> Void
    init(_ label: String, icon: String, action: @escaping () -> Void) { self.label = label; self.icon = icon; self.action = action }
    var body: some View {
        Button(action: action) {
            VStack(spacing: SH.Space.step4) {
                ShIcon(icon, size: SH.Icon.size20)
                    .padding(SH.Space.step10)
                    .frame(maxWidth: .infinity)
                    .foregroundStyle(SH.Color.buttonSecondaryTextDefault.color)
                    .background(SH.Color.buttonSecondaryBackgroundDefault.color,
                                in: RoundedRectangle(cornerRadius: SH.Radius.md, style: .continuous))
                Text(label).shTextStyle(.supportLabel).foregroundStyle(SH.Color.textOnImage.color)
            }
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Preview

#if DEBUG
extension ShProfileMember {
    static let sample = ShProfileMember(
        name: "Sneha Kaul", age: 26, photoCount: 10, isOnline: true,
        detailRows: [["5′ 6″", "Kashmiri Pandit"], ["Pimpri-Chinchwad", "Software Developer"]],
        tags: [.youAndHer, .astro], topTag: .promoted,
        message: "Hey Sneha, I came across your profile. It felt true to me.")
}

#Preview("All types") {
    ScrollView {
        LazyVGrid(columns: [GridItem(.adaptive(minimum: 280))], spacing: SH.Space.step24) {
            ForEach(ShProfileCardType.allCases, id: \.self) { type in
                var member = ShProfileMember.sample
                let _ = (member.isVerified = type == .connected)
                ShProfileCard(type: type, member: member)
            }
        }
        .padding(SH.Space.step16)
    }
}
#endif
