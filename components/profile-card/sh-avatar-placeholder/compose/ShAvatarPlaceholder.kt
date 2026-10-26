// sh-avatar-placeholder — Jetpack Compose (no XML views)
// Spec: ../sh-avatar-placeholder.md · Figma node 2239:13257
//
// Gender × Aspect Ratio. Put the artwork in ../assets/ in res/ as R.drawable.sh_avatar_placeholder_<file name>:
//   silhouettes  sh_avatar_placeholder_female_4x5, _female_1x1, _male_4x5, _male_1x1
//                (SVG imported as a vector drawable, or the @3x PNG in drawable-xxhdpi)
//   portraits    sh_avatar_placeholder_female_requested_4x5, _female_requested_1x1, _male_requested_4x5,
//                _male_requested_1x1   (@3x JPG in drawable-xxhdpi)
// The composable is the Figma frame (4:5 or 1:1); size it with a width modifier. The silhouettes overflow their frame
// (Figma: clip off, no fill), so the art is drawn at its exported size from the frame's top-left and is not clipped.
// Radius: 1:1 → sh-radius/full, 4:5 → sh-radius/none. Only the requested portraits have a fill, so only they are clipped.
// Needs dist/android/values*/ in res/. Set `package` and the `R` import to your app's.

package com.shaadi.dna.components

import androidx.annotation.DrawableRes
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentSize
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
// import com.shaadi.app.R

/** Figma property "Gender". */
enum class ShAvatarPlaceholderGender { Male, Female, FemaleRequested, MaleRequested }

/** Figma property "Aspect Ratio": Portrait = 4:5, Square = 1:1. */
enum class ShAvatarPlaceholderAspect { Portrait, Square }

/** sh-avatar-placeholder: the no-photo silhouette or the Photo requested portrait. */
@Composable
fun ShAvatarPlaceholder(
    gender: ShAvatarPlaceholderGender = ShAvatarPlaceholderGender.Male,
    aspect: ShAvatarPlaceholderAspect = ShAvatarPlaceholderAspect.Portrait,
    modifier: Modifier = Modifier,
) {
    val art = shAvatarPlaceholderArt(gender, aspect)
    val requested = gender == ShAvatarPlaceholderGender.FemaleRequested || gender == ShAvatarPlaceholderGender.MaleRequested
    val radius = dimensionResource(if (aspect == ShAvatarPlaceholderAspect.Square) R.dimen.sh_radius_full else R.dimen.sh_radius_none)
    BoxWithConstraints(
        modifier
            .aspectRatio(if (aspect == ShAvatarPlaceholderAspect.Portrait) 4f / 5f else 1f)   // Figma frame 160 × 200 / 160 × 160
            .then(if (requested) Modifier.clip(RoundedCornerShape(radius)) else Modifier)   // silhouettes: Figma clip off
            .semantics { contentDescription = if (requested) "Photo requested" else "No photo" },
    ) {
        val w = maxWidth
        Image(
            painter = painterResource(art.drawable),
            contentDescription = null,
            modifier = Modifier
                .offset(x = w * art.x)
                .wrapContentSize(Alignment.TopStart, unbounded = true)   // the art may be larger than the frame
                .size(w * art.width, w * art.height),
            contentScale = ContentScale.FillBounds,
        )
    }
}

/** Exported art box per variant, in frame widths (Figma frame is 160 wide). Raw proportions: no token. */
private class ShAvatarPlaceholderArt(@DrawableRes val drawable: Int, val x: Float, val width: Float, val height: Float)

private fun shAvatarPlaceholderArt(gender: ShAvatarPlaceholderGender, aspect: ShAvatarPlaceholderAspect): ShAvatarPlaceholderArt {
    val portrait = aspect == ShAvatarPlaceholderAspect.Portrait
    return when (gender) {
        ShAvatarPlaceholderGender.Male ->
            if (portrait) ShAvatarPlaceholderArt(R.drawable.sh_avatar_placeholder_male_4x5, -3f / 160f, 163f / 160f, 213f / 160f)   // 163 × 213 at x −3
            else ShAvatarPlaceholderArt(R.drawable.sh_avatar_placeholder_male_1x1, 0f, 1f, 163f / 160f)                           // 160 × 163
        ShAvatarPlaceholderGender.Female ->
            if (portrait) ShAvatarPlaceholderArt(R.drawable.sh_avatar_placeholder_female_4x5, 0f, 1f, 213f / 160f)               // 160 × 213
            else ShAvatarPlaceholderArt(R.drawable.sh_avatar_placeholder_female_1x1, 0f, 1f, 167f / 160f)                         // 160 × 167
        ShAvatarPlaceholderGender.FemaleRequested ->
            if (portrait) ShAvatarPlaceholderArt(R.drawable.sh_avatar_placeholder_female_requested_4x5, 0f, 1f, 5f / 4f)
            else ShAvatarPlaceholderArt(R.drawable.sh_avatar_placeholder_female_requested_1x1, 0f, 1f, 1f)
        ShAvatarPlaceholderGender.MaleRequested ->
            if (portrait) ShAvatarPlaceholderArt(R.drawable.sh_avatar_placeholder_male_requested_4x5, 0f, 1f, 5f / 4f)
            else ShAvatarPlaceholderArt(R.drawable.sh_avatar_placeholder_male_requested_1x1, 0f, 1f, 1f)
    }
}
