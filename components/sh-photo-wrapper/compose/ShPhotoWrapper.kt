// sh-photo-wrapper — Jetpack Compose (no XML views)
// Spec: ../sh-photo-wrapper.md · Figma node 2530:10330
//
// Profile photo + optional top and bottom scrims + optional overlay, layered as in Figma:
// Photo image (sh-user-images) → Bottom scrim → Top scrim → Overlay (sh-overlay, off by default).
//   Bottom scrim  sh-gradient/overlay/bottom, the lower half (Figma 260 of 520, pinned to the bottom)
//   Top scrim     sh-gradient/overlay/top, 24 tall, pinned to the top
// Takes the size its modifier gives it; corners sh-radius/none. Under an overlay that blurs (Message), keep the photo
// Style Normal: two background blurs must not stack. (Android draws no backdrop blur: see ShOverlay.kt.)
// Needs dist/android/values*/ in res/ and dist/android/compose/ShTokens.kt. Set `package` and the `R` import to your app's.

package com.shaadi.dna.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxScope
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.res.dimensionResource
import com.shaadi.dna.tokens.ShGradient
// import com.shaadi.app.R

/**
 * sh-photo-wrapper.
 *
 * @param showTopScrim Figma "Show top scrim"
 * @param showBottomScrim Figma "Show bottom scrim"
 * @param image the photo, e.g. `{ ShUserImage(painter = photo) }`
 * @param overlay Figma "Show overlay": the sh-overlay drawn over the photo and scrims (null = off, the Figma default)
 */
@Composable
fun ShPhotoWrapper(
    modifier: Modifier = Modifier,
    showTopScrim: Boolean = true,
    showBottomScrim: Boolean = true,
    image: @Composable BoxScope.() -> Unit,
    overlay: (@Composable BoxScope.() -> Unit)? = null,
) {
    Box(modifier.clip(RoundedCornerShape(dimensionResource(R.dimen.sh_radius_none)))) {
        image()
        if (showBottomScrim) {
            Box(Modifier.matchParentSize()) {
                Box(
                    Modifier
                        .align(Alignment.BottomCenter)
                        .fillMaxWidth()
                        .fillMaxHeight(0.5f)                                  // no token: Figma 260 of 520
                        .background(ShGradient.overlayBottom()),
                )
            }
        }
        if (showTopScrim) {
            Box(Modifier.matchParentSize()) {
                Box(
                    Modifier
                        .align(Alignment.TopCenter)
                        .fillMaxWidth()
                        .height(dimensionResource(R.dimen.sh_space_24))       // no token: Figma height 24 is unbound; sh-space/24 matches
                        .background(ShGradient.overlayTop()),
                )
            }
        }
        if (overlay != null) {
            Box(Modifier.matchParentSize()) { overlay() }
        }
    }
}
