// Code Connect · sh-tag-profile → Jetpack Compose
// Implementation: ShTagProfile.kt (built on ShTag.kt)
// Publish: ./gradlew figmaCodeConnectPublish   (Code Connect Gradle plugin, FIGMA_ACCESS_TOKEN)

package com.shaadi.dna.components

import androidx.compose.runtime.Composable
import com.figma.code.connect.Figma
import com.figma.code.connect.FigmaConnect
import com.figma.code.connect.FigmaProperty
import com.figma.code.connect.FigmaType

@FigmaConnect(url = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2813-41954")
class ShTagProfileDoc {
    @FigmaProperty(FigmaType.Enum, "Type")
    val type: ShTagProfileType = Figma.mapping(
        "Online" to ShTagProfileType.Online,
        "You & Her" to ShTagProfileType.YouAndHer,
        "Astro" to ShTagProfileType.Astro,
        "Promoted" to ShTagProfileType.Promoted,
        "Top Profile" to ShTagProfileType.TopProfile,
        "Distance" to ShTagProfileType.Distance,
        "Offline" to ShTagProfileType.Offline,
    )

    @Composable
    fun ComponentExample() {
        ShTagProfile(type = type)        // Distance: ShTagProfile(ShTagProfileType.Distance, label = "2 km")
    }
}
