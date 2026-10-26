// Code Connect · sh-photo-wrapper → SwiftUI
// Implementation: ShPhotoWrapper.swift
// Publish: swift run figma-connect publish   (Code Connect Swift package, FIGMA_ACCESS_TOKEN)

import Figma
import SwiftUI

struct ShPhotoWrapper_doc: FigmaConnect {
    let component = ShPhotoWrapper<ShUserImage, ShOverlay>.self
    let figmaNodeUrl = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2530-10330"

    @FigmaBoolean("Show bottom scrim")
    var showBottomScrim: Bool = true

    @FigmaBoolean("Show top scrim")
    var showTopScrim: Bool = true

    @FigmaBoolean("Show overlay")
    var showOverlay: Bool = false

    /// The member's photo, loaded by the app.
    private let photo: Image? = nil

    var body: some View {
        ShPhotoWrapper(showTopScrim: showTopScrim, showBottomScrim: showBottomScrim) {
            ShUserImage(photo, style: .normal)
        } overlay: {
            if showOverlay {
                ShOverlay(surface: .photo, type: .message, icon: "line/camera-off",
                          message: "She has shared Photos with Premium Members",
                          action: ShOverlayAction(label: "Button Text", action: { /* upgrade */ }))
            }
        }
    }
}
