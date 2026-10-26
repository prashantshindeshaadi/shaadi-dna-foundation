// Code Connect · sh-mini-card → SwiftUI
// Implementation: ShMiniCard.swift
// Publish: swift run figma-connect publish   (Code Connect Swift package, FIGMA_ACCESS_TOKEN)
//
// Badge 1 / Badge 2 swaps: verified-badge ↔ premium-badge → the order of ShMiniCardBadge in `badges`.

import Figma
import SwiftUI

struct ShMiniCard_doc: FigmaConnect {
    let component = ShMiniCard.self
    let figmaNodeUrl = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2780-68360"

    @FigmaEnum("Type", mapping: [
        "Default": ShMiniCardType.standard,
        "No photo": .noPhoto,
    ])
    var type: ShMiniCardType = .standard

    @FigmaString("Name")
    var name: String = "Sneha P, 26"

    @FigmaBoolean("Show badge 1", mapping: [true: ShMiniCardBadge.verified, false: nil])
    var badge1: ShMiniCardBadge? = .verified

    @FigmaBoolean("Show badge 2", mapping: [true: ShMiniCardBadge.premium, false: nil])
    var badge2: ShMiniCardBadge? = .premium

    @FigmaBoolean("Show detail 1", mapping: [true: "5’6”", false: nil])
    var detail1: String? = "5’6”"

    @FigmaBoolean("Show detail 2", mapping: [true: "Kayastha", false: nil])
    var detail2: String? = "Kayastha"

    @FigmaBoolean("Show detail 3", mapping: [true: "Pune, MH", false: nil])
    var detail3: String? = "Pune, MH"

    /// The member's photo, loaded by the app (sample asset name).
    private let memberPhoto = Image("member-photo")

    var body: some View {
        ShMiniCard(
            type: type,
            name: name,
            photo: memberPhoto,                    // Type Default; No photo uses the requested portrait
            badges: [badge1, badge2].compactMap { $0 },
            details: [detail1, detail2, detail3].compactMap { $0 },
            action: ShMiniCardAction(label: "Connect Now", icon: "filled/check") {
                // connect
            }
        )
    }
}
