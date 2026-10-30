// Code Connect · sh-icon-button-with-label → Jetpack Compose
// Implementation: ShIconButtonWithLabel.kt
// Publish: ./gradlew figmaCodeConnectPublish   (Code Connect Gradle plugin, FIGMA_ACCESS_TOKEN)
// State Focus is the interaction state (the icon button shows the ring): nothing to pass.

package com.shaadi.dna.components

import androidx.compose.runtime.Composable
import com.figma.code.connect.FigmaConnect
import com.figma.code.connect.FigmaProperty
import com.figma.code.connect.FigmaType
// import com.shaadi.app.R

@FigmaConnect(url = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2198-32247")
class ShIconButtonWithLabelDoc {
    @FigmaProperty(FigmaType.Text, "Label")
    val label: String = "Action 3"

    @Composable
    fun ComponentExample() {
        ShIconButtonWithLabel(
            label = label,
            icon = R.drawable.sh_icon_line_plus,     // swap for the action's icon
            onClick = { /* action */ },
        )
    }
}
