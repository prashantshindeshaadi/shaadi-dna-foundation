// sh-profile-card — Jetpack Compose (no XML views)
// Spec: ../sh-profile-card.md · Figma node 2579:25592
//
// Needs, from `python3 tools/build.py`:
//   dist/android/values*/sh_colors.xml, sh_dimens.xml, sh_opacity.xml   → app/src/main/res/
//   dist/sh-typo-kit/developer/android/ShTypography.kt + res/font/        → ShTypography, LexendSH
// Icons: import icons/<type>/<name>.svg as vector drawables named sh_icon_<type>_<name>
// (hyphens → underscores), e.g. icons/filled/check.svg → R.drawable.sh_icon_filled_check.
// Images: ../../sh-avatar-placeholder/assets/female-1x1@3x.png → drawable-xxxhdpi/sh_avatar_placeholder_female_1x1.png;
// the requested portrait (../../sh-user-images/assets/requested-*.jpg) is passed in as `requestedPortrait`.
//
// Every colour, space, radius, stroke, blur, shadow and opacity is a DNA token resource.
// Gradients are built from their start/end colour tokens (shape drawables can't be a Brush).
// Android has no backdrop blur: glass falls back to the translucent gradient alone.
// Set `package` and the `R` import to your app's.

package com.shaadi.dna.components

import androidx.annotation.DimenRes
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxScope
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.requiredWidth
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.compositionLocalOf
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.blur
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawWithContent
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.BlendMode
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.graphics.CompositingStrategy
import androidx.compose.ui.graphics.Shadow
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.dimensionResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.core.content.res.ResourcesCompat
import com.shaadi.dna.typography.ShTypography
import com.shaadi.dna.typography.ShTypographySet
// import com.shaadi.app.R

// region Model

/** Figma property "Type". Each type sets the photo state, the note and the actions. */
enum class ShProfileCardType { Connect, Received, Connected, Locked, NoPhoto, PhotoRequested, Blocked, Hidden, Vip }

enum class ShProfileTopTag { Promoted, TopProfile }
enum class ShProfileTag { YouAndHer, Astro }

data class ShProfileMember(
    val name: String,
    val age: Int,
    val photo: Painter? = null,
    val photoCount: Int = 0,
    val isOnline: Boolean = false,
    val isVerified: Boolean = false,
    /** One inner list per detail row; the dot sits between facts, never after the last one. */
    val detailRows: List<List<String>> = emptyList(),
    val tags: List<ShProfileTag> = emptyList(),
    val topTag: ShProfileTopTag? = null,
    /** Pre-written message shown on Connect and VIP. */
    val message: String = "",
)

/** Every tap the card can raise (the "Taps" and "Actions" lines of the blueprint). */
data class ShProfileCardActions(
    val onViewPhotos: () -> Unit = {},
    val onMore: () -> Unit = {},
    val onEditMessage: () -> Unit = {},
    val onConnect: () -> Unit = {},
    val onAccept: () -> Unit = {},
    val onDecline: () -> Unit = {},
    val onChat: () -> Unit = {},
    val onWhatsApp: () -> Unit = {},
    val onCall: () -> Unit = {},
    val onUpgradeNow: () -> Unit = {},
    val onUpgradeToView: () -> Unit = {},
    val onUpgradeToConnect: () -> Unit = {},
    val onRequestPhoto: () -> Unit = {},
    val onUnblock: () -> Unit = {},
    val onUnhide: () -> Unit = {},
    val onCallConsultant: () -> Unit = {},
)

// endregion

// region Token helpers

private val LocalShType = compositionLocalOf<ShTypographySet> { ShTypography.mobile }

@Composable private fun c(id: Int) = colorResource(id)
@Composable private fun d(@DimenRes id: Int) = dimensionResource(id)
@Composable private fun opacity(@DimenRes id: Int) = ResourcesCompat.getFloat(LocalContext.current.resources, id)

