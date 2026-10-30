// Code Connect · sh-photo-wrapper → Jetpack Compose
// Implementation: ShPhotoWrapper.kt
// Publish: ./gradlew figmaCodeConnectPublish   (Code Connect Gradle plugin, FIGMA_ACCESS_TOKEN)

package com.shaadi.dna.components

import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.painter.Painter
import com.figma.code.connect.FigmaConnect
import com.figma.code.connect.FigmaProperty
import com.figma.code.connect.FigmaType

@FigmaConnect(url = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2530-10330")
class ShPhotoWrapperDoc {
    @FigmaProperty(FigmaType.Boolean, "Show bottom scrim")
    val showBottomScrim: Boolean = true

    @FigmaProperty(FigmaType.Boolean, "Show top scrim")
    val showTopScrim: Boolean = true

    @FigmaProperty(FigmaType.Boolean, "Show overlay")
    val showOverlay: Boolean = false

    /** The member's photo, loaded by the app. */
    private val photo: Painter? = null

    @Composable
    fun ComponentExample() {
        ShPhotoWrapper(
            showTopScrim = showTopScrim,
            showBottomScrim = showBottomScrim,
            image = { ShUserImage(painter = photo, style = ShUserImageStyle.Normal) },
            overlay = if (showOverlay) {
                {
                    ShOverlay(
                        surface = ShOverlaySurface.Photo,
                        type = ShOverlayType.Message,
                        icon = R.drawable.sh_icon_line_camera_off,
                        message = "She has shared Photos with Premium Members",
                        action = ShOverlayAction("Button Text", onClick = { /* upgrade */ }),
                    )
                }
            } else {
                null
            },
        )
    }
}
