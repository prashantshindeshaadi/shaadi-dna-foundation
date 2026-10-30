// sh-profile-card-info — Jetpack Compose (no XML views)
// Spec: ../sh-profile-card-info.md · Figma node 2496:27797 (1 variant; booleans and slots as parameters)
//
// Profile summary on a card: name, age, trust badges, status, key details, optional tags and the action island,
// on dark glass over the photo. Built from sh-tag-profile, sh-info-detail, sh-divider, sh-icon (ShBadge) and the
// island you pass in (normally ShActionIsland, Style Normal) — all in the same package.
// Needs dist/android/values*/ in res/, dist/android/compose/ShTokens.kt and the type kit (ShTypography.kt).
// Every value is a DNA token. Set `package` and the `R` import to your app's. Not interactive itself.
//
// Glass: sh-gradient/translucent/dark/extra-soft + edge sh-gradient/translucent/border/light. The Figma background
// blur (sh-background-blur/uniform/default) has no Android equivalent behind a composable; the glass is drawn
// without it, as the token helpers do.

package com.shaadi.dna.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clipToBounds
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.dimensionResource
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextOverflow
import com.shaadi.dna.tokens.ShGradient
import com.shaadi.dna.tokens.shGlass
import com.shaadi.dna.tokens.shOpacity
import com.shaadi.dna.tokens.shType
// import com.shaadi.app.R

/** Figma "Badge 2" / "Badge 3": the trust badges after the age. */
enum class ShProfileBadge { Premium, Vip }

/**
 * sh-profile-card-info. Long names are cut with … before the age; the age, badges, status and verified badge
 * never shrink.
 *
 * @param name Figma "Name"
 * @param age Figma "Age"
 * @param status Figma "Show status": Online / Offline tag after the name; null hides it
 * @param tags Figma "Show tags": the profile tags row (You & Her, Astro); empty hides it
 * @param verified Figma "Verified": the verified badge at the far right
 * @param badges Figma "Show badge 2" / "Show badge 3": premium and VIP badges after the age
 * @param details Figma "Show detail 1–4": one inner list per line; the dot sits between facts, never after the
 *   last one of a line; empty hides them
 * @param island Figma "Actions": normally ShActionIsland(…, style = ShActionIslandStyle.Normal)
 */
@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ShProfileCardInfo(
    name: String,
    age: Int,
    modifier: Modifier = Modifier,
    status: ShTagProfileType? = ShTagProfileType.Online,
    tags: List<ShTagProfileType> = emptyList(),
    verified: Boolean = false,
    badges: List<ShProfileBadge> = emptyList(),
    details: List<List<String>> = emptyList(),
    island: @Composable () -> Unit,
) {
    val shape = RoundedCornerShape(dimensionResource(R.dimen.sh_radius_lg))
    val space2 = dimensionResource(R.dimen.sh_space_2)
    val space6 = dimensionResource(R.dimen.sh_space_6)
    val space8 = dimensionResource(R.dimen.sh_space_8)
    val space16 = dimensionResource(R.dimen.sh_space_16)
    val onImage = colorResource(R.color.sh_text_on_image)
    val badgeHeight = dimensionResource(R.dimen.sh_icon_size_20)

    Column(
        modifier = modifier
            .fillMaxWidth()
            .shGlass(shape, ShGradient.translucentDarkExtraSoft(), ShGradient.translucentBorderLight())
            .padding(start = space16, top = dimensionResource(R.dimen.sh_space_14), end = space16, bottom = space16),
        verticalArrangement = Arrangement.spacedBy(dimensionResource(R.dimen.sh_space_10)),
    ) {
        // Content box: name row + details
        Column(verticalArrangement = Arrangement.spacedBy(space2)) {
            // Name row: Name · Age · badges · status … verified at the far right
            Row(
                modifier = Modifier.fillMaxWidth().clipToBounds().padding(bottom = space2),
                horizontalArrangement = Arrangement.spacedBy(space6),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Row(
                    modifier = Modifier.weight(1f).semantics(mergeDescendants = true) { heading() },
                    horizontalArrangement = Arrangement.spacedBy(space6),
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Text(
                        text = name,
                        modifier = Modifier.weight(1f, fill = false),     // the name gives way first
                        style = shType().headingSm,
                        color = onImage,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis,
                    )
                    Text(text = age.toString(), style = shType().headingSm, color = onImage, maxLines = 1, softWrap = false)
                    badges.forEach { badge ->
                        when (badge) {
                            ShProfileBadge.Premium -> ShBadge(R.drawable.sh_icon_misc_premium_badge, "Premium", badgeHeight)
                            ShProfileBadge.Vip -> ShBadge(R.drawable.sh_icon_misc_vip_badge, "VIP", badgeHeight)
                        }
                    }
                    if (status != null) ShTagProfile(status)
                }
                if (verified) {
                    Spacer(Modifier.width(dimensionResource(R.dimen.sh_space_0)))   // Figma Spacer: one more gap before the badge
                    ShBadge(R.drawable.sh_icon_misc_verified_badge, "Verified", badgeHeight)
                }
            }
            if (details.isNotEmpty()) {
                Column(verticalArrangement = Arrangement.spacedBy(space2)) {
                    details.forEach { line ->
                        ShInfoDetailRow(facts = line, mode = ShInfoDetailMode.OnImage, size = ShInfoDetailSize.Medium)
                    }
                }
            }
        }
        if (tags.isNotEmpty()) {
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(space8),
                verticalArrangement = Arrangement.spacedBy(space8),
            ) {
                tags.forEach { tag -> ShTagProfile(tag, modifier = Modifier.align(Alignment.CenterVertically)) }
            }
        }
        ShDivider(
            modifier = Modifier.alpha(shOpacity(R.dimen.sh_opacity_extra_soft)),
            orientation = ShDividerOrientation.Horizontal,
            type = ShDividerType.Soft,
        )
        island()
    }
}
