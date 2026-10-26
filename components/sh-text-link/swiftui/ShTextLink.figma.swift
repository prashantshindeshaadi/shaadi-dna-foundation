// Code Connect · sh-text-link → SwiftUI
// Implementation: ShTextLink.swift
// Publish: swift run figma-connect publish   (Code Connect Swift package, FIGMA_ACCESS_TOKEN)
// "Leading icon" / "Trailing icon" instance swaps pick the glyphs: pass them as "<type>/<name>".
// State Focus is the interaction state: nothing to pass.

import Figma
import SwiftUI

struct ShTextLink_doc: FigmaConnect {
    let component = ShTextLink.self
    let figmaNodeUrl = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2348-22277"

    @FigmaEnum("Type", mapping: [
        "Neutral": ShTextLinkType.neutral,
        "Link": .link,
        "Inverse": .inverse,
        "Premium": .premium,
    ])
    var type: ShTextLinkType = .neutral

    @FigmaEnum("Size", mapping: [
        "Small": ShTextLinkSize.small,
        "Medium": .medium,
        "Large": .large,
    ])
    var size: ShTextLinkSize = .small

    @FigmaString("Label")
    var label: String = "Text"

    @FigmaBoolean("Show leading icon", mapping: [true: "line/arrow-left-01", false: nil])
    var leadingIcon: String? = "line/arrow-left-01"

    @FigmaBoolean("Show trailing icon", mapping: [true: "line/arrow-right-01", false: nil])
    var trailingIcon: String? = "line/arrow-right-01"

    @FigmaBoolean("Show border")
    var underline: Bool = true

    var body: some View {
        ShTextLink(
            label,
            type: type,
            size: size,
            leadingIcon: leadingIcon,
            trailingIcon: trailingIcon,
            underline: underline
        ) {
            // action
        }
    }
}
