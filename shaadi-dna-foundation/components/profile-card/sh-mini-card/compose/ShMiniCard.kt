// sh-mini-card — Jetpack Compose (no XML views)
// Spec: ../sh-mini-card.md · Figma node 2780:68360 · Type Default / No photo female / No photo male
//
// Compact profile suggestion: avatar, name + badges, up to three facts and one action (sh-button Primary Small).
// Needs dist/android/values*/ in res/, dist/android/compose/ShTokens.kt, the type kit (ShTypography.kt) and
// ../../../sh-icon/compose/ShIcon.kt · ../../../sh-avatar/compose/ShAvatar.kt (+ sh-avatar-glyph) ·
// ../../sh-user-images/compose/ShUserImages.kt · ../../sh-avatar-placeholder/compose/ShAvatarPlaceholder.kt · ../../sh-info-detail/compose/ShInfoDetail.kt · ../../../sh-button/compose/ShButton.kt
// Set `package` and the `R` import to your app's.

package com.shaadi.dna.components

import androidx.annotation.DrawableRes
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.layout.layout
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.dimensionResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Constraints
import com.shaadi.dna.tokens.ShShadow
import com.shaadi.dna.tokens.shShadow
import com.shaadi.dna.tokens.shType
import kotlin.math.roundToInt
// import com.shaadi.app.R

/** Figma "Type": Default (the member's photo in sh-avatar lg) or No photo female / male (sh-avatar-placeholder 1:1). */
enum class ShMiniCardType { Default, NoPhotoFemale, NoPhotoMale }

/** The badges after the name (Figma Badge 1 / Badge 2 swaps), at Size Small (16). */
enum class ShMiniCardBadge(@DrawableRes val drawable: Int, val label: String) {
    Verified(R.drawable.sh_icon_misc_verified_badge, "Verified"),
    Premium(R.drawable.sh_icon_misc_premium_badge, "Premium"),
}

/** The card's one action: sh-button Primary Small, full width. Figma: "Connect Now" led by filled/check. */
data class ShMiniCardAction(
    val label: String,
    @DrawableRes val icon: Int? = null,
    val onClick: () -> Unit,
)

/**
 * sh-mini-card. The card is not interactive; the action button has its own states.
 *
 * @param name Figma "Name", e.g. "Sneha P, 26". One line; a long name truncates and the badges stay.
 * @param photo the member's photo (Type Default).
 * @param badges Figma "Show badge 1 / 2" + "Badge 1 / 2", in order (Figma default: Verified, Premium).
 * @param details Figma "Show detail 1–3": up to three facts; every fact has a separator except the last one.
 * @param action the button; null hides it.
 */
@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ShMiniCard(
    name: String,
    modifier: Modifier = Modifier,
    type: ShMiniCardType = ShMiniCardType.Default,
    photo: Painter? = null,
    badges: List<ShMiniCardBadge> = emptyList(),
    details: List<String> = emptyList(),
    action: ShMiniCardAction? = null,
) {
    val shape = RoundedCornerShape(dimensionResource(R.dimen.sh_radius_md))
    val stroke = dimensionResource(R.dimen.sh_stroke_default)
    val facts = details.take(3)
    // no token: Figma fixed width 152 = sh-space/80 + sh-space/48 + sh-space/24
    val cardWidth = dimensionResource(R.dimen.sh_space_80) + dimensionResource(R.dimen.sh_space_48) + dimensionResource(R.dimen.sh_space_24)

    Column(
        modifier = modifier
            .width(cardWidth)
            .shShadow(ShShadow.Soft, shape)
            .background(colorResource(R.color.sh_background_default), shape)
            .border(stroke, colorResource(R.color.sh_border_default), shape)
            .padding(stroke)                                                // stroke inside, included in layout
            .padding(dimensionResource(R.dimen.sh_space_12)),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(dimensionResource(R.dimen.sh_space_8)),
    ) {
        when (type) {
            ShMiniCardType.Default -> ShAvatar(size = ShAvatarSize.Lg, type = ShAvatarType.Image, painter = photo)
            ShMiniCardType.NoPhotoFemale -> MiniCardNoPhotoAvatar(ShAvatarPlaceholderGender.Female)
            ShMiniCardType.NoPhotoMale -> MiniCardNoPhotoAvatar(ShAvatarPlaceholderGender.Male)
        }

        // Info: fill × hug, children centred
        Column(
            modifier = Modifier.fillMaxWidth(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(dimensionResource(R.dimen.sh_space_4)),
        ) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(dimensionResource(R.dimen.sh_space_4)),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text(
                    text = name,
                    modifier = Modifier.weight(1f, fill = false),
                    style = shType().titleSm,
                    color = colorResource(R.color.sh_text_primary),
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                )
                if (badges.isNotEmpty()) {
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(dimensionResource(R.dimen.sh_space_2)),
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        badges.forEach { ShBadge(it.drawable, it.label, dimensionResource(R.dimen.sh_icon_size_16)) }
                    }
                }
            }
            if (facts.isNotEmpty()) {
                // Details: wraps, each line centred; facts 6 apart (the fact's own label-to-dot gap), lines 0 apart
                FlowRow(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(dimensionResource(R.dimen.sh_space_6), Alignment.CenterHorizontally),
                    verticalArrangement = Arrangement.spacedBy(dimensionResource(R.dimen.sh_space_0)),
                ) {
                    facts.forEachIndexed { index, fact ->
                        ShInfoDetail(
                            label = fact,
                            modifier = Modifier.align(Alignment.CenterVertically),
                            mode = ShInfoDetailMode.Default,
                            size = ShInfoDetailSize.Small,
                            separator = index < facts.lastIndex,
                        )
                    }
                }
            }
        }

        action?.let {
            ShButton(
                label = it.label,
                onClick = it.onClick,
                type = ShButtonType.Primary,
                size = ShButtonSize.Small,
                leadingIcon = it.icon,
                fill = true,
            )
        }
    }
}

/**
 * Type No photo avatar: the sh-avatar lg ring (icon/on-image) around a background/strong Media holding
 * sh-avatar-placeholder 1:1, filling the Media.
 */
@Composable
private fun MiniCardNoPhotoAvatar(gender: ShAvatarPlaceholderGender) {
    // no token: Figma's ring weight is unbound (1) → sh-stroke/default
    val ring = dimensionResource(R.dimen.sh_stroke_default)
    val shape = RoundedCornerShape(dimensionResource(R.dimen.sh_radius_avatar))
    Box(
        Modifier
            .size(dimensionResource(R.dimen.sh_space_48) * 2)                // no token: Figma avatar 96 = 2 × sh-space/48
            .border(ring, colorResource(R.color.sh_icon_on_image), shape)
            .padding(ring)                                                    // Media sits inside the ring
            .clip(shape)
            .background(colorResource(R.color.sh_background_strong)),
    ) {
        ShAvatarPlaceholder(gender = gender, aspect = ShAvatarPlaceholderAspect.Square, modifier = Modifier.fillMaxSize())
    }
}
