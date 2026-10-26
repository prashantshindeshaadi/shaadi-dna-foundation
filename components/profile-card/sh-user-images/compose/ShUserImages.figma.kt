// Code Connect · sh-user-images → Jetpack Compose
// Implementation: ShUserImages.kt
// Female 1–21 / Male 1–6 are design-only sample photos: the app passes the member's photo (memberPhoto below).
// Publish: ./gradlew figmaCodeConnectPublish   (Code Connect Gradle plugin, FIGMA_ACCESS_TOKEN)

package com.shaadi.dna.components

import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.res.painterResource
import com.figma.code.connect.Figma
import com.figma.code.connect.FigmaConnect
import com.figma.code.connect.FigmaProperty
import com.figma.code.connect.FigmaType
// import com.shaadi.app.R

@FigmaConnect(url = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2248-13619")
class ShUserImagesDoc {
    /** The member's photo, loaded by the app (sample drawable name). */
    private val memberPhoto: Int = R.drawable.member_photo

    @FigmaProperty(FigmaType.Enum, "Gender")
    val photo: Int = Figma.mapping(
        "Female 1" to memberPhoto,
        "Female 2" to memberPhoto,
        "Female 3" to memberPhoto,
        "Female 4" to memberPhoto,
        "Female 5" to memberPhoto,
        "Female 6" to memberPhoto,
        "Female 7" to memberPhoto,
        "Female 8" to memberPhoto,
        "Female 9" to memberPhoto,
        "Female 10" to memberPhoto,
        "Female 11" to memberPhoto,
        "Female 12" to memberPhoto,
        "Female 13" to memberPhoto,
        "Female 14" to memberPhoto,
        "Female 15" to memberPhoto,
        "Female 16" to memberPhoto,
        "Female 17" to memberPhoto,
        "Female 18" to memberPhoto,
        "Female 19" to memberPhoto,
        "Female 20" to memberPhoto,
        "Female 21" to memberPhoto,
        "Male 1" to memberPhoto,
        "Male 2" to memberPhoto,
        "Male 3" to memberPhoto,
        "Male 4" to memberPhoto,
        "Male 5" to memberPhoto,
        "Male 6" to memberPhoto,
        "Female requested" to ShUserImageRequested.Female.drawable,
        "Male requested" to ShUserImageRequested.Male.drawable,
    )

    /** Requested portraits are cropped full width, top-aligned. */
    @FigmaProperty(FigmaType.Enum, "Gender")
    val alignment: Alignment = Figma.mapping(
        "Female 1" to Alignment.Center,
        "Female 2" to Alignment.Center,
        "Female 3" to Alignment.Center,
        "Female 4" to Alignment.Center,
        "Female 5" to Alignment.Center,
        "Female 6" to Alignment.Center,
        "Female 7" to Alignment.Center,
        "Female 8" to Alignment.Center,
        "Female 9" to Alignment.Center,
        "Female 10" to Alignment.Center,
        "Female 11" to Alignment.Center,
        "Female 12" to Alignment.Center,
        "Female 13" to Alignment.Center,
        "Female 14" to Alignment.Center,
        "Female 15" to Alignment.Center,
        "Female 16" to Alignment.Center,
        "Female 17" to Alignment.Center,
        "Female 18" to Alignment.Center,
        "Female 19" to Alignment.Center,
        "Female 20" to Alignment.Center,
        "Female 21" to Alignment.Center,
        "Male 1" to Alignment.Center,
        "Male 2" to Alignment.Center,
        "Male 3" to Alignment.Center,
        "Male 4" to Alignment.Center,
        "Male 5" to Alignment.Center,
        "Male 6" to Alignment.Center,
        "Female requested" to Alignment.TopCenter,
        "Male requested" to Alignment.TopCenter,
    )

    @FigmaProperty(FigmaType.Enum, "Style")
    val style: ShUserImageStyle = Figma.mapping(
        "Normal" to ShUserImageStyle.Normal,
        "Blur" to ShUserImageStyle.Blur,
    )

    @Composable
    fun ComponentExample() {
        ShUserImage(
            painter = painterResource(photo),
            style = style,
            alignment = alignment,
        )
    }
}
