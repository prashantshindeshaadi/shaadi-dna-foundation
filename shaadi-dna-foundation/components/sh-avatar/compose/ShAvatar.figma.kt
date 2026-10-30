// Code Connect · sh-avatar → Jetpack Compose
// Implementation: ShAvatar.kt
// Publish: ./gradlew figmaCodeConnectPublish   (Code Connect Gradle plugin, FIGMA_ACCESS_TOKEN)

package com.shaadi.dna.components

import androidx.compose.runtime.Composable
import androidx.compose.ui.res.painterResource
import com.figma.code.connect.Figma
import com.figma.code.connect.FigmaConnect
import com.figma.code.connect.FigmaProperty
import com.figma.code.connect.FigmaType
// import com.shaadi.app.R

@FigmaConnect(url = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2486-15378")
class ShAvatarDoc {
    @FigmaProperty(FigmaType.Enum, "Size")
    val size: ShAvatarSize = Figma.mapping(
        "sm" to ShAvatarSize.Sm,
        "md" to ShAvatarSize.Md,
        "lg" to ShAvatarSize.Lg,
    )

    @FigmaProperty(FigmaType.Enum, "Type")
    val type: ShAvatarType = Figma.mapping(
        "Image" to ShAvatarType.Image,
        "Initial" to ShAvatarType.Initial,
        "Icon" to ShAvatarType.Icon,
    )

    @FigmaProperty(FigmaType.Text, "Label")
    val initials: String = "SH"

    // Figma "Icon" (instance swap): sh-avatar-glyph Male / Female → gender.
    private val gender: ShAvatarGlyphGender = ShAvatarGlyphGender.Male

    /** The member's photo, loaded by the app (sample drawable name). */
    private val memberPhoto: Int = R.drawable.member_photo

    @Composable
    fun ComponentExample() {
        ShAvatar(
            size = size,
            type = type,
            painter = painterResource(memberPhoto),   // Type Image
            initials = initials,                      // Type Initial
            gender = gender,                          // Type Icon
        )
    }
}
