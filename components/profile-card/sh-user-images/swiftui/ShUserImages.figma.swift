// Code Connect · sh-user-images → SwiftUI
// Implementation: ShUserImages.swift
// Female 1–21 / Male 1–6 are design-only sample photos: the app passes the member's photo (Image("member-photo") below).
// Publish: swift run figma-connect publish   (Code Connect Swift package, FIGMA_ACCESS_TOKEN)

import Figma
import SwiftUI

struct ShUserImage_doc: FigmaConnect {
    let component = ShUserImage.self
    let figmaNodeUrl = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2248-13619"

    @FigmaEnum("Gender", mapping: [
        "Female 1": Image("member-photo"),
        "Female 2": Image("member-photo"),
        "Female 3": Image("member-photo"),
        "Female 4": Image("member-photo"),
        "Female 5": Image("member-photo"),
        "Female 6": Image("member-photo"),
        "Female 7": Image("member-photo"),
        "Female 8": Image("member-photo"),
        "Female 9": Image("member-photo"),
        "Female 10": Image("member-photo"),
        "Female 11": Image("member-photo"),
        "Female 12": Image("member-photo"),
        "Female 13": Image("member-photo"),
        "Female 14": Image("member-photo"),
        "Female 15": Image("member-photo"),
        "Female 16": Image("member-photo"),
        "Female 17": Image("member-photo"),
        "Female 18": Image("member-photo"),
        "Female 19": Image("member-photo"),
        "Female 20": Image("member-photo"),
        "Female 21": Image("member-photo"),
        "Male 1": Image("member-photo"),
        "Male 2": Image("member-photo"),
        "Male 3": Image("member-photo"),
        "Male 4": Image("member-photo"),
        "Male 5": Image("member-photo"),
        "Male 6": Image("member-photo"),
    ])
    var photo: Image = Image("member-photo")

    @FigmaEnum("Gender", mapping: [
        "Female 1": Alignment.center,
        "Female 2": Alignment.center,
        "Female 3": Alignment.center,
        "Female 4": Alignment.center,
        "Female 5": Alignment.center,
        "Female 6": Alignment.center,
        "Female 7": Alignment.center,
        "Female 8": Alignment.center,
        "Female 9": Alignment.center,
        "Female 10": Alignment.center,
        "Female 11": Alignment.center,
        "Female 12": Alignment.center,
        "Female 13": Alignment.center,
        "Female 14": Alignment.center,
        "Female 15": Alignment.center,
        "Female 16": Alignment.center,
        "Female 17": Alignment.center,
        "Female 18": Alignment.center,
        "Female 19": Alignment.center,
        "Female 20": Alignment.center,
        "Female 21": Alignment.center,
        "Male 1": Alignment.center,
        "Male 2": Alignment.center,
        "Male 3": Alignment.center,
        "Male 4": Alignment.center,
        "Male 5": Alignment.center,
        "Male 6": Alignment.center,
    ])
    var alignment: Alignment = .center

    @FigmaEnum("Style", mapping: [
        "Normal": ShUserImageStyle.normal,
        "Blur": .blur,
    ])
    var style: ShUserImageStyle = .normal

    var body: some View {
        ShUserImage(photo, style: style, alignment: alignment)
    }
}
