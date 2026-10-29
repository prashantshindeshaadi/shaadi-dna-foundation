// sh-avatar-placeholder — SwiftUI
// Spec: ../sh-avatar-placeholder.md · Figma node 2239:13257
//
// Gender × Aspect Ratio. The muted grey no-photo placeholder, used for No photo and Photo requested.
// Two layers, as in Figma: the Background gradient (token style) and the silhouette art.
//   1:1 / 4:5  SH.Gradient.placeholderAvatar (the slice of the photo gradient behind the silhouette);
//              silhouette square fills the width, centred.
//   Full       SH.Gradient.placeholderPhoto; silhouette 160, sh-space/40 from the top (room for an overlay below).
// Add the silhouette art in ../../sh-avatar-silhouette/assets/ to the asset catalogue as
// "sh-avatar-silhouette/female" and "sh-avatar-silhouette/male" (SVG, preserve vector data).
// The view is the Figma frame; size it with .frame(width:). 1:1 → sh-radius/full, 4:5 and Full → sh-radius/none.
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
    /// Figma property "Show silhouette". Off = background only.
    public var showSilhouette: Bool

    public init(gender: ShAvatarPlaceholderGender = .male, aspect: ShAvatarPlaceholderAspect = .portrait,
                showSilhouette: Bool = true) {
        self.gender = gender; self.aspect = aspect; self.showSilhouette = showSilhouette
    }

    public var body: some View {
        let full = aspect == .full
        let shape: CGFloat = aspect == .portrait ? 4.0 / 5.0 : aspect == .square ? 1 : 360.0 / 520.0
        Color.clear
            .aspectRatio(shape, contentMode: .fit)   // Figma frame 160 × 200 / 160 × 160 / 360 × 520
            .background((full ? SH.Gradient.placeholderPhoto : SH.Gradient.placeholderAvatar).view)
            .overlay(alignment: full ? .top : .center) {
                if showSilhouette {
                    let art = Image(gender == .male ? "sh-avatar-silhouette/male" : "sh-avatar-silhouette/female")
                        .resizable()
                        .scaledToFit()
                    if full {
                        art.frame(width: SH.Space.step80 * 2, height: SH.Space.step80 * 2)   // no token: 160
                            .padding(.top, SH.Space.step40)
                    } else {
                        art
                    }
                }
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
        ShAvatarPlaceholder(gender: .female, aspect: .full).frame(width: SH.Space.step80 * 3)
    }
    .padding(SH.Space.step16)
}
