// Code Connect · sh-avatar-silhouette → SwiftUI
// Implementation: ShAvatarSilhouette.swift
// Publish: swift run figma-connect publish   (Code Connect Swift package, FIGMA_ACCESS_TOKEN)

import Figma
import SwiftUI

struct ShAvatarSilhouette_doc: FigmaConnect {
    let component = ShAvatarSilhouette.self
    let figmaNodeUrl = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=3598-69346"

    @FigmaEnum("Gender", mapping: [
        "Female": ShAvatarSilhouetteGender.female,
        "Male": .male,
    ])
    var gender: ShAvatarSilhouetteGender = .female

    var body: some View {
        ShAvatarSilhouette(gender: gender)
    }
}
