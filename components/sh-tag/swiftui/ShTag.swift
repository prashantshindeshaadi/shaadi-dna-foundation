// sh-tag — SwiftUI
// Spec: ../sh-tag.md · Figma node 2357:23671 · 20 variants (Mode × Size × Shape)
//
// Needs dist/ios/SHTokens.swift, the type kit (ShTypography.swift) and sh-icon
// (components/sh-icon/swiftui/ShIcon.swift). Every value is a DNA token; corners are continuous
// (Figma's 60 % corner smoothing).

import SwiftUI

/// Figma "Mode", in Figma's order.
public enum ShTagMode: CaseIterable {
    case white, dark, translucentLight, translucentDark, strong
}

/// Figma "Size": Medium is 22 tall, Small 20.
public enum ShTagSize: CaseIterable {
    case medium, small
}

/// Figma "Shape": Rounded = sh-radius/xs, Pill = sh-radius/full.
public enum ShTagShape: CaseIterable {
    case rounded, pill
}

/// sh-tag: a compact, non-interactive label for status or promotion on cards and photos.
///
/// - `leadingIcon` / `trailingIcon`: Figma "Show … icon" + the swapped icon; nil hides it. An icon with
///   `.inherit` paint takes the mode's icon colour; gradient and original paints keep theirs.
/// - `border`: Figma "Show border", the thin gradient edge drawn inside. Only the translucent modes paint it.
/// - `outline`: Figma "Show outline". Not wired to any layer in Figma yet, so it changes nothing; kept for parity.
/// - `iconSize`: the swapped icon's size. sh-tag's icons are sh-icon/size/12, and so is the art sh-tag-profile
///   swaps in (location pin, wings). Multi-colour art (`.original`) is sized by height.
public struct ShTag: View {
    public var label: String
    public var mode: ShTagMode
    public var size: ShTagSize
    public var shape: ShTagShape
    public var leadingIcon: ShIconSpec?
    public var trailingIcon: ShIconSpec?
    public var border: Bool
    public var outline: Bool
    public var iconSize: CGFloat

    public init(_ label: String, mode: ShTagMode = .white, size: ShTagSize = .medium, shape: ShTagShape = .rounded,
                leadingIcon: ShIconSpec? = nil, trailingIcon: ShIconSpec? = nil,
                border: Bool = true, outline: Bool = false, iconSize: CGFloat = SH.Icon.size12) {
        self.label = label; self.mode = mode; self.size = size; self.shape = shape
        self.leadingIcon = leadingIcon; self.trailingIcon = trailingIcon
        self.border = border; self.outline = outline; self.iconSize = iconSize
    }

    public var body: some View {
        HStack(spacing: SH.Space.step2) {
            if let leadingIcon { ShTagIcon(spec: leadingIcon, size: iconSize) }
            Text(label)
                .shTextStyle(.supportLabel)
                .foregroundStyle(textColor)
                .lineLimit(1)
                .fixedSize()
            if let trailingIcon { ShTagIcon(spec: trailingIcon, size: iconSize) }
        }
        .foregroundStyle(iconColor)                        // .inherit icons
        // optical padding, as in Figma: 4 on the icon side, 6 after the label
        .padding(.leading, SH.Space.step4)
        .padding(.trailing, SH.Space.step6)
        .padding(.vertical, SH.Space.step2)
        .frame(height: height)
        .background(fill)
        .overlay(edge)
        .accessibilityElement(children: .combine)
    }

    // MARK: Tokens per variant

    private var radius: CGFloat { shape == .pill ? SH.Radius.full : SH.Radius.xs }
    private var tagShape: RoundedRectangle { RoundedRectangle(cornerRadius: radius, style: .continuous) }

    /// no token: Medium is a fixed 22 tall and Small a fixed 20 tall in Figma (unbound heights).
    private var height: CGFloat { size == .medium ? SH.Space.step20 + SH.Space.step2 : SH.Space.step20 }

    private var textColor: Color {
        switch mode {
        case .white, .strong: return SH.Color.textSecondary.color
        case .dark: return SH.Color.textInverse.color
        case .translucentLight, .translucentDark: return SH.Color.textOnImage.color
        }
    }

    private var iconColor: Color {
        switch mode {
        case .white, .strong: return SH.Color.iconSecondary.color
        case .dark: return SH.Color.iconInverse.color
        case .translucentLight, .translucentDark: return SH.Color.iconOnImage.color
        }
    }

    @ViewBuilder private var fill: some View {
        switch mode {
        case .white: tagShape.fill(SH.Color.backgroundDefault.color)
        case .dark: tagShape.fill(SH.Color.backgroundInverse.color)
        case .strong: tagShape.fill(SH.Color.backgroundStrong.color)
        case .translucentLight: SH.Gradient.translucentLightExtraSoft.view.clipShape(tagShape)
        case .translucentDark: SH.Gradient.translucentDarkExtraSoft.view.clipShape(tagShape)
        }
    }

    /// Figma's absolute "Border" layer: a thin gradient edge, inside. Empty on White, Dark and Strong.
    @ViewBuilder private var edge: some View {
        if border {
            switch mode {
            case .translucentLight:
                tagShape.strokeBorder(SH.Gradient.translucentBorderLight.layers[0].linear, lineWidth: SH.Stroke.thin)
            case .translucentDark:
                tagShape.strokeBorder(SH.Gradient.translucentBorderDark.layers[0].linear, lineWidth: SH.Stroke.thin)
            case .white, .dark, .strong:
                EmptyView()
            }
        }
    }
}

/// Tag icon: template glyphs through ShIcon; multi-colour art keeps its aspect ratio, sized by height (as in Figma).
private struct ShTagIcon: View {
    let spec: ShIconSpec
    let size: CGFloat

    var body: some View {
        if case .original = spec.paint {
            Image("sh-icon/" + spec.name)
                .renderingMode(.original)
                .resizable()
                .scaledToFit()
                .frame(height: size)
                .accessibilityHidden(true)
        } else {
            ShIcon(spec, size: size)
        }
    }
}
