// sh-action-island — Jetpack Compose (no XML views)
// Spec: ../sh-action-island.md · Figma node 2594:16928 (8 Types × Style Normal / Floating = 16 variants)
//
// The action area of a card or screen: an optional sh-action-note ("Show note") above the core actions.
// Built from sh-action-note, sh-button (Size Medium) and sh-icon-button-with-label (same package):
//   ../../sh-action-note/compose/ShActionNote.kt · ../../../sh-button/compose/ShButton.kt ·
//   ../../../sh-icon-button-with-label/compose/ShIconButtonWithLabel.kt (+ their dependencies).
// Needs dist/android/values*/ in res/, dist/android/compose/ShTokens.kt and the type kit (ShTypography.kt).
// Every value is a DNA token; composed sizes with no token are marked "no token". Set `package` and the `R`
// import to your app's. Android has no backdrop blur; the Floating surface has none in Figma either.
//
// Each button, link and labelled action brings its own states (pressed, hover, focus, disabled) and 48 tap area.

package com.shaadi.dna.components

import androidx.annotation.DrawableRes
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.Layout
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.dimensionResource
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Constraints
import androidx.compose.ui.unit.Dp
import com.shaadi.dna.tokens.ShGradient
import com.shaadi.dna.tokens.ShShadow
import com.shaadi.dna.tokens.shGlass
import com.shaadi.dna.tokens.shShadow
import com.shaadi.dna.tokens.shType
// import com.shaadi.app.R

/** Figma "Type", in Figma's order: which actions the island shows. */
enum class ShActionIslandType {
    MessagePrimary, MessagePremium, MessageTertiary, MessageOnly, PrimaryOnly,
    SecondaryPrimary, TertiaryPrimary, ThreeActions,
}

/** Figma "Style": Normal (no surface, inside a card or sheet) or Floating (own translucent surface + shadow). */
enum class ShActionIslandStyle { Normal, Floating }

/**
 * A core button of the island (sh-button, Size Medium). Its Type comes from the island's Type.
 *
 * @param icon leading icon, e.g. R.drawable.sh_icon_filled_check
 * @param sublabel Support/Meta line under the label (sh-button "Sublabel"), e.g. "VIP Managed Profile"
 */
data class ShIslandButton(
    val label: String,
    @DrawableRes val icon: Int? = null,
    val sublabel: String? = null,
    val onClick: () -> Unit,
)

/** One labelled icon action of Type Three actions (sh-icon-button-with-label), e.g. R.drawable.sh_icon_line_call. */
data class ShIslandAction(
    val label: String,
    @DrawableRes val icon: Int,
    val onClick: () -> Unit,
)

/**
 * sh-action-island.
 * - Message + primary / premium / tertiary: [message] + [primary] (Primary / Premium Solid / Tertiary button)
 * - Message only: [status] alone
 * - Primary only: [primary], max 200, centred
 * - Secondary + primary / Tertiary + primary: [secondary] (Secondary / Tertiary) + [primary], equal widths
 * - Three actions: [actions] (three labelled icon actions, equal widths, left to right)
 *
 * @param note Figma "Show note": usually `{ ShActionNote(…) }`; null hides it. It takes the island's Style.
 * @param message Figma "Message", beside the button on the Message + … types
 * @param status Figma "Status", the only content of Message only
 */
@Composable
fun ShActionIsland(
    type: ShActionIslandType,
    modifier: Modifier = Modifier,
    style: ShActionIslandStyle = ShActionIslandStyle.Normal,
    note: (@Composable () -> Unit)? = null,
    message: String = "",
    status: String = "",
    primary: ShIslandButton? = null,
    secondary: ShIslandButton? = null,
    actions: List<ShIslandAction> = emptyList(),
) {
    val textColor = colorResource(
        if (style == ShActionIslandStyle.Normal) R.color.sh_text_on_image else R.color.sh_text_primary
    )
    val surface = when (style) {
        ShActionIslandStyle.Normal -> Modifier.padding(dimensionResource(R.dimen.sh_space_0))
        ShActionIslandStyle.Floating -> {
            val shape = RoundedCornerShape(dimensionResource(R.dimen.sh_radius_xxl))
            Modifier
                .shShadow(ShShadow.Floating, shape)
                .shGlass(shape, ShGradient.translucentLightStrong(), ShGradient.translucentBorderLight())
                .padding(dimensionResource(R.dimen.sh_space_16))
        }
    }

    Column(
        modifier = modifier.fillMaxWidth().then(surface),
        verticalArrangement = Arrangement.spacedBy(dimensionResource(R.dimen.sh_space_12)),
    ) {
        if (note != null) {
            val noteStyle = if (style == ShActionIslandStyle.Normal) ShActionNoteStyle.Normal else ShActionNoteStyle.Floating
            CompositionLocalProvider(LocalShActionNoteIslandStyle provides noteStyle) { note() }
        }
        IslandActions(type, textColor, message, status, primary, secondary, actions)
    }
}

