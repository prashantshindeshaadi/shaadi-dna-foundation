// sh-tag — Jetpack Compose (no XML views)
// Spec: ../sh-tag.md · Figma node 2357:23671 · 20 variants (Mode × Size × Shape)
//
// Needs dist/android/values*/ in res/, dist/android/compose/ShTokens.kt, the type kit (ShTypography.kt)
// and sh-icon (components/sh-icon/compose/ShIcon.kt, same package). Every value is a DNA token.
// Set `package` and the `R` import to your app's.

package com.shaadi.dna.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.dimensionResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.isSpecified
import com.shaadi.dna.tokens.ShGradient
import com.shaadi.dna.tokens.shGlass
import com.shaadi.dna.tokens.shType
// import com.shaadi.app.R

/** Figma "Mode", in Figma's order. */
enum class ShTagMode { White, Dark, TranslucentLight, TranslucentDark, Strong }

/** Figma "Size": Medium is 22 tall, Small 20. */
enum class ShTagSize { Medium, Small }

/** Figma "Shape": Rounded = sh-radius/xs, Pill = sh-radius/full. */
enum class ShTagShape { Rounded, Pill }

/**
 * sh-tag: a compact, non-interactive label for status or promotion on cards and photos.
 *
 * @param leadingIcon Figma "Show leading icon" + "Leading icon"; null hides it. An icon with
 *   [ShIconPaint.Inherit] takes the mode's icon colour; gradient and original paints keep theirs.
 * @param trailingIcon Figma "Show trailing icon" + "Trailing icon"; null hides it.
 * @param border Figma "Show border": the thin gradient edge, drawn inside. Only the translucent modes paint it.
 * @param outline Figma "Show outline". Not wired to any layer in Figma yet, so it changes nothing; kept for parity.
 * @param iconSize The swapped icon's size. sh-tag's icons are sh-icon/size/12; sh-tag-profile swaps in
 *   size/14 art (location pin, wings). Multi-colour art ([ShIconPaint.Original]) is sized by height.
 */
@Composable
fun ShTag(
    label: String,
    modifier: Modifier = Modifier,
    mode: ShTagMode = ShTagMode.White,
    size: ShTagSize = ShTagSize.Medium,
    shape: ShTagShape = ShTagShape.Rounded,
    leadingIcon: ShIconSpec? = null,
    trailingIcon: ShIconSpec? = null,
    border: Boolean = true,
    outline: Boolean = false,
    iconSize: Dp = Dp.Unspecified,
) {
    val tagShape = RoundedCornerShape(
        when (shape) {
            ShTagShape.Rounded -> dimensionResource(R.dimen.sh_radius_xs)
            ShTagShape.Pill -> dimensionResource(R.dimen.sh_radius_full)
        }
    )
    val height = when (size) {
        // no token: Medium is a fixed 22 tall in Figma (unbound height)
        ShTagSize.Medium -> dimensionResource(R.dimen.sh_space_20) + dimensionResource(R.dimen.sh_space_2)
        // no token: Small is a fixed 20 tall in Figma (unbound height)
        ShTagSize.Small -> dimensionResource(R.dimen.sh_space_20)
    }
    val textColor = when (mode) {
        ShTagMode.White, ShTagMode.Strong -> colorResource(R.color.sh_text_secondary)
        ShTagMode.Dark -> colorResource(R.color.sh_text_inverse)
        ShTagMode.TranslucentLight, ShTagMode.TranslucentDark -> colorResource(R.color.sh_text_on_image)
    }
    val iconColor = when (mode) {
        ShTagMode.White, ShTagMode.Strong -> colorResource(R.color.sh_icon_secondary)
        ShTagMode.Dark -> colorResource(R.color.sh_icon_inverse)
        ShTagMode.TranslucentLight, ShTagMode.TranslucentDark -> colorResource(R.color.sh_icon_on_image)
    }
    val edgeWidth = dimensionResource(R.dimen.sh_stroke_thin)
    val surface: Modifier = when (mode) {
        ShTagMode.White -> Modifier.background(colorResource(R.color.sh_background_default), tagShape)
        ShTagMode.Dark -> Modifier.background(colorResource(R.color.sh_background_inverse), tagShape)
        ShTagMode.Strong -> Modifier.background(colorResource(R.color.sh_background_strong), tagShape)
        ShTagMode.TranslucentLight ->
            if (border) Modifier.shGlass(tagShape, ShGradient.translucentLightExtraSoft(), ShGradient.translucentBorderLight(), edgeWidth)
            else Modifier.clip(tagShape).background(ShGradient.translucentLightExtraSoft(), tagShape)
        ShTagMode.TranslucentDark ->
            if (border) Modifier.shGlass(tagShape, ShGradient.translucentDarkExtraSoft(), ShGradient.translucentBorderDark(), edgeWidth)
            else Modifier.clip(tagShape).background(ShGradient.translucentDarkExtraSoft(), tagShape)
    }
    val glyphSize = if (iconSize.isSpecified) iconSize else dimensionResource(R.dimen.sh_icon_size_12)

    CompositionLocalProvider(LocalContentColor provides iconColor) {
        Row(
            modifier = modifier
                .height(height)
                .then(surface)
                // optical padding, as in Figma: 4 on the icon side, 6 after the label
                .padding(
                    start = dimensionResource(R.dimen.sh_space_4),
                    end = dimensionResource(R.dimen.sh_space_6),
                    top = dimensionResource(R.dimen.sh_space_2),
                    bottom = dimensionResource(R.dimen.sh_space_2),
                ),
            horizontalArrangement = Arrangement.spacedBy(dimensionResource(R.dimen.sh_space_2)),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            leadingIcon?.let { ShTagIcon(it, glyphSize) }
            Text(
                text = label,
                style = shType().supportLabel,
                color = textColor,
                maxLines = 1,
                softWrap = false,
                overflow = TextOverflow.Clip,
            )
            trailingIcon?.let { ShTagIcon(it, glyphSize) }
        }
    }
}

/** Tag icon: template glyphs through ShIcon; multi-colour art keeps its aspect ratio, sized by height (as in Figma). */
@Composable
private fun ShTagIcon(spec: ShIconSpec, size: Dp) {
    if (spec.paint == ShIconPaint.Original) {
        Image(
            painter = painterResource(spec.icon),
            contentDescription = null,
            modifier = Modifier.height(size),
            contentScale = ContentScale.FillHeight,
        )
    } else {
        ShIcon(spec, size)
    }
}
