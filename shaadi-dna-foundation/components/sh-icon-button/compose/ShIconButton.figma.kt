// Code Connect · sh-icon-button → Jetpack Compose
// Implementation: ShIconButton.kt
// Publish: ./gradlew figmaCodeConnectPublish   (Code Connect Gradle plugin, FIGMA_ACCESS_TOKEN)
// The six "Icon (…)" instance swaps pick the glyph: pass it as `icon` (R.drawable.sh_icon_<type>_<name>).

package com.shaadi.dna.components

import androidx.compose.runtime.Composable
import com.figma.code.connect.Figma
import com.figma.code.connect.FigmaConnect
import com.figma.code.connect.FigmaProperty
import com.figma.code.connect.FigmaType
// import com.shaadi.app.R

@FigmaConnect(url = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=567-26954")
class ShIconButtonDoc {
    @FigmaProperty(FigmaType.Enum, "Type")
    val type: ShIconButtonType = Figma.mapping(
        "Primary" to ShIconButtonType.Primary,
        "Secondary" to ShIconButtonType.Secondary,
        "Tertiary" to ShIconButtonType.Tertiary,
        "Translucent" to ShIconButtonType.Translucent,
        "Ghost" to ShIconButtonType.Ghost,
    )

    @FigmaProperty(FigmaType.Enum, "Size")
    val size: ShIconButtonSize = Figma.mapping(
        "Large" to ShIconButtonSize.Large,
        "Medium" to ShIconButtonSize.Medium,
        "Small" to ShIconButtonSize.Small,
    )

    // Hover, Pressed and Focus are interaction states; Disabled is `enabled = false`.
    @FigmaProperty(FigmaType.Enum, "State")
    val enabled: Boolean = Figma.mapping(
        "Default" to true,
        "Hover" to true,
        "Pressed" to true,
        "Disabled" to false,
        "Focus" to true,
    )

    @FigmaProperty(FigmaType.Text, "Screen reader label")
    val label: String = "Action"

    @FigmaProperty(FigmaType.Boolean, "Show badge")
    val showBadge: Boolean = false

    @FigmaProperty(FigmaType.Text, "Badge")
    val badgeText: String = "2"

    @Composable
    fun ComponentExample() {
        ShIconButton(
            icon = R.drawable.sh_icon_line_plus,     // swap for the design's icon
            contentDescription = label,
            onClick = { /* action */ },
            type = type,
            size = size,
            badge = if (showBadge) badgeText else null,
            enabled = enabled,
        )
    }
}