/** sh-gradient/translucent/dark/soft, 135°. */
@Composable private fun glassFill() = Brush.linearGradient(
    listOf(c(R.color.sh_translucent_background_dark_soft_start), c(R.color.sh_translucent_background_dark_soft_end)))

/** sh-gradient/translucent/dark/extra-soft, 135°. */
@Composable private fun glassFillExtraSoft() = Brush.linearGradient(
    listOf(c(R.color.sh_translucent_background_dark_extra_soft_start), c(R.color.sh_translucent_background_dark_extra_soft_end)))

/** sh-gradient/translucent/light/extra-soft, 135°. */
@Composable private fun lightGlassFill() = Brush.linearGradient(
    listOf(c(R.color.sh_translucent_background_light_extra_soft_start), c(R.color.sh_translucent_background_light_extra_soft_end)))

/** sh-gradient/translucent/border/light (5 stops) or …/light-ring (3 stops), 314°: bottom-right → top-left. */
@Composable private fun glassEdge(ring: Boolean = false): Brush {
    val start = c(R.color.sh_translucent_border_light_start)
    val middle = c(R.color.sh_translucent_border_light_middle)
    val end = c(R.color.sh_translucent_border_light_end)
    val stops = if (ring) arrayOf(0f to start, 0.5f to middle, 1f to end)
    else arrayOf(0f to start, 0.26f to middle, 0.49f to start, 0.76f to middle, 1f to end)
    return Brush.linearGradient(*stops, start = Offset.Infinite, end = Offset.Zero)
}

/** sh-gradient/brand/default, 135°. */
@Composable private fun brandFill() = Brush.linearGradient(
    listOf(c(R.color.sh_button_primary_background_default_start), c(R.color.sh_button_primary_background_default_end)))

/** sh-gradient/premium/default, 135°. */
@Composable private fun premiumFill() = Brush.linearGradient(
    listOf(c(R.color.sh_premium_background_solid_default_start), c(R.color.sh_premium_background_solid_default_end)))

/** sh-gradient/overlay/bottom (down) and overlay/top (up). */
@Composable private fun overlayFill(up: Boolean): Brush {
    val colors = listOf(c(R.color.sh_overlay_image_content_start), c(R.color.sh_overlay_image_content_end))
    return Brush.verticalGradient(if (up) colors.reversed() else colors)
}

/** sh-shadow/default as a text shadow. */
@Composable private fun shadowDefault(): Shadow = with(LocalDensity.current) {
    Shadow(c(R.color.sh_shadow_default_color),
        Offset(d(R.dimen.sh_shadow_default_x).toPx(), d(R.dimen.sh_shadow_default_y).toPx()),
        d(R.dimen.sh_shadow_default_blur).toPx() / 2)
}

/** Translucent dark glass: gradient fill + light gradient edge. */
@Composable private fun Modifier.glass(shape: Shape, ring: Boolean = false, fill: Brush = glassFill()) = this
    .clip(shape)
    .background(fill, shape)
    .border(BorderStroke(d(R.dimen.sh_stroke_default), glassEdge(ring)), shape)

/** 48 × 48 tap area around a smaller visual. */
@Composable private fun Modifier.tapArea() =
    defaultMinSize(minWidth = d(R.dimen.sh_icon_target_default), minHeight = d(R.dimen.sh_icon_target_default))

// endregion

// region Card

