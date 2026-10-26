// sh-info-detail — Jetpack Compose (no XML views)
// Spec: ../sh-info-detail.md · Figma node 2825:43215 · Mode On image / Default × Size Medium / Small
//
// One member fact (height, community, city, profession) followed by a dot separator, plus
// ShInfoDetailRow, which lines facts up in a wrapping row and drops the dot after the last one.
// Needs dist/android/values*/ in res/, dist/android/compose/ShTokens.kt and the type kit (ShTypography.kt).
// Every value is a DNA token except the dot size (see below). Set `package` and the `R` import to your app's.

package com.shaadi.dna.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.dimensionResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.shaadi.dna.tokens.shOpacity
import com.shaadi.dna.tokens.shType
// import com.shaadi.app.R

/** Figma "Mode": On image (text/on-image, for dark glass and photos) or Default (text/secondary, light surfaces). */
enum class ShInfoDetailMode { OnImage, Default }

/** Figma "Size": Medium = Body/MD/Default, gap 8 · Small = Body/SM/Tight, gap 6. */
enum class ShInfoDetailSize { Medium, Small }

/**
 * sh-info-detail: one member fact followed by a dot separator. Not interactive.
 *
 * @param separator Figma "Show separator". Turn it off on the last fact of a row (ShInfoDetailRow does this).
 */
@Composable
fun ShInfoDetail(
    label: String,
    modifier: Modifier = Modifier,
    mode: ShInfoDetailMode = ShInfoDetailMode.OnImage,
    size: ShInfoDetailSize = ShInfoDetailSize.Medium,
    separator: Boolean = true,
) {
    val color = infoDetailColor(mode)
    Row(
        modifier = modifier,
        horizontalArrangement = Arrangement.spacedBy(infoDetailGap(size)),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(text = label, style = infoDetailStyle(size), color = color, maxLines = 1, softWrap = false)
        if (separator) {
            Box(
                Modifier
                    .size(3.dp)                    // no token: Figma's separator dot is an unbound 3 × 3 ellipse
                    .alpha(shOpacity(R.dimen.sh_opacity_strong))
                    .background(color, CircleShape)
            )
        }
    }
}

/**
 * A row of facts that wraps onto new lines. Every fact has a separator except the last one; the gap between
 * facts equals the fact's own label-to-dot gap, so the dot sits centred. Lines are sh-space/2 apart.
 */
@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ShInfoDetailRow(
    facts: List<String>,
    modifier: Modifier = Modifier,
    mode: ShInfoDetailMode = ShInfoDetailMode.OnImage,
    size: ShInfoDetailSize = ShInfoDetailSize.Medium,
) {
    FlowRow(
        modifier = modifier,
        horizontalArrangement = Arrangement.spacedBy(infoDetailGap(size)),
        verticalArrangement = Arrangement.spacedBy(dimensionResource(R.dimen.sh_space_2)),
    ) {
        facts.forEachIndexed { index, fact ->
            ShInfoDetail(
                label = fact,
                modifier = Modifier.align(Alignment.CenterVertically),
                mode = mode,
                size = size,
                separator = index < facts.lastIndex,
            )
        }
    }
}

@Composable
private fun infoDetailColor(mode: ShInfoDetailMode): Color = when (mode) {
    ShInfoDetailMode.OnImage -> colorResource(R.color.sh_text_on_image)
    ShInfoDetailMode.Default -> colorResource(R.color.sh_text_secondary)
}

@Composable
private fun infoDetailGap(size: ShInfoDetailSize): Dp = when (size) {
    ShInfoDetailSize.Medium -> dimensionResource(R.dimen.sh_space_8)
    ShInfoDetailSize.Small -> dimensionResource(R.dimen.sh_space_6)
}

@Composable
private fun infoDetailStyle(size: ShInfoDetailSize): TextStyle = when (size) {
    ShInfoDetailSize.Medium -> shType().bodyMd
    ShInfoDetailSize.Small -> shType().bodySmTight
}
