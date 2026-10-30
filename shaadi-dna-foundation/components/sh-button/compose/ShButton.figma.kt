// Code Connect · sh-button → Jetpack Compose
// Implementation: ShButton.kt
// Publish: ./gradlew figmaCodeConnectPublish   (Code Connect Gradle plugin, FIGMA_ACCESS_TOKEN)

package com.shaadi.dna.components

import androidx.compose.runtime.Composable
import com.figma.code.connect.Figma
import com.figma.code.connect.FigmaConnect
import com.figma.code.connect.FigmaProperty
import com.figma.code.connect.FigmaType
// import com.shaadi.app.R

@FigmaConnect(url = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=163-1301")
class ShButtonDoc {
    @FigmaProperty(FigmaType.Enum, "Type")
    val type: ShButtonType = Figma.mapping(
        "Primary" to ShButtonType.Primary,
        "Secondary" to ShButtonType.Secondary,
        "Tertiary" to ShButtonType.Tertiary,
        "Ghost" to ShButtonType.Ghost,
        "Premium Solid" to ShButtonType.PremiumSolid,
        "Premium Soft" to ShButtonType.PremiumSoft,
    )

    @FigmaProperty(FigmaType.Enum, "Size")
    val size: ShButtonSize = Figma.mapping(
        "Large" to ShButtonSize.Large,
        "Medium" to ShButtonSize.Medium,
        "Small" to ShButtonSize.Small,
    )

    // Hover, Pressed and Focus are interaction states; Disabled and Loading are parameters.
    @FigmaProperty(FigmaType.Enum, "State")
    val enabled: Boolean = Figma.mapping(
        "Default" to true,
        "Hover" to true,
        "Pressed" to true,
        "Disabled" to false,
        "Loading" to true,
        "Focus" to true,
    )

    @FigmaProperty(FigmaType.Enum, "State")
    val loading: Boolean = Figma.mapping(
        "Default" to false,
        "Hover" to false,
        "Pressed" to false,
        "Disabled" to false,
        "Loading" to true,
        "Focus" to false,
    )

    @FigmaProperty(FigmaType.Text, "Label")
    val label: String = "Button"

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

    @FigmaProperty(FigmaType.Boolean, "Show sublabel")
    val showSublabel: Boolean = false

    @FigmaProperty(FigmaType.Text, "Sublabel")
    val sublabelText: String = "Supporting text"

    @Composable
    fun ComponentExample() {
        ShButton(
            label = label,
            onClick = { /* action */ },
            type = type,
            size = size,
            leadingIcon = leadingIcon,          // swap for the design's icon, e.g. R.drawable.sh_icon_filled_check
            trailingIcon = trailingIcon,
            sublabel = if (showSublabel) sublabelText else null,
            enabled = enabled,
            loading = loading,
        )
    }
}