@Composable
fun ShProfileCard(
    type: ShProfileCardType,
    member: ShProfileMember,
    modifier: Modifier = Modifier,
    /** Figma property "Show top tags". */
    showTopTags: Boolean = true,
    /** Figma property "Show photo actions". */
    showPhotoActions: Boolean = true,
    /** Photo requested only: the soft requested portrait the app ships, shown full width and top-aligned
     *  (../../sh-user-images/assets/requested-female.jpg or requested-male.jpg). */
    requestedPortrait: Painter? = null,
    actions: ShProfileCardActions = ShProfileCardActions(),
) {
    val shape = RoundedCornerShape(d(R.dimen.sh_radius_lg))
    CompositionLocalProvider(LocalShType provides ShTypography.forWidth(LocalConfiguration.current.screenWidthDp)) {
        Box(
            modifier
                .fillMaxWidth()
                .aspectRatio(340f / 542f)                                   // Figma frame proportion
                .shadow(d(R.dimen.sh_shadow_default_blur) / 2, shape, clip = false,
                    ambientColor = c(R.color.sh_shadow_default_color), spotColor = c(R.color.sh_shadow_default_color))
                .clip(shape)
                .background(c(R.color.sh_background_strong))
                .semantics(mergeDescendants = false) { contentDescription = "${member.name}, ${member.age}" },
        ) {
            Photo(type, member, requestedPortrait)
            Overlay(type, requestedPortrait, actions)
            TopRow(type, member, showTopTags, showPhotoActions, actions,
                Modifier.align(Alignment.TopCenter).padding(d(R.dimen.sh_space_12)))
            Info(type, member, actions, Modifier.align(Alignment.BottomCenter).padding(d(R.dimen.sh_space_12)))
        }
    }
}

// Photo (sh-photo-wrapper)
@Composable
private fun BoxScope.Photo(type: ShProfileCardType, member: ShProfileMember, requestedPortrait: Painter?) {
    val photo = when (type) {
        ShProfileCardType.NoPhoto -> null
        ShProfileCardType.PhotoRequested -> requestedPortrait
        else -> member.photo
    }
    if (photo != null) {
        Image(
            photo, contentDescription = null, contentScale = ContentScale.Crop,
            alignment = if (type == ShProfileCardType.PhotoRequested) Alignment.TopCenter else Alignment.Center,  // requested: top-aligned
            modifier = Modifier.fillMaxSize().then(
                when (type) {
                    ShProfileCardType.Locked -> Modifier.blur(d(R.dimen.sh_translucent_background_blur_strong))  // image Style=Blur
                    else -> Modifier
                }),
        )
    }
    Box(Modifier.align(Alignment.TopCenter).fillMaxWidth().height(d(R.dimen.sh_space_24))
        .alpha(opacity(R.dimen.sh_opacity_strong)).background(overlayFill(up = true)))
    Box(Modifier.align(Alignment.BottomCenter).fillMaxWidth().fillMaxHeight(0.48f).background(overlayFill(up = false)))  // 260 of 542
}

// Photo overlay (sh-overlay)
@Composable
private fun Overlay(type: ShProfileCardType, requestedPortrait: Painter?, actions: ShProfileCardActions) {
    val t = LocalShType.current
    when (type) {
        ShProfileCardType.Locked -> OverlayStack(c(R.color.sh_overlay_scrim_default), d(R.dimen.sh_space_40) * 2) {
            Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(d(R.dimen.sh_space_12))) {
                ShIcon(R.drawable.sh_icon_filled_photo_locked, d(R.dimen.sh_icon_size_24))
                Text("She has shared Photos with\nPremium Members", style = t.bodyMd.copy(shadow = shadowDefault()), textAlign = TextAlign.Center)
            }
            ShButton(ShButtonKind.Tertiary, "Upgrade to View", R.drawable.sh_icon_line_premium, small = true, raised = true,
                onClick = actions.onUpgradeToView)
        }
        ShProfileCardType.NoPhoto -> OverlayStack(c(R.color.sh_overlay_image_base), d(R.dimen.sh_space_40)) {
            Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(d(R.dimen.sh_space_12))) {
                Illustration(painterResource(R.drawable.sh_avatar_placeholder_female_1x1), "No photo")   // the "No Photo Avatar"
                Text("No Photo added yet", style = t.bodyMd.copy(shadow = shadowDefault()))
            }
            ShButton(ShButtonKind.Tertiary, "Request a Photo", R.drawable.sh_icon_line_help_circle, small = true, raised = true,
                onClick = actions.onRequestPhoto)
        }
        // No background blur: the soft portrait shows through the scrim; text carries sh-shadow/default.
        ShProfileCardType.PhotoRequested -> OverlayStack(c(R.color.sh_overlay_scrim_default), d(R.dimen.sh_space_40)) {
            Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(d(R.dimen.sh_space_12))) {
                Illustration(null)                                                  // empty slot keeps the text in place
                Text("No Photo added yet", style = t.bodyMd.copy(shadow = shadowDefault()))
            }
            Row(Modifier.padding(vertical = d(R.dimen.sh_space_6)), horizontalArrangement = Arrangement.spacedBy(d(R.dimen.sh_space_4)),
                verticalAlignment = Alignment.CenterVertically) {
                ShIcon(R.drawable.sh_icon_filled_check, d(R.dimen.sh_icon_size_16), tint = c(R.color.sh_indicator_success))
                Text("Photo Requested", style = t.buttonSm.copy(shadow = shadowDefault()), color = c(R.color.sh_indicator_success))
            }
        }
        else -> Unit
    }
}

