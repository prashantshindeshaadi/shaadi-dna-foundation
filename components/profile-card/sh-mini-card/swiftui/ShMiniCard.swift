// sh-mini-card — SwiftUI
// Spec: ../sh-mini-card.md · Figma node 2780:68360 · Type Default / No photo
//
// Compact profile suggestion: avatar, name + badges, up to three facts and one action (sh-button Primary Small).
// Needs dist/ios/SHTokens.swift, the type kit (ShTypography.swift) and ../../../sh-icon/swiftui/ShIcon.swift ·
// ../../../sh-avatar/swiftui/ShAvatar.swift (+ ../../../sh-avatar-glyph/swiftui/ShAvatarGlyph.swift) ·
// ../../sh-user-images/swiftui/ShUserImages.swift · ../../sh-info-detail/swiftui/ShInfoDetail.swift ·
// ../../../sh-button/swiftui/ShButton.swift

import SwiftUI

/// Figma "Type": Default (the member's photo in sh-avatar lg) or No photo (the requested portrait, cropped).
public enum ShMiniCardType: CaseIterable {
    case standard          // Figma "Default"
    case noPhoto
}

/// The badges after the name (Figma Badge 1 / Badge 2 swaps), at Size Small (14).
public enum ShMiniCardBadge: CaseIterable {
    case verified, premium

    var icon: String {
        switch self {
        case .verified: return "misc/verified-badge"
        case .premium: return "misc/premium-badge"
        }
    }

    var label: String {
        switch self {
        case .verified: return "Verified"
        case .premium: return "Premium"
        }
    }
}

/// The card's one action: sh-button Primary Small, full width. Figma: "Connect Now" led by "filled/check".
public struct ShMiniCardAction {
    public var label: String
    public var icon: String?
    public var action: () -> Void

    public init(label: String, icon: String? = nil, action: @escaping () -> Void) {
        self.label = label; self.icon = icon; self.action = action
    }
}

/// sh-mini-card. The card is not interactive; the action button has its own states.
public struct ShMiniCard: View {
    public var type: ShMiniCardType
    public var name: String
    public var photo: Image?
    public var requestedPortrait: Image?
    public var badges: [ShMiniCardBadge]
    public var details: [String]
    public var action: ShMiniCardAction?

    /// - Parameters:
    ///   - name: Figma "Name", e.g. "Sneha P, 26". One line; a long name truncates and the badges stay.
    ///   - photo: the member's photo (Type Default).
    ///   - requestedPortrait: Type No photo: the requested portrait. nil = sh-user-images Female requested.
    ///   - badges: Figma "Show badge 1 / 2" + "Badge 1 / 2", in order (Figma default: verified, premium).
    ///   - details: Figma "Show detail 1–3": up to three facts; every fact has a separator except the last one.
    ///   - action: the button; nil hides it.
    public init(type: ShMiniCardType = .standard, name: String, photo: Image? = nil, requestedPortrait: Image? = nil,
                badges: [ShMiniCardBadge] = [], details: [String] = [], action: ShMiniCardAction? = nil) {
        self.type = type; self.name = name; self.photo = photo; self.requestedPortrait = requestedPortrait
        self.badges = badges; self.details = details; self.action = action
    }

    public var body: some View {
        let shape = RoundedRectangle(cornerRadius: SH.Radius.md, style: .continuous)
        let facts = Array(details.prefix(3))

        VStack(spacing: SH.Space.step8) {
            switch type {
            case .standard:
                ShAvatar(size: .lg, type: .image, image: photo)
            case .noPhoto:
                ShMiniCardRequestedAvatar(portrait: requestedPortrait ?? ShUserImageRequested.female.image)
            }

            // Info: fill × hug, children centred
            VStack(spacing: SH.Space.step4) {
                HStack(spacing: SH.Space.step4) {
                    Text(name)
                        .shTextStyle(.titleSm)
                        .foregroundStyle(SH.Color.textPrimary.color)
                        .lineLimit(1)
                        .truncationMode(.tail)
                    if !badges.isEmpty {
                        HStack(spacing: SH.Space.step2) {
                            ForEach(Array(badges.enumerated()), id: \.offset) { _, badge in
                                ShBadge(badge.icon, label: badge.label, height: SH.Icon.size14)
                            }
                        }
                        .fixedSize()
                        .layoutPriority(1)                  // the name truncates first
                    }
                }
                if !facts.isEmpty {
                    // Details: wraps, each line centred; facts 6 apart (the fact's own label-to-dot gap), lines 0 apart
                    ShMiniCardCenteredFlow(spacing: SH.Space.step6, lineSpacing: SH.Space.step0) {
                        ForEach(Array(facts.enumerated()), id: \.offset) { index, fact in
                            ShInfoDetail(fact, mode: .standard, size: .small, separator: index < facts.count - 1)
                        }
                    }
                    .accessibilityElement(children: .combine)
                }
            }
            .frame(maxWidth: .infinity)

            if let action {
                ShButton(action.label, type: .primary, size: .small, leadingIcon: action.icon, fill: true,
                         action: action.action)
            }
        }
        .padding(SH.Space.step12)
        .padding(SH.Stroke.default)                         // stroke inside, included in layout
        .frame(width: SH.Space.step80 + SH.Space.step48 + SH.Space.step24)   // no token: Figma fixed width 152
        .background(SH.Color.backgroundDefault.color, in: shape)
        .overlay(shape.strokeBorder(SH.Color.borderDefault.color, lineWidth: SH.Stroke.default))
        .shShadow(SH.ShadowStyle.soft)
    }
}

