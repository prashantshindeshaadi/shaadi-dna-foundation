// sh-action-island — SwiftUI
// Spec: ../sh-action-island.md · Figma node 2594:16928 (8 Types × Style Normal / Floating = 16 variants)
//
// The action area of a card or screen: an optional sh-action-note ("Show note") above the core actions.
// Built from sh-action-note, sh-button (Size Medium) and sh-icon-button-with-label (same module):
//   ../../sh-action-note/swiftui/ShActionNote.swift · ../../../sh-button/swiftui/ShButton.swift ·
//   ../../../sh-icon-button-with-label/swiftui/ShIconButtonWithLabel.swift (+ their dependencies).
// Needs dist/ios/SHTokens.swift and the type kit (ShTypography.swift). Every value is a DNA token; composed sizes
// with no token are marked "no token". Corners use .continuous (iOS corner smoothing).
//
// Each button, link and labelled action brings its own states (pressed, hover, focus, disabled) and 48 tap area.

import SwiftUI

/// Figma "Type", in Figma's order: which actions the island shows.
public enum ShActionIslandType: CaseIterable {
    case messagePrimary, messagePremium, messageTertiary, messageOnly, primaryOnly,
         secondaryPrimary, tertiaryPrimary, threeActions
}

/// Figma "Style": Normal (no surface, inside a card or sheet) or Floating (own translucent surface + shadow).
public enum ShActionIslandStyle: CaseIterable {
    case normal, floating
}

/// A core button of the island (sh-button, Size Medium). Its Type comes from the island's Type.
public struct ShIslandButton {
    public var label: String
    /// Leading icon, e.g. "filled/check".
    public var icon: String?
    /// Support/Meta line under the label (sh-button "Sublabel"), e.g. "VIP Managed Profile".
    public var sublabel: String?
    public var action: () -> Void

    public init(label: String, icon: String? = nil, sublabel: String? = nil, action: @escaping () -> Void) {
        self.label = label; self.icon = icon; self.sublabel = sublabel; self.action = action
    }
}

/// One labelled icon action of Type Three actions (sh-icon-button-with-label).
public struct ShIslandAction {
    public var label: String
    /// e.g. "line/call"
    public var icon: String
    public var action: () -> Void

    public init(label: String, icon: String, action: @escaping () -> Void) {
        self.label = label; self.icon = icon; self.action = action
    }
}

/// sh-action-island.
/// - Message + primary / premium / tertiary: `message` + `primary` (Primary / Premium Solid / Tertiary button)
/// - Message only: `status` alone
/// - Primary only: `primary`, max 200, centred
/// - Secondary + primary / Tertiary + primary: `secondary` (Secondary / Tertiary) + `primary`, equal widths
/// - Three actions: `actions` (three labelled icon actions, equal widths)
/// `note` is Figma "Show note" (nil hides it); it takes the island's Style.
public struct ShActionIsland: View {
    public var type: ShActionIslandType
    public var style: ShActionIslandStyle
    public var note: ShActionNote?
    public var message: String
    public var status: String
    public var primary: ShIslandButton?
    public var secondary: ShIslandButton?
    public var actions: [ShIslandAction]

    /// - Parameters:
    ///   - type: Figma "Type"
    ///   - style: Figma "Style"
    ///   - note: Figma "Show note" + the note itself; nil hides it
    ///   - message: Figma "Message", beside the button on the Message + … types
    ///   - status: Figma "Status", the only content of Message only
    ///   - primary: the main (right) button
    ///   - secondary: the left button of Secondary + primary / Tertiary + primary
    ///   - actions: the labelled actions of Three actions, left to right
    public init(type: ShActionIslandType, style: ShActionIslandStyle = .normal, note: ShActionNote? = nil,
                message: String = "", status: String = "", primary: ShIslandButton? = nil,
                secondary: ShIslandButton? = nil, actions: [ShIslandAction] = []) {
        self.type = type; self.style = style; self.note = note; self.message = message; self.status = status
        self.primary = primary; self.secondary = secondary; self.actions = actions
    }

    public var body: some View {
        let content = VStack(alignment: .leading, spacing: SH.Space.step12) {
            if let note {
                note.environment(\.shActionNoteIslandStyle, style == .normal ? .normal : .floating)
            }
            actionsRow
        }
        .frame(maxWidth: .infinity, alignment: .leading)

        switch style {
        case .normal:
            content.padding(SH.Space.step0)
        case .floating:
            content
                .padding(SH.Space.step16)
                .background {                                   // Surface: light glass, edge, radius xxl, floating shadow
                    let shape = RoundedRectangle(cornerRadius: SH.Radius.xxl, style: .continuous)
                    SH.Gradient.translucentLightStrong.view
                        .clipShape(shape)
                        .overlay(shape.strokeBorder(SH.Gradient.translucentBorderLight.layers[0].linear,
                                                    lineWidth: SH.Stroke.default))
                        .compositingGroup()
                        .shShadow(SH.ShadowStyle.floating)
                }
        }
    }

    // MARK: Actions row per Type

    private var textColor: Color { style == .normal ? SH.Color.textOnImage.color : SH.Color.textPrimary.color }

