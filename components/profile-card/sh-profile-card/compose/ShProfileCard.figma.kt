// Code Connect · sh-profile-card → Jetpack Compose
// Implementation: ShProfileCard.kt
// Publish: ./gradlew figmaCodeConnectPublish   (Code Connect Gradle plugin, FIGMA_ACCESS_TOKEN)

package com.shaadi.dna.components

import androidx.compose.runtime.Composable
import com.figma.code.connect.Figma
import com.figma.code.connect.FigmaConnect
import com.figma.code.connect.FigmaProperty
import com.figma.code.connect.FigmaType

@FigmaConnect(url = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2579-25592")
class ShProfileCardDoc {
    @FigmaProperty(FigmaType.Enum, "Type")
    val type: ShProfileCardType = Figma.mapping(
        "Connect" to ShProfileCardType.Connect,
        "Received" to ShProfileCardType.Received,
        "Post-Connect" to ShProfileCardType.PostConnect,
        "Gated" to ShProfileCardType.Gated,
        "No photo" to ShProfileCardType.NoPhoto,
        "Photo requested" to ShProfileCardType.PhotoRequested,
        "Blocked" to ShProfileCardType.Blocked,
        "VIP" to ShProfileCardType.Vip,
        "With Overlay" to ShProfileCardType.WithOverlay,
    )

    @FigmaProperty(FigmaType.Boolean, "Show top tags")
    val showTopTags: Boolean = true

    @FigmaProperty(FigmaType.Boolean, "Show photo actions")
    val showPhotoActions: Boolean = true

    private val member = ShProfileMember(
        name = "Name", age = 26, photoCount = 10, isVerified = true,
        detailRows = listOf(listOf("Fact", "Fact")), tags = listOf(ShTagProfileType.YouAndHer, ShTagProfileType.Astro),
        topTag = ShTagProfileType.Promoted, message = "Pre-written message",
    )

    @Composable
    fun ComponentExample() {
        ShProfileCard(
            type = type,
            member = member,
            showTopTags = showTopTags,
            showPhotoActions = showPhotoActions,
            actions = ShProfileCardActions(
                onConnect = { /* send connect */ },
                onViewPhotos = { /* open photos */ },
                onMore = { /* member options */ },
            ),
        )
    }
}
