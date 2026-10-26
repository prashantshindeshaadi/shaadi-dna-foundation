// sh-button — Jetpack Compose
// Spec: ../sh-button.md · Figma node 163:1301 (6 Types × 3 Sizes × 6 States = 108 variants)
//
// Needs dist/android/values*/ in res/, dist/android/compose/ShTokens.kt, the type kit (ShTypography.kt)
// and ../../sh-icon/compose/ShIcon.kt. Icons are drawables named sh_icon_<type>_<name>
// (icons/filled/check.svg → R.drawable.sh_icon_filled_check); the loader is R.drawable.sh_icon_line_loader_circle.
// Set `package` and the `R` import to your app's.
//
// States: Hover and Pressed come from the interaction source, Focus draws the §7.2 ring, Disabled is the
// Default look at sh-opacity/disabled, Loading hides the content and spins the loader.
// Tap target: Compose extends a clickable's touch bounds to LocalViewConfiguration.minimumTouchTargetSize
// (48dp = sh-icon/target/default) when it measures smaller, so Medium (40) and Small (32) keep their visual size.

package com.shaadi.dna.components

import androidx.annotation.DrawableRes
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsFocusedAsState
import androidx.compose.foundation.interaction.collectIsHoveredAsState
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
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
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.dimensionResource
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import com.shaadi.dna.tokens.ShGradient
import com.shaadi.dna.tokens.shOpacity
import com.shaadi.dna.tokens.shType
// import com.shaadi.app.R

/** sh-button Type, in Figma order. */
enum class ShButtonType { Primary, Secondary, Tertiary, Ghost, PremiumSolid, PremiumSoft }

/** sh-button Size: Large 48 (icon 20), Medium 40 (icon 16), Small 32 (icon 12). */
enum class ShButtonSize { Large, Medium, Small }

private enum class ShButtonInteraction { Default, Hover, Pressed }

/**
 * sh-button. Width hugs the content; [fill] stretches it to the container (the container decides: lone button
 * max 200 centred, two side by side fill equally, action island fill).
 *
 * @param leadingIcon drawable shown before the label (meaning), e.g. R.drawable.sh_icon_filled_check
 * @param trailingIcon drawable shown after the label (direction), e.g. R.drawable.sh_icon_line_arrow_right_01
 * @param sublabel Figma "Show sublabel" + "Sublabel": Support/Meta under the label; the height stays the same
 * @param enabled false = Figma State Disabled
 * @param loading true = Figma State Loading (content hidden, loader shown, input blocked)
 */
