// sh-avatar-silhouette — Jetpack Compose (no XML views)
// Spec: ../sh-avatar-silhouette.md · Figma node 3598:69346
//
// Gender Female / Male. The no-photo silhouette art: white with soft edges on a transparent square,
// so it sits on any background (sh-avatar-placeholder puts it on the placeholder gradient).
// Put the art in ../assets/ in res/drawable-xxhdpi as R.drawable.sh_avatar_silhouette_female /
// sh_avatar_silhouette_male (@3x PNG, transparent). Size it with a modifier; it stays square.
// Set `package` and the `R` import to your app's.

package com.shaadi.dna.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
// import com.shaadi.app.R

/** Figma property "Gender". */
enum class ShAvatarSilhouetteGender { Female, Male }

/** sh-avatar-silhouette: the no-photo figure. Decorative; the parent says "No photo". */
@Composable
fun ShAvatarSilhouette(
    gender: ShAvatarSilhouetteGender = ShAvatarSilhouetteGender.Female,
    modifier: Modifier = Modifier,
) {
    Image(
        painter = painterResource(
            if (gender == ShAvatarSilhouetteGender.Male) R.drawable.sh_avatar_silhouette_male
            else R.drawable.sh_avatar_silhouette_female,
        ),
        contentDescription = null,
        modifier = modifier.aspectRatio(1f),
        contentScale = ContentScale.Fit,
    )
}
