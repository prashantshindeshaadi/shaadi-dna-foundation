// sh-icon-button — Jetpack Compose
// Spec: ../sh-icon-button.md · Figma node 567:26954 (5 Types × 3 Sizes × 5 States = 75 variants)
//
// Needs dist/android/values*/ in res/, dist/android/compose/ShTokens.kt, the type kit (ShTypography.kt)
// and ../../sh-icon/compose/ShIcon.kt. Icons are drawables named sh_icon_<type>_<name>.
// Set `package` and the `R` import to your app's.
//
// States: Hover and Pressed from the interaction source, Focus draws the §7.2 ring, Disabled is the Default look
// at sh-opacity/disabled. Translucent is glass (over imagery only); Android has no backdrop blur, so it is the
// translucent gradient + light ring edge without the blur (see ShTokens.kt).
// Tap target: Compose extends a clickable's touch bounds to LocalViewConfiguration.minimumTouchTargetSize
// (48dp = sh-icon/target/default) when it measures smaller, so Medium (40) and Small (32) keep their visual size.

package com.shaadi.dna.components

import androidx.annotation.DrawableRes
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsFocusedAsState
import androidx.compose.foundation.interaction.collectIsHoveredAsState
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawWithContent
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.dimensionResource
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.Dp
import com.shaadi.dna.tokens.ShGradient
import com.shaadi.dna.tokens.shGlass
import com.shaadi.dna.tokens.shOpacity
import com.shaadi.dna.tokens.shType
// import com.shaadi.app.R

/** sh-icon-button Type, in Figma order. Translucent is glass and goes over imagery only. */
enum class ShIconButtonType { Primary, Secondary, Tertiary, Translucent, Ghost }

/** sh-icon-button Size: Large 48 (icon 24), Medium 40 (icon 20), Small 32 (icon 16). */
enum class ShIconButtonSize { Large, Medium, Small }

/** Interaction state the surface draws (shared with sh-icon-button-with-label). */
internal enum class ShIconButtonInteraction { Default, Hover, Pressed }

/**
 * sh-icon-button: icon-only action.
 *
 * @param contentDescription Figma "Screen reader label" (the button has no visible text)
 * @param badge Figma "Show badge" + "Badge": a count after the icon, null hides it
 * @param enabled false = Figma State Disabled
 * @param fill stretch the width (rows of equal actions, sh-icon-button-with-label)
 */
@Composable
fun ShIconButton(
    @DrawableRes icon: Int,
    contentDescription: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    type: ShIconButtonType = ShIconButtonType.Primary,
    size: ShIconButtonSize = ShIconButtonSize.Large,
    badge: String? = null,
    enabled: Boolean = true,
    fill: Boolean = false,
) {
    val interactionSource = remember { MutableInteractionSource() }
    val pressed by interactionSource.collectIsPressedAsState()
    val hovered by interactionSource.collectIsHoveredAsState()
    val focused by interactionSource.collectIsFocusedAsState()
    ShIconButtonSurface(
        icon = icon,
        type = type,
        size = size,
        badge = badge,
        fill = fill,
        interaction = when {
            !enabled -> ShIconButtonInteraction.Default
            pressed -> ShIconButtonInteraction.Pressed
            hovered -> ShIconButtonInteraction.Hover
            else -> ShIconButtonInteraction.Default
        },
        focused = focused && enabled,
        enabled = enabled,
        modifier = modifier
            .clickable(
                interactionSource = interactionSource,
                indication = null,                     // Hover / Pressed are drawn with the type's tokens
                enabled = enabled,
                role = Role.Button,
                onClick = onClick,
            )
            .semantics { this.contentDescription = contentDescription },
    )
}

/** The visual of sh-icon-button for a given interaction state. Callers own the click handling. */
@Composable
internal fun ShIconButtonSurface(
    @DrawableRes icon: Int,
    type: ShIconButtonType,
    size: ShIconButtonSize,
    badge: String?,
    fill: Boolean,
    interaction: ShIconButtonInteraction,
    focused: Boolean,
    enabled: Boolean,
    modifier: Modifier = Modifier,
) {
    val metrics = shIconButtonMetrics(size)
    val shape = RoundedCornerShape(dimensionResource(R.dimen.sh_radius_button))
    val opacity = if (enabled) shOpacity(R.dimen.sh_opacity_full) else shOpacity(R.dimen.sh_opacity_disabled)
    val surface = if (type == ShIconButtonType.Translucent) {
        Modifier.shGlass(
            shape = shape,
            fill = if (interaction == ShIconButtonInteraction.Pressed) ShGradient.translucentDarkDefault()
                   else ShGradient.translucentDarkSoft(),         // Figma: Hover keeps the Default glass
            edge = ShGradient.translucentBorderLightRing(),
        )
    } else {
        Modifier.clip(shape).background(shIconButtonBackground(type, interaction), shape)
    }

    Row(
        modifier = modifier
            .then(if (fill) Modifier.fillMaxWidth() else Modifier)
            .alpha(opacity)
            .shIconButtonFocusRing(focused)
            .then(surface)
            .padding(metrics.padding)
            .height(metrics.iconSize),                 // content is the icon's height: 48 / 40 / 32 in total
        horizontalArrangement = Arrangement.spacedBy(dimensionResource(R.dimen.sh_space_4), Alignment.CenterHorizontally),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        ShIcon(icon, metrics.iconSize, paint = ShIconPaint.Tint(shIconButtonIconColor(type)))
        if (badge != null) {
            Text(
                text = badge,
                modifier = Modifier.wrapContentHeight(unbounded = true),   // Small: Body/SM line overflows the 16 row evenly
                style = metrics.badgeStyle,
                color = shIconButtonBadgeColor(type),
                maxLines = 1,
            )
        }
    }
}

