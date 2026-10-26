// Code Connect · sh-avatar → SwiftUI
// Implementation: ShAvatar.swift
// Publish: swift run figma-connect publish   (Code Connect Swift package, FIGMA_ACCESS_TOKEN)

import Figma
import SwiftUI

struct ShAvatar_doc: FigmaConnect {
    let component = ShAvatar.self
    let figmaNodeUrl = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2486-15378"

    @FigmaEnum("Size", mapping: [
        "sm": ShAvatarSize.sm,
        "md": .md,
        "lg": .lg,
    ])
    var size: ShAvatarSize = .sm

    @FigmaEnum("Type", mapping: [
        "Image": ShAvatarType.image,
        "Initial": .initial,
        "Icon": .icon,
    ])
    var type: ShAvatarType = .image

    @FigmaString("Label")
    var initials: String = "SH"

    /// Figma "Icon" (instance swap): sh-avatar-glyph Male / Female → gender.
    private let gender: ShAvatarGlyphGender = .male

    /// The member's photo, loaded by the app (sample asset name).
    private let memberPhoto = Image("member-photo")

    var body: some View {
        ShAvatar(
            size: size,
            type: type,
            image: memberPhoto,        // Type Image
            initials: initials,        // Type Initial
            gender: gender             // Type Icon
        )
    }
}
