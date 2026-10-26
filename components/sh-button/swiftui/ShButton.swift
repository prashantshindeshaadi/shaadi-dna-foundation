// sh-button — SwiftUI
// Spec: ../sh-button.md · Figma node 163:1301 (6 Types × 3 Sizes × 6 States = 108 variants)
//
// Needs dist/ios/SHTokens.swift, the type kit (ShTypography.swift) and ../../sh-icon/swiftui/ShIcon.swift.
// Icons are asset names "sh-icon/<type>/<name>"; pass "<type>/<name>", e.g. "filled/check".
//
// States: Pressed from ButtonStyle.isPressed, Hover from the pointer (iPadOS), Focus draws the §7.2 ring,
// Disabled (.disabled(true)) is the Default look at sh-opacity/disabled, Loading hides the content and spins
// the loader. Small (32) and Medium (40) get a 48 tap area without changing their visual size.

import SwiftUI

/// sh-button Type, in Figma order.
public enum ShButtonType: CaseIterable {
    case primary, secondary, tertiary, ghost, premiumSolid, premiumSoft
}

/// sh-button Size: Large 48 (icon 20), Medium 40 (icon 16), Small 32 (icon 12).
public enum ShButtonSize: CaseIterable {
    case large, medium, small
}

/// sh-button. Width hugs the content; `fill` stretches it to the container (the container decides:
/// lone button max 200 centred, two side by side fill equally, action island fill).
public struct ShButton: View {
    public var label: String
    public var type: ShButtonType
    public var size: ShButtonSize
    public var leadingIcon: String?
    public var trailingIcon: String?
    public var sublabel: String?
    public var isLoading: Bool
    public var fill: Bool
    public var action: () -> Void

    /// - Parameters:
    ///   - leadingIcon: icon before the label (meaning), e.g. "filled/check"
    ///   - trailingIcon: icon after the label (direction), e.g. "line/arrow-right-01"
    ///   - sublabel: Figma "Show sublabel" + "Sublabel": Support/Meta under the label; the height stays the same
    ///   - isLoading: Figma State Loading (content hidden, loader shown, input blocked)
    public init(_ label: String, type: ShButtonType = .primary, size: ShButtonSize = .medium,
                leadingIcon: String? = nil, trailingIcon: String? = nil, sublabel: String? = nil,
                isLoading: Bool = false, fill: Bool = false, action: @escaping () -> Void) {
        self.label = label; self.type = type; self.size = size
        self.leadingIcon = leadingIcon; self.trailingIcon = trailingIcon; self.sublabel = sublabel
        self.isLoading = isLoading; self.fill = fill; self.action = action
    }

    public var body: some View {
        Button(action: action) {
            ShButtonContent(label: label, type: type, size: size, leadingIcon: leadingIcon,
                            trailingIcon: trailingIcon, sublabel: sublabel, isLoading: isLoading)
        }
        .buttonStyle(ShButtonStyle(type: type, size: size, isLoading: isLoading, fill: fill))
        .disabled(isLoading)                       // input blocked; the style keeps the Default look while loading
        .accessibilityLabel(Text(sublabel.map { "\(label), \($0)" } ?? label))
    }
}

// MARK: - Content

private struct ShButtonContent: View {
    let label: String
    let type: ShButtonType
    let size: ShButtonSize
    let leadingIcon: String?
    let trailingIcon: String?
    let sublabel: String?
    let isLoading: Bool
    @ScaledMetric var scale: CGFloat = 1          // the type kit scales line heights with Dynamic Type

