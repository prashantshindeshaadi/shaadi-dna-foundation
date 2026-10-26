// sh-overlay — SwiftUI
// Spec: ../sh-overlay.md · Figma node 2314:18393
//
// Shared lock / empty overlay for photos and content sections. It fills the area it is placed on
// (e.g. the overlay slot of ShPhotoWrapper).
//   Message          icon (Photo, Content 24 · Photo full 40) + message + action, over a scrim:
//                    Photo / Photo full: overlay/scrim/default + sh-background-blur/uniform/strong
//                    Content: sh-gradient/translucent/light/strong + sh-background-blur/progressive/default
//   No photo         Photo: the 160 slot (Figma keeps the Avatar hidden; pass `avatar` to show one) + title + action.
//                    No fill, no blur: the photo under it (the requested portrait) shows. Photo full draws that portrait.
//   Photo requested  as No photo without the action; optional `status` row (Figma: hidden layer).
// Blur: SwiftUI has no custom-radius backdrop blur, so the system ultra-thin material (dark) stands in for
// sh-background-blur; the token scrim / glass is drawn on top of it exactly as in Figma.
// Uses ShButton (sh-button), ShIcon (sh-icon), ShAvatarPlaceholder, ShUserImage.
// Needs dist/ios/SHTokens.swift and dist/sh-typo-kit/developer/ios/ShTypography.swift.

import SwiftUI

/// Figma property "Surface".
public enum ShOverlaySurface {
    case photo
    case content
    case photoFull
}

/// Figma property "Type". Content has Message only.
public enum ShOverlayType {
    case message
    case noPhoto
    case photoRequested
}

/// The overlay's action (Figma "Action": sh-button Tertiary Small).
public struct ShOverlayAction {
    public var label: String
    public var icon: String?
    public var action: () -> Void

    /// - Parameters:
    ///   - label: button label, e.g. "Request a Photo", "Upgrade to View"
    ///   - icon: optional leading icon name, e.g. "line/premium" (Figma: Show leading icon, off by default)
    public init(label: String, icon: String? = nil, action: @escaping () -> Void) {
        self.label = label; self.icon = icon; self.action = action
    }
}

/// sh-overlay: Surface × Type.
public struct ShOverlay: View {
    public var surface: ShOverlaySurface
    public var type: ShOverlayType
    public var icon: String?
    public var title: String?
    public var message: String?
    public var avatar: ShAvatarPlaceholderGender?
    public var action: ShOverlayAction?
    public var showIcon: Bool
    public var status: String?
    public var portrait: ShUserImageRequested

    /// - Parameters:
    ///   - surface: Photo (profile card photo), Photo full (full-width photo, FPV), Content (a section).
    ///   - type: Message, No photo, Photo requested.
    ///   - icon: Message: the icon name (Figma "Icon", default "line/camera-off"). nil hides it.
    ///   - title: No photo / Photo requested text (Figma "Title"). nil hides it (Show message off).
    ///   - message: Message text (Figma "Message"). nil hides it (Show message off).
    ///   - avatar: Photo · No photo / Photo requested: placeholder drawn in the 160 slot (1:1). Figma keeps it hidden.
    ///   - action: Message / No photo button (Figma "Action"). nil hides it (Show action off). Photo requested has none.
    ///   - showIcon: Figma "Show icon": the icon (Message) or the 160 slot (Photo · No photo / Photo requested).
    ///   - status: Photo requested: optional status row, e.g. "Photo Requested" (Figma: hidden layer).
    ///   - portrait: Photo full · No photo / Photo requested: which requested portrait fills the overlay.
    public init(surface: ShOverlaySurface = .photo, type: ShOverlayType = .message, icon: String? = nil,
                title: String? = nil, message: String? = nil, avatar: ShAvatarPlaceholderGender? = nil,
                action: ShOverlayAction? = nil, showIcon: Bool = true, status: String? = nil,
                portrait: ShUserImageRequested = .female) {
        self.surface = surface; self.type = type; self.icon = icon; self.title = title; self.message = message
        self.avatar = avatar; self.action = action; self.showIcon = showIcon; self.status = status
        self.portrait = portrait
    }

    private var onImage: Bool { surface != .content }
    private var isMessage: Bool { type == .message || surface == .content }

    public var body: some View {
        VStack(spacing: SH.Space.step12) {
            VStack(spacing: SH.Space.step12) {
                illustration
                text
            }
            .frame(maxWidth: .infinity)
            if let action, type != .photoRequested || isMessage {
                ShButton(action.label, type: .tertiary, size: .small, leadingIcon: action.icon, action: action.action)
                    .modifier(ShOverlayShadow(isOn: onImage))
            }
            if let status, type == .photoRequested, !isMessage {
                statusRow(status)
            }
        }
        .padding(.top, topPadding)
        .padding(.bottom, bottomPadding)
        .padding(.horizontal, SH.Space.pageMargin)
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
        .background { background }
        .clipped()
        .accessibilityElement(children: .contain)
    }

    // MARK: Parts

