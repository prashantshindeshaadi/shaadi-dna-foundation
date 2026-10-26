// sh-avatar-glyph — Jetpack Compose (no XML views)
// Spec: ../sh-avatar-glyph.md · Figma node 2644:42085 · Gender Male / Female × Size 16 / 24 / 40
//
// Male / female silhouette used inside sh-avatar (Type=Icon). Each size is its own drawing (Hugeicons stroke
// scale), so pick the size, never scale one drawing to another size.
// Import ../assets/{male,female}-{16,24,40}.svg as vector drawables named sh_avatar_glyph_<gender>_<size>,
// e.g. assets/male-24.svg → R.drawable.sh_avatar_glyph_male_24.
// Needs dist/android/values*/ in res/. Set `package` and the `R` import to your app's.

package com.shaadi.dna.components

import androidx.annotation.DrawableRes
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.dimensionResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.Dp
// import com.shaadi.app.R

/** Figma "Gender". */
enum class ShAvatarGlyphGender { Male, Female }

/** Figma "Size": 16 = sh-icon/size/16 · 24 = sh-icon/size/24 · 40 = sh-icon/pictogram/size/40. */
enum class ShAvatarGlyphSize { S16, S24, S40 }

/**
 * sh-avatar-glyph: a gender silhouette. Decorative (no content description).
 *
 * @param tint glyph paint. null = icon/primary (the Figma glyph fill); sh-avatar passes icon/secondary.
 */
@Composable
fun ShAvatarGlyph(
    gender: ShAvatarGlyphGender = ShAvatarGlyphGender.Male,
    size: ShAvatarGlyphSize = ShAvatarGlyphSize.S16,
    modifier: Modifier = Modifier,
    tint: Color? = null,
) {
    Image(
        painter = painterResource(avatarGlyphDrawable(gender, size)),
        contentDescription = null,
        modifier = modifier.size(avatarGlyphDimension(size)),
        colorFilter = ColorFilter.tint(tint ?: colorResource(R.color.sh_icon_primary)),
    )
}

// The token size of each glyph size.
@Composable
private fun avatarGlyphDimension(size: ShAvatarGlyphSize): Dp = when (size) {
    ShAvatarGlyphSize.S16 -> dimensionResource(R.dimen.sh_icon_size_16)
    ShAvatarGlyphSize.S24 -> dimensionResource(R.dimen.sh_icon_size_24)
    ShAvatarGlyphSize.S40 -> dimensionResource(R.dimen.sh_icon_pictogram_size_40)
}

@DrawableRes
private fun avatarGlyphDrawable(gender: ShAvatarGlyphGender, size: ShAvatarGlyphSize): Int = when (gender) {
    ShAvatarGlyphGender.Male -> when (size) {
        ShAvatarGlyphSize.S16 -> R.drawable.sh_avatar_glyph_male_16
        ShAvatarGlyphSize.S24 -> R.drawable.sh_avatar_glyph_male_24
        ShAvatarGlyphSize.S40 -> R.drawable.sh_avatar_glyph_male_40
    }
    ShAvatarGlyphGender.Female -> when (size) {
        ShAvatarGlyphSize.S16 -> R.drawable.sh_avatar_glyph_female_16
        ShAvatarGlyphSize.S24 -> R.drawable.sh_avatar_glyph_female_24
        ShAvatarGlyphSize.S40 -> R.drawable.sh_avatar_glyph_female_40
    }
}