    var body: some View {
        let m = ShButtonMetrics(size)
        let lineHeight = m.lineHeight * scale
        HStack(spacing: m.gap) {
            if isLoading {
                ShButtonLoader(size: m.iconSize, color: type.iconColor)
            } else {
                if let leadingIcon { ShIcon(leadingIcon, size: m.iconSize, paint: .color(type.iconColor)) }
                // Label wrapper: fixed to the label's line height; a sublabel lifts the label and overflows evenly.
                VStack(spacing: -SH.Space.step2) {                       // Figma gap -2 (label → sublabel)
                    Text(label).shTextStyle(m.textStyle).lineLimit(1)
                    if let sublabel {
                        Text(sublabel).shTextStyle(.supportMeta).lineLimit(1)
                            .padding(.bottom, SH.Space.step2)
                            .opacity(SH.Opacity.extraStrong)
                    }
                }
                .foregroundStyle(type.textColor)
                .frame(height: lineHeight)
                if let trailingIcon { ShIcon(trailingIcon, size: m.iconSize, paint: .color(type.iconColor)) }
            }
        }
        .frame(minHeight: lineHeight)                 // content is at least the label line: 48 / 40 / 32 in total
    }
}

/// sh-icon/loader-circle at the size's icon size, in the type's icon colour, spinning.
private struct ShButtonLoader: View {
    let size: CGFloat
    let color: Color
    @State var spinning = false

    var body: some View {
        ShIcon("line/loader-circle", size: size, paint: .color(color))
            .rotationEffect(.degrees(spinning ? 360 : 0))
            .animation(.linear(duration: 1).repeatForever(autoreverses: false), value: spinning)   // no token: motion duration
            .onAppear { spinning = true }
    }
}

// MARK: - Style

private enum ShButtonInteraction { case normal, hover, pressed }

private struct ShButtonStyle: ButtonStyle {
    let type: ShButtonType
    let size: ShButtonSize
    let isLoading: Bool
    let fill: Bool

    func makeBody(configuration: Configuration) -> some View {
        ShButtonChrome(label: configuration.label, isPressed: configuration.isPressed,
                       type: type, size: size, isLoading: isLoading, fill: fill)
    }
}

private struct ShButtonChrome<Label: View>: View {
    let label: Label
    let isPressed: Bool
    let type: ShButtonType
    let size: ShButtonSize
    let isLoading: Bool
    let fill: Bool
    @Environment(\.isEnabled) var isEnabled
    @Environment(\.isFocused) var isFocused
    @State var isHovered = false
    @ScaledMetric var scale: CGFloat = 1

    var body: some View {
        let m = ShButtonMetrics(size)
        let shape = RoundedRectangle(cornerRadius: SH.Radius.button, style: .continuous)
        let interactive = isEnabled && !isLoading
        let state: ShButtonInteraction = !interactive ? .normal : (isPressed ? .pressed : (isHovered ? .hover : .normal))
        let visualHeight = m.lineHeight * scale + 2 * m.paddingY
        let tapInset = max(0, (SH.Icon.targetDefault - visualHeight) / 2)   // grows the hit area to 48, not the layout

        label
            .padding(.horizontal, m.paddingX)
            .padding(.vertical, m.paddingY)
            .frame(minWidth: SH.Space.step48 + SH.Space.step8)           // no token: min width 56 (blueprint)
            .frame(maxWidth: fill ? .infinity : nil)
            .background { type.fill(state).view.clipShape(shape) }
            .overlay {
                if isFocused && interactive {                             // §7.2: 2 wide, 2 outside, sh-opacity/strong
                    shape.stroke(SH.Color.borderFocus.color.opacity(SH.Opacity.strong), lineWidth: SH.Stroke.strong)
                        .padding(-(SH.Space.step2 + SH.Stroke.strong / 2))
                }
            }
            .opacity(isEnabled || isLoading ? SH.Opacity.full : SH.Opacity.disabled)
            .padding(.vertical, tapInset)
            .contentShape(Rectangle())
            .padding(.vertical, -tapInset)
            .onHover { isHovered = $0 }
    }
}

// MARK: - Tokens per Size and Type

private struct ShButtonMetrics {
    let paddingX: CGFloat
    let paddingY: CGFloat
    let gap: CGFloat
    let iconSize: CGFloat
    let lineHeight: CGFloat
    let textStyle: ShTextStyle

