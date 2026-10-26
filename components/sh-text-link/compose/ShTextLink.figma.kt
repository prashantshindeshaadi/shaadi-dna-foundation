// Code Connect · sh-text-link → Jetpack Compose
// Implementation: ShTextLink.kt
// Publish: ./gradlew figmaCodeConnectPublish   (Code Connect Gradle plugin, FIGMA_ACCESS_TOKEN)
// "Leading icon" / "Trailing icon" instance swaps pick the glyphs: pass them as drawables.
// State Focus is the interaction state: nothing to pass.

package com.shaadi.dna.components

import androidx.compose.runtime.Composable
import com.figma.code.connect.Figma
import com.figma.code.connect.FigmaConnect
import com.figma.code.connect.FigmaProperty
import com.figma.code.connect.FigmaType
// import com.shaadi.app.R

@FigmaConnect(url = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2348-22277")
class ShTextLinkDoc {
    @FigmaProperty(FigmaType.Enum, "Type")
    val type: ShTextLinkType = Figma.mapping(
        "Neutral" to ShTextLinkType.Neutral,
        "Link" to ShTextLinkType.Link,
        "Inverse" to ShTextLinkType.Inverse,
        "Premium" to ShTextLinkType.Premium,
    )

    @FigmaProperty(FigmaType.Enum, "Size")
    val size: ShTextLinkSize = Figma.mapping(
        "Small" to ShTextLinkSize.Small,
        "Medium" to ShTextLinkSize.Medium,
        "Large" to ShTextLinkSize.Large,
    )

    @FigmaProperty(FigmaType.Text, "Label")
    val label: String = "Text"

    @FigmaProperty(FigmaType.Boolean, "Show leading icon")
    val leadingIcon: Int? = Figma.mapping(
        true to R.drawable.sh_icon_line_arrow_left_01,
        false to null,
    )

    @FigmaProperty(FigmaType.Boolean, "Show trailing icon")
    val trailingIcon: Int? = Figma.mapping(
        true to R.drawable.sh_icon_line_arrow_right_01,
        false to null,
    )

    @FigmaProperty(FigmaType.Boolean, "Show border")
    val underline: Boolean = true

    @Composable
    fun ComponentExample() {
        ShTextLink(
            label = label,
            onClick = { /* action */ },
            type = type,
            size = size,
            leadingIcon = leadingIcon,
            trailingIcon = trailingIcon,
            underline = underline,
        )
    }
}
