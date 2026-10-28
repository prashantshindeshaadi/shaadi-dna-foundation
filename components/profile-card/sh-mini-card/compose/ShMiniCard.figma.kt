// Code Connect · sh-mini-card → Jetpack Compose
// Implementation: ShMiniCard.kt
// Publish: ./gradlew figmaCodeConnectPublish   (Code Connect Gradle plugin, FIGMA_ACCESS_TOKEN)
//
// Badge 1 / Badge 2 swaps: verified-badge ↔ premium-badge → the order of ShMiniCardBadge in `badges`.

package com.shaadi.dna.components

import androidx.compose.runtime.Composable
import androidx.compose.ui.res.painterResource
import com.figma.code.connect.Figma
import com.figma.code.connect.FigmaConnect
import com.figma.code.connect.FigmaProperty
import com.figma.code.connect.FigmaType
// import com.shaadi.app.R

@FigmaConnect(url = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2780-68360")
class ShMiniCardDoc {
    @FigmaProperty(FigmaType.Enum, "Type")
    val type: ShMiniCardType = Figma.mapping(
        "Default" to ShMiniCardType.Default,
        "No photo female" to ShMiniCardType.NoPhotoFemale,
        "No photo male" to ShMiniCardType.NoPhotoMale,
    )

    @FigmaProperty(FigmaType.Text, "Name")
    val name: String = "Sneha P, 26"

    @FigmaProperty(FigmaType.Boolean, "Show badge 1")
    val showBadge1: Boolean = true

    @FigmaProperty(FigmaType.Boolean, "Show badge 2")
    val showBadge2: Boolean = true

    @FigmaProperty(FigmaType.Boolean, "Show detail 1")
    val showDetail1: Boolean = true

    @FigmaProperty(FigmaType.Boolean, "Show detail 2")
    val showDetail2: Boolean = true

    @FigmaProperty(FigmaType.Boolean, "Show detail 3")
    val showDetail3: Boolean = true

    /** The member's photo, loaded by the app (sample drawable name). */
    private val memberPhoto: Int = R.drawable.member_photo

    /** Sample facts: height, community, city. */
    private val detail1: String = "5’6”"
    private val detail2: String = "Kayastha"
    private val detail3: String = "Pune, MH"

    @Composable
    fun ComponentExample() {
        ShMiniCard(
            name = name,
            type = type,
            photo = painterResource(memberPhoto),           // Type Default; No photo uses sh-avatar-placeholder
            badges = listOfNotNull(
                if (showBadge1) ShMiniCardBadge.Verified else null,
                if (showBadge2) ShMiniCardBadge.Premium else null,
            ),
            details = listOfNotNull(
                if (showDetail1) detail1 else null,
                if (showDetail2) detail2 else null,
                if (showDetail3) detail3 else null,
            ),
            action = ShMiniCardAction("Connect Now", R.drawable.sh_icon_filled_check) { /* connect */ },
        )
    }
}
