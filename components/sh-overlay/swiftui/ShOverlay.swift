// sh-overlay — SwiftUI
// Spec: ../sh-overlay.md · Figma node 2314:18393
//
// Shared lock / empty overlay for photos and content sections. It fills the area it is placed on
// (e.g. the overlay slot of ShPhotoWrapper).
//   Message          icon (Photo, Content 24 · Photo full 40) + message + action, over a scrim:
//                    Photo / Photo full: overlay/scrim/default + sh-background-blur/uniform/strong
//                    Content: sh-gradient/translucent/light/strong + sh-background-blur/progressive/default
//   No photo         Its own solid background (sh-avatar-placeholder background, no opacity, no blur), then the
//                    sh-avatar-silhouette (160) + title + action. Nothing under it shows; hide the member photo.
//   Photo requested  as No photo without the action; optional `status` row (Figma: hidden layer).
// Assets: "sh-avatar-placeholder/background" (../../profile-card/sh-avatar-placeholder/assets/background@3x.jpg) and
// "sh-avatar-silhouette/female" / "male" (../../profile-card/sh-avatar-silhouette/assets/, SVG or @3x PNG).
// Blur: SwiftUI has no custom-radius backdrop blur, so the system ultra-thin material (dark) stands in for
// sh-background-blur; the token scrim / glass is drawn on top of it exactly as in Figma.
// Uses ShButton (sh-button), ShIcon (sh-icon), ShAvatarPlaceholderGender.
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
    public var avatar: ShAvatarPlaceholderGender
    public var action: ShOverlayAction?
    public var showIcon: Bool
    public var status: String?

    /// - Parameters:
    ///   - surface: Photo (profile card photo), Photo full (full-width photo, FPV), Content (a section).
    ///   - type: Message, No photo, Photo requested.
    ///   - icon: Message: the icon name (Figma "Icon", default "line/camera-off"). nil hides it.
    ///   - title: No photo / Photo requested text (Figma "Title"). nil hides it (Show message off).
    ///   - message: Message text (Figma "Message"). nil hides it (Show message off).
    ///   - avatar: No photo / Photo requested: which sh-avatar-silhouette fills the 160 slot (Figma "Avatar"); match the member.
    ///   - action: Message / No photo button (Figma "Action"). nil hides it (Show action off). Photo requested has none.
    ///   - showIcon: Figma "Show icon": the icon (Message) or the 160 silhouette slot (No photo / Photo requested).
    ///   - status: Photo requested: optional status row, e.g. "Photo Requested" (Figma: hidden layer).
    public init(surface: ShOverlaySurface = .photo, type: ShOverlayType = .message, icon: String? = nil,
                title: String? = nil, message: String? = nil, avatar: ShAvatarPlaceholderGender = .female,
                action: ShOverlayAction? = nil, showIcon: Bool = true, status: String? = nil) {
        self.surface = surface; self.type = type; self.icon = icon; self.title = title; self.message = message
        self.avatar = avatar; self.action = action; self.showIcon = showIcon; self.status = status
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
            } else {
                Image(avatar == .male ? "sh-avatar-silhouette/male" : "sh-avatar-silhouette/female")
                    .resizable()
                    .scaledToFit()
                    .frame(width: SH.Space.step80 * 2, height: SH.Space.step80 * 2)   // no token: 160 slot
                    .accessibilityHidden(true)
            }
        }
    }

    @ViewBuilder private var text: some View {
        if let copy = isMessage ? message : title {
            Text(copy)
                .shTextStyle(isMessage ? (onImage ? .bodyLg : .bodyMd) : .titleLg)   // title: sh-typo/Title/LG
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
        default:
            // No photo / Photo requested: solid background, no opacity, no blur (sh-avatar-placeholder, silhouette off)
            Image("sh-avatar-placeholder/background")
                .resizable()
                .scaledToFill()
        }
    }

    // MARK: Figma positions (top / bottom padding, unbound in Figma)

    private var topPadding: CGFloat {
        switch (surface, type) {
        case (.content, _), (.photo, .message): return SH.Space.step80 + SH.Space.step40        // no token: 120
        case (.photoFull, .message): return SH.Space.step80 + SH.Space.step48                   // no token: 128
        case (_, _): return SH.Space.step40                                                     // No photo / requested
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
