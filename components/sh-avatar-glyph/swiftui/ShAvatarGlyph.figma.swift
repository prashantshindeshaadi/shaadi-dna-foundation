// Code Connect · sh-avatar-glyph → SwiftUI
// Implementation: ShAvatarGlyph.swift
// Publish: swift run figma-connect publish   (Code Connect Swift package, FIGMA_ACCESS_TOKEN)

import Figma
import SwiftUI

struct ShAvatarGlyph_doc: FigmaConnect {
    let component = ShAvatarGlyph.self
    let figmaNodeUrl = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2644-42085"

    @FigmaEnum("Gender", mapping: [
        "Male": ShAvatarGlyphGender.male,
        "Female": .female,
    ])
    var gender: ShAvatarGlyphGender = .male

    @FigmaEnum("Size", mapping: [
        "16": ShAvatarGlyphSize.s16,
        "24": .s24,
        "40": .s40,
    ])
    var size: ShAvatarGlyphSize = .s16

    var body: some View {
        // Paint defaults to icon/primary; inside sh-avatar it is icon/secondary (ShAvatar does this).
        ShAvatarGlyph(gender: gender, size: size)
    }
}
