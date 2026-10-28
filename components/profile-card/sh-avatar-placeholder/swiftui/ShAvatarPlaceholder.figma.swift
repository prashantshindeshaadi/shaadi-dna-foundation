// Code Connect · sh-avatar-placeholder → SwiftUI
// Implementation: ShAvatarPlaceholder.swift
// Publish: swift run figma-connect publish   (Code Connect Swift package, FIGMA_ACCESS_TOKEN)

import Figma
import SwiftUI

struct ShAvatarPlaceholder_doc: FigmaConnect {
    let component = ShAvatarPlaceholder.self
    let figmaNodeUrl = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2239-13257"

    @FigmaEnum("Gender", mapping: [
        "Male": ShAvatarPlaceholderGender.male,
        "Female": .female,
    ])
    var gender: ShAvatarPlaceholderGender = .male

    @FigmaEnum("Aspect Ratio", mapping: [
        "4:5": ShAvatarPlaceholderAspect.portrait,
        "1:1": .square,
    ])
    var aspect: ShAvatarPlaceholderAspect = .portrait

    var body: some View {
        ShAvatarPlaceholder(gender: gender, aspect: aspect)
    }
}
