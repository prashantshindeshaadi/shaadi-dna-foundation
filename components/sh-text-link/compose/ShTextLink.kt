// sh-text-link — Jetpack Compose
// Spec: ../sh-text-link.md · Figma node 2348:22277 (22 variants: Type × Size × State Default/Focus;
// Neutral has Small and Medium only in Figma — Neutral Large works here with the same rules)
//
// Needs dist/android/values*/ in res/, dist/android/compose/ShTokens.kt, the type kit (ShTypography.kt)
// and ../../sh-icon/compose/ShIcon.kt. Icons are drawables named sh_icon_<type>_<name>.
// Set `package` and the `R` import to your app's.
//
// States: Focus draws the §7.2 ring (pill; border/inverse on the Inverse type). Disabled is the Default look at
// sh-opacity/disabled (FOUNDATION §4.3). Figma defines no Hover or Pressed look for this component, so none is drawn.
// Tap target: Compose extends a clickable's touch bounds to LocalViewConfiguration.minimumTouchTargetSize
// (48dp = sh-icon/target/default) when it measures smaller, so the 17 / 21 / 25 tall link keeps its size.

package com.shaadi.dna.components

import androidx.annotation.DrawableRes
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsFocusedAsState
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.draw.drawWithContent
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.dimensionResource
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.Dp
import com.shaadi.dna.tokens.shOpacity
import com.shaadi.dna.tokens.shType
// import com.shaadi.app.R

/** sh-text-link Type, in Figma order. Inverse is for imagery and dark surfaces. */
enum class ShTextLinkType { Neutral, Link, Inverse, Premium }

/** sh-text-link Size: label Button/SM, MD, LG; icons 12, 12, 16. */
enum class ShTextLinkSize { Small, Medium, Large }

/**
 * sh-text-link: an inline text action or link.
 *
 * @param leadingIcon Figma "Show leading icon" + "Leading icon", e.g. R.drawable.sh_icon_line_arrow_left_01
 * @param trailingIcon Figma "Show trailing icon" + "Trailing icon", e.g. R.drawable.sh_icon_line_arrow_right_01
 * @param underline Figma "Show border": the 1-stroke line under the label in the label's colour token
 * @param enabled false dims to sh-opacity/disabled (FOUNDATION §4.3; not a Figma variant)
 */
@Composable
fun ShTextLink(
    label: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    type: ShTextLinkType = ShTextLinkType.Neutral,
    size: ShTextLinkSize = ShTextLinkSize.Small,
    @DrawableRes leadingIcon: Int? = null,
    @DrawableRes trailingIcon: Int? = null,
    underline: Boolean = true,
    enabled: Boolean = true,
) {
    val interactionSource = remember { MutableInteractionSource() }
    val focused by interactionSource.collectIsFocusedAsState()
    val metrics = shTextLinkMetrics(size)
    val textColor = shTextLinkTextColor(type)
    val iconColor = shTextLinkIconColor(type)
    val stroke = dimensionResource(R.dimen.sh_stroke_default)
    val opacity = if (enabled) shOpacity(R.dimen.sh_opacity_full) else shOpacity(R.dimen.sh_opacity_disabled)

    Row(
        modifier = modifier
            .alpha(opacity)
            .shTextLinkFocusRing(focused && enabled, type)
            .clickable(
                interactionSource = interactionSource,
                indication = null,                     // no Hover / Pressed look in Figma
                enabled = enabled,
                role = Role.Button,
                onClick = onClick,
            ),
        horizontalArrangement = Arrangement.spacedBy(metrics.gap),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        leadingIcon?.let { ShIcon(it, metrics.iconSize, paint = ShIconPaint.Tint(iconColor)) }
        Text(
            text = label,
            modifier = Modifier
                .drawBehind {                          // Underline: a 1-stroke line under the label
                    if (underline) {
                        val h = stroke.toPx()
                        drawRect(textColor, topLeft = Offset(0f, size.height - h), size = Size(size.width, h))
                    }
                }
                .padding(bottom = stroke),             // the line's space is kept when Show border is off, as in Figma
            style = metrics.textStyle,
            color = textColor,
            maxLines = 1,
        )
        trailingIcon?.let { ShIcon(it, metrics.iconSize, paint = ShIconPaint.Tint(iconColor)) }
    }
}

// ---- Size ---------------------------------------------------------------------------------------------------

private class ShTextLinkMetrics(val gap: Dp, val iconSize: Dp, val textStyle: TextStyle)

@Composable
private fun shTextLinkMetrics(size: ShTextLinkSize): ShTextLinkMetrics = when (size) {
    ShTextLinkSize.Small -> ShTextLinkMetrics(
        dimensionResource(R.dimen.sh_space_2), dimensionResource(R.dimen.sh_icon_size_12), shType().buttonSm)
    ShTextLinkSize.Medium -> ShTextLinkMetrics(
        dimensionResource(R.dimen.sh_space_2), dimensionResource(R.dimen.sh_icon_size_12), shType().buttonMd)
    ShTextLinkSize.Large -> ShTextLinkMetrics(
        dimensionResource(R.dimen.sh_space_4), dimensionResource(R.dimen.sh_icon_size_16), shType().buttonLg)
}

// ---- Type ---------------------------------------------------------------------------------------------------

@Composable
private fun shTextLinkTextColor(type: ShTextLinkType): Color = colorResource(when (type) {
    ShTextLinkType.Neutral -> R.color.sh_text_secondary
    ShTextLinkType.Link -> R.color.sh_text_inline_text
    ShTextLinkType.Inverse -> R.color.sh_text_on_image
    ShTextLinkType.Premium -> R.color.sh_premium_text_on_soft
})

@Composable
private fun shTextLinkIconColor(type: ShTextLinkType): Color = colorResource(when (type) {
    ShTextLinkType.Neutral -> R.color.sh_icon_secondary
    ShTextLinkType.Link -> R.color.sh_icon_inline_icon
    ShTextLinkType.Inverse -> R.color.sh_icon_on_image
    ShTextLinkType.Premium -> R.color.sh_premium_icon_on_soft
})

// ---- Focus --------------------------------------------------------------------------------------------------

/** §7.2 focus ring: sh-stroke/strong at sh-opacity/strong, sh-space/2 outside, radius full; border/inverse on Inverse. */
@Composable
private fun Modifier.shTextLinkFocusRing(visible: Boolean, type: ShTextLinkType): Modifier {
    val color = colorResource(if (type == ShTextLinkType.Inverse) R.color.sh_border_inverse else R.color.sh_border_focus)
    val ringAlpha = shOpacity(R.dimen.sh_opacity_strong)
    val width = dimensionResource(R.dimen.sh_stroke_strong)
    val gap = dimensionResource(R.dimen.sh_space_2)
    val radius = dimensionResource(R.dimen.sh_radius_full)
    if (!visible) return this
    return this.drawWithContent {
        drawContent()
        val strokePx = width.toPx()
        val inset = gap.toPx() + strokePx / 2
        val r = minOf(radius.toPx(), size.minDimension / 2) + inset
        drawRoundRect(
            color = color,
            topLeft = Offset(-inset, -inset),
            size = Size(size.width + 2 * inset, size.height + 2 * inset),
            cornerRadius = CornerRadius(r, r),
            alpha = ringAlpha,
            style = Stroke(width = strokePx),
        )
    }
}
