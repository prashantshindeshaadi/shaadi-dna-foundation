// Code Connect · sh-divider → Jetpack Compose
// Implementation: ShDivider.kt
// Publish: ./gradlew figmaCodeConnectPublish   (Code Connect Gradle plugin, FIGMA_ACCESS_TOKEN)

package com.shaadi.dna.components

import androidx.compose.runtime.Composable
import com.figma.code.connect.Figma
import com.figma.code.connect.FigmaConnect
import com.figma.code.connect.FigmaProperty
import com.figma.code.connect.FigmaType

@FigmaConnect(url = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=594-31711")
class ShDividerDoc {
    @FigmaProperty(FigmaType.Enum, "Orientation")
    val orientation: ShDividerOrientation = Figma.mapping(
        "Horizontal" to ShDividerOrientation.Horizontal,
        "Vertical" to ShDividerOrientation.Vertical,
    )

    @FigmaProperty(FigmaType.Enum, "Type")
    val type: ShDividerType = Figma.mapping(
        "Soft" to ShDividerType.Soft,
        "Default" to ShDividerType.Default,
        "Strong" to ShDividerType.Strong,
    )

    @Composable
    fun ComponentExample() {
        ShDivider(orientation = orientation, type = type)
    }
}
