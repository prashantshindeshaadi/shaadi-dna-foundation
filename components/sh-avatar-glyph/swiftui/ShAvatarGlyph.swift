// sh-avatar-glyph — SwiftUI
// Spec: ../sh-avatar-glyph.md · Figma node 2644:42085 · Gender Male / Female × Size 16 / 24 / 40
//
// Male / female silhouette used inside sh-avatar (Type=Icon). Each size is its own drawing (Hugeicons stroke
// scale), so pick the size, never scale one drawing to another size.
// Add ../assets/{male,female}-{16,24,40}.svg to the asset catalogue as "sh-avatar-glyph/<gender>-<size>",
// e.g. "sh-avatar-glyph/male-24" (Preserve Vector Data, Render As Template).
// Needs dist/ios/SHTokens.swift.

import SwiftUI

/// Figma "Gender".
public enum ShAvatarGlyphGender: CaseIterable {
    case male, female
}

/// Figma "Size": 16 = sh-icon/size/16 · 24 = sh-icon/size/24 · 40 = sh-icon/pictogram/size/40.
public enum ShAvatarGlyphSize: CaseIterable {
    case s16, s24, s40

    /// The token size of this glyph size.
    public var points: CGFloat {
        switch self {
        case .s16: return SH.Icon.size16
        case .s24: return SH.Icon.size24
        case .s40: return SH.Icon.pictogramSize40
        }
    }
}

/// sh-avatar-glyph: a gender silhouette. Decorative (hidden from VoiceOver). Not interactive.
public struct ShAvatarGlyph: View {
    public var gender: ShAvatarGlyphGender
    public var size: ShAvatarGlyphSize
    public var color: Color?

    /// - Parameter color: glyph paint. nil = icon/primary (the Figma glyph fill); sh-avatar passes icon/secondary.
    public init(gender: ShAvatarGlyphGender = .male, size: ShAvatarGlyphSize = .s16, color: Color? = nil) {
        self.gender = gender; self.size = size; self.color = color
    }

    public var body: some View {
        Image(assetName)
            .renderingMode(.template)
            .resizable()
            .scaledToFit()
            .foregroundStyle(color ?? SH.Color.iconPrimary.color)
            .frame(width: size.points, height: size.points)
            .accessibilityHidden(true)
    }

    private var assetName: String {
        let g: String
        switch gender {
        case .male: g = "male"
        case .female: g = "female"
        }
        let s: String
        switch size {
        case .s16: s = "16"
        case .s24: s = "24"
        case .s40: s = "40"
        }
        return "sh-avatar-glyph/\(g)-\(s)"
    }
}

#Preview("sh-avatar-glyph") {
    VStack(spacing: SH.Space.step16) {
        ForEach(ShAvatarGlyphGender.allCases, id: \.self) { gender in
            HStack(spacing: SH.Space.step16) {
                ForEach(ShAvatarGlyphSize.allCases, id: \.self) { size in
                    ShAvatarGlyph(gender: gender, size: size)
                }
            }
        }
    }
    .padding(SH.Space.step16)
}
