// sh-action-note — Jetpack Compose (no XML views)
// Spec: ../sh-action-note.md · Figma node 2594:16750 (CTA Edit / Upgrade × Style Normal / Floating = 4 variants)
//
// One line above the actions: the pre-written message with an Edit link, or an action with an Upgrade Now link.
// Built from sh-text-link (../../../sh-text-link/compose/ShTextLink.kt, Size Small, no icons, underline on).
// Needs dist/android/values*/ in res/, dist/android/compose/ShTokens.kt and the type kit (ShTypography.kt).
// Every value is a DNA token. Set `package` and the `R` import to your app's.
//
// Body/SM/Italic: Body/SM with FontStyle.Italic (add fonts/LexendSH-VF-Italic.ttf to the font family for the drawn
// oblique; without it Compose synthesises the slant).
// Inside ShActionIsland the note follows the island's Style, and the island owns the surface: a Floating note
// there drops its own ring and padding (as the island's Figma instances do).

package com.shaadi.dna.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.drawWithContent
import androidx.compose.ui.graphics.BlendMode
import androidx.compose.ui.graphics.CompositingStrategy
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.dimensionResource
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.style.TextOverflow
import com.shaadi.dna.tokens.ShGradient
import com.shaadi.dna.tokens.shOpacity
import com.shaadi.dna.tokens.shType
// import com.shaadi.app.R

/** Figma "CTA": Edit (pre-written message + Edit link) or Upgrade (locked action + Upgrade Now link). */
enum class ShActionNoteCTA { Edit, Upgrade }

/** Figma "Style": Normal (on the card photo / dark glass) or Floating (on a light surface). */
enum class ShActionNoteStyle { Normal, Floating }

/** Set by ShActionIsland: the note takes the island's Style and leaves the surface to the island. */
internal val LocalShActionNoteIslandStyle = staticCompositionLocalOf<ShActionNoteStyle?> { null }

/**
 * sh-action-note. Edit shows [message] (italic, at sh-opacity/strong, one line cut with …) + an "Edit" link;
 * Upgrade shows [actionText] + a Premium "Upgrade Now" link, centred.
 *
 * @param cta Figma "CTA"
 * @param style Figma "Style" (inside ShActionIsland the island's Style wins)
 * @param message Figma "Message", shown on Edit
 * @param actionText Figma "Action text", shown on Upgrade
 * @param linkLabel the link's text; "Edit" / "Upgrade Now" when null
 * @param onClick the link's tap (edit the message / upgrade)
 */
@Composable
fun ShActionNote(
    cta: ShActionNoteCTA,
    modifier: Modifier = Modifier,
    style: ShActionNoteStyle = ShActionNoteStyle.Normal,
    message: String = "",
    actionText: String = "",
    linkLabel: String? = null,
    onClick: () -> Unit,
) {
    val islandStyle = LocalShActionNoteIslandStyle.current
    val resolved = islandStyle ?: style
    val ownSurface = resolved == ShActionNoteStyle.Floating && islandStyle == null
    val textColor = colorResource(
        if (resolved == ShActionNoteStyle.Normal) R.color.sh_text_on_image else R.color.sh_text_secondary
    )
    val strong = shOpacity(R.dimen.sh_opacity_strong)
    val gap = dimensionResource(R.dimen.sh_space_8)

    // Floating on its own: Surface = edge ring only (radius default), padding 12. Figma casts sh-shadow/floating
    // from that fill-less ring; Compose elevation needs an opaque surface (it would shade the whole box), so the
    // ring is drawn without it.
    val surface = if (ownSurface) {
        Modifier
            .border(
                BorderStroke(dimensionResource(R.dimen.sh_stroke_default), ShGradient.translucentBorderLight()),
                RoundedCornerShape(dimensionResource(R.dimen.sh_radius_default)),
            )
            .padding(dimensionResource(R.dimen.sh_space_12))
    } else {
        Modifier
    }

    Row(
        modifier = modifier.fillMaxWidth().then(surface),
        horizontalArrangement = when (cta) {
            ShActionNoteCTA.Edit -> Arrangement.spacedBy(gap)
            ShActionNoteCTA.Upgrade -> Arrangement.spacedBy(gap, Alignment.CenterHorizontally)   // centred pair
        },
        verticalAlignment = Alignment.CenterVertically,
    ) {
        when (cta) {
            ShActionNoteCTA.Edit -> {
                Text(
                    text = message,
                    modifier = Modifier.weight(1f).alpha(strong),
                    style = shType().bodySm.copy(fontStyle = FontStyle.Italic),   // Body/SM/Italic
                    color = textColor,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                )
                ShTextLink(
                    label = linkLabel ?: "Edit",
                    onClick = onClick,
                    modifier = Modifier.alpha(strong),                             // Link slot at sh-opacity/strong
                    type = if (resolved == ShActionNoteStyle.Normal) ShTextLinkType.Inverse else ShTextLinkType.Neutral,
                    size = ShTextLinkSize.Small,
                )
            }
            ShActionNoteCTA.Upgrade -> {
                Text(
                    text = actionText,
                    modifier = Modifier.weight(1f, fill = false),
                    style = shType().bodySm,
                    color = textColor,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                )
                ShTextLink(
                    label = linkLabel ?: "Upgrade Now",
                    onClick = onClick,
                    modifier = if (resolved == ShActionNoteStyle.Normal) Modifier.premiumOnImage() else Modifier,
                    type = ShTextLinkType.Premium,
                    size = ShTextLinkSize.Small,
                )
            }
        }
    }
}

/**
 * On the photo (Normal) Figma recolours the Premium link's label and underline to
 * premium/background/solid/default/end so it reads on dark glass.
 */
@Composable
private fun Modifier.premiumOnImage(): Modifier {
    val gold = colorResource(R.color.sh_premium_background_solid_default_end)
    return this
        .graphicsLayer(compositingStrategy = CompositingStrategy.Offscreen)
        .drawWithContent {
            drawContent()
            drawRect(gold, blendMode = BlendMode.SrcIn)
        }
}
