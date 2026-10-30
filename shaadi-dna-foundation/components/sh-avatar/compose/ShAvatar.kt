// sh-avatar — Jetpack Compose (no XML views)
// Spec: ../sh-avatar.md · Figma node 2486:15378 · Size sm / md / lg × Type Image / Initial / Icon
//
// A member's identity: photo, initials or a gender glyph in a circle with an icon/on-image ring.
// Needs dist/android/values*/ in res/, dist/android/compose/ShTokens.kt, the type kit (ShTypography.kt),
// ../../profile-card/sh-user-images/compose/ShUserImages.kt (Image) and ../../sh-avatar-glyph/compose/ShAvatarGlyph.kt (Icon).
// Set `package` and the `R` import to your app's.

package com.shaadi.dna.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.dimensionResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.Dp
import com.shaadi.dna.tokens.shType
// import com.shaadi.app.R

/** Figma "Size": sm 32 · md 48 · lg 96. */
enum class ShAvatarSize { Sm, Md, Lg }

/** Figma "Type": the member's photo, their initials (Figma "Label"), or a gender glyph (Figma "Icon" swap). */
enum class ShAvatarType { Image, Initial, Icon }

/**
 * sh-avatar. Not interactive.
 *
 * Root: size per Size, ring stroke icon/on-image (inside), radius sh-radius/avatar. Media sits inside the ring:
 * Image = sh-user-images (Style Normal); Initial = background/strong + Label in text/secondary
 * (sm Support/Label · md Body/MD/Default · lg Heading/SM); Icon = background/strong + sh-avatar-glyph in icon/secondary
 * (sm 16 · md 24 · lg 40).
 *
 * @param painter the member's photo (Type Image). null leaves the Media empty.
 * @param initials Figma "Label" (Type Initial), e.g. "SH".
 * @param gender Figma "Icon" swap (Type Icon): sh-avatar-glyph Male or Female.
 */
@Composable
fun ShAvatar(
    modifier: Modifier = Modifier,
    size: ShAvatarSize = ShAvatarSize.Sm,
    type: ShAvatarType = ShAvatarType.Image,
    painter: Painter? = null,
    initials: String = "",
    gender: ShAvatarGlyphGender = ShAvatarGlyphGender.Male,
) {
    // no token: Figma's ring weight is unbound (1) → sh-stroke/default
    val ring = dimensionResource(R.dimen.sh_stroke_default)
    val shape = RoundedCornerShape(dimensionResource(R.dimen.sh_radius_avatar))
    Box(
        modifier = modifier
            .size(avatarSize(size))
            .border(ring, colorResource(R.color.sh_icon_on_image), shape)
            .padding(ring)                                           // Media sits inside the ring
            .clip(shape)
            .then(
                if (type == ShAvatarType.Image) Modifier
                else Modifier.background(colorResource(R.color.sh_background_strong)),
            ),
        contentAlignment = Alignment.Center,
    ) {
        when (type) {
            ShAvatarType.Image -> ShUserImage(painter = painter)
            ShAvatarType.Initial -> Text(
                text = initials,
                style = avatarLabelStyle(size),
                color = colorResource(R.color.sh_text_secondary),
                textAlign = TextAlign.Center,
                maxLines = 1,
                softWrap = false,
            )
            ShAvatarType.Icon -> ShAvatarGlyph(
                gender = gender,
                size = avatarGlyphSize(size),
                tint = colorResource(R.color.sh_icon_secondary),
            )
        }
    }
}

@Composable
private fun avatarSize(size: ShAvatarSize): Dp = when (size) {
    ShAvatarSize.Sm -> dimensionResource(R.dimen.sh_space_32)
    ShAvatarSize.Md -> dimensionResource(R.dimen.sh_space_48)
    ShAvatarSize.Lg -> dimensionResource(R.dimen.sh_space_48) * 2     // no token: Figma leaves lg (96) unbound = 2 × sh-space/48
}

@Composable
private fun avatarLabelStyle(size: ShAvatarSize): TextStyle = when (size) {
    ShAvatarSize.Sm -> shType().supportLabel
    ShAvatarSize.Md -> shType().bodyMd
    ShAvatarSize.Lg -> shType().headingSm
}

private fun avatarGlyphSize(size: ShAvatarSize): ShAvatarGlyphSize = when (size) {
    ShAvatarSize.Sm -> ShAvatarGlyphSize.S16
    ShAvatarSize.Md -> ShAvatarGlyphSize.S24
    ShAvatarSize.Lg -> ShAvatarGlyphSize.S40
}
