// Code Connect · sh-tag → Jetpack Compose
// Implementation: ShTag.kt
// Publish: ./gradlew figmaCodeConnectPublish   (Code Connect Gradle plugin, FIGMA_ACCESS_TOKEN)
//
// "Leading icon" / "Trailing icon" are instance swaps of sh-icon; the snippet shows the defaults
// (sh-icon/tag, sh-icon/arrow-right-01). Swap the drawable for the one picked in Figma.

package com.shaadi.dna.components

import androidx.compose.runtime.Composable
import com.figma.code.connect.Figma
import com.figma.code.connect.FigmaConnect
import com.figma.code.connect.FigmaProperty
import com.figma.code.connect.FigmaType
// import com.shaadi.app.R

@FigmaConnect(url = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2357-23671")
class ShTagDoc {
    @FigmaProperty(FigmaType.Text, "Label")
    val label: String = "Tag"

    @FigmaProperty(FigmaType.Enum, "Mode")
    val mode: ShTagMode = Figma.mapping(
        "White" to ShTagMode.White,
        "Dark" to ShTagMode.Dark,
        "Translucent light" to ShTagMode.TranslucentLight,
        "Translucent dark" to ShTagMode.TranslucentDark,
        "Strong" to ShTagMode.Strong,
    )

    @FigmaProperty(FigmaType.Enum, "Size")
    val size: ShTagSize = Figma.mapping(
        "Medium" to ShTagSize.Medium,
        "Small" to ShTagSize.Small,
    )

    @FigmaProperty(FigmaType.Enum, "Shape")
    val shape: ShTagShape = Figma.mapping(
        "Rounded" to ShTagShape.Rounded,
        "Pill" to ShTagShape.Pill,
    )

    @FigmaProperty(FigmaType.Boolean, "Show leading icon")
    val leadingIcon: ShIconSpec? = Figma.mapping(
        true to ShIconSpec(R.drawable.sh_icon_line_tag),
        false to null,
    )

    @FigmaProperty(FigmaType.Boolean, "Show trailing icon")
    val trailingIcon: ShIconSpec? = Figma.mapping(
        true to ShIconSpec(R.drawable.sh_icon_line_arrow_right_01),
        false to null,
    )

    @FigmaProperty(FigmaType.Boolean, "Show border")
    val border: Boolean = true

    /** Not wired to a layer in Figma yet; no visual change. */
    @FigmaProperty(FigmaType.Boolean, "Show outline")
    val outline: Boolean = false

    @Composable
    fun ComponentExample() {
        ShTag(
            label = label,
            mode = mode,
            size = size,
            shape = shape,
            leadingIcon = leadingIcon,
            trailingIcon = trailingIcon,
            border = border,
            outline = outline,
        )
    }
}
