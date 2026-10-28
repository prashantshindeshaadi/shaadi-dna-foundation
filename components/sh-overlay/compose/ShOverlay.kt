// sh-overlay — Jetpack Compose (no XML views)
// Spec: ../sh-overlay.md · Figma node 2314:18393
//
// Shared lock / empty overlay for photos and content sections. It fills the area it is placed on
// (e.g. the overlay slot of ShPhotoWrapper).
//   Message          icon (Photo, Content 24 · Photo full 40) + message + action, over a scrim:
//                    Photo / Photo full: overlay/scrim/default (+ sh-background-blur/uniform/strong in Figma)
//                    Content: sh-gradient/translucent/light/strong (+ sh-background-blur/progressive/default in Figma)
//   No photo         Photo: the 160 slot (Figma keeps the Avatar hidden; pass `avatar` to show one) + title + action.
//                    No fill, no blur: the photo under it (the requested portrait) shows. Photo full draws that portrait.
//   Photo requested  as No photo without the action; optional `status` row (Figma: hidden layer).
//
// Android has no backdrop blur (see ShTokens.kt): the scrim and glass are drawn, the blur behind them is not.
// To hide a locked photo on Android, show it with ShUserImage(style = ShUserImageStyle.Blur) under the Message overlay.
// Uses ShButton (sh-button), ShIcon (sh-icon), ShAvatarPlaceholder, ShUserImage.
// Needs dist/android/values*/ in res/, dist/android/compose/ShTokens.kt and the type kit (ShTypography.kt).
// Set `package` and the `R` import to your app's.

package com.shaadi.dna.components

import androidx.annotation.DrawableRes
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clipToBounds
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.dimensionResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.Dp
import com.shaadi.dna.tokens.ShGradient
import com.shaadi.dna.tokens.ShShadow
import com.shaadi.dna.tokens.shShadow
import com.shaadi.dna.tokens.shType
import com.shaadi.dna.tokens.text
// import com.shaadi.app.R

/** Figma property "Surface". */
enum class ShOverlaySurface { Photo, Content, PhotoFull }

/** Figma property "Type". Content has Message only. */
enum class ShOverlayType { Message, NoPhoto, PhotoRequested }

/**
 * The overlay's action (Figma "Action": sh-button Tertiary Small).
 * @param label button label, e.g. "Request a Photo", "Upgrade to View"
 * @param icon optional leading icon (Figma: Show leading icon, off by default)
 */
data class ShOverlayAction(
    val label: String,
    @DrawableRes val icon: Int? = null,
    val onClick: () -> Unit,
)

/**
 * sh-overlay: Surface × Type.
 *
 * @param surface Photo (profile card photo), PhotoFull (full-width photo, FPV), Content (a section)
 * @param type Message, NoPhoto, PhotoRequested
 * @param icon Message: the icon (Figma "Icon", default sh_icon_line_camera_off). null hides it.
 * @param title No photo / Photo requested text (Figma "Title"). null hides it (Show message off).
 * @param message Message text (Figma "Message"). null hides it (Show message off).
 * @param avatar Photo · No photo / Photo requested: placeholder drawn in the 160 slot (1:1). Figma keeps it hidden.
 * @param action Message / No photo button (Figma "Action"). null hides it (Show action off). Photo requested has none.
 * @param showIcon Figma "Show icon": the icon (Message) or the 160 slot (Photo · No photo / Photo requested)
 * @param status Photo requested: optional status row, e.g. "Photo Requested" (Figma: hidden layer)
 * @param portrait Photo full · No photo / Photo requested: which requested portrait fills the overlay
 */
