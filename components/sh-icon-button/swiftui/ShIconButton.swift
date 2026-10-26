// sh-icon-button — SwiftUI
// Spec: ../sh-icon-button.md · Figma node 567:26954 (5 Types × 3 Sizes × 5 States = 75 variants)
//
// Needs dist/ios/SHTokens.swift, the type kit (ShTypography.swift) and ../../sh-icon/swiftui/ShIcon.swift.
// Icons are asset names "sh-icon/<type>/<name>"; pass "<type>/<name>", e.g. "line/plus".
//
// States: Pressed from ButtonStyle.isPressed, Hover from the pointer (iPadOS), Focus draws the §7.2 ring,
// Disabled (.disabled(true)) is the Default look at sh-opacity/disabled. Translucent is glass (over imagery only).
// Medium (40) and Small (32) get a 48 tap area without changing their visual size.

import SwiftUI

/// sh-icon-button Type, in Figma order. Translucent is glass and goes over imagery only.
public enum ShIconButtonType: CaseIterable {
    case primary, secondary, tertiary, translucent, ghost
}

/// sh-icon-button Size: Large 48 (icon 24), Medium 40 (icon 20), Small 32 (icon 16).
public enum ShIconButtonSize: CaseIterable {
    case large, medium, small
}

/// sh-icon-button: icon-only action. `label` is Figma "Screen reader label" (VoiceOver), `badge` is
/// "Show badge" + "Badge" (a count after the icon), `fill` stretches the width (sh-icon-button-with-label).
public struct ShIconButton: View {
    public var icon: String
    public var label: String
    public var type: ShIconButtonType
    public var size: ShIconButtonSize
    public var badge: String?
    public var fill: Bool
    public var action: () -> Void

    public init(icon: String, label: String, type: ShIconButtonType = .primary, size: ShIconButtonSize = .large,
                badge: String? = nil, fill: Bool = false, action: @escaping () -> Void) {
        self.icon = icon; self.label = label; self.type = type; self.size = size
        self.badge = badge; self.fill = fill; self.action = action
    }

    public var body: some View {
        Button(action: action) { EmptyView() }
            .buttonStyle(ShIconButtonStyle(icon: icon, type: type, size: size, badge: badge, fill: fill))
            .accessibilityLabel(Text(label))
            .accessibilityValue(Text(badge ?? ""))
    }
}

private struct ShIconButtonStyle: ButtonStyle {
    let icon: String
    let type: ShIconButtonType
    let size: ShIconButtonSize
    let badge: String?
    let fill: Bool

    func makeBody(configuration: Configuration) -> some View {
        ShIconButtonStyleBody(icon: icon, type: type, size: size, badge: badge, fill: fill,
                              isPressed: configuration.isPressed)
    }
}

private struct ShIconButtonStyleBody: View {
    let icon: String
    let type: ShIconButtonType
    let size: ShIconButtonSize
    let badge: String?
    let fill: Bool
    let isPressed: Bool
    @Environment(\.isEnabled) var isEnabled
    @Environment(\.isFocused) var isFocused
    @State var isHovered = false

    var body: some View {
        let m = ShIconButtonMetrics(size)
        let tapInset = max(0, (SH.Icon.targetDefault - (m.iconSize + 2 * m.padding)) / 2)   // hit area 48, layout unchanged
        ShIconButtonSurface(icon: icon, type: type, size: size, badge: badge, fill: fill,
                            isPressed: isPressed, isHovered: isHovered, isFocused: isFocused, isEnabled: isEnabled)
            .padding(tapInset)
            .contentShape(Rectangle())
            .padding(-tapInset)
            .onHover { isHovered = $0 }
    }
}

// MARK: - Surface (shared with sh-icon-button-with-label)

/// The visual of sh-icon-button for a given interaction state. Callers own the tap handling.
struct ShIconButtonSurface: View {
    let icon: String
    let type: ShIconButtonType
    let size: ShIconButtonSize
    let badge: String?
    let fill: Bool
    let isPressed: Bool
    let isHovered: Bool
    let isFocused: Bool
    let isEnabled: Bool