/** 160 Icon/Illustration slot of sh-overlay. The placeholder art is drawn full width from the top, unclipped. */
@Composable
private fun Illustration(art: Painter?, label: String? = null) {
    val slot = d(R.dimen.sh_space_80) * 2
    Box(Modifier.size(slot), contentAlignment = Alignment.TopCenter) {
        if (art != null) Image(art, contentDescription = label, contentScale = ContentScale.FillWidth,
            modifier = Modifier.requiredWidth(slot).wrapContentHeight(Alignment.Top, unbounded = true))
    }
}

@Composable
private fun OverlayStack(background: Color, top: Dp, content: @Composable () -> Unit) {
    val side = minOf(d(R.dimen.sh_space_page_margin), d(R.dimen.sh_space_20))   // page/margin, capped inside a card
    Column(
        Modifier.fillMaxSize().background(background).padding(top = top, start = side, end = side),
        verticalArrangement = Arrangement.spacedBy(d(R.dimen.sh_space_8)),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) { ProvideOnImage { content() } }
}

// Top row
@Composable
private fun TopRow(
    type: ShProfileCardType, member: ShProfileMember, showTopTags: Boolean, showPhotoActions: Boolean,
    actions: ShProfileCardActions, modifier: Modifier,
) {
    Row(modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(d(R.dimen.sh_space_8)),
        verticalAlignment = Alignment.CenterVertically) {
        if (showTopTags && member.topTag != null) {
            ShTag(if (member.topTag == ShProfileTopTag.Promoted) "Promoted" else "Top Profile",
                R.drawable.sh_icon_tag_megaphone_03, ShTagStyle.White, ShIconPaint.Tint(c(R.color.sh_icon_secondary)))
        }
        Spacer(Modifier.weight(1f))
        if (showPhotoActions) {
            if (type != ShProfileCardType.Blocked) {
                ShIconButton(R.drawable.sh_icon_filled_image, "View photos", badge = "${member.photoCount}", onClick = actions.onViewPhotos)
            }
            ShIconButton(R.drawable.sh_icon_line_more_vertical, "More options", onClick = actions.onMore)
        }
    }
}

