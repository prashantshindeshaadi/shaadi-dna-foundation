// Code Connect · sh-tag-profile → SwiftUI
// Implementation: ShTagProfile.swift (built on ShTag.swift)
// Publish: swift run figma-connect publish   (Code Connect Swift package, FIGMA_ACCESS_TOKEN)

import Figma
import SwiftUI

struct ShTagProfile_doc: FigmaConnect {
    let component = ShTagProfile.self
    let figmaNodeUrl = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2813-41954"

    @FigmaEnum("Type", mapping: [
        "Online": ShTagProfileType.online,
        "You & Her": .youAndHer,
        "Astro": .astro,
        "Promoted": .promoted,
        "Top Profile": .topProfile,
        "Distance": .distance,
        "Offline": .offline,
    ])
    var type: ShTagProfileType = .online

    var body: some View {
        ShTagProfile(type)               // Distance: ShTagProfile(.distance, label: "2 km")
    }
}
