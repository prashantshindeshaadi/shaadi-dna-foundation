// Code Connect · sh-action-note → Jetpack Compose
// Implementation: ShActionNote.kt
// Publish: ./gradlew figmaCodeConnectPublish   (Code Connect Gradle plugin, FIGMA_ACCESS_TOKEN)
//
// Link slot: the link follows CTA and Style (Edit → sh-text-link Inverse / Neutral, Upgrade → Premium
// "Upgrade Now"); pass linkLabel only to change its text.

package com.shaadi.dna.components

import androidx.compose.runtime.Composable
import com.figma.code.connect.Figma
import com.figma.code.connect.FigmaConnect
import com.figma.code.connect.FigmaProperty
import com.figma.code.connect.FigmaType

@FigmaConnect(url = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2594-16750")
class ShActionNoteDoc {
    @FigmaProperty(FigmaType.Enum, "CTA")
    val cta: ShActionNoteCTA = Figma.mapping(
        "Edit" to ShActionNoteCTA.Edit,
        "Upgrade" to ShActionNoteCTA.Upgrade,
    )

    @FigmaProperty(FigmaType.Enum, "Style")
    val style: ShActionNoteStyle = Figma.mapping(
        "Normal" to ShActionNoteStyle.Normal,
        "Floating" to ShActionNoteStyle.Floating,
    )

    @FigmaProperty(FigmaType.Text, "Message")
    val message: String = "Hey Sneha, I came across your profile. It felt true to me."

    @FigmaProperty(FigmaType.Text, "Action text")
    val actionText: String = "To contact her directly"

    @Composable
    fun ComponentExample() {
        ShActionNote(
            cta = cta,
            style = style,
            message = message,
            actionText = actionText,
            onClick = { /* Edit: open the message editor · Upgrade: open plans */ },
        )
    }
}
