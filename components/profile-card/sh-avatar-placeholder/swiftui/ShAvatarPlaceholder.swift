// sh-avatar-placeholder — SwiftUI
// Spec: ../sh-avatar-placeholder.md · Figma node 2239:13257
//
// Gender × Aspect Ratio. The muted grey no-photo silhouette, used for No photo and Photo requested.
// Add the artwork in ../assets/ to the asset catalogue as "sh-avatar-placeholder/<file name>":
//   female-4x5, female-1x1, female-full, male-4x5, male-1x1, male-full   (@3x JPG, crop baked in)
// The view is the Figma frame (4:5, 1:1 or Full); size it with .frame(width:). The art fills it and is clipped:
// 1:1 → sh-radius/full, 4:5 and Full → sh-radius/none. Full = the whole photo slot (360 × 520): the silhouette sits
// near the top so an overlay title and button fit below it (sh-overlay No photo / Photo requested).
// Needs dist/ios/SHTokens.swift.

import SwiftUI

/// Figma property "Gender".
public enum ShAvatarPlaceholderGender {
    case male
    case female
}

/// Figma property "Aspect Ratio".
public enum ShAvatarPlaceholderAspect {
    case portrait   // 4:5
    case square     // 1:1
    case full       // the full photo slot, 360 × 520
}

/// sh-avatar-placeholder: the no-photo silhouette (No photo and Photo requested).
public struct ShAvatarPlaceholder: View {
    public var gender: ShAvatarPlaceholderGender
    public var aspect: ShAvatarPlaceholderAspect

    public init(gender: ShAvatarPlaceholderGender = .male, aspect: ShAvatarPlaceholderAspect = .portrait) {
        self.gender = gender; self.aspect = aspect
    }

    public var body: some View {
        let ratio = aspect == .portrait ? "4x5" : aspect == .square ? "1x1" : "full"
        let name = gender == .male ? "male" : "female"
        let shape: CGFloat = aspect == .portrait ? 4.0 / 5.0 : aspect == .square ? 1 : 360.0 / 520.0
        Color.clear
            .aspectRatio(shape, contentMode: .fit)   // Figma frame 160 × 200 / 160 × 160 / 360 × 520
            .overlay {
                Image("sh-avatar-placeholder/\(name)-\(ratio)")
                    .resizable()
                    .scaledToFill()
            }
            .clipShape(RoundedRectangle(cornerRadius: aspect == .square ? SH.Radius.full : SH.Radius.none, style: .continuous))
            .accessibilityElement()
            .accessibilityLabel("No photo")
    }
}

#Preview("sh-avatar-placeholder") {
    VStack(spacing: SH.Space.step40) {
        HStack(alignment: .top, spacing: SH.Space.step24) {
            ShAvatarPlaceholder(gender: .female, aspect: .portrait)
            ShAvatarPlaceholder(gender: .male, aspect: .portrait)
        }
        HStack(alignment: .top, spacing: SH.Space.step24) {
            ShAvatarPlaceholder(gender: .female, aspect: .square)
            ShAvatarPlaceholder(gender: .male, aspect: .square)
        }
    }
    .padding(SH.Space.step16)
}