    @ViewBuilder private var actionsRow: some View {
        switch type {
        case .messagePrimary, .messagePremium, .messageTertiary:
            ShIslandMessageRow(spacing: SH.Space.step16,
                               messageMin: SH.Space.step80 + SH.Space.step20,      // no token: min width 100 (Figma)
                               buttonMin: SH.Space.step80 + SH.Space.step16,       // no token: min width 96 (Figma)
                               buttonMax: Self.loneButtonMax) {
                messageText(message)
                if let primary { button(primary, type: primaryType) }
            }
        case .messageOnly:
            messageText(status)
                .frame(maxWidth: .infinity, alignment: .leading)
        case .primaryOnly:
            if let primary {
                button(primary, type: .primary)
                    .frame(minWidth: SH.Space.step80 + SH.Space.step16, maxWidth: Self.loneButtonMax)   // no token: 96–200
                    .frame(maxWidth: .infinity)                                                          // centred
            }
        case .secondaryPrimary, .tertiaryPrimary:
            HStack(spacing: SH.Space.step8) {
                if let secondary { button(secondary, type: type == .secondaryPrimary ? .secondary : .tertiary) }
                if let primary { button(primary, type: .primary) }
            }
            .frame(maxWidth: .infinity)
        case .threeActions:
            HStack(alignment: .top, spacing: SH.Space.step8) {
                ForEach(Array(actions.enumerated()), id: \.offset) { _, item in
                    ShIconButtonWithLabel(item.label, icon: item.icon, labelColor: textColor, action: item.action)
                }
            }
            .frame(maxWidth: .infinity)
        }
    }

    /// no token: lone button max width 200 (blueprint) = 2 × space-80 + space-40
    private static let loneButtonMax = SH.Space.step80 * 2 + SH.Space.step40

    private var primaryType: ShButtonType {
        switch type {
        case .messagePremium: return .premiumSolid
        case .messageTertiary: return .tertiary
        default: return .primary
        }
    }

    private func messageText(_ text: String) -> some View {
        Text(text)
            .shTextStyle(.bodyMdTight)
            .foregroundStyle(textColor)
            .lineLimit(1)
            .truncationMode(.tail)
    }

    private func button(_ b: ShIslandButton, type: ShButtonType) -> some View {
        ShButton(b.label, type: type, size: .medium, leadingIcon: b.icon, sublabel: b.sublabel, fill: true,
                 action: b.action)
    }
}

/// Message + button row (Figma: message hugs, min 100, one line cut with …; button fills the rest, 96–200;
/// the pair is centred). The message gives way first, down to its minimum; the button never goes under 96.
private struct ShIslandMessageRow: Layout {
    var spacing: CGFloat
    var messageMin: CGFloat
    var buttonMin: CGFloat
    var buttonMax: CGFloat

    private func widths(_ total: CGFloat, _ subviews: Subviews) -> (message: CGFloat, button: CGFloat) {
        guard subviews.count == 2 else { return (total, 0) }
        let ideal = subviews[0].sizeThatFits(.unspecified).width
        let messageMax = max(messageMin, total - spacing - buttonMin)
        let message = min(max(ideal, messageMin), messageMax)
        let button = min(max(total - spacing - message, buttonMin), buttonMax)
        return (message, button)
    }

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        guard let first = subviews.first else { return .zero }
        let total = proposal.width ?? (max(first.sizeThatFits(.unspecified).width, messageMin) + spacing + buttonMax)
        let w = widths(total, subviews)
        var height = first.sizeThatFits(ProposedViewSize(width: w.message, height: nil)).height
        if subviews.count == 2 {
            height = max(height, subviews[1].sizeThatFits(ProposedViewSize(width: w.button, height: nil)).height)
        }
        return CGSize(width: total, height: height)
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        guard let first = subviews.first else { return }
        let w = widths(bounds.width, subviews)
        let group = subviews.count == 2 ? w.message + spacing + w.button : w.message
        var x = bounds.minX + max(0, (bounds.width - group) / 2)
        first.place(at: CGPoint(x: x, y: bounds.midY), anchor: .leading,
                    proposal: ProposedViewSize(width: w.message, height: nil))
        if subviews.count == 2 {
            x += w.message + spacing
            subviews[1].place(at: CGPoint(x: x, y: bounds.midY), anchor: .leading,
                              proposal: ProposedViewSize(width: w.button, height: nil))
        }
    }
}

// MARK: - Preview

#if DEBUG
#Preview("sh-action-island") {
    let note = ShActionNote(cta: .edit, message: "Hey Sneha, I came across your profile. It felt true to me.") {}
    ScrollView {
        VStack(spacing: SH.Space.step16) {
            ForEach([ShActionIslandStyle.normal, .floating], id: \.self) { style in
                ShActionIsland(type: .messagePrimary, style: style, note: note, message: "Like this profile?",
                               primary: ShIslandButton(label: "Connect Now", icon: "filled/connect") {})
                ShActionIsland(type: .messageOnly, style: style, note: note, status: "We’re reviewing your report")
                ShActionIsland(type: .primaryOnly, style: style, primary: ShIslandButton(label: "See similar profiles") {})
                ShActionIsland(type: .tertiaryPrimary, style: style,
                               primary: ShIslandButton(label: "Accept", icon: "filled/check") {},
                               secondary: ShIslandButton(label: "Decline", icon: "line/close") {})
                ShActionIsland(type: .threeActions, style: style,
                               note: ShActionNote(cta: .upgrade, actionText: "To contact her directly") {},
                               actions: [ShIslandAction(label: "Shaadi Chat", icon: "line/chat-bubble") {},
                                         ShIslandAction(label: "WhatsApp", icon: "line/whatsapp-02") {},
                                         ShIslandAction(label: "Call", icon: "line/call") {}])
            }
        }
        .padding(SH.Space.step16)
    }
    .background(SH.Color.backgroundInverse.color)
}
#endif
