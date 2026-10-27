// sh-user-images — Jetpack Compose (no XML views)
// Spec: ../sh-user-images.md · Figma node 2248:13619
//
// The member photo, cropped to fill its frame (Figma image fill "Fill"). Style Blur is the Figma "Blur" layer over
// the same photo, same size: a sh-gradient/translucent/dark/extra-soft wash + sh-background-blur/uniform/strong.
// Gender Female 1–21 / Male 1–6 are design-only sample photos: pass the member's photo.
// Gender Female requested / Male requested: put ../assets/requested-female.jpg and requested-male.jpg in res/drawable
// as sh_user_images_requested_female / sh_user_images_requested_male, then use ShUserImage(requested = …).
//
// Blur uses Modifier.blur, which draws only on Android 12 (API 31) and later. On older versions it is a no-op, so a
// locked photo would show sharp: there, pass a photo that is already blurred (e.g. blurred by the image server).
// Needs dist/android/values*/ in res/. Set `package` and the `R` import to your app's.

package com.shaadi.dna.components

import androidx.annotation.DrawableRes
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.BlurredEdgeTreatment
import androidx.compose.ui.draw.blur
import androidx.compose.ui.draw.clipToBounds
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.dimensionResource
import androidx.compose.ui.res.painterResource
import com.shaadi.dna.tokens.ShGradient
// import com.shaadi.app.R

/** Figma property "Style". */
enum class ShUserImageStyle { Normal, Blur }

/** The Photo requested portraits the app ships (Figma Gender "Female requested" / "Male requested"). */
enum class ShUserImageRequested(@DrawableRes val drawable: Int) {
    Female(R.drawable.sh_user_images_requested_female),
    Male(R.drawable.sh_user_images_requested_male),
}

/**
 * sh-user-images: a photo that fills its frame (crop), Style Normal or Blur.
 *
 * @param painter the member's photo. null leaves the frame empty.
 * @param style Normal, or Blur for locked, hidden or private photos.
 * @param alignment which part of the photo stays in frame when it is cropped (Figma crops member photos centred).
 */
@Composable
fun ShUserImage(
    painter: Painter?,
    modifier: Modifier = Modifier,
    style: ShUserImageStyle = ShUserImageStyle.Normal,
    alignment: Alignment = Alignment.Center,
) {
    val blur = style == ShUserImageStyle.Blur
    Box(modifier.fillMaxSize().clipToBounds()) {
        if (painter != null) {
            Image(
                painter = painter,
                contentDescription = null,                    // decorative: the card or screen names the member
                modifier = Modifier
                    .matchParentSize()
                    .then(
                        if (blur) {
                            // sh-background-blur/uniform/strong; Rectangle keeps the edges solid, the photo is not scaled
                            Modifier.blur(dimensionResource(R.dimen.sh_translucent_background_blur_strong), BlurredEdgeTreatment.Rectangle)
                        } else {
                            Modifier
                        },
                    ),
                alignment = alignment,
                contentScale = ContentScale.Crop,
            )
        }
        if (blur) {
            Box(Modifier.matchParentSize().background(ShGradient.translucentDarkExtraSoft()))   // the Blur layer's wash
        }
    }
}

/** Gender Female requested / Male requested: the requested portrait, full width and top-aligned as in Figma. */
@Composable
fun ShUserImage(
    requested: ShUserImageRequested,
    modifier: Modifier = Modifier,
    style: ShUserImageStyle = ShUserImageStyle.Normal,
) = ShUserImage(painterResource(requested.drawable), modifier, style, Alignment.TopCenter)
