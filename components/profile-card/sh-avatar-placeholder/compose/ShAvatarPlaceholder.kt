// sh-avatar-placeholder — Jetpack Compose (no XML views)
// Spec: ../sh-avatar-placeholder.md · Figma node 2239:13257
//
// Gender × Aspect Ratio. The muted grey no-photo placeholder, used for No photo and Photo requested.
// Two layers, as in Figma: the Background gradient (token style) and the silhouette art.
//   1:1 / 4:5  ShGradient.placeholderAvatar() (the slice of the photo gradient behind the silhouette);
//              silhouette square fills the width, centred.
//   Full       ShGradient.placeholderPhoto(); silhouette 160, sh-space/40 from the top (room for an overlay below).
// Put the silhouette art in ../../sh-avatar-silhouette/assets/ in res/drawable-xxhdpi as
// R.drawable.sh_avatar_silhouette_female / sh_avatar_silhouette_male (@3x PNG, transparent).
// The composable is the Figma frame; size it with a width modifier. 1:1 → sh-radius/full, 4:5 and Full → sh-radius/none.
// Needs dist/android/values*/ in res/ and dist/android/compose/ShTokens.kt. Set `package` and the `R` import to your app's.

package com.shaadi.dna.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.dimensionResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import com.shaadi.dna.tokens.ShGradient
// import com.shaadi.app.R

/** Figma property "Gender". */
enum class ShAvatarPlaceholderGender { Male, Female }

/** Figma property "Aspect Ratio": Portrait = 4:5, Square = 1:1, Full = the full photo slot (360 × 520). */
enum class ShAvatarPlaceholderAspect { Portrait, Square, Full }

/** sh-avatar-placeholder: the no-photo silhouette (No photo and Photo requested). */
@Composable
fun ShAvatarPlaceholder(
    gender: ShAvatarPlaceholderGender = ShAvatarPlaceholderGender.Male,
    aspect: ShAvatarPlaceholderAspect = ShAvatarPlaceholderAspect.Portrait,
    modifier: Modifier = Modifier,
    /** Figma property "Show silhouette". Off = background only. */
    showSilhouette: Boolean = true,
) {
    val full = aspect == ShAvatarPlaceholderAspect.Full
    val ratio = when (aspect) {
        ShAvatarPlaceholderAspect.Square -> 1f
        ShAvatarPlaceholderAspect.Portrait -> 4f / 5f
        ShAvatarPlaceholderAspect.Full -> 360f / 520f
    }
    val radius = dimensionResource(if (aspect == ShAvatarPlaceholderAspect.Square) R.dimen.sh_radius_full else R.dimen.sh_radius_none)
    Box(
        modifier = modifier
            .aspectRatio(ratio)   // Figma frame 160 × 160 / 160 × 200 / 360 × 520
            .clip(RoundedCornerShape(radius))
            .background(if (full) ShGradient.placeholderPhoto() else ShGradient.placeholderAvatar())
            .semantics { contentDescription = "No photo" },
        contentAlignment = if (full) Alignment.TopCenter else Alignment.Center,
    ) {
        if (showSilhouette) {
            Image(
                painter = painterResource(
                    if (gender == ShAvatarPlaceholderGender.Male) R.drawable.sh_avatar_silhouette_male
                    else R.drawable.sh_avatar_silhouette_female,
                ),
                contentDescription = null,
                modifier = if (full) {
                    Modifier
                        .padding(top = dimensionResource(R.dimen.sh_space_40))
                        .size(dimensionResource(R.dimen.sh_space_80) * 2)   // no token: 160
                } else {
                    Modifier.fillMaxWidth().aspectRatio(1f)
                },
                contentScale = ContentScale.Fit,
            )
        }
    }
}
