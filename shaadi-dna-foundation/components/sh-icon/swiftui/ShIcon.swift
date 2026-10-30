// sh-icon — SwiftUI
// Icon map: ../../icons.md
//
// Add icons/<type>/<name>.svg to the asset catalogue as "sh-icon/<type>/<name>"
// (Preserve Vector Data, Render As Template). Badges and multi-colour art: Render As Original.

import SwiftUI

/// How an icon glyph is painted: the foreground style, a colour token, a gradient token, or its own colours.
public enum ShIconPaint {
    case inherit
    case color(Color)
    case gradient(SHGradient)
    case original
}

/// An icon plus its paint, for components that take an icon as a property (tags, buttons, links).
public struct ShIconSpec {
    public var name: String
    public var paint: ShIconPaint
    public init(_ name: String, paint: ShIconPaint = .inherit) { self.name = name; self.paint = paint }
}

/// sh-icon at one of the SH.Icon size tokens. Decorative (hidden from VoiceOver) unless a label is given.
public struct ShIcon: View {
    public var name: String
    public var size: CGFloat
    public var paint: ShIconPaint
    public var label: String?

    public init(_ name: String, size: CGFloat, paint: ShIconPaint = .inherit, label: String? = nil) {
        self.name = name; self.size = size; self.paint = paint; self.label = label
    }
    public init(_ spec: ShIconSpec, size: CGFloat, label: String? = nil) {
        self.init(spec.name, size: size, paint: spec.paint, label: label)
    }

    public var body: some View {
        glyph
            .frame(width: size, height: size)
            .accessibilityHidden(label == nil)
            .accessibilityLabel(label ?? "")
    }

    @ViewBuilder private var glyph: some View {
        let image = Image("sh-icon/" + name)
        switch paint {
        case .inherit: image.renderingMode(.template).resizable().scaledToFit()
        case .color(let c): image.renderingMode(.template).resizable().scaledToFit().foregroundStyle(c)
        case .gradient(let g): image.renderingMode(.template).resizable().scaledToFit().foregroundStyle(g.layers[0].linear)
        case .original: image.renderingMode(.original).resizable().scaledToFit()
        }
    }
}

/// Badges (sh-icon/misc/verified-badge, premium-badge, vip-badge) keep their own colours; sized by height.
public struct ShBadge: View {
    public var name: String
    public var label: String
    public var height: CGFloat

    public init(_ name: String, label: String, height: CGFloat = SH.Icon.size20) {
        self.name = name; self.label = label; self.height = height
    }

    public var body: some View {
        Image("sh-icon/" + name).renderingMode(.original).resizable().scaledToFit()
            .frame(height: height)
            .accessibilityLabel(label)
    }
}