    var body: some View {
        let m = ShIconButtonMetrics(size)
        let shape = RoundedRectangle(cornerRadius: SH.Radius.button, style: .continuous)
        let state: ShIconButtonInteraction = !isEnabled ? .normal : (isPressed ? .pressed : (isHovered ? .hover : .normal))
        let content = HStack(spacing: SH.Space.step4) {
            ShIcon(icon, size: m.iconSize, paint: .color(type.iconColor))
            if let badge {
                Text(badge).shTextStyle(m.badgeStyle).foregroundStyle(type.badgeColor).lineLimit(1).fixedSize()
            }
        }
        .frame(height: m.iconSize)                 // content is the icon's height: 48 / 40 / 32 in total
        .padding(m.padding)
        .frame(minWidth: m.iconSize + 2 * m.padding)
        .frame(maxWidth: fill ? .infinity : nil)

        decorated(content, state: state, shape: shape)
            .overlay {
                if isFocused && isEnabled {               // §7.2: 2 wide, 2 outside, sh-opacity/strong
                    shape.stroke(SH.Color.borderFocus.color.opacity(SH.Opacity.strong), lineWidth: SH.Stroke.strong)
                        .padding(-(SH.Space.step2 + SH.Stroke.strong / 2))
                }
            }
            .opacity(isEnabled ? SH.Opacity.full : SH.Opacity.disabled)
    }

    @ViewBuilder
    private func decorated<V: View>(_ content: V, state: ShIconButtonInteraction, shape: RoundedRectangle) -> some View {
        if type == .translucent {
            // Dark soft glass + light ring edge + blur; Figma keeps the Default glass on Hover.
            content.shGlass(fill: state == .pressed ? SH.Gradient.translucentDarkDefault : SH.Gradient.translucentDarkSoft,
                            edge: SH.Gradient.translucentBorderLightRing, cornerRadius: SH.Radius.button)
        } else {
            content.background { type.fill(state).view.clipShape(shape) }
        }
    }
}

enum ShIconButtonInteraction { case normal, hover, pressed }

// MARK: - Tokens per Size and Type

private struct ShIconButtonMetrics {
    let padding: CGFloat
    let iconSize: CGFloat
    let badgeStyle: ShTextStyle

    init(_ size: ShIconButtonSize) {
        switch size {
        case .large: padding = SH.Space.step12; iconSize = SH.Icon.size24; badgeStyle = .bodyLg
        case .medium: padding = SH.Space.step10; iconSize = SH.Icon.size20; badgeStyle = .bodyMd
        case .small: padding = SH.Space.step8; iconSize = SH.Icon.size16; badgeStyle = .bodySm
        }
    }
}

private enum ShIconButtonFill {
    case gradient(SHGradient)
    case solid(SHColor)

    @ViewBuilder var view: some View {
        switch self {
        case .gradient(let g): g.view
        case .solid(let c): c.color
        }
    }
}

private extension ShIconButtonType {
    func fill(_ state: ShIconButtonInteraction) -> ShIconButtonFill {
        switch (self, state) {
        case (.primary, .normal): return .gradient(SH.Gradient.brandDefault)
        case (.primary, .hover): return .gradient(SH.Gradient.brandHover)
        case (.primary, .pressed): return .gradient(SH.Gradient.brandPressed)
        case (.secondary, .normal): return .solid(SH.Color.buttonSecondaryBackgroundDefault)
        case (.secondary, .hover): return .solid(SH.Color.buttonSecondaryBackgroundHover)
        case (.secondary, .pressed): return .solid(SH.Color.buttonSecondaryBackgroundPressed)
        // Tertiary: Figma binds a border/default stroke at sh-stroke/none, so no visible edge.
        case (.tertiary, .normal): return .solid(SH.Color.buttonTertiaryBackgroundDefault)
        case (.tertiary, .hover): return .solid(SH.Color.buttonTertiaryBackgroundHover)
        case (.tertiary, .pressed): return .solid(SH.Color.buttonTertiaryBackgroundPressed)
        case (.translucent, .pressed): return .gradient(SH.Gradient.translucentDarkDefault)   // drawn by shGlass
        case (.translucent, _): return .gradient(SH.Gradient.translucentDarkSoft)
        case (.ghost, .normal): return .solid(SH.Color.buttonGhostBackgroundDefault)
        case (.ghost, .hover): return .solid(SH.Color.buttonGhostBackgroundHover)
        case (.ghost, .pressed): return .solid(SH.Color.buttonGhostBackgroundPressed)
        }
    }

    var iconColor: Color {
        switch self {
        case .primary: return SH.Color.buttonPrimaryIconDefault.color
        case .secondary: return SH.Color.buttonSecondaryIconDefault.color
        case .tertiary: return SH.Color.buttonTertiaryIconDefault.color
        case .translucent: return SH.Color.iconInverse.color
        case .ghost: return SH.Color.buttonGhostIconDefault.color
        }
    }

    var badgeColor: Color {
        switch self {
        case .primary: return SH.Color.buttonPrimaryTextDefault.color
        case .secondary: return SH.Color.buttonSecondaryTextDefault.color
        case .tertiary: return SH.Color.buttonTertiaryTextDefault.color
        case .translucent: return SH.Color.textInverse.color
        case .ghost: return SH.Color.buttonGhostTextDefault.color
        }
    }
}
