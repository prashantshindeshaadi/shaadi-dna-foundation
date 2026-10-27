// sh-user-images — SwiftUI
// Spec: ../sh-user-images.md · Figma node 2248:13619
//
// The member photo, cropped to fill its frame (Figma image fill "Fill"). Style Blur is the Figma "Blur" layer over
// the same photo, same size: a sh-gradient/translucent/dark/extra-soft wash + sh-background-blur/uniform/strong.
// Gender Female 1–21 / Male 1–6 are design-only sample photos: pass the member's photo.
// Gender Female requested / Male requested: add ../assets/requested-female.jpg and requested-male.jpg to the asset
// catalogue as "sh-user-images/requested-female" and "sh-user-images/requested-male", then use ShUserImage(requested:).
// Needs dist/ios/SHTokens.swift.

import SwiftUI

/// Figma property "Style".
public enum ShUserImageStyle {
    case normal
    case blur
}

/// The Photo requested portraits the app ships (Figma Gender "Female requested" / "Male requested").
public enum ShUserImageRequested {
    case female
    case male

    public var image: Image {
        switch self {
        case .female: return Image("sh-user-images/requested-female")
        case .male: return Image("sh-user-images/requested-male")
        }
    }
}

/// sh-user-images: a photo that fills its frame (crop), Style Normal or Blur.
public struct ShUserImage: View {
    public var image: Image?
    public var style: ShUserImageStyle
    public var alignment: Alignment

    /// - Parameters:
    ///   - image: the member's photo. nil leaves the frame empty.
    ///   - style: Normal, or Blur for locked, hidden or private photos.
    ///   - alignment: which part of the photo stays in frame when it is cropped (Figma crops member photos centred).
    public init(_ image: Image?, style: ShUserImageStyle = .normal, alignment: Alignment = .center) {
        self.image = image; self.style = style; self.alignment = alignment
    }

    /// Gender Female requested / Male requested: the requested portrait, full width and top-aligned as in Figma.
    public init(requested: ShUserImageRequested, style: ShUserImageStyle = .normal) {
        self.init(requested.image, style: style, alignment: .top)
    }

    public var body: some View {
        Color.clear
            .overlay(alignment: alignment) {
                if let image {
                    image.resizable().scaledToFill()
                }
            }
            .clipped()
            .modifier(ShUserImageBlurLayer(isOn: style == .blur))
            .accessibilityHidden(true)             // decorative: the card or screen that hosts the photo names the member
    }
}

/// The Figma "Blur" layer: background blur sh-background-blur/uniform/strong + a sh-gradient/translucent/dark/extra-soft wash.
private struct ShUserImageBlurLayer: ViewModifier {
    let isOn: Bool

    func body(content: Content) -> some View {
        if isOn {
            content
                .blur(radius: SH.Blur.backgroundBlurStrong, opaque: true)   // opaque: edges stay solid, photo not scaled
                .overlay(SH.Gradient.translucentDarkExtraSoft.view)
        } else {
            content
        }
    }
}

#Preview("sh-user-images") {
    HStack(spacing: SH.Space.step12) {
        ShUserImage(requested: .female)
        ShUserImage(requested: .female, style: .blur)
        ShUserImage(requested: .male)
        ShUserImage(requested: .male, style: .blur)
    }
    .frame(height: SH.Space.step80 * 3)                  // preview only
    .padding(SH.Space.step16)
}
