// Code Connect · sh-profile-card → SwiftUI
// Implementation: ShProfileCard.swift
// Publish: swift run figma-connect publish   (Code Connect Swift package, FIGMA_ACCESS_TOKEN)

import Figma
import SwiftUI

struct ShProfileCard_doc: FigmaConnect {
    let component = ShProfileCard.self
    let figmaNodeUrl = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2579-25592"

    @FigmaEnum("Type", mapping: [
        "Connect": ShProfileCardType.connect,
        "Received": .received,
        "Connected": .connected,
        "Locked": .locked,
        "No photo": .noPhoto,
        "Photo requested": .photoRequested,
        "Blocked": .blocked,
        "Hidden": .hidden,
        "VIP": .vip,
    ])
    var type: ShProfileCardType = .connect

    @FigmaBoolean("Show top tags")
    var showTopTags: Bool = true

    @FigmaBoolean("Show photo actions")
    var showPhotoActions: Bool = true

    private let member = ShProfileMember(name: "Name", age: 26)
    private let actions = ShProfileCardActions()

    var body: some View {
        ShProfileCard(
            type: type,
            member: member,                       // ShProfileMember(name:age:photo:detailRows:tags:…)
            showTopTags: showTopTags,
            showPhotoActions: showPhotoActions,
            actions: actions                      // ShProfileCardActions: onConnect, onViewPhotos, onMore, …
        )
    }
}