/// Type No photo avatar: the sh-avatar lg ring (icon/on-image) around a background/strong Media holding the
/// requested portrait. Figma places the portrait at 125 % of the Media's width, centred, its top 12.5 % above the Media.
private struct ShMiniCardRequestedAvatar: View {
    let portrait: Image

    var body: some View {
        let shape = RoundedRectangle(cornerRadius: SH.Radius.avatar, style: .continuous)
        // no token: Figma's ring weight is unbound (1) → sh-stroke/default
        let ring = SH.Stroke.default
        let diameter = SH.Space.step48 * 2                  // no token: Figma avatar 96 = 2 × sh-space/48
        let media = diameter - 2 * ring

        // no token: crop proportions of the Media (Figma 117.5 wide, top-aligned, at −11.75, −11.75 in 94)
        ShUserImage(portrait, alignment: .top)
            .frame(width: media * 1.25, height: media * 1.125)
            .offset(x: -media * 0.125, y: -media * 0.125)
            .frame(width: media, height: media, alignment: .topLeading)
            .background(SH.Color.backgroundStrong.color)
            .clipShape(shape)
            .padding(ring)                                  // Media sits inside the ring
            .overlay(shape.strokeBorder(SH.Color.iconOnImage.color, lineWidth: ring))
            .accessibilityHidden(true)
    }
}

/// Wrapping row whose lines are each centred horizontally; items centred vertically within a line.
private struct ShMiniCardCenteredFlow: Layout {
    var spacing: CGFloat
    var lineSpacing: CGFloat

    private struct Line { var indices: [Int] = []; var width: CGFloat = 0; var height: CGFloat = 0 }

    private func lines(_ sizes: [CGSize], maxWidth: CGFloat) -> [Line] {
        var result: [Line] = []
        var line = Line()
        for (i, s) in sizes.enumerated() {
            let needed = line.indices.isEmpty ? s.width : line.width + spacing + s.width
            if !line.indices.isEmpty && needed > maxWidth {
                result.append(line)
                line = Line(indices: [i], width: s.width, height: s.height)
            } else {
                line.indices.append(i); line.width = needed; line.height = max(line.height, s.height)
            }
        }
        if !line.indices.isEmpty { result.append(line) }
        return result
    }

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let sizes = subviews.map { $0.sizeThatFits(.unspecified) }
        let ls = lines(sizes, maxWidth: proposal.width ?? .infinity)
        let width = ls.map(\.width).max() ?? 0
        let height = ls.map(\.height).reduce(0, +) + lineSpacing * CGFloat(max(ls.count - 1, 0))
        return CGSize(width: proposal.width ?? width, height: height)
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let sizes = subviews.map { $0.sizeThatFits(.unspecified) }
        var y = bounds.minY
        for line in lines(sizes, maxWidth: bounds.width) {
            var x = bounds.minX + (bounds.width - line.width) / 2
            for i in line.indices {
                let s = sizes[i]
                subviews[i].place(at: CGPoint(x: x, y: y + (line.height - s.height) / 2), proposal: ProposedViewSize(s))
                x += s.width + spacing
            }
            y += line.height + lineSpacing
        }
    }
}

#Preview("sh-mini-card") {
    HStack(alignment: .top, spacing: SH.Space.step16) {
        ShMiniCard(type: .standard, name: "Sneha P, 26", photo: ShUserImageRequested.female.image,
                   badges: [.verified, .premium], details: ["5’6”", "Kayastha", "Pune, MH"],
                   action: ShMiniCardAction(label: "Connect Now", icon: "filled/check") {})
        ShMiniCard(type: .noPhoto, name: "Sneha P, 26",
                   badges: [.verified, .premium], details: ["5’6”", "Kayastha", "Pune, MH"],
                   action: ShMiniCardAction(label: "Connect Now", icon: "filled/check") {})
    }
    .padding(SH.Space.step16)
}
