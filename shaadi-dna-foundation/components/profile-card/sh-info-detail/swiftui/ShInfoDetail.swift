// sh-info-detail — SwiftUI
// Spec: ../sh-info-detail.md · Figma node 2825:43215 · Mode On image / Default × Size Medium / Small
//
// One member fact (height, community, city, profession) followed by a dot separator, plus
// ShInfoDetailRow, which lines facts up in a wrapping row and drops the dot after the last one.
// Needs dist/ios/SHTokens.swift and the type kit (ShTypography.swift). Every value is a DNA token except
// the dot size (see below).

import SwiftUI

/// Figma "Mode": On image (text/on-image, for dark glass and photos) or Default (text/secondary, light surfaces).
public enum ShInfoDetailMode: CaseIterable {
    case onImage
    case standard          // Figma "Default"
}

/// Figma "Size": Medium = Body/MD/Default, gap 8 · Small = Body/SM/Tight, gap 6.
public enum ShInfoDetailSize: CaseIterable {
    case medium, small
}

/// sh-info-detail: one member fact followed by a dot separator. Not interactive.
/// `separator` is Figma "Show separator": turn it off on the last fact of a row (ShInfoDetailRow does this).
public struct ShInfoDetail: View {
    public var label: String
    public var mode: ShInfoDetailMode
    public var size: ShInfoDetailSize
    public var separator: Bool

    public init(_ label: String, mode: ShInfoDetailMode = .onImage, size: ShInfoDetailSize = .medium,
                separator: Bool = true) {
        self.label = label; self.mode = mode; self.size = size; self.separator = separator
    }

    public var body: some View {
        HStack(spacing: ShInfoDetailMetrics.gap(size)) {
            Text(label)
                .shTextStyle(size == .medium ? .bodyMd : .bodySmTight)
                .foregroundStyle(ShInfoDetailMetrics.color(mode))
                .lineLimit(1)
                .fixedSize()
            if separator {
                Circle()
                    .fill(ShInfoDetailMetrics.color(mode))
                    .frame(width: 3, height: 3)        // no token: Figma's separator dot is an unbound 3 × 3 ellipse
                    .opacity(SH.Opacity.strong)
                    .accessibilityHidden(true)
            }
        }
    }
}

/// A row of facts that wraps onto new lines. Every fact has a separator except the last one; the gap between
/// facts equals the fact's own label-to-dot gap, so the dot sits centred. Lines are sh-space/2 apart.
public struct ShInfoDetailRow: View {
    public var facts: [String]
    public var mode: ShInfoDetailMode
    public var size: ShInfoDetailSize

    public init(_ facts: [String], mode: ShInfoDetailMode = .onImage, size: ShInfoDetailSize = .medium) {
        self.facts = facts; self.mode = mode; self.size = size
    }

    public var body: some View {
        ShInfoDetailFlow(spacing: ShInfoDetailMetrics.gap(size), lineSpacing: SH.Space.step2) {
            ForEach(Array(facts.enumerated()), id: \.offset) { index, fact in
                ShInfoDetail(fact, mode: mode, size: size, separator: index < facts.count - 1)
            }
        }
        .accessibilityElement(children: .combine)
    }
}

private enum ShInfoDetailMetrics {
    static func color(_ mode: ShInfoDetailMode) -> Color {
        mode == .onImage ? SH.Color.textOnImage.color : SH.Color.textSecondary.color
    }
    static func gap(_ size: ShInfoDetailSize) -> CGFloat {
        size == .medium ? SH.Space.step8 : SH.Space.step6
    }
}

/// Wrapping row layout: items left to right, a new line when the next one doesn't fit; each line centred vertically.
private struct ShInfoDetailFlow: Layout {
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
