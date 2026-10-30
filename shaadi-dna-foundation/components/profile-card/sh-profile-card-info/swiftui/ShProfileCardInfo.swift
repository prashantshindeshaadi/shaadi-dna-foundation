// sh-profile-card-info — SwiftUI
// Spec: ../sh-profile-card-info.md · Figma node 2496:27797 (1 variant; booleans and slots as parameters)
//
// Profile summary on a card: name, age, trust badges, status, key details, optional tags and the action island,
// on dark glass over the photo. Built from sh-tag-profile, sh-info-detail, sh-divider, sh-icon (ShBadge) and the
// island you pass in (normally ShActionIsland, Style Normal) — all in the same module.
// Needs dist/ios/SHTokens.swift and the type kit (ShTypography.swift). Every value is a DNA token.
// Corners use .continuous (iOS corner smoothing). Not interactive itself.
//
// Glass: sh-gradient/translucent/dark/extra-soft + edge sh-gradient/translucent/border/light + background blur
// (sh-background-blur/uniform/default; SwiftUI draws it with the system material through shGlass).

import SwiftUI

/// Figma "Badge 2" / "Badge 3": the trust badges after the age.
public enum ShProfileBadge: CaseIterable {
    case premium, vip
}

/// sh-profile-card-info.
/// - Parameters map to Figma: Name, Age, Show status (`status`, nil hides it; Online / Offline), Show tags (`tags`,
///   empty hides the row), Verified, Show badge 2 / 3 (`badges`), Show detail 1–4 (`details`: one inner array per
///   line; the dot sits between facts, never after the last one of a line; empty hides them), Actions (`island`).
/// Long names are cut with … before the age; the age, badges, status and verified badge never shrink.
public struct ShProfileCardInfo<Island: View>: View {
    public var name: String
    public var age: Int
    public var status: ShTagProfileType?
    public var tags: [ShTagProfileType]
    public var verified: Bool
    public var badges: [ShProfileBadge]
    public var details: [[String]]
    public var island: Island

    public init(name: String, age: Int, status: ShTagProfileType? = .online, tags: [ShTagProfileType] = [],
                verified: Bool = false, badges: [ShProfileBadge] = [], details: [[String]] = [],
                @ViewBuilder island: () -> Island) {
        self.name = name; self.age = age; self.status = status; self.tags = tags; self.verified = verified
        self.badges = badges; self.details = details; self.island = island()
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: SH.Space.step10) {
            // Content box: name row + details
            VStack(alignment: .leading, spacing: SH.Space.step2) {
                nameRow
                if !details.isEmpty {
                    VStack(alignment: .leading, spacing: SH.Space.step2) {
                        ForEach(Array(details.enumerated()), id: \.offset) { _, line in
                            ShInfoDetailRow(line, mode: .onImage, size: .medium)
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                }
            }
            if !tags.isEmpty {
                ShProfileCardInfoFlow(spacing: SH.Space.step8, lineSpacing: SH.Space.step8) {
                    ForEach(Array(tags.enumerated()), id: \.offset) { _, tag in
                        ShTagProfile(tag)
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
            }
            ShDivider(orientation: .horizontal, type: .soft)
                .opacity(SH.Opacity.extraSoft)
            island
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding(.top, SH.Space.step14)
        .padding(.horizontal, SH.Space.step16)
        .padding(.bottom, SH.Space.step16)
        .frame(maxWidth: .infinity, alignment: .leading)
        .shGlass(fill: SH.Gradient.translucentDarkExtraSoft, edge: SH.Gradient.translucentBorderLight,
                 cornerRadius: SH.Radius.lg, edgeWidth: SH.Stroke.default, blur: true)
        .accessibilityElement(children: .contain)
    }

    // MARK: Name row: Name · Age · badges · status … verified at the far right

    private var nameRow: some View {
        HStack(spacing: SH.Space.step6) {
            HStack(spacing: SH.Space.step6) {
                Text(name)
                    .shTextStyle(.headingSm)
                    .foregroundStyle(SH.Color.textOnImage.color)
                    .lineLimit(1)
                    .truncationMode(.tail)
                    .layoutPriority(-1)                          // the name gives way first
                Text(String(age))
                    .shTextStyle(.headingSm)
                    .foregroundStyle(SH.Color.textOnImage.color)
                    .lineLimit(1)
                    .fixedSize()
                ForEach(Array(badges.enumerated()), id: \.offset) { _, badge in
                    switch badge {
                    case .premium: ShBadge("misc/premium-badge", label: "Premium", height: SH.Icon.size20).fixedSize()
                    case .vip: ShBadge("misc/vip-badge", label: "VIP", height: SH.Icon.size20).fixedSize()
                    }
                }
                if let status {
                    ShTagProfile(status).fixedSize()
                }
            }
            .accessibilityElement(children: .combine)
            .accessibilityAddTraits(.isHeader)
            Spacer(minLength: SH.Space.step0)
            if verified {
                ShBadge("misc/verified-badge", label: "Verified", height: SH.Icon.size20)
                    .fixedSize()
            }
        }
        .padding(.bottom, SH.Space.step2)
        .clipped()
    }
}

/// Wrapping row for the tags: left to right, a new line when the next one doesn't fit; lines centred vertically.
private struct ShProfileCardInfoFlow: Layout {
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
        return CGSize(width: proposal.width.map { min($0, width) } ?? width, height: height)
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let sizes = subviews.map { $0.sizeThatFits(.unspecified) }
        var y = bounds.minY
        for line in lines(sizes, maxWidth: bounds.width) {
            var x = bounds.minX
            for i in line.indices {
                let s = sizes[i]
                subviews[i].place(at: CGPoint(x: x, y: y + (line.height - s.height) / 2), proposal: ProposedViewSize(s))
                x += s.width + spacing
            }
            y += line.height + lineSpacing
        }
    }
}

// MARK: - Preview

#if DEBUG
#Preview("sh-profile-card-info") {
    ScrollView {
        VStack(spacing: SH.Space.step16) {
            ShProfileCardInfo(name: "Sneha Kaul", age: 26, status: .online, tags: [.youAndHer, .astro], verified: true,
                              badges: [.premium],
                              details: [["5′ 6″", "Kashmiri Pandit"], ["Pimpri-Chinchwad", "Software Developer"]]) {
                ShActionIsland(type: .messagePrimary,
                               note: ShActionNote(cta: .edit, message: "Hey Sneha, I came across your profile. It felt true to me.") {},
                               message: "Like this profile?",
                               primary: ShIslandButton(label: "Connect Now", icon: "filled/connect") {})
            }
            ShProfileCardInfo(name: "Snehalata Venkataraman Kaul", age: 26, verified: true, badges: [.vip]) {
                ShActionIsland(type: .threeActions,
                               note: ShActionNote(cta: .upgrade, actionText: "To contact her directly") {},
                               actions: [ShIslandAction(label: "Shaadi Chat", icon: "line/chat-bubble") {},
                                         ShIslandAction(label: "WhatsApp", icon: "line/whatsapp-02") {},
                                         ShIslandAction(label: "Call", icon: "line/call") {}])
            }
        }
        .padding(SH.Space.step12)
    }
    .background(SH.Color.backgroundInverse.color)
}
#endif
