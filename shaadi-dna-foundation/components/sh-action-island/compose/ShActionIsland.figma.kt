// Code Connect · sh-action-island → Jetpack Compose
// Implementation: ShActionIsland.kt
// Publish: ./gradlew figmaCodeConnectPublish   (Code Connect Gradle plugin, FIGMA_ACCESS_TOKEN)
//
// Pass only what the Type shows: message + primary (Message + …), status (Message only), primary (Primary only),
// secondary + primary (Secondary / Tertiary + primary), actions (Three actions). Labels and icons are the
// design's; the samples below are the Figma defaults.

package com.shaadi.dna.components

import androidx.compose.runtime.Composable
import com.figma.code.connect.Figma
import com.figma.code.connect.FigmaConnect
import com.figma.code.connect.FigmaProperty
import com.figma.code.connect.FigmaType
// import com.shaadi.app.R

@FigmaConnect(url = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2594-16928")
class ShActionIslandDoc {
    @FigmaProperty(FigmaType.Enum, "Type")
    val type: ShActionIslandType = Figma.mapping(
        "Message + primary" to ShActionIslandType.MessagePrimary,
        "Message + premium" to ShActionIslandType.MessagePremium,
        "Message + tertiary" to ShActionIslandType.MessageTertiary,
        "Message only" to ShActionIslandType.MessageOnly,
        "Primary only" to ShActionIslandType.PrimaryOnly,
        "Secondary + primary" to ShActionIslandType.SecondaryPrimary,
        "Tertiary + primary" to ShActionIslandType.TertiaryPrimary,
        "Three actions" to ShActionIslandType.ThreeActions,
    )

    @FigmaProperty(FigmaType.Enum, "Style")
    val style: ShActionIslandStyle = Figma.mapping(
        "Normal" to ShActionIslandStyle.Normal,
        "Floating" to ShActionIslandStyle.Floating,
    )

    @FigmaProperty(FigmaType.Boolean, "Show note")
    val showNote: Boolean = true

    @FigmaProperty(FigmaType.Text, "Message")
    val message: String = "Like this profile?"

    @FigmaProperty(FigmaType.Text, "Status")
    val status: String = "We’re reviewing your report"

    @Composable
    fun ComponentExample() {
        ShActionIsland(
            type = type,
            style = style,
            note = if (showNote) ({
                ShActionNote(
                    cta = ShActionNoteCTA.Edit,
                    message = "Hey Sneha, I came across your profile. It felt true to me.",
                    onClick = { /* edit the message */ },
                )
            }) else null,
            message = message,
            status = status,
            primary = ShIslandButton("Connect Now", R.drawable.sh_icon_filled_connect, onClick = { /* connect */ }),
            secondary = ShIslandButton("Shaadi Chat", R.drawable.sh_icon_line_chat_bubble, onClick = { /* chat */ }),
            actions = listOf(
                ShIslandAction("Shaadi Chat", R.drawable.sh_icon_line_chat_bubble) { /* chat */ },
                ShIslandAction("WhatsApp", R.drawable.sh_icon_line_whatsapp_02) { /* WhatsApp */ },
                ShIslandAction("Call", R.drawable.sh_icon_line_call) { /* call */ },
            ),
        )
    }
}
