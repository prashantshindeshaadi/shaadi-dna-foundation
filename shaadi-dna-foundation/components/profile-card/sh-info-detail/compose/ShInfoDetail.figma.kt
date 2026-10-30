// Code Connect · sh-info-detail → Jetpack Compose
// Implementation: ShInfoDetail.kt (also has ShInfoDetailRow for a wrapping row of facts)
// Publish: ./gradlew figmaCodeConnectPublish   (Code Connect Gradle plugin, FIGMA_ACCESS_TOKEN)

package com.shaadi.dna.components

import androidx.compose.runtime.Composable
import com.figma.code.connect.Figma
import com.figma.code.connect.FigmaConnect
import com.figma.code.connect.FigmaProperty
import com.figma.code.connect.FigmaType

@FigmaConnect(url = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2825-43215")
class ShInfoDetailDoc {
    @FigmaProperty(FigmaType.Text, "Label")
    val label: String = "Detail"

    @FigmaProperty(FigmaType.Boolean, "Show separator")
    val separator: Boolean = true

    @FigmaProperty(FigmaType.Enum, "Mode")
    val mode: ShInfoDetailMode = Figma.mapping(
        "On image" to ShInfoDetailMode.OnImage,
        "Default" to ShInfoDetailMode.Default,
    )

    @FigmaProperty(FigmaType.Enum, "Size")
    val size: ShInfoDetailSize = Figma.mapping(
        "Medium" to ShInfoDetailSize.Medium,
        "Small" to ShInfoDetailSize.Small,
    )

    @Composable
    fun ComponentExample() {
        // A row of facts: ShInfoDetailRow(listOf("5′ 6″", "Kashmiri Pandit"), mode = mode, size = size)
        ShInfoDetail(label = label, mode = mode, size = size, separator = separator)
    }
}
