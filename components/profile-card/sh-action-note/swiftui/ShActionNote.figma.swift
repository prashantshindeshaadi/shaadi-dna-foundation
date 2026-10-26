// Code Connect · sh-action-note → SwiftUI
// Implementation: ShActionNote.swift
// Publish: swift run figma-connect publish   (Code Connect Swift package, FIGMA_ACCESS_TOKEN)
//
// Link slot: the link follows CTA and Style (Edit → sh-text-link Inverse / Neutral, Upgrade → Premium
// "Upgrade Now"); pass linkLabel only to change its text.

import Figma
import SwiftUI

struct ShActionNote_doc: FigmaConnect {
    let component = ShActionNote.self
    let figmaNodeUrl = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2594-16750"

    @FigmaEnum("CTA", mapping: [
        "Edit": ShActionNoteCTA.edit,
        "Upgrade": .upgrade,
    ])
    var cta: ShActionNoteCTA = .edit

    @FigmaEnum("Style", mapping: [
        "Normal": ShActionNoteStyle.normal,
        "Floating": .floating,
    ])
    var style: ShActionNoteStyle = .normal

    @FigmaString("Message")
    var message: String = "Hey Sneha, I came across your profile. It felt true to me."

    @FigmaString("Action text")
    var actionText: String = "To contact her directly"

    var body: some View {
        ShActionNote(cta: cta, style: style, message: message, actionText: actionText) {
            // Edit: open the message editor · Upgrade: open plans
        }
    }
}
