// Code Connect · sh-icon-button → SwiftUI
// Implementation: ShIconButton.swift
// Publish: swift run figma-connect publish   (Code Connect Swift package, FIGMA_ACCESS_TOKEN)
// The six "Icon (…)" instance swaps pick the glyph: pass it as `icon` ("<type>/<name>").

import Figma
import SwiftUI

struct ShIconButton_doc: FigmaConnect {
    let component = ShIconButton.self
    let figmaNodeUrl = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=567-26954"

    @FigmaEnum("Type", mapping: [
        "Primary": ShIconButtonType.primary,
        "Secondary": .secondary,
        "Tertiary": .tertiary,
        "Translucent": .translucent,
        "Ghost": .ghost,
    ])
    var type: ShIconButtonType = .primary

    @FigmaEnum("Size", mapping: [
        "Large": ShIconButtonSize.large,
        "Medium": .medium,
        "Small": .small,
    ])
    var size: ShIconButtonSize = .large

    // Hover, Pressed and Focus are interaction states; Disabled is .disabled(true).
    @FigmaEnum("State", mapping: [
        "Default": false, "Hover": false, "Pressed": false, "Disabled": true, "Focus": false,
    ])
    var isDisabled: Bool = false

    @FigmaString("Screen reader label")
    var label: String = "Action"

    @FigmaBoolean("Show badge")
    var showBadge: Bool = false

    @FigmaString("Badge")
    var badgeText: String = "2"

    var body: some View {
        ShIconButton(
            icon: "line/plus",                    // swap for the design's icon
            label: label,
            type: type,
            size: size,
            badge: showBadge ? badgeText : nil
        ) {
            // action
        }
        .disabled(isDisabled)
    }
}
