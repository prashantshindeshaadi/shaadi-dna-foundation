// Code Connect · sh-action-island → SwiftUI
// Implementation: ShActionIsland.swift
// Publish: swift run figma-connect publish   (Code Connect Swift package, FIGMA_ACCESS_TOKEN)
//
// Pass only what the Type shows: message + primary (Message + …), status (Message only), primary (Primary only),
// secondary + primary (Secondary / Tertiary + primary), actions (Three actions). Labels and icons are the
// design's; the samples below are the Figma defaults.

import Figma
import SwiftUI

struct ShActionIsland_doc: FigmaConnect {
    let component = ShActionIsland.self
    let figmaNodeUrl = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2594-16928"

    @FigmaEnum("Type", mapping: [
        "Message + primary": ShActionIslandType.messagePrimary,
        "Message + premium": .messagePremium,
        "Message + tertiary": .messageTertiary,
        "Message only": .messageOnly,
        "Primary only": .primaryOnly,
        "Secondary + primary": .secondaryPrimary,
        "Tertiary + primary": .tertiaryPrimary,
        "Three actions": .threeActions,
    ])
    var type: ShActionIslandType = .messagePrimary

    @FigmaEnum("Style", mapping: [
        "Normal": ShActionIslandStyle.normal,
        "Floating": .floating,
    ])
    var style: ShActionIslandStyle = .normal

    @FigmaBoolean("Show note", mapping: [
        true: ShActionNote(cta: .edit, message: "Hey Sneha, I came across your profile. It felt true to me.") {},
        false: nil,
    ])
    var note: ShActionNote? = nil

    @FigmaString("Message")
    var message: String = "Like this profile?"

    @FigmaString("Status")
    var status: String = "We’re reviewing your report"

    var body: some View {
        ShActionIsland(
            type: type,
            style: style,
            note: note,
            message: message,
            status: status,
            primary: ShIslandButton(label: "Connect Now", icon: "filled/connect") { /* connect */ },
            secondary: ShIslandButton(label: "Shaadi Chat", icon: "line/chat-bubble") { /* chat */ },
            actions: [
                ShIslandAction(label: "Shaadi Chat", icon: "line/chat-bubble") { /* chat */ },
                ShIslandAction(label: "WhatsApp", icon: "line/whatsapp-02") { /* WhatsApp */ },
                ShIslandAction(label: "Call", icon: "line/call") { /* call */ },
            ]
        )
    }
}
