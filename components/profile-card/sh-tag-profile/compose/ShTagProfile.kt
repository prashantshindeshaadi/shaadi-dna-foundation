// sh-tag-profile — Jetpack Compose (no XML views)
// Spec: ../sh-tag-profile.md · Figma node 2813:41954 · 7 types
//
// Built on sh-tag (components/sh-tag/compose/ShTag.kt, same package): each type is a ShTag with a fixed
// mode, size, shape, icon and paint. All are Size Small (20 tall).
// Drawables (icons/<type>/<name> → sh_icon_<type>_<name>): sh_icon_tag_online, sh_icon_tag_offline,
// sh_icon_line_link_rings, sh_icon_line_astro, sh_icon_filled_megaphone_02, sh_icon_tag_left_wing,
// sh_icon_tag_right_wing (PNG art), sh_icon_tag_pin_location_01.
// Needs dist/android/values*/ in res/ and dist/android/compose/ShTokens.kt. Set `package` and the `R` import to your app's.

package com.shaadi.dna.components

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.dimensionResource
import com.shaadi.dna.tokens.ShGradient
import com.shaadi.dna.tokens.ShShadow
import com.shaadi.dna.tokens.shShadow
// import com.shaadi.app.R

/** Figma "Type", in Figma's order. */
enum class ShTagProfileType { Online, YouAndHer, Astro, Promoted, TopProfile, Distance, Offline }

/**
 * sh-tag-profile: the profile-card tags (status, shared connections, astro, promoted, top profile, distance).
 *
 * @param label Overrides the type's default text, e.g. the member's distance ("2 km") on Distance.
 */
@Composable
fun ShTagProfile(
    type: ShTagProfileType,
    modifier: Modifier = Modifier,
    label: String? = null,
) {
    val size12 = dimensionResource(R.dimen.sh_icon_size_12)
    val size14 = dimensionResource(R.dimen.sh_icon_size_14)
    when (type) {
        ShTagProfileType.Online, ShTagProfileType.Offline -> ShTag(
            label = label ?: if (type == ShTagProfileType.Online) "Online" else "Offline",
            modifier = modifier,
            mode = ShTagMode.TranslucentLight,
            size = ShTagSize.Small,
            shape = ShTagShape.Pill,
            leadingIcon = ShIconSpec(
                if (type == ShTagProfileType.Online) R.drawable.sh_icon_tag_online else R.drawable.sh_icon_tag_offline,
                ShIconPaint.Original,                       // status dot keeps its own colours
            ),
            iconSize = size12,
        )
        ShTagProfileType.YouAndHer -> ShTag(
            label = label ?: "You & Her",
            modifier = modifier,
            mode = ShTagMode.TranslucentLight,
            size = ShTagSize.Small,
            shape = ShTagShape.Rounded,
            leadingIcon = ShIconSpec(R.drawable.sh_icon_line_link_rings, ShIconPaint.Gradient(ShGradient.brandDefault())),
            border = false,
            iconSize = size12,
        )
        ShTagProfileType.Astro -> ShTag(
            label = label ?: "Astro",
            modifier = modifier,
            mode = ShTagMode.TranslucentLight,
            size = ShTagSize.Small,
            shape = ShTagShape.Rounded,
            leadingIcon = ShIconSpec(R.drawable.sh_icon_line_astro, ShIconPaint.Gradient(ShGradient.premiumDefault())),
            border = false,
            iconSize = size12,
        )
        ShTagProfileType.Promoted -> ShTag(
            label = label ?: "Promoted",
            modifier = modifier.photoTagShadow(),
            mode = ShTagMode.White,
            size = ShTagSize.Small,
            shape = ShTagShape.Rounded,
            leadingIcon = ShIconSpec(R.drawable.sh_icon_filled_megaphone_02),   // icon/secondary from the White mode
            iconSize = size12,
        )
        ShTagProfileType.TopProfile -> ShTag(
            label = label ?: "Top Profile",
            modifier = modifier.photoTagShadow(),
            mode = ShTagMode.White,
            size = ShTagSize.Small,
            shape = ShTagShape.Rounded,
            leadingIcon = ShIconSpec(R.drawable.sh_icon_tag_left_wing, ShIconPaint.Original),    // laurel art, 14 tall
            trailingIcon = ShIconSpec(R.drawable.sh_icon_tag_right_wing, ShIconPaint.Original),
            iconSize = size14,
        )
        ShTagProfileType.Distance -> ShTag(
            label = label ?: "20 km",
            modifier = modifier.photoTagShadow(),
            mode = ShTagMode.White,
            size = ShTagSize.Small,
            shape = ShTagShape.Rounded,
            leadingIcon = ShIconSpec(R.drawable.sh_icon_tag_pin_location_01),   // icon/secondary from the White mode
            iconSize = size14,
        )
    }
}

/** Promoted, Top Profile and Distance carry sh-shadow/soft (on the tag's own Rounded shape). */
@Composable
private fun Modifier.photoTagShadow(): Modifier =
    this.shShadow(ShShadow.Soft, RoundedCornerShape(dimensionResource(R.dimen.sh_radius_xs)))