// Info card (sh-profile-card-info)
@Composable
private fun Info(type: ShProfileCardType, member: ShProfileMember, actions: ShProfileCardActions, modifier: Modifier) {
    ProvideOnImage {
        Column(
            // Connect: translucent/dark/soft; every other Type: dark/extra-soft (Android has no backdrop blur)
            modifier.fillMaxWidth()
                .glass(RoundedCornerShape(d(R.dimen.sh_radius_lg)), fill = if (type == ShProfileCardType.Connect) glassFill() else glassFillExtraSoft())
                .padding(start = d(R.dimen.sh_space_16), end = d(R.dimen.sh_space_16),
                    top = d(R.dimen.sh_space_14), bottom = d(R.dimen.sh_space_16)),
            verticalArrangement = Arrangement.spacedBy(d(R.dimen.sh_space_10)),
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(d(R.dimen.sh_space_2))) {
                NameRow(type, member, Modifier.padding(bottom = d(R.dimen.sh_space_2)))
                member.detailRows.forEach { DetailRow(it) }
            }
            if (member.tags.isNotEmpty()) {
                Row(horizontalArrangement = Arrangement.spacedBy(d(R.dimen.sh_space_8))) {
                    member.tags.forEach {
                        if (it == ShProfileTag.YouAndHer) ShTag("You & Her", R.drawable.sh_icon_line_link_rings, ShTagStyle.TranslucentLight,
                            ShIconPaint.Gradient(brandFill()))
                        else ShTag("Astro", R.drawable.sh_icon_line_astro, ShTagStyle.TranslucentLight, ShIconPaint.Gradient(premiumFill()))
                    }
                }
            }
            Box(Modifier.fillMaxWidth().height(d(R.dimen.sh_stroke_default)).alpha(opacity(R.dimen.sh_opacity_extra_soft))
                .background(c(R.color.sh_border_soft)))                                                     // sh-divider Soft
            Column(verticalArrangement = Arrangement.spacedBy(d(if (type == ShProfileCardType.Connected) R.dimen.sh_space_8 else R.dimen.sh_space_12))) {
                Note(type, member, actions)
                ActionRow(type, actions)
            }
        }
    }
}

@Composable
private fun NameRow(type: ShProfileCardType, member: ShProfileMember, modifier: Modifier) {
    val t = LocalShType.current
    Row(modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(d(R.dimen.sh_space_6)),
        verticalAlignment = Alignment.CenterVertically) {
        // Long names cut with … before the age; the age never truncates.
        Text(member.name, style = t.headingSm, maxLines = 1, overflow = TextOverflow.Ellipsis, modifier = Modifier.weight(1f, fill = false))
        Text("${member.age}", style = t.headingSm)
        if (type == ShProfileCardType.Vip) ShBadge(R.drawable.sh_icon_misc_vip_badge, "VIP")
        if (member.isOnline) ShTag("Online", R.drawable.sh_icon_tag_online, ShTagStyle.TranslucentLight, ShIconPaint.Original,
            pill = true, border = true)
        Spacer(Modifier.weight(1f))
        if (member.isVerified) ShBadge(R.drawable.sh_icon_misc_verified_badge, "Verified")
    }
}

/** sh-info-detail (Mode On image, Size Medium): fact · fact, dot only between facts. */
@Composable
private fun DetailRow(facts: List<String>) {
    val t = LocalShType.current
    Row(horizontalArrangement = Arrangement.spacedBy(d(R.dimen.sh_space_8)), verticalAlignment = Alignment.CenterVertically) {
        facts.forEachIndexed { i, fact ->
            if (i > 0) Box(Modifier.size(3.dp).alpha(opacity(R.dimen.sh_opacity_strong)).clip(CircleShape)
                .background(c(R.color.sh_text_on_image)))                                                   // separator dot
            Text(fact, style = t.bodyMd)
        }
    }
}

// Note (sh-action-note)
@Composable
private fun Note(type: ShProfileCardType, member: ShProfileMember, actions: ShProfileCardActions) {
    val t = LocalShType.current
    when (type) {
        ShProfileCardType.Connect, ShProfileCardType.Vip -> Row(verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(d(R.dimen.sh_space_8))) {
            Text(member.message, style = t.bodySm.copy(fontStyle = FontStyle.Italic), maxLines = 1, overflow = TextOverflow.Ellipsis,
                modifier = Modifier.weight(1f).alpha(opacity(R.dimen.sh_opacity_strong)))
            ShTextLink("Edit", onClick = actions.onEditMessage)
        }
        ShProfileCardType.Connected -> Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically,   // Type=Action: centred
            horizontalArrangement = Arrangement.spacedBy(d(R.dimen.sh_space_8), Alignment.CenterHorizontally)) {
            Text("To contact her directly", style = t.bodySm)
            ShTextLink("Upgrade Now", premium = true, onClick = actions.onUpgradeNow)
        }
        else -> Unit
    }
}