@Composable
fun ShButton(
    label: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    type: ShButtonType = ShButtonType.Primary,
    size: ShButtonSize = ShButtonSize.Medium,
    @DrawableRes leadingIcon: Int? = null,
    @DrawableRes trailingIcon: Int? = null,
    sublabel: String? = null,
    enabled: Boolean = true,
    loading: Boolean = false,
    fill: Boolean = false,
) {
    val interactionSource = remember { MutableInteractionSource() }
    val pressed by interactionSource.collectIsPressedAsState()
    val hovered by interactionSource.collectIsHoveredAsState()
    val focused by interactionSource.collectIsFocusedAsState()
    val interactive = enabled && !loading
    val state = when {
        !interactive -> ShButtonInteraction.Default      // Disabled and Loading keep the Default background
        pressed -> ShButtonInteraction.Pressed
        hovered -> ShButtonInteraction.Hover
        else -> ShButtonInteraction.Default
    }

    val metrics = shButtonMetrics(size)
    val textColor = shButtonTextColor(type)
    val iconColor = shButtonIconColor(type)
    val shape = RoundedCornerShape(dimensionResource(R.dimen.sh_radius_button))
    val lineHeight = with(LocalDensity.current) { metrics.textStyle.lineHeight.toDp() }
    val minWidth = dimensionResource(R.dimen.sh_space_48) + dimensionResource(R.dimen.sh_space_8)   // no token: min width 56 (blueprint)
    val opacity = if (enabled || loading) shOpacity(R.dimen.sh_opacity_full) else shOpacity(R.dimen.sh_opacity_disabled)
    val labelGap = -dimensionResource(R.dimen.sh_space_2)                                             // Figma gap -2 (label → sublabel)

    Row(
        modifier = modifier
            .then(if (fill) Modifier.fillMaxWidth() else Modifier)
            .defaultMinSize(minWidth = minWidth)
            .alpha(opacity)
            .shButtonFocusRing(focused && interactive)
            .clip(shape)
            .background(shButtonBackground(type, state), shape)
            .clickable(
                interactionSource = interactionSource,
                indication = null,                     // Hover / Pressed are drawn with the type's tokens
                enabled = interactive,
                role = Role.Button,
                onClick = onClick,
            )
            .semantics { if (loading) contentDescription = label }
            .padding(horizontal = metrics.paddingX, vertical = metrics.paddingY)
            .heightIn(min = lineHeight),               // content is at least the label line: 48 / 40 / 32 in total
        horizontalArrangement = Arrangement.spacedBy(metrics.gap, Alignment.CenterHorizontally),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        if (loading) {
            ShButtonLoader(metrics.iconSize, iconColor)
        } else {
            leadingIcon?.let { ShIcon(it, metrics.iconSize, paint = ShIconPaint.Tint(iconColor)) }
            // Label wrapper: fixed to the label's line height; a sublabel lifts the label and overflows evenly.
            Box(Modifier.height(lineHeight), contentAlignment = Alignment.Center) {
                Column(
                    modifier = Modifier.wrapContentHeight(align = Alignment.CenterVertically, unbounded = true),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(labelGap),
                ) {
                    Text(label, style = metrics.textStyle, color = textColor, maxLines = 1, overflow = TextOverflow.Ellipsis)
                    if (sublabel != null) {
                        Text(
                            text = sublabel,
                            modifier = Modifier
                                .padding(bottom = dimensionResource(R.dimen.sh_space_2))
                                .alpha(shOpacity(R.dimen.sh_opacity_extra_strong)),
                            style = shType().supportMeta,
                            color = textColor,
                            maxLines = 1,
                            overflow = TextOverflow.Ellipsis,
                        )
                    }
                }
            }
            trailingIcon?.let { ShIcon(it, metrics.iconSize, paint = ShIconPaint.Tint(iconColor)) }
        }
    }
}

// ---- Size ---------------------------------------------------------------------------------------------------

private class ShButtonMetrics(val paddingX: Dp, val paddingY: Dp, val gap: Dp, val iconSize: Dp, val textStyle: TextStyle)

@Composable
private fun shButtonMetrics(size: ShButtonSize): ShButtonMetrics = when (size) {
    ShButtonSize.Large -> ShButtonMetrics(
        paddingX = dimensionResource(R.dimen.sh_space_20),
        paddingY = dimensionResource(R.dimen.sh_space_12),
        gap = dimensionResource(R.dimen.sh_space_4),
        iconSize = dimensionResource(R.dimen.sh_icon_size_20),
        textStyle = shType().buttonLg,
    )
    ShButtonSize.Medium -> ShButtonMetrics(
        paddingX = dimensionResource(R.dimen.sh_space_16),
        paddingY = dimensionResource(R.dimen.sh_space_10),
        gap = dimensionResource(R.dimen.sh_space_2),
        iconSize = dimensionResource(R.dimen.sh_icon_size_16),
        textStyle = shType().buttonMd,
    )
    ShButtonSize.Small -> ShButtonMetrics(
        paddingX = dimensionResource(R.dimen.sh_space_16),
        paddingY = dimensionResource(R.dimen.sh_space_8),
        gap = dimensionResource(R.dimen.sh_space_2),
        iconSize = dimensionResource(R.dimen.sh_icon_size_12),
        textStyle = shType().buttonSm,
    )
}

// ---- Type ---------------------------------------------------------------------------------------------------

