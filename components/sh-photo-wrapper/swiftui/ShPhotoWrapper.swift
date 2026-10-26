// sh-photo-wrapper — SwiftUI
// Spec: ../sh-photo-wrapper.md · Figma node 2530:10330
//
// Profile photo + optional top and bottom scrims + optional overlay, layered as in Figma:
// Photo image (sh-user-images) → Bottom scrim → Top scrim → Overlay (sh-overlay, off by default).
//   Bottom scrim  sh-gradient/overlay/bottom, the lower half (Figma 260 of 520, pinned to the bottom)
//   Top scrim     sh-gradient/overlay/top, 24 tall, pinned to the top
// Fills the frame it is given; corners sh-radius/none. Under an overlay that blurs (Message), keep the photo
// Style Normal: two background blurs must not stack.
// Needs dist/ios/SHTokens.swift.

import SwiftUI

/// sh-photo-wrapper. `image` is the photo (usually ShUserImage); `overlay` is "Show overlay" (usually ShOverlay).
public struct ShPhotoWrapper<Photo: View, Overlay: View>: View {
    public var showTopScrim: Bool
    public var showBottomScrim: Bool
    private let photo: Photo
    private let overlay: Overlay

    /// - Parameters:
    ///   - showTopScrim: Figma "Show top scrim"
    ///   - showBottomScrim: Figma "Show bottom scrim"
    ///   - image: the photo, e.g. ShUserImage(member.photo)
    ///   - overlay: Figma "Show overlay": the sh-overlay drawn over the photo and scrims
    public init(showTopScrim: Bool = true, showBottomScrim: Bool = true,
                @ViewBuilder image: () -> Photo, @ViewBuilder overlay: () -> Overlay) {
        self.showTopScrim = showTopScrim; self.showBottomScrim = showBottomScrim
        self.photo = image(); self.overlay = overlay()
    }

    public var body: some View {
        ZStack {
            photo
                .frame(maxWidth: .infinity, maxHeight: .infinity)
            if showBottomScrim {
                // lower half: two equal flexible rows (no token: Figma 260 of 520)
                VStack(spacing: SH.Space.step0) {
                    Color.clear
                    SH.Gradient.overlayBottom.view
                }
                .allowsHitTesting(false)
            }
            if showTopScrim {
                VStack(spacing: SH.Space.step0) {
                    SH.Gradient.overlayTop.view
                        .frame(height: SH.Space.step24)        // no token: Figma height 24 is unbound; sh-space/24 matches
                    Spacer(minLength: SH.Space.step0)
                }
                .allowsHitTesting(false)
            }
            overlay
        }
        .clipShape(RoundedRectangle(cornerRadius: SH.Radius.none, style: .continuous))
    }
}

extension ShPhotoWrapper where Overlay == EmptyView {
    /// sh-photo-wrapper with "Show overlay" off (the Figma default).
    public init(showTopScrim: Bool = true, showBottomScrim: Bool = true, @ViewBuilder image: () -> Photo) {
        self.init(showTopScrim: showTopScrim, showBottomScrim: showBottomScrim, image: image, overlay: { EmptyView() })
    }
}

#Preview("sh-photo-wrapper") {
    HStack(spacing: SH.Space.step16) {
        ShPhotoWrapper {
            ShUserImage(requested: .female)
        }
        ShPhotoWrapper(showTopScrim: false, showBottomScrim: false) {
            ShUserImage(requested: .female)
        }
        ShPhotoWrapper {
            ShUserImage(requested: .female)
        } overlay: {
            ShOverlay(surface: .photo, type: .message, icon: "line/camera-off",
                      message: "She has shared Photos\nwith Premium Members",
                      action: ShOverlayAction(label: "Button Text", action: {}))
        }
    }
    .frame(height: SH.Space.step80 * 6 + SH.Space.step40)   // preview: Figma 520 tall
    .padding(SH.Space.step16)
}