// Action row (sh-action-row)
@Composable
private fun ActionRow(type: ShProfileCardType, actions: ShProfileCardActions) {
    val gap = Arrangement.spacedBy(d(R.dimen.sh_space_8))
    when (type) {
        ShProfileCardType.Connect -> Single("Like this profile?") {
            ShButton(ShButtonKind.Primary, "Connect", R.drawable.sh_icon_filled_check, onClick = actions.onConnect)
        }
        ShProfileCardType.Received -> Row(horizontalArrangement = gap) {
            ShButton(ShButtonKind.Tertiary, "Decline", R.drawable.sh_icon_line_close, Modifier.weight(1f), fill = true, onClick = actions.onDecline)
            ShButton(ShButtonKind.Primary, "Accept", R.drawable.sh_icon_filled_check, Modifier.weight(1f), fill = true, onClick = actions.onAccept)
        }
        ShProfileCardType.Connected -> Row(horizontalArrangement = gap) {
            ShLabelledAction("Shaadi Chat", R.drawable.sh_icon_line_chat, onClick = actions.onChat)
            ShLabelledAction("WhatsApp", R.drawable.sh_icon_line_whatsapp, onClick = actions.onWhatsApp)
            ShLabelledAction("Call", R.drawable.sh_icon_line_phone, onClick = actions.onCall)
        }
        ShProfileCardType.Locked -> Single("Like this profile?") {
            ShButton(ShButtonKind.PremiumSolid, "Upgrade to Connect", onClick = actions.onUpgradeToConnect)
        }
        ShProfileCardType.NoPhoto, ShProfileCardType.PhotoRequested -> Single("Like this profile?") {
            ShButton(ShButtonKind.Primary, "Connect Now", R.drawable.sh_icon_filled_check, onClick = actions.onConnect)
        }
        ShProfileCardType.Blocked -> Single("You blocked her") {
            ShButton(ShButtonKind.Tertiary, "Unblock", onClick = actions.onUnblock)
        }
        ShProfileCardType.Hidden -> Single("You hid her profile") {
            ShButton(ShButtonKind.Tertiary, "Unhide Her", onClick = actions.onUnhide)
        }
        ShProfileCardType.Vip -> Row(horizontalArrangement = gap) {
            ShButton(ShButtonKind.Secondary, "Call Consultant", sublabel = "VIP Managed Profile", modifier = Modifier.weight(1f),
                fill = true, onClick = actions.onCallConsultant)
            ShButton(ShButtonKind.Primary, "Connect", R.drawable.sh_icon_filled_check, Modifier.weight(1f), fill = true, onClick = actions.onConnect)
        }
    }
}

@Composable
private fun Single(message: String, button: @Composable () -> Unit) {
    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(d(R.dimen.sh_space_16)),
        verticalAlignment = Alignment.CenterVertically) {
        Text(message, style = LocalShType.current.bodyMdTight, modifier = Modifier.weight(1f))
        button()
    }
}

// endregion

// region Parts (named after their DNA components; move to their own folders when those get code)

/** Text and icons on the photo use text/on-image. */
@Composable
private fun ProvideOnImage(content: @Composable () -> Unit) {
    CompositionLocalProvider(
        androidx.compose.material3.LocalContentColor provides c(R.color.sh_text_on_image),
        content = content,
    )
}

@Composable
private fun ShIcon(id: Int, size: Dp, tint: Color = androidx.compose.material3.LocalContentColor.current) {
    Image(painterResource(id), contentDescription = null, colorFilter = ColorFilter.tint(tint), modifier = Modifier.size(size))
}

