// sh-avatar-placeholder — SwiftUI
// Spec: ../sh-avatar-placeholder.md · Figma node 2239:13257
//
// Gender × Aspect Ratio. Add the artwork in ../assets/ to the asset catalogue as "sh-avatar-placeholder/<file name>":
//   silhouettes  female-4x5, female-1x1, male-4x5, male-1x1            (SVG with Preserve Vector Data, or the @3x PNG)
//   portraits    female-requested-4x5, female-requested-1x1, male-requested-4x5, male-requested-1x1   (@3x JPG)
// The view is the Figma frame (4:5 or 1:1); size it with .frame(width:). The silhouettes overflow their frame
// (Figma: clip off, no fill), so the art is drawn at its exported size from the frame's top-left and is not clipped.
// Radius: 1:1 → sh-radius/full, 4:5 → sh-radius/none. Only the requested portraits have a fill, so only they are clipped.
// Needs dist/ios/SHTokens.swift.

import SwiftUI

/// Figma property "Gender".
public enum ShAvatarPlaceholderGender {
    case male
    case female
    case femaleRequested
    case maleRequested
}

/// Figma property "Aspect Ratio".
public enum ShAvatarPlaceholderAspect {
    case portrait   // 4:5
    case square     // 1:1
}

/// sh-avatar-placeholder: the no-photo silhouette or the Photo requested portrait.
public struct ShAvatarPlaceholder: View {
    public var gender: ShAvatarPlaceholderGender
    public var aspect: ShAvatarPlaceholderAspect

    public init(gender: ShAvatarPlaceholderGender = .male, aspect: ShAvatarPlaceholderAspect = .portrait) {
        self.gender = gender; self.aspect = aspect
    }

    public var body: some View {
        let art = ShAvatarPlaceholderArt(gender: gender, aspect: aspect)
        Color.clear
            .aspectRatio(aspect == .portrait ? 4.0 / 5.0 : 1, contentMode: .fit)   // Figma frame 160 × 200 / 160 × 160
            .overlay(alignment: .topLeading) {
                GeometryReader { frame in
                    let w = frame.size.width
                    Image(art.asset)
                        .resizable()
                        .frame(width: w * art.width, height: w * art.height)
                        .offset(x: w * art.x)
                }
            }
            .modifier(ShAvatarPlaceholderClip(isOn: art.isRequested,
                                              radius: aspect == .square ? SH.Radius.full : SH.Radius.none))
            .accessibilityElement()
            .accessibilityLabel(art.isRequested ? "Photo requested" : "No photo")
    }
}

/// Exported art box per variant, in frame widths (Figma frame is 160 wide). Raw proportions: no token.
private struct ShAvatarPlaceholderArt {
    let asset: String
    let x: CGFloat
    let width: CGFloat
    let height: CGFloat
    let isRequested: Bool

    init(gender: ShAvatarPlaceholderGender, aspect: ShAvatarPlaceholderAspect) {
        let ratio = aspect == .portrait ? "4x5" : "1x1"
        switch (gender, aspect) {
        case (.male, .portrait):   x = -3.0 / 160; width = 163.0 / 160; height = 213.0 / 160   // art 163 × 213 at x −3
        case (.female, .portrait): x = 0; width = 1; height = 213.0 / 160                      // art 160 × 213
        case (.male, .square):     x = 0; width = 1; height = 163.0 / 160                      // art 160 × 163
        case (.female, .square):   x = 0; width = 1; height = 167.0 / 160                      // art 160 × 167
        case (_, .portrait):       x = 0; width = 1; height = 5.0 / 4                          // portrait fills the frame
        case (_, .square):         x = 0; width = 1; height = 1
        }
        switch gender {
        case .male: asset = "sh-avatar-placeholder/male-" + ratio; isRequested = false
        case .female: asset = "sh-avatar-placeholder/female-" + ratio; isRequested = false
        case .femaleRequested: asset = "sh-avatar-placeholder/female-requested-" + ratio; isRequested = true
        case .maleRequested: asset = "sh-avatar-placeholder/male-requested-" + ratio; isRequested = true
        }
    }
}

/// Requested portraits are clipped by the frame radius; silhouettes are not clipped (Figma clip off).
private struct ShAvatarPlaceholderClip: ViewModifier {
    let isOn: Bool
    let radius: CGFloat

    func body(content: Content) -> some View {
        if isOn {
            content.clipShape(RoundedRectangle(cornerRadius: radius, style: .continuous))
        } else {
            content
        }
    }
}

#Preview("sh-avatar-placeholder") {
    VStack(spacing: SH.Space.step40) {
        HStack(alignment: .top, spacing: SH.Space.step24) {
            ShAvatarPlaceholder(gender: .male, aspect: .portrait)
            ShAvatarPlaceholder(gender: .female, aspect: .portrait)
            ShAvatarPlaceholder(gender: .femaleRequested, aspect: .portrait)
            ShAvatarPlaceholder(gender: .maleRequested, aspect: .portrait)
        }
        HStack(alignment: .top, spacing: SH.Space.step24) {
            ShAvatarPlaceholder(gender: .male, aspect: .square)
            ShAvatarPlaceholder(gender: .female, aspect: .square)
            ShAvatarPlaceholder(gender: .femaleRequested, aspect: .square)
            ShAvatarPlaceholder(gender: .maleRequested, aspect: .square)
        }
    }
    .padding(SH.Space.step16)
}
