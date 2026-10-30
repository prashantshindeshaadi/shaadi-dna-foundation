// sh-divider — Jetpack Compose
// Spec: ../sh-divider.md · Figma node 594:31711 (Orientation Horizontal / Vertical × Type Soft / Default / Strong)
//
// Needs dist/android/values*/ in res/. Set `package` and the `R` import to your app's.
// A sh-stroke/default line with radius full: Horizontal fills the width, Vertical fills the height
// (give a Vertical divider a bounded height, e.g. a Row with Modifier.height(IntrinsicSize.Min)).

package com.shaadi.dna.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.dimensionResource
// import com.shaadi.app.R

/** sh-divider Orientation, in Figma order. */
enum class ShDividerOrientation { Horizontal, Vertical }

/** sh-divider Type, in Figma order: border/soft, border/default, border/strong. */
enum class ShDividerType { Soft, Default, Strong }

/** sh-divider: a thin separator between rows or sections. Decorative (no semantics). */
@Composable
fun ShDivider(
    modifier: Modifier = Modifier,
    orientation: ShDividerOrientation = ShDividerOrientation.Horizontal,
    type: ShDividerType = ShDividerType.Soft,
) {
    val stroke = dimensionResource(R.dimen.sh_stroke_default)
    val color = colorResource(when (type) {
        ShDividerType.Soft -> R.color.sh_border_soft
        ShDividerType.Default -> R.color.sh_border_default
        ShDividerType.Strong -> R.color.sh_border_strong
    })
    val shape = RoundedCornerShape(dimensionResource(R.dimen.sh_radius_full))
    Box(
        modifier = modifier
            .then(
                when (orientation) {
                    ShDividerOrientation.Horizontal -> Modifier.fillMaxWidth().height(stroke)
                    ShDividerOrientation.Vertical -> Modifier.fillMaxHeight().width(stroke)
                }
            )
            .background(color, shape),
    )
}
