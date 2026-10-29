// sh-avatar-placeholder — Jetpack Compose (no XML views)
// Spec: ../sh-avatar-placeholder.md · Figma node 2239:13257
//
// Gender × Aspect Ratio. The muted grey no-photo silhouette, used for No photo and Photo requested.
// Put the artwork in ../assets/ in res/drawable-xxhdpi as R.drawable.sh_avatar_placeholder_<file name>:
//   sh_avatar_placeholder_female_4x5, _female_1x1, _female_full, _male_4x5, _male_1x1, _male_full   (@3x JPG, crop baked in)
// The composable is the Figma frame (4:5, 1:1 or Full); size it with a width modifier. The art fills it and is clipped:
// 1:1 → sh-radius/full, 4:5 and Full → sh-radius/none. Full = the whole photo slot (360 × 520): the silhouette sits
// near the top so an overlay title and button fit below it (sh-overlay No photo / Photo requested).
// Needs dist/android/values*/ in res/. Set `package` and the `R` import to your app's.

package com.shaadi.dna.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.dimensionResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
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
) {
    val square = aspect == ShAvatarPlaceholderAspect.Square
    val drawable = when (gender) {
        ShAvatarPlaceholderGender.Male -> when (aspect) {
            ShAvatarPlaceholderAspect.Square -> R.drawable.sh_avatar_placeholder_male_1x1
            ShAvatarPlaceholderAspect.Portrait -> R.drawable.sh_avatar_placeholder_male_4x5
            ShAvatarPlaceholderAspect.Full -> R.drawable.sh_avatar_placeholder_male_full
        }
        ShAvatarPlaceholderGender.Female -> when (aspect) {
            ShAvatarPlaceholderAspect.Square -> R.drawable.sh_avatar_placeholder_female_1x1
            ShAvatarPlaceholderAspect.Portrait -> R.drawable.sh_avatar_placeholder_female_4x5
            ShAvatarPlaceholderAspect.Full -> R.drawable.sh_avatar_placeholder_female_full
        }
    }
    val ratio = when (aspect) {
        ShAvatarPlaceholderAspect.Square -> 1f
        ShAvatarPlaceholderAspect.Portrait -> 4f / 5f
        ShAvatarPlaceholderAspect.Full -> 360f / 520f
    }
    val radius = dimensionResource(if (square) R.dimen.sh_radius_full else R.dimen.sh_radius_none)
    Image(
        painter = painterResource(drawable),
        contentDescription = null,
        modifier = modifier
            .aspectRatio(if (square) 1f else 4f / 5f)   // Figma frame 160 × 160 / 160 × 200
            .clip(RoundedCornerShape(radius))
            .semantics { contentDescription = "No photo" },
        contentScale = ContentScale.Crop,
    )
}
