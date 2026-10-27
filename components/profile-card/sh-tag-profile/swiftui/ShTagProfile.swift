// sh-tag-profile — SwiftUI
// Spec: ../sh-tag-profile.md · Figma node 2813:41954 · 7 types
//
// Built on sh-tag (components/sh-tag/swiftui/ShTag.swift): each type is a ShTag with a fixed mode, size,
// shape, icon and paint. All are Size Small (20 tall).
// Assets ("sh-icon/<type>/<name>"): tag/online, tag/offline, tag/left-wing, tag/right-wing (Render As Original),
// line/link-rings, line/astro, filled/megaphone-02, tag/pin-location-01 (Render As Template).

import SwiftUI

/// Figma "Type", in Figma's order.
public enum ShTagProfileType: CaseIterable {
    case online, youAndHer, astro, promoted, topProfile, distance, offline
}

/// sh-tag-profile: the profile-card tags (status, shared connections, astro, promoted, top profile, distance).
/// `label` overrides the type's default text, e.g. the member's distance ("2 km") on Distance.
public struct ShTagProfile: View {
    public var type: ShTagProfileType
    public var label: String?

    public init(_ type: ShTagProfileType, label: String? = nil) {
        self.type = type; self.label = label
    }

    public var body: some View {
        switch type {
        case .online, .offline:
            ShTag(label ?? (type == .online ? "Online" : "Offline"),
                  mode: .translucentLight, size: .small, shape: .pill,
                  leadingIcon: ShIconSpec(type == .online ? "tag/online" : "tag/offline", paint: .original),
                  iconSize: SH.Icon.size12)
        case .youAndHer:
            ShTag(label ?? "You & Her", mode: .translucentLight, size: .small, shape: .rounded,
                  leadingIcon: ShIconSpec("line/link-rings", paint: .gradient(SH.Gradient.brandDefault)),
                  border: false, iconSize: SH.Icon.size12)
        case .astro:
            ShTag(label ?? "Astro", mode: .translucentLight, size: .small, shape: .rounded,
                  leadingIcon: ShIconSpec("line/astro", paint: .gradient(SH.Gradient.premiumDefault)),
                  border: false, iconSize: SH.Icon.size12)
        case .promoted:
            ShTag(label ?? "Promoted", mode: .white, size: .small, shape: .rounded,
                  leadingIcon: ShIconSpec("filled/megaphone-02"),          // icon/secondary from the White mode
                  iconSize: SH.Icon.size12)
                .compositingGroup()
                .shShadow(SH.ShadowStyle.soft)
        case .topProfile:
            ShTag(label ?? "Top Profile", mode: .white, size: .small, shape: .rounded,
                  leadingIcon: ShIconSpec("tag/left-wing", paint: .original),   // laurel art, 12 tall
                  trailingIcon: ShIconSpec("tag/right-wing", paint: .original),
                  iconSize: SH.Icon.size12)
                .compositingGroup()
                .shShadow(SH.ShadowStyle.soft)
        case .distance:
            ShTag(label ?? "20 km", mode: .white, size: .small, shape: .rounded,
                  leadingIcon: ShIconSpec("tag/pin-location-01"),          // icon/secondary from the White mode
                  iconSize: SH.Icon.size12)
                .compositingGroup()
                .shShadow(SH.ShadowStyle.soft)
        }
    }
}