/** The Actions row per Type. */
@Composable
private fun IslandActions(
    type: ShActionIslandType,
    textColor: Color,
    message: String,
    status: String,
    primary: ShIslandButton?,
    secondary: ShIslandButton?,
    actions: List<ShIslandAction>,
) {
    val space8 = dimensionResource(R.dimen.sh_space_8)
    val buttonMin = dimensionResource(R.dimen.sh_space_80) + dimensionResource(R.dimen.sh_space_16)      // no token: min width 96 (Figma)
    val buttonMax = dimensionResource(R.dimen.sh_space_80) * 2 + dimensionResource(R.dimen.sh_space_40)  // no token: lone button max 200
    val messageMin = dimensionResource(R.dimen.sh_space_80) + dimensionResource(R.dimen.sh_space_20)     // no token: min width 100 (Figma)

    when (type) {
        ShActionIslandType.MessagePrimary, ShActionIslandType.MessagePremium, ShActionIslandType.MessageTertiary -> {
            val buttonType = when (type) {
                ShActionIslandType.MessagePremium -> ShButtonType.PremiumSolid
                ShActionIslandType.MessageTertiary -> ShButtonType.Tertiary
                else -> ShButtonType.Primary
            }
            IslandMessageRow(
                gap = dimensionResource(R.dimen.sh_space_16),
                messageMin = messageMin,
                buttonMin = buttonMin,
                buttonMax = buttonMax,
                message = { IslandMessage(message, textColor) },
                button = if (primary != null) ({ IslandButton(primary, buttonType, Modifier) }) else null,
            )
        }
        ShActionIslandType.MessageOnly -> IslandMessage(status, textColor, Modifier.fillMaxWidth())
        ShActionIslandType.PrimaryOnly -> Box(Modifier.fillMaxWidth(), contentAlignment = Alignment.Center) {
            primary?.let { IslandButton(it, ShButtonType.Primary, Modifier.widthIn(min = buttonMin, max = buttonMax)) }
        }
        ShActionIslandType.SecondaryPrimary, ShActionIslandType.TertiaryPrimary -> Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(space8),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            val secondaryType =
                if (type == ShActionIslandType.SecondaryPrimary) ShButtonType.Secondary else ShButtonType.Tertiary
            secondary?.let { IslandButton(it, secondaryType, Modifier.weight(1f)) }
            primary?.let { IslandButton(it, ShButtonType.Primary, Modifier.weight(1f)) }
        }
        ShActionIslandType.ThreeActions -> Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(space8),
            verticalAlignment = Alignment.Top,
        ) {
            actions.forEach { action ->
                ShIconButtonWithLabel(
                    label = action.label,
                    icon = action.icon,
                    onClick = action.onClick,
                    modifier = Modifier.weight(1f),
                    labelColor = textColor,                  // text/on-image on Normal, text/primary on Floating
                )
            }
        }
    }
}

@Composable
private fun IslandMessage(text: String, color: Color, modifier: Modifier = Modifier) {
    Text(
        text = text,
        modifier = modifier,
        style = shType().bodyMdTight,
        color = color,
        maxLines = 1,
        overflow = TextOverflow.Ellipsis,
    )
}

@Composable
private fun IslandButton(button: ShIslandButton, type: ShButtonType, modifier: Modifier) {
    ShButton(
        label = button.label,
        onClick = button.onClick,
        modifier = modifier,
        type = type,
        size = ShButtonSize.Medium,
        leadingIcon = button.icon,
        sublabel = button.sublabel,
        fill = true,
    )
}

/**
 * Message + button row (Figma: message hugs, min 100, one line cut with …; button fills the rest, 96–200; the pair
 * is centred). The message gives way first, down to its minimum; the button never goes under its own label or 96.
 */
@Composable
private fun IslandMessageRow(
    gap: Dp,
    messageMin: Dp,
    buttonMin: Dp,
    buttonMax: Dp,
    message: @Composable () -> Unit,
    button: (@Composable () -> Unit)?,
) {
    Layout(
        content = { message(); button?.invoke() },
        modifier = Modifier.fillMaxWidth(),
    ) { measurables, constraints ->
        val total = constraints.maxWidth
        val gapPx = gap.roundToPx()
        val messageMeasurable = measurables[0]
        val buttonMeasurable = measurables.getOrNull(1)
        if (buttonMeasurable == null) {
            val p = messageMeasurable.measure(constraints.copy(minWidth = 0))
            return@Layout layout(total, p.height) { p.place(0, 0) }
        }
        val messageMinPx = messageMin.roundToPx()
        val buttonMaxPx = buttonMax.roundToPx()
        // The button never goes under its own label (nor 96), up to the 200 maximum.
        val buttonFloorPx = buttonMeasurable.maxIntrinsicWidth(constraints.maxHeight)
            .coerceAtLeast(buttonMin.roundToPx())
            .coerceAtMost(buttonMaxPx)
        val ideal = messageMeasurable.maxIntrinsicWidth(constraints.maxHeight)
        val messageMaxPx = maxOf(messageMinPx, total - gapPx - buttonFloorPx)
        val messageW = ideal.coerceIn(messageMinPx, messageMaxPx)
        val buttonW = (total - gapPx - messageW).coerceIn(buttonFloorPx, maxOf(buttonFloorPx, buttonMaxPx))
        val m = messageMeasurable.measure(Constraints.fixedWidth(messageW))
        val b = buttonMeasurable.measure(Constraints.fixedWidth(buttonW))
        val height = maxOf(m.height, b.height)
        val x0 = ((total - (messageW + gapPx + buttonW)) / 2).coerceAtLeast(0)
        layout(total, height) {
            m.place(x0, (height - m.height) / 2)
            b.place(x0 + messageW + gapPx, (height - b.height) / 2)
        }
    }
}
