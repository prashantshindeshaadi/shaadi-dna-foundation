// sh-profile-card — Jetpack Compose (no XML views)
// Spec: ../sh-profile-card.md · Figma node 2579:25592
//
// Built only from DNA components (each in its own folder, same package):
//   sh-photo-wrapper, sh-user-images, sh-overlay, sh-profile-card-info (sh-tag-profile, sh-info-detail,
//   sh-divider, sh-action-island, sh-action-note, sh-button, sh-icon-button-with-label), sh-icon-button, sh-icon.
// Needs dist/android/values*/ in res/, dist/android/compose/ShTokens.kt and the type kit (ShTypography.kt).
// Every value is a DNA token. Set `package` and the `R` import to your app's.

package com.shaadi.dna.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.res.dimensionResource
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import com.shaadi.dna.tokens.ShShadow
import com.shaadi.dna.tokens.shShadow
// import com.shaadi.app.R

// region Model

/** Figma property "Type". Each type sets the photo state, what the info shows and the actions. */
enum class ShProfileCardType { Connect, Received, PostConnect, Gated, NoPhoto, PhotoRequested, Blocked, Vip, WithOverlay, Declined }

data class ShProfileMember(
    val name: String,
    val age: Int,
    val photo: Painter? = null,
    val photoCount: Int = 0,
    /** Online / Offline status tag beside the name; null hides it. */
    val status: ShTagProfileType? = ShTagProfileType.Online,
    val isVerified: Boolean = false,
    val isPremium: Boolean = false,
    /** One inner list per detail row; the dot sits between facts, never after the last one. */
    val detailRows: List<List<String>> = emptyList(),
    /** Profile tags under the details (You & Her, Astro). */
    val tags: List<ShTagProfileType> = emptyList(),
    /** The tag at top left (Promoted, Top Profile, Distance); null hides it. */
    val topTag: ShTagProfileType? = null,
    /** Text for a Distance top tag, e.g. "2 km away". */
    val topTagLabel: String? = null,
    /** Pre-written message shown in the note (Connect, VIP, With Overlay). */
    val message: String = "",
)

/** Content of the With Overlay type (sh-overlay Surface Photo, Type Message). */
data class ShProfileCardOverlay(
    val actionLabel: String,
    val icon: Int = R.drawable.sh_icon_filled_photo_locked,
    val message: String = "She has shared Photos\nwith Premium Members",
    val actionIcon: Int? = null,
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
    val onUpgradeToConnect: () -> Unit = {},
    val onRequestPhoto: () -> Unit = {},
    val onUnblock: () -> Unit = {},
    val onCallConsultant: () -> Unit = {},
    val onOverlayAction: () -> Unit = {},
)

// endregion

@Composable
fun ShProfileCard(
    type: ShProfileCardType,
    member: ShProfileMember,
    modifier: Modifier = Modifier,
    /** Figma property "Show top tags". */
    showTopTags: Boolean = true,
    /** Figma property "Show photo actions". */
    showPhotoActions: Boolean = true,
    /** No photo / Photo requested: the member's gender, for the overlay's silhouette. There is no photo to draw:
     *  sh-overlay brings its own background. */
    noPhotoGender: ShAvatarPlaceholderGender = ShAvatarPlaceholderGender.Female,
    /** With Overlay: what the overlay says and its action. */
    overlay: ShProfileCardOverlay? = null,
    actions: ShProfileCardActions = ShProfileCardActions(),
) {
    val shape = RoundedCornerShape(dimensionResource(R.dimen.sh_radius_lg))
    val space12 = dimensionResource(R.dimen.sh_space_12)

    // What each Type shows (as the Figma variants render)
    val photo = if (type == ShProfileCardType.NoPhoto || type == ShProfileCardType.PhotoRequested) null else member.photo   // no photo: sh-overlay draws it
    val showsTopRow = type != ShProfileCardType.NoPhoto && type != ShProfileCardType.PhotoRequested
    val showsPhotoCount = type != ShProfileCardType.Blocked
    val showsDetails = type != ShProfileCardType.PostConnect
    val showsTags = type != ShProfileCardType.PostConnect && type != ShProfileCardType.Blocked
    val showsTrust = type in setOf(ShProfileCardType.Connect, ShProfileCardType.Received, ShProfileCardType.PostConnect,
        ShProfileCardType.Vip, ShProfileCardType.WithOverlay, ShProfileCardType.Declined)
    val badges = when {
        !showsTrust -> emptyList()
        type == ShProfileCardType.Vip -> listOf(ShProfileBadge.Vip)
        member.isPremium -> listOf(ShProfileBadge.Premium)
        else -> emptyList()
    }

    Box(
        modifier
            .fillMaxWidth()
            .aspectRatio(340f / 542f)                                       // Figma frame proportion
            .shShadow(ShShadow.Default, shape)
            .clip(shape)
            .semantics { contentDescription = "${member.name}, ${member.age}" },
    ) {
        ShPhotoWrapper(
            showTopScrim = true,
            showBottomScrim = true,
            image = { ShUserImage(painter = photo, style = ShUserImageStyle.Normal) },
            overlay = when (type) {
                ShProfileCardType.NoPhoto -> ({
                    ShOverlay(
                        surface = ShOverlaySurface.Photo, type = ShOverlayType.NoPhoto, title = "No Photo added yet", avatar = noPhotoGender,
                        action = ShOverlayAction("Request a Photo", R.drawable.sh_icon_line_help_circle, actions.onRequestPhoto),
                    )
                })
                ShProfileCardType.PhotoRequested -> ({
                    ShOverlay(surface = ShOverlaySurface.Photo, type = ShOverlayType.PhotoRequested, title = "Photo request sent", avatar = noPhotoGender)
                })
                ShProfileCardType.WithOverlay -> ({
                    val o = overlay ?: ShProfileCardOverlay("Upgrade to View", actionIcon = R.drawable.sh_icon_line_premium)
                    ShOverlay(
                        surface = ShOverlaySurface.Photo, type = ShOverlayType.Message, icon = o.icon, message = o.message,
                        action = ShOverlayAction(o.actionLabel, o.actionIcon, actions.onOverlayAction),
                    )
                })
                else -> null
            },
        )

        // Info (sh-profile-card-info + sh-action-island)
        ShProfileCardInfo(
            name = member.name,
            age = member.age,
            modifier = Modifier.align(Alignment.BottomCenter).padding(space12),
            status = member.status,
            tags = if (showsTags) member.tags else emptyList(),
            verified = showsTrust && member.isVerified,
            badges = badges,
            details = if (showsDetails) member.detailRows else emptyList(),
            island = { Island(type, member, actions) },
        )

        // Top row
        if (showsTopRow) {
            Row(
                Modifier.align(Alignment.TopCenter).fillMaxWidth().padding(space12),
                horizontalArrangement = Arrangement.spacedBy(dimensionResource(R.dimen.sh_space_8)),
                verticalAlignment = Alignment.Top,
            ) {
                if (showTopTags && member.topTag != null) ShTagProfile(member.topTag, label = member.topTagLabel)
                Spacer(Modifier.weight(1f))
                if (showPhotoActions) {
                    if (showsPhotoCount) {
                        ShIconButton(
                            icon = R.drawable.sh_icon_filled_image, contentDescription = "View photos", onClick = actions.onViewPhotos,
                            type = ShIconButtonType.Translucent, size = ShIconButtonSize.Small, badge = "${member.photoCount}",
                        )
                    }
                    ShIconButton(
                        icon = R.drawable.sh_icon_line_more_vertical, contentDescription = "More options", onClick = actions.onMore,
                        type = ShIconButtonType.Translucent, size = ShIconButtonSize.Small,
                    )
                }
            }
        }
    }
}

