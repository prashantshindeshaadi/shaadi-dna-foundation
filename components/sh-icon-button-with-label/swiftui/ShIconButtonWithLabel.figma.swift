// Code Connect · sh-icon-button-with-label → SwiftUI
// Implementation: ShIconButtonWithLabel.swift
// Publish: swift run figma-connect publish   (Code Connect Swift package, FIGMA_ACCESS_TOKEN)
// State Focus is the interaction state (the icon button shows the ring): nothing to pass.

import Figma
import SwiftUI

struct ShIconButtonWithLabel_doc: FigmaConnect {
    let component = ShIconButtonWithLabel.self
    let figmaNodeUrl = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2198-32247"

    @FigmaString("Label")
    var label: String = "Action 3"

    var body: some View {
        ShIconButtonWithLabel(label, icon: "line/plus") {   // swap for the action's icon
            // action
        }
    }
}