// ---- Size ---------------------------------------------------------------------------------------------------

private class ShIconButtonMetrics(val padding: Dp, val iconSize: Dp, val badgeStyle: TextStyle)

@Composable
private fun shIconButtonMetrics(size: ShIconButtonSize): ShIconButtonMetrics = when (size) {
    ShIconButtonSize.Large -> ShIconButtonMetrics(
        dimensionResource(R.dimen.sh_space_12), dimensionResource(R.dimen.sh_icon_size_24), shType().bodyLg)
    ShIconButtonSize.Medium -> ShIconButtonMetrics(
        dimensionResource(R.dimen.sh_space_10), dimensionResource(R.dimen.sh_icon_size_20), shType().bodyMd)
    ShIconButtonSize.Small -> ShIconButtonMetrics(
        dimensionResource(R.dimen.sh_space_8), dimensionResource(R.dimen.sh_icon_size_16), shType().bodySm)
}

// ---- Type ---------------------------------------------------------------------------------------------------

@Composable
private fun shIconButtonBackground(type: ShIconButtonType, state: ShIconButtonInteraction): Brush = when (type) {
    ShIconButtonType.Primary -> when (state) {
        ShIconButtonInteraction.Default -> ShGradient.brandDefault()
        ShIconButtonInteraction.Hover -> ShGradient.brandHover()
        ShIconButtonInteraction.Pressed -> ShGradient.brandPressed()
    }
    ShIconButtonType.Secondary -> SolidColor(colorResource(when (state) {
        ShIconButtonInteraction.Default -> R.color.sh_button_secondary_background_default
        ShIconButtonInteraction.Hover -> R.color.sh_button_secondary_background_hover
        ShIconButtonInteraction.Pressed -> R.color.sh_button_secondary_background_pressed
    }))
    ShIconButtonType.Tertiary -> SolidColor(colorResource(when (state) {   // Figma's border/default stroke is sh-stroke/none
        ShIconButtonInteraction.Default -> R.color.sh_button_tertiary_background_default
        ShIconButtonInteraction.Hover -> R.color.sh_button_tertiary_background_hover
        ShIconButtonInteraction.Pressed -> R.color.sh_button_tertiary_background_pressed
    }))
    ShIconButtonType.Translucent -> when (state) {                           // drawn by shGlass; kept for completeness
        ShIconButtonInteraction.Pressed -> ShGradient.translucentDarkDefault()
        else -> ShGradient.translucentDarkSoft()
    }
    ShIconButtonType.Ghost -> SolidColor(colorResource(when (state) {
        ShIconButtonInteraction.Default -> R.color.sh_button_ghost_background_default
        ShIconButtonInteraction.Hover -> R.color.sh_button_ghost_background_hover
        ShIconButtonInteraction.Pressed -> R.color.sh_button_ghost_background_pressed
    }))
}

@Composable
private fun shIconButtonIconColor(type: ShIconButtonType): Color = colorResource(when (type) {
    ShIconButtonType.Primary -> R.color.sh_button_primary_icon_default
    ShIconButtonType.Secondary -> R.color.sh_button_secondary_icon_default
    ShIconButtonType.Tertiary -> R.color.sh_button_tertiary_icon_default
    ShIconButtonType.Translucent -> R.color.sh_icon_inverse
    ShIconButtonType.Ghost -> R.color.sh_button_ghost_icon_default
})

@Composable
private fun shIconButtonBadgeColor(type: ShIconButtonType): Color = colorResource(when (type) {
    ShIconButtonType.Primary -> R.color.sh_button_primary_text_default
    ShIconButtonType.Secondary -> R.color.sh_button_secondary_text_default
    ShIconButtonType.Tertiary -> R.color.sh_button_tertiary_text_default
    ShIconButtonType.Translucent -> R.color.sh_text_inverse
    ShIconButtonType.Ghost -> R.color.sh_button_ghost_text_default
})

// ---- Focus --------------------------------------------------------------------------------------------------

/** §7.2 focus ring: sh-stroke/strong in border/focus at sh-opacity/strong, sh-space/2 outside the pill. */
@Composable
private fun Modifier.shIconButtonFocusRing(visible: Boolean): Modifier {
    val color = colorResource(R.color.sh_border_focus)
    val ringAlpha = shOpacity(R.dimen.sh_opacity_strong)
    val width = dimensionResource(R.dimen.sh_stroke_strong)
    val gap = dimensionResource(R.dimen.sh_space_2)
    val radius = dimensionResource(R.dimen.sh_radius_button)
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
