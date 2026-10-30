// Code Connect · sh-overlay → SwiftUI
// Implementation: ShOverlay.swift
// One call shape covers every Surface × Type: parts a variant doesn't have are ignored
// (Message uses icon + message; No photo / Photo requested use title; Photo requested has no action).
// No photo / Photo requested: pass avatar (the member's gender) for the silhouette. Figma keeps the Status row hidden.
// Publish: swift run figma-connect publish   (Code Connect Swift package, FIGMA_ACCESS_TOKEN)

import Figma
import SwiftUI

struct ShOverlay_doc: FigmaConnect {
    let component = ShOverlay.self
    let figmaNodeUrl = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2314-18393"

    @FigmaEnum("Surface", mapping: [
        "Photo": ShOverlaySurface.photo,
        "Content": .content,
        "Photo full": .photoFull,
    ])
    var surface: ShOverlaySurface = .photo

    @FigmaEnum("Type", mapping: [
        "Message": ShOverlayType.message,
        "No photo": .noPhoto,
        "Photo requested": .photoRequested,
    ])
    var type: ShOverlayType = .message

    @FigmaBoolean("Show icon")
    var showIcon: Bool = true

    @FigmaBoolean("Show message")
    var showMessage: Bool = true

    @FigmaBoolean("Show action")
    var showAction: Bool = true

    @FigmaString("Message")
    var message: String = "She has shared Photos with Premium Members"

    @FigmaString("Title")
    var title: String = "Photo request sent"

    /// Figma "Icon" (instance swap): sh-icon/camera-off by default.
    private let icon = "line/camera-off"
    /// Figma "Action" (instance swap): sh-button Tertiary Small; the label is the button's own text.
    private let actionLabel = "Button Text"

    var body: some View {
        ShOverlay(
            surface: surface,
            type: type,
            icon: icon,
            title: showMessage ? title : nil,
            message: showMessage ? message : nil,
            action: showAction ? ShOverlayAction(label: actionLabel, action: { /* e.g. request a photo, upgrade */ }) : nil,
            showIcon: showIcon
        )
    }
}
