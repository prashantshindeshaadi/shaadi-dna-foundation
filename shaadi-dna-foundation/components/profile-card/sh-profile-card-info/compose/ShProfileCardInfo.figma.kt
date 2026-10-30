// Code Connect · sh-profile-card-info → Jetpack Compose
// Implementation: ShProfileCardInfo.kt
// Publish: ./gradlew figmaCodeConnectPublish   (Code Connect Gradle plugin, FIGMA_ACCESS_TOKEN)
//
// Badge 2 / Badge 3 (instance swaps) are the premium and VIP badges. Detail labels aren't Figma properties:
// pass the member's facts, one inner list per line. Actions is the nested sh-action-island.

package com.shaadi.dna.components

import androidx.compose.runtime.Composable
import com.figma.code.connect.Figma
import com.figma.code.connect.FigmaConnect
import com.figma.code.connect.FigmaProperty
import com.figma.code.connect.FigmaType
// import com.shaadi.app.R

@FigmaConnect(url = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2496-27797")
class ShProfileCardInfoDoc {
    @FigmaProperty(FigmaType.Text, "Name")
    val name: String = "Sneha Kaul"

    @FigmaProperty(FigmaType.Text, "Age")
    val age: String = "26"

    @FigmaProperty(FigmaType.Boolean, "Show status")
    val status: ShTagProfileType? = Figma.mapping(
        true to ShTagProfileType.Online,
        false to null,
    )

    @FigmaProperty(FigmaType.Boolean, "Show tags")
    val tags: List<ShTagProfileType> = Figma.mapping(
        true to listOf(ShTagProfileType.YouAndHer, ShTagProfileType.Astro),
        false to emptyList(),
    )

    @FigmaProperty(FigmaType.Boolean, "Verified")
    val verified: Boolean = true

    @FigmaProperty(FigmaType.Boolean, "Show badge 2")
    val badge2: ShProfileBadge? = Figma.mapping(
        true to ShProfileBadge.Premium,
        false to null,
    )

    @FigmaProperty(FigmaType.Boolean, "Show badge 3")
    val badge3: ShProfileBadge? = Figma.mapping(
        true to ShProfileBadge.Vip,
        false to null,
    )

    @FigmaProperty(FigmaType.Boolean, "Show detail 1")
    val detail1: String? = Figma.mapping(true to "5′ 6″", false to null)

    @FigmaProperty(FigmaType.Boolean, "Show detail 2")
    val detail2: String? = Figma.mapping(true to "Kashmiri Pandit", false to null)

    @FigmaProperty(FigmaType.Boolean, "Show detail 3")
    val detail3: String? = Figma.mapping(true to "Pimpri-Chinchwad", false to null)

    @FigmaProperty(FigmaType.Boolean, "Show detail 4")
    val detail4: String? = Figma.mapping(true to "Software Developer", false to null)

    @Composable
    fun ComponentExample() {
        ShProfileCardInfo(
            name = name,
            age = age.toInt(),
            status = status,
            tags = tags,
            verified = verified,
            badges = listOfNotNull(badge2, badge3),
            details = listOf(listOfNotNull(detail1, detail2), listOfNotNull(detail3, detail4)).filter { it.isNotEmpty() },
            island = {
                ShActionIsland(
                    type = ShActionIslandType.MessagePrimary,
                    note = {
                        ShActionNote(
                            cta = ShActionNoteCTA.Edit,
                            message = "Hey Sneha, I came across your profile. It felt true to me.",
                            onClick = { /* edit the message */ },
                        )
                    },
                    message = "Like this profile?",
                    primary = ShIslandButton("Connect Now", R.drawable.sh_icon_filled_connect, onClick = { /* connect */ }),
                )
            },
        )
    }
}
