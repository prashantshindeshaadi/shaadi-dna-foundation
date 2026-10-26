// sh-action-note — SwiftUI
// Spec: ../sh-action-note.md · Figma node 2594:16750 (CTA Edit / Upgrade × Style Normal / Floating = 4 variants)
//
// One line above the actions: the pre-written message with an Edit link, or an action with an Upgrade Now link.
// Built from sh-text-link (../../../sh-text-link/swiftui/ShTextLink.swift, Size Small, no icons, underline on).
// Needs dist/ios/SHTokens.swift and the type kit (ShTypography.swift). Every value is a DNA token.
//
// Body/SM/Italic: the message is Body/SM set italic. Bundle fonts/LexendSH-VF-Italic.ttf (tools/make_italic.py)
// with the app so iOS draws the real oblique face.
// Inside ShActionIsland the note follows the island's Style, and the island owns the surface: a Floating note
// there drops its own ring, padding and shadow (as the island's Figma instances do).

import SwiftUI

/// Figma "CTA": Edit (pre-written message + Edit link) or Upgrade (locked action + Upgrade Now link).
public enum ShActionNoteCTA: CaseIterable {
    case edit, upgrade
}

/// Figma "Style": Normal (on the card photo / dark glass) or Floating (on a light surface).
public enum ShActionNoteStyle: CaseIterable {
    case normal, floating
}

/// sh-action-note. Edit shows `message` (italic, muted, one line cut with …) + an "Edit" link;
/// Upgrade shows `actionText` + a Premium "Upgrade Now" link, centred. `linkLabel` overrides the link text.
public struct ShActionNote: View {
    public var cta: ShActionNoteCTA
    public var style: ShActionNoteStyle
    public var message: String
    public var actionText: String
    public var linkLabel: String?
    public var action: () -> Void

    @Environment(\.shActionNoteIslandStyle) private var islandStyle

    /// - Parameters:
    ///   - cta: Figma "CTA"
    ///   - style: Figma "Style" (inside ShActionIsland the island's Style wins)
    ///   - message: Figma "Message", shown on Edit
    ///   - actionText: Figma "Action text", shown on Upgrade
    ///   - linkLabel: the link's text; "Edit" / "Upgrade Now" when nil
    ///   - action: the link's tap (edit the message / upgrade)
    public init(cta: ShActionNoteCTA, style: ShActionNoteStyle = .normal, message: String = "",
                actionText: String = "", linkLabel: String? = nil, action: @escaping () -> Void) {
        self.cta = cta; self.style = style; self.message = message; self.actionText = actionText
        self.linkLabel = linkLabel; self.action = action
    }

    public var body: some View {
        let resolved = islandStyle ?? style
        let content = row(resolved)
        if resolved == .floating && islandStyle == nil {
            content
                .padding(SH.Space.step12)
                .background {                                  // Surface: stroke only, radius default
                    RoundedRectangle(cornerRadius: SH.Radius.default, style: .continuous)
                        .strokeBorder(SH.Gradient.translucentBorderLight.layers[0].linear, lineWidth: SH.Stroke.default)
                        .shShadow(SH.ShadowStyle.floating)
                }
        } else {
            content
        }
    }

    @ViewBuilder private func row(_ resolved: ShActionNoteStyle) -> some View {
        let fg = resolved == .normal ? SH.Color.textOnImage.color : SH.Color.textSecondary.color
        switch cta {
        case .edit:
            HStack(spacing: SH.Space.step8) {
                Text(message)
                    .italic()
                    .shTextStyle(.bodySm)
                    .foregroundStyle(fg)
                    .lineLimit(1)
                    .truncationMode(.tail)
                    .opacity(SH.Opacity.strong)
                    .frame(maxWidth: .infinity, alignment: .leading)
                ShTextLink(linkLabel ?? "Edit", type: resolved == .normal ? .inverse : .neutral, size: .small,
                           action: action)
                    .opacity(SH.Opacity.strong)                // Link slot at sh-opacity/strong
                    .fixedSize()
            }
        case .upgrade:
            HStack(spacing: SH.Space.step8) {
                Text(actionText)
                    .shTextStyle(.bodySm)
                    .foregroundStyle(fg)
                    .lineLimit(1)
                upgradeLink(resolved)
                    .fixedSize()
            }
            .frame(maxWidth: .infinity)                         // text + link centred
        }
    }

    /// Premium link. On the photo (Normal) Figma recolours its label and underline to
    /// premium/background/solid/default/end so it reads on dark glass.
    @ViewBuilder private func upgradeLink(_ resolved: ShActionNoteStyle) -> some View {
        let link = ShTextLink(linkLabel ?? "Upgrade Now", type: .premium, size: .small, action: action)
        if resolved == .normal {
            link
                .overlay {
                    SH.Color.premiumBackgroundSolidDefaultEnd.color
                        .blendMode(.sourceAtop)
                        .allowsHitTesting(false)
                }
                .compositingGroup()
        } else {
            link
        }
    }
}

// MARK: - Island context

private struct ShActionNoteIslandStyleKey: EnvironmentKey {
    static let defaultValue: ShActionNoteStyle? = nil
}

extension EnvironmentValues {
    /// Set by ShActionIsland: the note takes the island's Style and leaves the surface to the island.
    var shActionNoteIslandStyle: ShActionNoteStyle? {
        get { self[ShActionNoteIslandStyleKey.self] }
        set { self[ShActionNoteIslandStyleKey.self] = newValue }
    }
}

// MARK: - Preview

#if DEBUG
#Preview("sh-action-note") {
    VStack(spacing: SH.Space.step24) {
        VStack(spacing: SH.Space.step16) {
            ShActionNote(cta: .edit, message: "Hey Sneha, I came across your profile. It felt true to me.") {}
            ShActionNote(cta: .upgrade, actionText: "To contact her directly") {}
        }
        .padding(SH.Space.step16)
        .background(SH.Color.backgroundInverse.color)
        VStack(spacing: SH.Space.step16) {
            ShActionNote(cta: .edit, style: .floating, message: "Hey Sneha, I came across your profile. It felt true to me.") {}
            ShActionNote(cta: .upgrade, style: .floating, actionText: "To contact her directly") {}
        }
        .padding(SH.Space.step16)
        .background(SH.Color.backgroundDefault.color)
    }
    .padding(SH.Space.step16)
}
#endif