@Composable
private fun shButtonBackground(type: ShButtonType, state: ShButtonInteraction): Brush = when (type) {
    ShButtonType.Primary -> when (state) {
        ShButtonInteraction.Default -> ShGradient.brandDefault()
        ShButtonInteraction.Hover -> ShGradient.brandHover()
        ShButtonInteraction.Pressed -> ShGradient.brandPressed()
    }
    ShButtonType.Secondary -> SolidColor(colorResource(when (state) {
        ShButtonInteraction.Default -> R.color.sh_button_secondary_background_default
        ShButtonInteraction.Hover -> R.color.sh_button_secondary_background_hover
        ShButtonInteraction.Pressed -> R.color.sh_button_secondary_background_pressed
    }))
    ShButtonType.Tertiary -> SolidColor(colorResource(when (state) {
        ShButtonInteraction.Default -> R.color.sh_button_tertiary_background_default
        ShButtonInteraction.Hover -> R.color.sh_button_tertiary_background_hover
        ShButtonInteraction.Pressed -> R.color.sh_button_tertiary_background_pressed
    }))
    ShButtonType.Ghost -> SolidColor(colorResource(when (state) {
        ShButtonInteraction.Default -> R.color.sh_button_ghost_background_default
        ShButtonInteraction.Hover -> R.color.sh_button_ghost_background_hover
        ShButtonInteraction.Pressed -> R.color.sh_button_ghost_background_pressed
    }))
    ShButtonType.PremiumSolid -> when (state) {
        ShButtonInteraction.Default -> ShGradient.premiumDefault()
        ShButtonInteraction.Hover -> ShGradient.premiumHover()
        ShButtonInteraction.Pressed -> ShGradient.premiumPressed()
    }
    ShButtonType.PremiumSoft -> SolidColor(colorResource(when (state) {
        ShButtonInteraction.Default -> R.color.sh_premium_background_soft_default
        ShButtonInteraction.Hover -> R.color.sh_premium_background_soft_hover
        ShButtonInteraction.Pressed -> R.color.sh_premium_background_soft_pressed
    }))
}

@Composable
private fun shButtonTextColor(type: ShButtonType): Color = colorResource(when (type) {
    ShButtonType.Primary -> R.color.sh_button_primary_text_default
    ShButtonType.Secondary -> R.color.sh_button_secondary_text_default
    ShButtonType.Tertiary -> R.color.sh_button_tertiary_text_default
    ShButtonType.Ghost -> R.color.sh_button_ghost_text_default
    ShButtonType.PremiumSolid -> R.color.sh_premium_text_on_solid
    ShButtonType.PremiumSoft -> R.color.sh_premium_text_on_soft
})

@Composable
private fun shButtonIconColor(type: ShButtonType): Color = colorResource(when (type) {
    ShButtonType.Primary -> R.color.sh_button_primary_icon_default
    ShButtonType.Secondary -> R.color.sh_button_secondary_icon_default
    ShButtonType.Tertiary -> R.color.sh_button_tertiary_icon_default
    ShButtonType.Ghost -> R.color.sh_button_ghost_icon_default
    ShButtonType.PremiumSolid -> R.color.sh_premium_icon_on_solid
    ShButtonType.PremiumSoft -> R.color.sh_premium_icon_on_soft
})

// ---- Loading and focus --------------------------------------------------------------------------------------

/** sh-icon/loader-circle at the size's icon size, in the type's icon colour, spinning. */
@Composable
private fun ShButtonLoader(size: Dp, color: Color) {
    val transition = rememberInfiniteTransition(label = "sh-button-loader")
    val angle by transition.animateFloat(
        initialValue = 0f,
        targetValue = 360f,
        animationSpec = infiniteRepeatable(tween(durationMillis = 1000, easing = LinearEasing)),   // no token: motion duration
        label = "rotation",
    )
    ShIcon(R.drawable.sh_icon_line_loader_circle, size, Modifier.rotate(angle), paint = ShIconPaint.Tint(color))
}

/** §7.2 focus ring: sh-stroke/strong in border/focus at sh-opacity/strong, sh-space/2 outside the pill. */
@Composable
private fun Modifier.shButtonFocusRing(visible: Boolean): Modifier {
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
        val r = minOf(radius.toPx(), size.height / 2) + inset
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
