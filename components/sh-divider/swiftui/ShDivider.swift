// sh-divider — SwiftUI
// Spec: ../sh-divider.md · Figma node 594:31711 (Orientation Horizontal / Vertical × Type Soft / Default / Strong)
//
// Needs dist/ios/SHTokens.swift.
// A sh-stroke/default line with radius full: Horizontal fills the width, Vertical fills the height of its container.

import SwiftUI

/// sh-divider Orientation, in Figma order.
public enum ShDividerOrientation: CaseIterable {
    case horizontal, vertical
}

/// sh-divider Type, in Figma order: border/soft, border/default (Figma "Default"), border/strong.
public enum ShDividerType: CaseIterable {
    case soft, standard, strong
}

/// sh-divider: a thin separator between rows or sections. Decorative (hidden from VoiceOver).
public struct ShDivider: View {
    public var orientation: ShDividerOrientation
    public var type: ShDividerType

    public init(orientation: ShDividerOrientation = .horizontal, type: ShDividerType = .soft) {
        self.orientation = orientation; self.type = type
    }

    public var body: some View {
        let line = RoundedRectangle(cornerRadius: SH.Radius.full, style: .continuous).fill(color)
        Group {
            switch orientation {
            case .horizontal: line.frame(maxWidth: .infinity).frame(height: SH.Stroke.default)
            case .vertical: line.frame(maxHeight: .infinity).frame(width: SH.Stroke.default)
            }
        }
        .accessibilityHidden(true)
    }

    private var color: Color {
        switch type {
        case .soft: return SH.Color.borderSoft.color
        case .standard: return SH.Color.borderDefault.color
        case .strong: return SH.Color.borderStrong.color
        }
    }
}
