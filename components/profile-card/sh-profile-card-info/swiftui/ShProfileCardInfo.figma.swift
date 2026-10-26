// Code Connect · sh-profile-card-info → SwiftUI
// Implementation: ShProfileCardInfo.swift
// Publish: swift run figma-connect publish   (Code Connect Swift package, FIGMA_ACCESS_TOKEN)
//
// Badge 2 / Badge 3 (instance swaps) are the premium and VIP badges. Detail labels aren't Figma properties:
// pass the member's facts, one inner array per line. Actions is the nested sh-action-island.

import Figma
import SwiftUI

struct ShProfileCardInfo_doc: FigmaConnect {
    let component = ShProfileCardInfo<ShActionIsland>.self
    let figmaNodeUrl = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2496-27797"

    @FigmaString("Name")
    var name: String = "Sneha Kaul"

    @FigmaString("Age")
    var age: String = "26"

    @FigmaBoolean("Show status", mapping: [true: ShTagProfileType.online, false: nil])
    var status: ShTagProfileType? = .online

    @FigmaBoolean("Show tags", mapping: [true: [ShTagProfileType.youAndHer, .astro], false: []])
    var tags: [ShTagProfileType] = [.youAndHer, .astro]

    @FigmaBoolean("Verified")
    var verified: Bool = true

    @FigmaBoolean("Show badge 2", mapping: [true: ShProfileBadge.premium, false: nil])
    var badge2: ShProfileBadge? = .premium

    @FigmaBoolean("Show badge 3", mapping: [true: ShProfileBadge.vip, false: nil])
    var badge3: ShProfileBadge? = .vip

    @FigmaBoolean("Show detail 1", mapping: [true: "5′ 6″", false: nil])
    var detail1: String? = "5′ 6″"

    @FigmaBoolean("Show detail 2", mapping: [true: "Kashmiri Pandit", false: nil])
    var detail2: String? = "Kashmiri Pandit"

    @FigmaBoolean("Show detail 3", mapping: [true: "Pimpri-Chinchwad", false: nil])
    var detail3: String? = "Pimpri-Chinchwad"

    @FigmaBoolean("Show detail 4", mapping: [true: "Software Developer", false: nil])
    var detail4: String? = "Software Developer"

    var body: some View {
        ShProfileCardInfo(
            name: name,
            age: Int(age) ?? 0,
            status: status,
            tags: tags,
            verified: verified,
            badges: [badge2, badge3].compactMap { $0 },
            details: [[detail1, detail2].compactMap { $0 }, [detail3, detail4].compactMap { $0 }].filter { !$0.isEmpty }
        ) {
            ShActionIsland(
                type: .messagePrimary,
                note: ShActionNote(cta: .edit, message: "Hey Sneha, I came across your profile. It felt true to me.") {},
                message: "Like this profile?",
                primary: ShIslandButton(label: "Connect Now", icon: "filled/connect") { /* connect */ }
            )
        }
    }
}
