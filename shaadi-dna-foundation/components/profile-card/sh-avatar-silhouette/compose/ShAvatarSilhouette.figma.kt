// Code Connect · sh-avatar-silhouette → Jetpack Compose
// Implementation: ShAvatarSilhouette.kt
// Publish: ./gradlew figmaCodeConnectPublish   (Code Connect Gradle plugin, FIGMA_ACCESS_TOKEN)

package com.shaadi.dna.components

import androidx.compose.runtime.Composable
import com.figma.code.connect.Figma
import com.figma.code.connect.FigmaConnect
import com.figma.code.connect.FigmaProperty
import com.figma.code.connect.FigmaType

@FigmaConnect(url = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=3598-69346")
class ShAvatarSilhouetteDoc {
    @FigmaProperty(FigmaType.Enum, "Gender")
    val gender: ShAvatarSilhouetteGender = Figma.mapping(
        "Female" to ShAvatarSilhouetteGender.Female,
        "Male" to ShAvatarSilhouetteGender.Male,
    )

    @Composable
    fun ComponentExample() {
        ShAvatarSilhouette(gender = gender)
    }
}
