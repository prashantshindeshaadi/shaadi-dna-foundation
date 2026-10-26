// Code Connect · sh-divider → SwiftUI
// Implementation: ShDivider.swift
// Publish: swift run figma-connect publish   (Code Connect Swift package, FIGMA_ACCESS_TOKEN)

import Figma
import SwiftUI

struct ShDivider_doc: FigmaConnect {
    let component = ShDivider.self
    let figmaNodeUrl = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=594-31711"

    @FigmaEnum("Orientation", mapping: [
        "Horizontal": ShDividerOrientation.horizontal,
        "Vertical": .vertical,
    ])
    var orientation: ShDividerOrientation = .horizontal

    @FigmaEnum("Type", mapping: [
        "Soft": ShDividerType.soft,
        "Default": .standard,
        "Strong": .strong,
    ])
    var type: ShDividerType = .soft

    var body: some View {
        ShDivider(orientation: orientation, type: type)
    }
}
