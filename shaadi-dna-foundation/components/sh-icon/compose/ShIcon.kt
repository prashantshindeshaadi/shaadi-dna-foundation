// sh-icon — Jetpack Compose
// Icon map: ../../icons.md
//
// Import icons/<type>/<name>.svg as vector drawables named sh_icon_<type>_<name> (hyphens → underscores),
// e.g. icons/line/close.svg → R.drawable.sh_icon_line_close. Badges: icons/misc/<name>.svg → sh_icon_misc_<name>.
// Set `package` and the `R` import to your app's.

package com.shaadi.dna.components

import androidx.annotation.DrawableRes
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.material3.LocalContentColor
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawWithContent
import androidx.compose.ui.graphics.BlendMode
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.graphics.CompositingStrategy
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.Dp
// import com.shaadi.app.R

/** How an icon glyph is painted: the content colour, a colour token, a gradient token, or its own colours. */
sealed interface ShIconPaint {
    data object Inherit : ShIconPaint
    data class Tint(val color: Color) : ShIconPaint
    data class Gradient(val brush: Brush) : ShIconPaint
    data object Original : ShIconPaint
}

/** An icon plus its paint, for components that take an icon as a property (tags, buttons, links). */
data class ShIconSpec(@DrawableRes val icon: Int, val paint: ShIconPaint = ShIconPaint.Inherit)

/** sh-icon at one of the sh-icon/size tokens (12, 16, 20, 24). Decorative unless a description is given. */
@Composable
fun ShIcon(
    @DrawableRes icon: Int,
    size: Dp,
    modifier: Modifier = Modifier,
    paint: ShIconPaint = ShIconPaint.Inherit,
    contentDescription: String? = null,
) {
    val painter = painterResource(icon)
    val sized = modifier.size(size)
    when (paint) {
        ShIconPaint.Inherit -> Image(painter, contentDescription, sized, colorFilter = ColorFilter.tint(LocalContentColor.current))
        is ShIconPaint.Tint -> Image(painter, contentDescription, sized, colorFilter = ColorFilter.tint(paint.color))
        is ShIconPaint.Gradient -> Image(painter, contentDescription, sized
            .graphicsLayer(compositingStrategy = CompositingStrategy.Offscreen)
            .drawWithContent { drawContent(); drawRect(paint.brush, blendMode = BlendMode.SrcIn) })   // gradient through the glyph
        ShIconPaint.Original -> Image(painter, contentDescription, sized)
    }
}

@Composable
fun ShIcon(spec: ShIconSpec, size: Dp, modifier: Modifier = Modifier, contentDescription: String? = null) =
    ShIcon(spec.icon, size, modifier, spec.paint, contentDescription)

/** Badges (sh-icon/verified-badge, premium-badge, vip-badge) keep their own colours; sized by height. */
@Composable
fun ShBadge(@DrawableRes icon: Int, label: String, height: Dp, modifier: Modifier = Modifier) {
    Image(painterResource(icon), contentDescription = label, modifier = modifier.height(height), contentScale = ContentScale.FillHeight)
}
