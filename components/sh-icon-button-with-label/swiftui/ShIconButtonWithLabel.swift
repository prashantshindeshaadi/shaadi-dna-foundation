// sh-icon-button-with-label — SwiftUI
// Spec: ../sh-icon-button-with-label.md · Figma node 2198:32247 (State: Default, Focus)
//
// Built from sh-icon-button (Type Secondary, Size Medium, filling the width) + a Support/Label caption.
// Needs ../../sh-icon-button/swiftui/ShIconButton.swift (ShIconButtonSurface) and its dependencies.
//
// One button for icon + caption (the caption is the accessible name); Hover / Pressed / Focus show on the icon
// button (Focus = its ring, as in Figma). Width: in an HStack of equal actions each takes an equal share (the icon
// button fills it). Over imagery (action island) pass labelColor: SH.Color.textOnImage.color.

import SwiftUI

/// sh-icon-button-with-label: an icon action with a short caption, used in rows of equal actions.
public struct ShIconButtonWithLabel: View {
    public var label: String
    public var icon: String
    public var labelColor: Color?
    public var action: () -> Void

    /// - Parameters:
    ///   - label: Figma "Label"; also the accessible name
    ///   - icon: the action's icon, e.g. "line/call"
    ///   - labelColor: caption colour; text/primary unless overridden (text/on-image over imagery)
    public init(_ label: String, icon: String, labelColor: Color? = nil, action: @escaping () -> Void) {
        self.label = label; self.icon = icon; self.labelColor = labelColor; self.action = action
    }

    public var body: some View {
        Button(action: action) {
            Text(label)
        }
        .buttonStyle(ShIconButtonWithLabelStyle(icon: icon, labelColor: labelColor))
    }
}

private struct ShIconButtonWithLabelStyle: ButtonStyle {
    let icon: String
    let labelColor: Color?

    func makeBody(configuration: Configuration) -> some View {
        ShIconButtonWithLabelBody(label: configuration.label, icon: icon, labelColor: labelColor,
                                  isPressed: configuration.isPressed)
    }
}

private struct ShIconButtonWithLabelBody<Label: View>: View {
    let label: Label
    let icon: String
    let labelColor: Color?
    let isPressed: Bool
    @Environment(\.isEnabled) var isEnabled
    @Environment(\.isFocused) var isFocused
    @State var isHovered = false

    var body: some View {
        // Hit area at least 48 wide: the narrowest visual is the Medium icon button (icon 20 + 2 × 10).
        let tapInset = max(0, (SH.Icon.targetDefault - (SH.Icon.size20 + 2 * SH.Space.step10)) / 2)
        VStack(spacing: SH.Space.step4) {
            ShIconButtonSurface(icon: icon, type: .secondary, size: .medium, badge: nil, fill: true,
                                isPressed: isPressed && isEnabled, isHovered: isHovered && isEnabled,
                                isFocused: isFocused && isEnabled,
                                isEnabled: true)                   // the whole action is dimmed below, not twice
            label
                .shTextStyle(.supportLabel)
                .foregroundStyle(labelColor ?? SH.Color.textPrimary.color)
                .multilineTextAlignment(.center)
                .lineLimit(1)
        }
        .opacity(isEnabled ? SH.Opacity.full : SH.Opacity.disabled)   // FOUNDATION §4.3 (not a Figma variant)
        .padding(.horizontal, tapInset)
        .contentShape(Rectangle())
        .padding(.horizontal, -tapInset)
        .contentShape(.hoverEffect, RoundedRectangle(cornerRadius: SH.Radius.md, style: .continuous))   // Figma root radius md
        .onHover { isHovered = $0 }
    }
}