@Composable
private fun ShBadge(id: Int, label: String) {
    Image(painterResource(id), contentDescription = label)   // badges keep their own colours
}

private enum class ShTagStyle { White, TranslucentLight }

/** How a tag icon is painted: a colour token, a gradient token, or its own colours. */
private sealed interface ShIconPaint {
    data class Tint(val color: Color) : ShIconPaint
    data class Gradient(val brush: Brush) : ShIconPaint
    data object Original : ShIconPaint
}

/** sh-tag: White (Medium) on the photo, Translucent light (Small) on glass. Only the Online pill has an edge. */
@Composable
private fun ShTag(label: String, icon: Int, style: ShTagStyle, paint: ShIconPaint? = null, pill: Boolean = false, border: Boolean = false) {
    val shape = RoundedCornerShape(d(if (pill) R.dimen.sh_radius_full else R.dimen.sh_radius_xs))
    val fg = c(if (style == ShTagStyle.White) R.color.sh_text_secondary else R.color.sh_text_on_image)
    val base = Modifier.clip(shape)
    val look = when {
        style == ShTagStyle.White -> base.background(c(R.color.sh_background_default), shape)
        border -> base.background(lightGlassFill(), shape).border(BorderStroke(d(R.dimen.sh_stroke_thin), glassEdge()), shape)
        else -> base.background(lightGlassFill(), shape)
    }
    val size = d(R.dimen.sh_icon_size_12)
    Row(look.padding(horizontal = d(R.dimen.sh_space_4), vertical = d(R.dimen.sh_space_2)),
        horizontalArrangement = Arrangement.spacedBy(d(R.dimen.sh_space_2)), verticalAlignment = Alignment.CenterVertically) {
        when (paint) {
            null -> ShIcon(icon, size, tint = fg)
            is ShIconPaint.Tint -> ShIcon(icon, size, tint = paint.color)
            is ShIconPaint.Gradient -> Image(painterResource(icon), contentDescription = null, modifier = Modifier.size(size)
                .graphicsLayer(compositingStrategy = CompositingStrategy.Offscreen)
                .drawWithContent { drawContent(); drawRect(paint.brush, blendMode = BlendMode.SrcIn) })   // gradient through the glyph
            ShIconPaint.Original -> Image(painterResource(icon), contentDescription = null, modifier = Modifier.size(size))
        }
        Text(label, style = LocalShType.current.supportLabel, color = fg, maxLines = 1)
    }
}

/** sh-icon-button, Type Translucent, Size Small. 48 × 48 tap area. */
@Composable
private fun ShIconButton(icon: Int, label: String, badge: String? = null, onClick: () -> Unit) {
    Box(Modifier.tapArea().clickable(role = Role.Button, onClick = onClick).semantics { contentDescription = label },
        contentAlignment = Alignment.Center) {
        Row(Modifier.glass(CircleShape, ring = true).padding(d(R.dimen.sh_space_8)),
            horizontalArrangement = Arrangement.spacedBy(d(R.dimen.sh_space_4)), verticalAlignment = Alignment.CenterVertically) {
            ShIcon(icon, d(R.dimen.sh_icon_size_16), tint = c(R.color.sh_icon_on_image))
            if (badge != null) Text(badge, style = LocalShType.current.bodySm, color = c(R.color.sh_text_on_image))
        }
    }
}

@Composable
private fun ShTextLink(label: String, premium: Boolean = false, onClick: () -> Unit) {
    val t = LocalShType.current
    Box(Modifier.defaultMinSize(minHeight = d(R.dimen.sh_icon_target_default)).clickable(role = Role.Button, onClick = onClick),
        contentAlignment = Alignment.Center) {
        Text(
            label,
            style = t.buttonSm.copy(textDecoration = TextDecoration.Underline),     // sh-text-link Size Small
            color = c(if (premium) R.color.sh_premium_background_solid_default_end else R.color.sh_text_on_image),
            modifier = Modifier.alpha(if (premium) 1f else opacity(R.dimen.sh_opacity_strong)),
        )
    }
}

