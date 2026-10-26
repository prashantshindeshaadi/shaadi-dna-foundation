// Code Connect · sh-button → SwiftUI
// Implementation: ShButton.swift
// Publish: swift run figma-connect publish   (Code Connect Swift package, FIGMA_ACCESS_TOKEN)

import Figma
import SwiftUI

struct ShButton_doc: FigmaConnect {
    let component = ShButton.self
    let figmaNodeUrl = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=163-1301"

    @FigmaEnum("Type", mapping: [
        "Primary": ShButtonType.primary,
        "Secondary": .secondary,
        "Tertiary": .tertiary,
        "Ghost": .ghost,
        "Premium Solid": .premiumSolid,
        "Premium Soft": .premiumSoft,
    ])
    var type: ShButtonType = .primary

    @FigmaEnum("Size", mapping: [
        "Large": ShButtonSize.large,
        "Medium": .medium,
        "Small": .small,
    ])
    var size: ShButtonSize = .large

    // Hover, Pressed and Focus are interaction states; Disabled and Loading are parameters.
    @FigmaEnum("State", mapping: [
        "Default": false, "Hover": false, "Pressed": false, "Disabled": true, "Loading": false, "Focus": false,
    ])
    var isDisabled: Bool = false

    @FigmaEnum("State", mapping: [
        "Default": false, "Hover": false, "Pressed": false, "Disabled": false, "Loading": true, "Focus": false,
    ])
    var isLoading: Bool = false

    @FigmaString("Label")
    var label: String = "Button"

    @FigmaBoolean("Show leading icon", mapping: [true: "line/arrow-left-01", false: nil])
    var leadingIcon: String? = "line/arrow-left-01"

    @FigmaBoolean("Show trailing icon", mapping: [true: "line/arrow-right-01", false: nil])
    var trailingIcon: String? = "line/arrow-right-01"

    @FigmaBoolean("Show sublabel")
    var showSublabel: Bool = false

    @FigmaString("Sublabel")
    var sublabelText: String = "Supporting text"

    var body: some View {
        ShButton(
            label,
            type: type,
            size: size,
            leadingIcon: leadingIcon,              // swap for the design's icon, e.g. "filled/check"
            trailingIcon: trailingIcon,
            sublabel: showSublabel ? sublabelText : nil,
            isLoading: isLoading
        ) {
            // action
        }
        .disabled(isDisabled)
    }
}
