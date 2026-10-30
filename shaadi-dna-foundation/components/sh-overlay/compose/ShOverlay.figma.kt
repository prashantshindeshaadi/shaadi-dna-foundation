// Code Connect · sh-overlay → Jetpack Compose
// Implementation: ShOverlay.kt
// One call shape covers every Surface × Type: parts a variant doesn't have are ignored
// (Message uses icon + message; No photo / Photo requested use title; Photo requested has no action).
// No photo / Photo requested: pass avatar (the member's gender) for the silhouette. Figma keeps the Status row hidden.
// Publish: ./gradlew figmaCodeConnectPublish   (Code Connect Gradle plugin, FIGMA_ACCESS_TOKEN)

package com.shaadi.dna.components

import androidx.compose.runtime.Composable
import com.figma.code.connect.Figma
import com.figma.code.connect.FigmaConnect
import com.figma.code.connect.FigmaProperty
import com.figma.code.connect.FigmaType
// import com.shaadi.app.R

@FigmaConnect(url = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2314-18393")
class ShOverlayDoc {
    @FigmaProperty(FigmaType.Enum, "Surface")
    val surface: ShOverlaySurface = Figma.mapping(
        "Photo" to ShOverlaySurface.Photo,
        "Content" to ShOverlaySurface.Content,
        "Photo full" to ShOverlaySurface.PhotoFull,
    )

    @FigmaProperty(FigmaType.Enum, "Type")
    val type: ShOverlayType = Figma.mapping(
        "Message" to ShOverlayType.Message,
        "No photo" to ShOverlayType.NoPhoto,
        "Photo requested" to ShOverlayType.PhotoRequested,
    )

    @FigmaProperty(FigmaType.Boolean, "Show icon")
    val showIcon: Boolean = true

    @FigmaProperty(FigmaType.Boolean, "Show message")
    val showMessage: Boolean = true

    @FigmaProperty(FigmaType.Boolean, "Show action")
    val showAction: Boolean = true

    @FigmaProperty(FigmaType.Text, "Message")
    val message: String = "She has shared Photos with Premium Members"

    @FigmaProperty(FigmaType.Text, "Title")
    val title: String = "Photo request sent"

    /** Figma "Icon" (instance swap): sh-icon/camera-off by default. */
    private val icon: Int = R.drawable.sh_icon_line_camera_off

    /** Figma "Action" (instance swap): sh-button Tertiary Small; the label is the button's own text. */
    private val actionLabel: String = "Button Text"

    @Composable
    fun ComponentExample() {
        ShOverlay(
            surface = surface,
            type = type,
            icon = icon,
            showIcon = showIcon,
            title = if (showMessage) title else null,
            message = if (showMessage) message else null,
            action = if (showAction) ShOverlayAction(actionLabel, onClick = { /* e.g. request a photo, upgrade */ }) else null,
        )
    }
}
