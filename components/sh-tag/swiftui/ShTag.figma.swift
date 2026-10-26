// Code Connect · sh-tag → SwiftUI
// Implementation: ShTag.swift
// Publish: swift run figma-connect publish   (Code Connect Swift package, FIGMA_ACCESS_TOKEN)
//
// "Leading icon" / "Trailing icon" are instance swaps of sh-icon; the snippet shows the defaults
// (sh-icon/tag, sh-icon/arrow-right-01). Swap the icon name for the one picked in Figma.

import Figma
import SwiftUI

struct ShTag_doc: FigmaConnect {
    let component = ShTag.self
    let figmaNodeUrl = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2357-23671"

    @FigmaString("Label")
    var label: String = "Tag"

    @FigmaEnum("Mode", mapping: [
        "White": ShTagMode.white,
        "Dark": .dark,
        "Translucent light": .translucentLight,
        "Translucent dark": .translucentDark,
        "Strong": .strong,
    ])
    var mode: ShTagMode = .white

    @FigmaEnum("Size", mapping: [
        "Medium": ShTagSize.medium,
        "Small": .small,
    ])
    var size: ShTagSize = .medium

    @FigmaEnum("Shape", mapping: [
        "Rounded": ShTagShape.rounded,
        "Pill": .pill,
    ])
    var shape: ShTagShape = .rounded

    @FigmaBoolean("Show leading icon", mapping: [true: ShIconSpec("line/tag"), false: nil])
    var leadingIcon: ShIconSpec? = ShIconSpec("line/tag")

    @FigmaBoolean("Show trailing icon", mapping: [true: ShIconSpec("line/arrow-right-01"), false: nil])
    var trailingIcon: ShIconSpec? = nil

    @FigmaBoolean("Show border")
    var border: Bool = true

    /// Not wired to a layer in Figma yet; no visual change.
    @FigmaBoolean("Show outline")
    var outline: Bool = false

    var body: some View {
        ShTag(label, mode: mode, size: size, shape: shape,
              leadingIcon: leadingIcon, trailingIcon: trailingIcon,
              border: border, outline: outline)
    }
}
