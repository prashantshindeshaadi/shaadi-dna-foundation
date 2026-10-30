// Code Connect · sh-avatar-placeholder → Jetpack Compose
// Implementation: ShAvatarPlaceholder.kt
// Publish: ./gradlew figmaCodeConnectPublish   (Code Connect Gradle plugin, FIGMA_ACCESS_TOKEN)

package com.shaadi.dna.components

import androidx.compose.runtime.Composable
import com.figma.code.connect.Figma
import com.figma.code.connect.FigmaConnect
import com.figma.code.connect.FigmaProperty
import com.figma.code.connect.FigmaType

@FigmaConnect(url = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2239-13257")
class ShAvatarPlaceholderDoc {
    @FigmaProperty(FigmaType.Enum, "Gender")
    val gender: ShAvatarPlaceholderGender = Figma.mapping(
        "Male" to ShAvatarPlaceholderGender.Male,
        "Female" to ShAvatarPlaceholderGender.Female,
    )

    @FigmaProperty(FigmaType.Enum, "Aspect Ratio")
    val aspect: ShAvatarPlaceholderAspect = Figma.mapping(
        "4:5" to ShAvatarPlaceholderAspect.Portrait,
        "1:1" to ShAvatarPlaceholderAspect.Square,
        "Full" to ShAvatarPlaceholderAspect.Full,
    )

    @Composable
    fun ComponentExample() {
        ShAvatarPlaceholder(
            gender = gender,
            aspect = aspect,
        )
    }
}