@Composable
fun ShOverlay(
    surface: ShOverlaySurface = ShOverlaySurface.Photo,
    type: ShOverlayType = ShOverlayType.Message,
    modifier: Modifier = Modifier,
    @DrawableRes icon: Int? = null,
    title: String? = null,
    message: String? = null,
    avatar: ShAvatarPlaceholderGender? = null,
    action: ShOverlayAction? = null,
    showIcon: Boolean = true,
    status: String? = null,
    portrait: ShUserImageRequested = ShUserImageRequested.Female,
) {
    val onImage = surface != ShOverlaySurface.Content
    val isMessage = type == ShOverlayType.Message || surface == ShOverlaySurface.Content
    val space12 = dimensionResource(R.dimen.sh_space_12)

    val background = when {
        surface == ShOverlaySurface.Content -> Modifier.background(ShGradient.translucentLightStrong())
        isMessage -> Modifier.background(colorResource(R.color.sh_overlay_scrim_default))
        else -> Modifier                                                            // Figma: no fill, no blur
    }

    Box(modifier.fillMaxSize().clipToBounds().then(background)) {
        if (surface == ShOverlaySurface.PhotoFull && !isMessage) {
            ShUserImage(requested = portrait, modifier = Modifier.matchParentSize())   // sh-user-images requested, Normal
        }
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(
                    start = dimensionResource(R.dimen.sh_space_page_margin),
                    end = dimensionResource(R.dimen.sh_space_page_margin),
                    top = shOverlayTop(surface, type),
                    bottom = shOverlayBottom(surface),
                ),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(space12, Alignment.Top),
        ) {
            Column(
                modifier = Modifier.fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(space12),
            ) {
                if (showIcon) {
                    if (isMessage) {
                        if (icon != null) {
                            ShIcon(
                                icon = icon,
                                // Photo full: Figma resizes the 24 icon to 40 (unbound); pictogram/size/40 matches
                                size = dimensionResource(
                                    if (surface == ShOverlaySurface.PhotoFull) R.dimen.sh_icon_pictogram_size_40 else R.dimen.sh_icon_size_24,
                                ),
                                paint = ShIconPaint.Tint(colorResource(if (onImage) R.color.sh_icon_on_image else R.color.sh_icon_primary)),
                            )
                        }
                    } else if (surface == ShOverlaySurface.Photo) {
                        val slot = dimensionResource(R.dimen.sh_space_80) * 2                // no token: 160 slot
                        Box(Modifier.size(slot)) {
                            if (avatar != null) {
                                ShAvatarPlaceholder(gender = avatar, aspect = ShAvatarPlaceholderAspect.Square, modifier = Modifier.fillMaxWidth())
                            }
                        }
                    }
                }
                val copy = if (isMessage) message else title
                if (copy != null) {
                    val base = if (!isMessage) shType().titleLg else if (onImage) shType().bodyLg else shType().bodyMd   // title: sh-typo/Title/LG
                    Text(
                        text = copy,
                        modifier = Modifier.fillMaxWidth(),
                        color = colorResource(if (onImage) R.color.sh_text_on_image else R.color.sh_text_primary),
                        textAlign = TextAlign.Center,
                        style = if (onImage) base.copy(shadow = ShShadow.Default.text()) else base,   // sh-shadow/default on photos
                    )
                }
            }
            if (action != null && (isMessage || type != ShOverlayType.PhotoRequested)) {
                ShButton(
                    label = action.label,
                    onClick = action.onClick,
                    modifier = if (onImage) {
                        Modifier.shShadow(ShShadow.Default, RoundedCornerShape(dimensionResource(R.dimen.sh_radius_button)))
                    } else {
                        Modifier
                    },
                    type = ShButtonType.Tertiary,
                    size = ShButtonSize.Small,
                    leadingIcon = action.icon,
                )
            }
            if (status != null && type == ShOverlayType.PhotoRequested && !isMessage) {
                val success = colorResource(R.color.sh_indicator_success)
                Row(
                    modifier = Modifier.padding(vertical = dimensionResource(R.dimen.sh_space_6)),
                    horizontalArrangement = Arrangement.spacedBy(dimensionResource(R.dimen.sh_space_4)),
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    // Figma also shades the glyph with sh-shadow/default; Compose has no glyph-shaped shadow, so only the label has it
                    ShIcon(R.drawable.sh_icon_filled_check, dimensionResource(R.dimen.sh_icon_size_16), paint = ShIconPaint.Tint(success))
                    Text(text = status, color = success, style = shType().buttonSm.copy(shadow = ShShadow.Default.text()))
                }
            }
        }
    }
}

/** Figma top padding (unbound in Figma). */
@Composable
private fun shOverlayTop(surface: ShOverlaySurface, type: ShOverlayType): Dp {
    val s40 = dimensionResource(R.dimen.sh_space_40)
    val s48 = dimensionResource(R.dimen.sh_space_48)
    val s80 = dimensionResource(R.dimen.sh_space_80)
    return when {
        surface == ShOverlaySurface.Content -> s80 + s40                                  // no token: 120
        surface == ShOverlaySurface.Photo && type == ShOverlayType.Message -> s80 + s40   // no token: 120
        surface == ShOverlaySurface.Photo -> s40
        type == ShOverlayType.Message -> s80 + s48                                        // no token: 128 (Photo full)
        // no token: 180 = Message top 128 + its 40 icon + sh-space/12 gap (title lines up with Message's text)
        else -> s80 + s48 + dimensionResource(R.dimen.sh_icon_pictogram_size_40) + dimensionResource(R.dimen.sh_space_12)
    }
}

/** Figma bottom padding: Photo 120, Photo full 0, Content 80. */
@Composable
private fun shOverlayBottom(surface: ShOverlaySurface): Dp = when (surface) {
    ShOverlaySurface.Photo -> dimensionResource(R.dimen.sh_space_80) + dimensionResource(R.dimen.sh_space_40)   // no token: 120
    ShOverlaySurface.PhotoFull -> dimensionResource(R.dimen.sh_space_0)
    ShOverlaySurface.Content -> dimensionResource(R.dimen.sh_space_80)
}