    init(_ size: ShButtonSize) {
        switch size {
        case .large:
            paddingX = SH.Space.step20; paddingY = SH.Space.step12; gap = SH.Space.step4
            iconSize = SH.Icon.size20; lineHeight = SH.Typo.buttonLgLineHeight; textStyle = .buttonLg
        case .medium:
            paddingX = SH.Space.step16; paddingY = SH.Space.step10; gap = SH.Space.step2
            iconSize = SH.Icon.size16; lineHeight = SH.Typo.buttonMdLineHeight; textStyle = .buttonMd
        case .small:
            paddingX = SH.Space.step16; paddingY = SH.Space.step8; gap = SH.Space.step2
            iconSize = SH.Icon.size12; lineHeight = SH.Typo.buttonSmLineHeight; textStyle = .buttonSm
        }
    }
}

private enum ShButtonFill {
    case gradient(SHGradient)
    case solid(SHColor)

    @ViewBuilder var view: some View {
        switch self {
        case .gradient(let g): g.view
        case .solid(let c): c.color
        }
    }
}

private extension ShButtonType {
    func fill(_ state: ShButtonInteraction) -> ShButtonFill {
        switch (self, state) {
        case (.primary, .normal): return .gradient(SH.Gradient.brandDefault)
        case (.primary, .hover): return .gradient(SH.Gradient.brandHover)
        case (.primary, .pressed): return .gradient(SH.Gradient.brandPressed)
        case (.secondary, .normal): return .solid(SH.Color.buttonSecondaryBackgroundDefault)
        case (.secondary, .hover): return .solid(SH.Color.buttonSecondaryBackgroundHover)
        case (.secondary, .pressed): return .solid(SH.Color.buttonSecondaryBackgroundPressed)
        case (.tertiary, .normal): return .solid(SH.Color.buttonTertiaryBackgroundDefault)
        case (.tertiary, .hover): return .solid(SH.Color.buttonTertiaryBackgroundHover)
        case (.tertiary, .pressed): return .solid(SH.Color.buttonTertiaryBackgroundPressed)
        case (.ghost, .normal): return .solid(SH.Color.buttonGhostBackgroundDefault)
        case (.ghost, .hover): return .solid(SH.Color.buttonGhostBackgroundHover)
        case (.ghost, .pressed): return .solid(SH.Color.buttonGhostBackgroundPressed)
        case (.premiumSolid, .normal): return .gradient(SH.Gradient.premiumDefault)
        case (.premiumSolid, .hover): return .gradient(SH.Gradient.premiumHover)
        case (.premiumSolid, .pressed): return .gradient(SH.Gradient.premiumPressed)
        case (.premiumSoft, .normal): return .solid(SH.Color.premiumBackgroundSoftDefault)
        case (.premiumSoft, .hover): return .solid(SH.Color.premiumBackgroundSoftHover)
        case (.premiumSoft, .pressed): return .solid(SH.Color.premiumBackgroundSoftPressed)
        }
    }

    var textColor: Color {
        switch self {
        case .primary: return SH.Color.buttonPrimaryTextDefault.color
        case .secondary: return SH.Color.buttonSecondaryTextDefault.color
        case .tertiary: return SH.Color.buttonTertiaryTextDefault.color
        case .ghost: return SH.Color.buttonGhostTextDefault.color
        case .premiumSolid: return SH.Color.premiumTextOnSolid.color
        case .premiumSoft: return SH.Color.premiumTextOnSoft.color
        }
    }

    var iconColor: Color {
        switch self {
        case .primary: return SH.Color.buttonPrimaryIconDefault.color
        case .secondary: return SH.Color.buttonSecondaryIconDefault.color
        case .tertiary: return SH.Color.buttonTertiaryIconDefault.color
        case .ghost: return SH.Color.buttonGhostIconDefault.color
        case .premiumSolid: return SH.Color.premiumIconOnSolid.color
        case .premiumSoft: return SH.Color.premiumIconOnSoft.color
        }
    }
}
