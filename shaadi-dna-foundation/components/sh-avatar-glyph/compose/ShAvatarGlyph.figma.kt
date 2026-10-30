// Code Connect · sh-avatar-glyph → Jetpack Compose
// Implementation: ShAvatarGlyph.kt
// Publish: ./gradlew figmaCodeConnectPublish   (Code Connect Gradle plugin, FIGMA_ACCESS_TOKEN)

package com.shaadi.dna.components

import androidx.compose.runtime.Composable
import com.figma.code.connect.Figma
import com.figma.code.connect.FigmaConnect
import com.figma.code.connect.FigmaProperty
import com.figma.code.connect.FigmaType

@FigmaConnect(url = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2644-42085")
class ShAvatarGlyphDoc {
    @FigmaProperty(FigmaType.Enum, "Gender")
    val gender: ShAvatarGlyphGender = Figma.mapping(
        "Male" to ShAvatarGlyphGender.Male,
        "Female" to ShAvatarGlyphGender.Female,
    )

    @FigmaProperty(FigmaType.Enum, "Size")
    val size: ShAvatarGlyphSize = Figma.mapping(
        "16" to ShAvatarGlyphSize.S16,
        "24" to ShAvatarGlyphSize.S24,
        "40" to ShAvatarGlyphSize.S40,
    )

    @Composable
    fun ComponentExample() {
        // Paint defaults to icon/primary; inside sh-avatar it is icon/secondary (ShAvatar does this).
        ShAvatarGlyph(gender = gender, size = size)
    }
}
