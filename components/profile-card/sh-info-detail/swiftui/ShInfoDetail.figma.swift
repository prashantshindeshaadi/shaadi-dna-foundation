// Code Connect · sh-info-detail → SwiftUI
// Implementation: ShInfoDetail.swift (also has ShInfoDetailRow for a wrapping row of facts)
// Publish: swift run figma-connect publish   (Code Connect Swift package, FIGMA_ACCESS_TOKEN)

import Figma
import SwiftUI

struct ShInfoDetail_doc: FigmaConnect {
    let component = ShInfoDetail.self
    let figmaNodeUrl = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2825-43215"

    @FigmaString("Label")
    var label: String = "Detail"

    @FigmaBoolean("Show separator")
    var separator: Bool = true

    @FigmaEnum("Mode", mapping: [
        "On image": ShInfoDetailMode.onImage,
        "Default": .standard,
    ])
    var mode: ShInfoDetailMode = .onImage

    @FigmaEnum("Size", mapping: [
        "Medium": ShInfoDetailSize.medium,
        "Small": .small,
    ])
    var size: ShInfoDetailSize = .medium

    var body: some View {
        // A row of facts: ShInfoDetailRow(["5′ 6″", "Kashmiri Pandit"], mode: mode, size: size)
        ShInfoDetail(label, mode: mode, size: size, separator: separator)
    }
}
