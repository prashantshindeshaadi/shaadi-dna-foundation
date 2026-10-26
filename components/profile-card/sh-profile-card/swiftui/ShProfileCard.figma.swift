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
        "Post-Connect": .postConnect,
        "Gated": .gated,
        "No photo": .noPhoto,
        "Photo requested": .photoRequested,
        "Blocked": .blocked,
        "VIP": .vip,
        "With Overlay": .withOverlay,
    ])
    var type: ShProfileCardType = .connect

    @FigmaBoolean("Show top tags")
    var showTopTags: Bool = true

    @FigmaBoolean("Show photo actions")
    var showPhotoActions: Bool = true

    private let member = ShProfileMember(name: "Name", age: 26, photoCount: 10, isVerified: true,
                                         detailRows: [["Fact", "Fact"]], tags: [.youAndHer, .astro], topTag: .promoted,
                                         message: "Pre-written message")
    private let actions = ShProfileCardActions()

    var body: some View {
        ShProfileCard(
            type: type,
            member: member,
            showTopTags: showTopTags,
            showPhotoActions: showPhotoActions,
            actions: actions                      // onConnect, onViewPhotos, onMore, onEditMessage, …
        )
    }
}