private enum class ShButtonKind { Primary, Secondary, Tertiary, PremiumSolid }

/** sh-button, Size Medium (Small on photo overlays). 40 tall, 48 tap area. */
@Composable
private fun ShButton(
    kind: ShButtonKind, label: String, icon: Int? = null, modifier: Modifier = Modifier,
    sublabel: String? = null, small: Boolean = false, fill: Boolean = false,
    /** sh-shadow/default under the button (photo overlays). */
    raised: Boolean = false, onClick: () -> Unit,
) {
    val t = LocalShType.current
    val shape = CircleShape
    val fg = c(when (kind) {
        ShButtonKind.Primary -> R.color.sh_button_primary_text_default
        ShButtonKind.Secondary -> R.color.sh_button_secondary_text_default
        ShButtonKind.Tertiary -> R.color.sh_button_tertiary_text_default
        ShButtonKind.PremiumSolid -> R.color.sh_premium_text_on_solid
    })
    val surface = when (kind) {
        ShButtonKind.Primary -> Modifier.background(brandFill(), shape)
        ShButtonKind.Secondary -> Modifier.background(c(R.color.sh_button_secondary_background_default), shape)
        ShButtonKind.Tertiary -> Modifier.background(c(R.color.sh_button_tertiary_background_default), shape)
        ShButtonKind.PremiumSolid -> Modifier.background(premiumFill(), shape)
    }
    Box(modifier.tapArea().clickable(role = Role.Button, onClick = onClick), contentAlignment = Alignment.Center) {
        Column(
            Modifier.then(if (small) Modifier else Modifier.defaultMinSize(minHeight = d(R.dimen.sh_space_40)))
                .then(if (fill) Modifier.fillMaxWidth() else Modifier)
                .then(if (raised) Modifier.shadow(d(R.dimen.sh_shadow_default_blur) / 2, shape,
                    ambientColor = c(R.color.sh_shadow_default_color), spotColor = c(R.color.sh_shadow_default_color)) else Modifier)
                .clip(shape).then(surface)
                .padding(horizontal = d(R.dimen.sh_space_12), vertical = d(if (small) R.dimen.sh_space_6 else R.dimen.sh_space_10)),
            horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center,
        ) {
            Row(horizontalArrangement = Arrangement.spacedBy(d(R.dimen.sh_space_4)), verticalAlignment = Alignment.CenterVertically) {
                if (icon != null) ShIcon(icon, d(if (small) R.dimen.sh_icon_size_12 else R.dimen.sh_icon_size_16), tint = fg)
                Text(label, style = if (small) t.buttonSm else t.buttonMd, color = fg, maxLines = 1)
            }
            if (sublabel != null) Text(sublabel, style = t.supportMeta, color = c(R.color.sh_button_secondary_text_subtext))
        }
    }
}

/** sh-icon-button-with-label (Connected: Shaadi Chat, WhatsApp, Call). */
@Composable
private fun RowScope.ShLabelledAction(label: String, icon: Int, onClick: () -> Unit) {
    Column(Modifier.weight(1f).clickable(role = Role.Button, onClick = onClick),
        horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(d(R.dimen.sh_space_4))) {
        Box(Modifier.fillMaxWidth().clip(CircleShape)                                  // sh-icon-button Secondary Medium
            .background(c(R.color.sh_button_secondary_background_default)).padding(d(R.dimen.sh_space_10)),
            contentAlignment = Alignment.Center) {
            ShIcon(icon, d(R.dimen.sh_icon_size_20), tint = c(R.color.sh_button_secondary_text_default))
        }
        Text(label, style = LocalShType.current.supportLabel, color = c(R.color.sh_text_on_image))
    }
}

// endregion
