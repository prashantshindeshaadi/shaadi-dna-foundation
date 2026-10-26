// sh-icon-button-with-label — Jetpack Compose
// Spec: ../sh-icon-button-with-label.md · Figma node 2198:32247 (State: Default, Focus)
//
// Built from sh-icon-button (Type Secondary, Size Medium, filling the width) + a Support/Label caption.
// Needs ../../sh-icon-button/compose/ShIconButton.kt (ShIconButtonSurface) and its dependencies.
// Set `package` and the `R` import to your app's.
//
// One clickable for icon + caption; Hover / Pressed / Focus show on the icon button (Focus = its ring, as in Figma).
// Width: give each action an equal share of the row (Modifier.weight(1f)); alone it hugs the wider of icon
// and caption. Over imagery (action island) pass labelColor = colorResource(R.color.sh_text_on_image).
// Tap target: 60 tall; touch bounds below 48 wide are extended by Compose (minimumTouchTargetSize = 48dp).

package com.shaadi.dna.components

import androidx.annotation.DrawableRes
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsFocusedAsState
import androidx.compose.foundation.interaction.collectIsHoveredAsState
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.dimensionResource
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import com.shaadi.dna.tokens.shOpacity
import com.shaadi.dna.tokens.shType
// import com.shaadi.app.R

/**
 * sh-icon-button-with-label: an icon action with a short caption, used in rows of equal actions.
 *
 * @param label Figma "Label"; also the accessible name
 * @param icon the action's icon drawable, e.g. R.drawable.sh_icon_line_call
 * @param enabled false dims the whole action to sh-opacity/disabled (FOUNDATION §4.3; not a Figma variant)
 * @param labelColor caption colour; text/primary unless overridden (text/on-image over imagery)
 */
@Composable
fun ShIconButtonWithLabel(
    label: String,
    @DrawableRes icon: Int,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    labelColor: Color = Color.Unspecified,
) {
    val interactionSource = remember { MutableInteractionSource() }
    val pressed by interactionSource.collectIsPressedAsState()
    val hovered by interactionSource.collectIsHoveredAsState()
    val focused by interactionSource.collectIsFocusedAsState()
    val primary = colorResource(R.color.sh_text_primary)
    val captionColor = if (labelColor == Color.Unspecified) primary else labelColor
    val opacity = if (enabled) shOpacity(R.dimen.sh_opacity_full) else shOpacity(R.dimen.sh_opacity_disabled)

    Column(
        modifier = modifier
            .width(IntrinsicSize.Max)                  // alone: hug; with weight(1f): the share wins
            .alpha(opacity)
            .clickable(
                interactionSource = interactionSource,
                indication = null,                     // states are drawn on the icon button
                enabled = enabled,
                role = Role.Button,
                onClick = onClick,
            ),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(dimensionResource(R.dimen.sh_space_4)),
    ) {
        ShIconButtonSurface(
            icon = icon,
            type = ShIconButtonType.Secondary,
            size = ShIconButtonSize.Medium,
            badge = null,
            fill = true,
            interaction = when {
                !enabled -> ShIconButtonInteraction.Default
                pressed -> ShIconButtonInteraction.Pressed
                hovered -> ShIconButtonInteraction.Hover
                else -> ShIconButtonInteraction.Default
            },
            focused = focused && enabled,
            enabled = true,                            // the whole action is dimmed above, not twice
        )
        Text(
            text = label,
            style = shType().supportLabel,
            color = captionColor,
            textAlign = TextAlign.Center,
            maxLines = 1,
            overflow = TextOverflow.Ellipsis,
        )
    }
}