/** sh-action-island per Type. */
@Composable
private fun Island(type: ShProfileCardType, member: ShProfileMember, actions: ShProfileCardActions) {
    val message = "Like this profile?"
    val editNote: @Composable () -> Unit = {
        ShActionNote(cta = ShActionNoteCTA.Edit, message = member.message, onClick = actions.onEditMessage)
    }
    when (type) {
        ShProfileCardType.Connect, ShProfileCardType.WithOverlay -> ShActionIsland(
            type = ShActionIslandType.MessagePrimary, note = editNote, message = message,
            primary = ShIslandButton("Connect Now", R.drawable.sh_icon_filled_connect, onClick = actions.onConnect),
        )
        ShProfileCardType.Received -> ShActionIsland(
            type = ShActionIslandType.TertiaryPrimary,
            primary = ShIslandButton("Accept", R.drawable.sh_icon_filled_check, onClick = actions.onAccept),
            secondary = ShIslandButton("Decline", R.drawable.sh_icon_line_close, onClick = actions.onDecline),
        )
        ShProfileCardType.PostConnect -> ShActionIsland(
            type = ShActionIslandType.ThreeActions,
            note = { ShActionNote(cta = ShActionNoteCTA.Upgrade, actionText = "To contact her directly", onClick = actions.onUpgradeNow) },
            actions = listOf(
                ShIslandAction("Shaadi Chat", R.drawable.sh_icon_line_chat_bubble, actions.onChat),
                ShIslandAction("WhatsApp", R.drawable.sh_icon_line_whatsapp_02, actions.onWhatsApp),
                ShIslandAction("Call", R.drawable.sh_icon_line_call, actions.onCall),
            ),
        )
        ShProfileCardType.Gated -> ShActionIsland(
            type = ShActionIslandType.MessagePremium, message = message,
            primary = ShIslandButton("Upgrade to Connect", onClick = actions.onUpgradeToConnect),
        )
        ShProfileCardType.NoPhoto, ShProfileCardType.PhotoRequested -> ShActionIsland(
            type = ShActionIslandType.MessagePrimary, message = message,
            primary = ShIslandButton("Connect Now", R.drawable.sh_icon_filled_check, onClick = actions.onConnect),
        )
        ShProfileCardType.Blocked -> ShActionIsland(
            type = ShActionIslandType.MessageTertiary, message = "You blocked her",
            primary = ShIslandButton("Unblock", onClick = actions.onUnblock),
        )
        ShProfileCardType.Declined -> ShActionIsland(type = ShActionIslandType.MessageOnly, status = "She declined your Request to Connect")   // status only, no action
        ShProfileCardType.Vip -> ShActionIsland(
            type = ShActionIslandType.SecondaryPrimary, note = editNote,
            primary = ShIslandButton("Connect", R.drawable.sh_icon_filled_check, onClick = actions.onConnect),
            secondary = ShIslandButton("Call Consultant", sublabel = "VIP Managed Profile", onClick = actions.onCallConsultant),
        )
    }
}