    @ViewBuilder private var illustration: some View {
        if showIcon {
            if isMessage {
                if let icon {
                    ShIcon(icon,
                           // Photo full: Figma resizes the 24 icon to 40 (unbound); pictogram/size/40 matches
                           size: surface == .photoFull ? SH.Icon.pictogramSize40 : SH.Icon.size24,
                           paint: .color(onImage ? SH.Color.iconOnImage.color : SH.Color.iconPrimary.color))
                }
            } else if surface == .photo {
                ZStack {
                    if let avatar {
                        ShAvatarPlaceholder(gender: avatar, aspect: .square)
                    }
                }
                .frame(width: SH.Space.step80 * 2, height: SH.Space.step80 * 2)   // no token: 160 slot
                .accessibilityHidden(avatar == nil)
            }
        }
    }

    @ViewBuilder private var text: some View {
        if let copy = isMessage ? message : title {
            Text(copy)
                .shTextStyle(onImage ? .bodyLg : .bodyMd)
                .foregroundStyle(onImage ? SH.Color.textOnImage.color : SH.Color.textPrimary.color)
                .multilineTextAlignment(.center)
                .frame(maxWidth: .infinity)
                .modifier(ShOverlayShadow(isOn: onImage))
        }
    }

    private func statusRow(_ label: String) -> some View {
        HStack(spacing: SH.Space.step4) {
            ShIcon("filled/check", size: SH.Icon.size16, paint: .color(SH.Color.indicatorSuccess.color))
            Text(label)
                .shTextStyle(.buttonSm)
                .foregroundStyle(SH.Color.indicatorSuccess.color)
        }
        .padding(.vertical, SH.Space.step6)
        .shShadow(SH.ShadowStyle.default)
    }

    @ViewBuilder private var background: some View {
        switch (surface, type) {
        case (.content, _):
            ZStack {
                Rectangle()
                    .fill(.ultraThinMaterial)
                    // progressive blur: none at the top → sh-translucent background/blur/default at the bottom (alpha ramp)
                    .mask(LinearGradient(colors: [Color.white.opacity(SH.Opacity.hidden), Color.white.opacity(SH.Opacity.full)],
                                         startPoint: .top, endPoint: .bottom))
                SH.Gradient.translucentLightStrong.view
            }
        case (_, .message):
            ZStack {
                Rectangle().fill(.ultraThinMaterial).environment(\.colorScheme, .dark)   // stands in for uniform/strong
                SH.Color.overlayScrimDefault.color
            }
        case (.photoFull, _):
            ShUserImage(requested: portrait)
        default:
            Color.clear                                                              // Figma: no fill, no blur
        }
    }

    // MARK: Figma positions (top / bottom padding, unbound in Figma)

    private var topPadding: CGFloat {
        switch (surface, type) {
        case (.content, _), (.photo, .message): return SH.Space.step80 + SH.Space.step40        // no token: 120
        case (.photo, _): return SH.Space.step40
        case (.photoFull, .message): return SH.Space.step80 + SH.Space.step48                   // no token: 128
        case (.photoFull, _):
            // no token: 180 = Message top 128 + its 40 icon + sh-space/12 gap (title lines up with Message's text)
            return SH.Space.step80 + SH.Space.step48 + SH.Icon.pictogramSize40 + SH.Space.step12
        }
    }

    private var bottomPadding: CGFloat {
        switch surface {
        case .photo: return SH.Space.step80 + SH.Space.step40                                   // no token: 120
        case .photoFull: return SH.Space.step0
        case .content: return SH.Space.step80
        }
    }
}

/// sh-shadow/default on overlay text and action over photos; none on the Content surface.
private struct ShOverlayShadow: ViewModifier {
    let isOn: Bool

    func body(content: Content) -> some View {
        if isOn {
            content.shShadow(SH.ShadowStyle.default)
        } else {
            content
        }
    }
}

#Preview("sh-overlay") {
    ScrollView(.horizontal) {
        HStack(spacing: SH.Space.step16) {
            Group {
                ShOverlay(surface: .photo, type: .message, icon: "line/camera-off",
                          message: "She has shared Photos\nwith Premium Members",
                          action: ShOverlayAction(label: "Button Text", action: {}))
                ShOverlay(surface: .photo, type: .noPhoto, title: "No Photo added yet",
                          action: ShOverlayAction(label: "Request a Photo", action: {}))
                ShOverlay(surface: .photo, type: .photoRequested, title: "Photo request sent", status: "Photo Requested")
                ShOverlay(surface: .photoFull, type: .message, icon: "line/camera-off",
                          message: "She has shared Photos\nwith Premium Members",
                          action: ShOverlayAction(label: "Button Text", action: {}))
                ShOverlay(surface: .photoFull, type: .noPhoto, title: "No Photo added yet",
                          action: ShOverlayAction(label: "Request a Photo", action: {}))
                ShOverlay(surface: .photoFull, type: .photoRequested, title: "Photo request sent")
                ShOverlay(surface: .content, type: .message, icon: "line/camera-off",
                          message: "She has shared Photos\nwith Premium Members",
                          action: ShOverlayAction(label: "Button Text", action: {}))
            }
            .frame(width: SH.Space.step80 * 4 + SH.Space.step40, height: SH.Space.step80 * 6 + SH.Space.step40)   // preview: Figma 360 × 520
        }
        .padding(SH.Space.step16)
    }
}
