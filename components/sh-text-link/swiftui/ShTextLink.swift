// sh-text-link — SwiftUI
// Spec: ../sh-text-link.md · Figma node 2348:22277 (22 variants: Type × Size × State Default/Focus;
// Neutral has Small and Medium only in Figma — Neutral Large works here with the same rules)
//
// Needs dist/ios/SHTokens.swift, the type kit (ShTypography.swift) and ../../sh-icon/swiftui/ShIcon.swift.
// Icons are asset names "sh-icon/<type>/<name>"; pass "<type>/<name>", e.g. "line/arrow-right-01".
//
// States: Focus draws the §7.2 ring (pill; border/inverse on the Inverse type). Disabled (.disabled(true)) is the
// Default look at sh-opacity/disabled (FOUNDATION §4.3). Figma defines no Hover or Pressed look, so none is drawn.
// The link gets a 48 tap area without changing its size.

import SwiftUI

/// sh-text-link Type, in Figma order. Inverse is for imagery and dark surfaces.
public enum ShTextLinkType: CaseIterable {
    case neutral, link, inverse, premium
}

/// sh-text-link Size: label Button/SM, MD, LG; icons 12, 12, 16.
public enum ShTextLinkSize: CaseIterable {
    case small, medium, large
}

/// sh-text-link: an inline text action or link. `underline` is Figma "Show border" (the 1-stroke line under
/// the label, in the label's colour token); the icons are "Show leading / trailing icon" + the icon swaps.
public struct ShTextLink: View {
    public var label: String
    public var type: ShTextLinkType
    public var size: ShTextLinkSize
    public var leadingIcon: String?
    public var trailingIcon: String?
    public var underline: Bool
    public var action: () -> Void

    public init(_ label: String, type: ShTextLinkType = .neutral, size: ShTextLinkSize = .small,
                leadingIcon: String? = nil, trailingIcon: String? = nil, underline: Bool = true,
                action: @escaping () -> Void) {
        self.label = label; self.type = type; self.size = size
        self.leadingIcon = leadingIcon; self.trailingIcon = trailingIcon; self.underline = underline
        self.action = action
    }

    public var body: some View {
        Button(action: action) {
            ShTextLinkContent(label: label, type: type, size: size, leadingIcon: leadingIcon,
                              trailingIcon: trailingIcon, underline: underline)
        }
        .buttonStyle(ShTextLinkStyle(type: type))
    }
}

private struct ShTextLinkContent: View {
    let label: String
    let type: ShTextLinkType
    let size: ShTextLinkSize
    let leadingIcon: String?
    let trailingIcon: String?
    let underline: Bool

    var body: some View {
        let m = ShTextLinkMetrics(size)
        HStack(spacing: m.gap) {
            if let leadingIcon { ShIcon(leadingIcon, size: m.iconSize, paint: .color(type.iconColor)) }
            Text(label)
                .shTextStyle(m.textStyle)
                .lineLimit(1)
                .foregroundStyle(type.textColor)
                .padding(.bottom, SH.Stroke.default)          // the line's space is kept when Show border is off
                .overlay(alignment: .bottom) {
                    Rectangle()
                        .fill(underline ? type.textColor : Color.clear)
                        .frame(height: SH.Stroke.default)
                }
            if let trailingIcon { ShIcon(trailingIcon, size: m.iconSize, paint: .color(type.iconColor)) }
        }
    }
}

private struct ShTextLinkStyle: ButtonStyle {
    let type: ShTextLinkType

    func makeBody(configuration: Configuration) -> some View {
        ShTextLinkStyleBody(label: configuration.label, type: type)
    }
}

private struct ShTextLinkStyleBody<Label: View>: View {
    let label: Label
    let type: ShTextLinkType
    @Environment(\.isEnabled) var isEnabled
    @Environment(\.isFocused) var isFocused
    @State var measured: CGSize = .zero

    var body: some View {
        let ring = type == .inverse ? SH.Color.borderInverse.color : SH.Color.borderFocus.color
        let shape = RoundedRectangle(cornerRadius: SH.Radius.full, style: .continuous)
        let insetX = max(0, (SH.Icon.targetDefault - measured.width) / 2)    // hit area 48 × 48, layout unchanged
        let insetY = max(0, (SH.Icon.targetDefault - measured.height) / 2)
        label
            .background {
                GeometryReader { proxy in
                    Color.clear
                        .onAppear { measured = proxy.size }
                        .onChange(of: proxy.size) { _, size in measured = size }
                }
            }
            .overlay {
                if isFocused && isEnabled {                   // §7.2: 2 wide, 2 outside, sh-opacity/strong, radius full
                    shape.stroke(ring.opacity(SH.Opacity.strong), lineWidth: SH.Stroke.strong)
                        .padding(-(SH.Space.step2 + SH.Stroke.strong / 2))
                }
            }
            .opacity(isEnabled ? SH.Opacity.full : SH.Opacity.disabled)
            .padding(.horizontal, insetX)
            .padding(.vertical, insetY)
            .contentShape(Rectangle())
            .padding(.horizontal, -insetX)
            .padding(.vertical, -insetY)
    }
}

// MARK: - Tokens per Size and Type

private struct ShTextLinkMetrics {
    let gap: CGFloat
    let iconSize: CGFloat
    let textStyle: ShTextStyle

    init(_ size: ShTextLinkSize) {
        switch size {
        case .small: gap = SH.Space.step2; iconSize = SH.Icon.size12; textStyle = .buttonSm
        case .medium: gap = SH.Space.step2; iconSize = SH.Icon.size12; textStyle = .buttonMd
        case .large: gap = SH.Space.step4; iconSize = SH.Icon.size16; textStyle = .buttonLg
        }
    }
}

private extension ShTextLinkType {
    var textColor: Color {
        switch self {
        case .neutral: return SH.Color.textSecondary.color
        case .link: return SH.Color.textInlineText.color
        case .inverse: return SH.Color.textOnImage.color
        case .premium: return SH.Color.premiumTextOnSoft.color
        }
    }

    var iconColor: Color {
        switch self {
        case .neutral: return SH.Color.iconSecondary.color
        case .link: return SH.Color.iconInlineIcon.color
        case .inverse: return SH.Color.iconOnImage.color
        case .premium: return SH.Color.premiumIconOnSoft.color
        }
    }
}
