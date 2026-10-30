// sh-avatar-silhouette — SwiftUI
// Spec: ../sh-avatar-silhouette.md · Figma node 3598:69346
//
// Gender Female / Male. The no-photo silhouette art: white with soft edges on a transparent square,
// so it sits on any background (sh-avatar-placeholder puts it on the placeholder gradient).
// Add the art in ../assets/ to the asset catalogue as "sh-avatar-silhouette/female" and
// "sh-avatar-silhouette/male" (SVG, preserve vector data). Size it with .frame(width:); it stays square.

import SwiftUI

/// Figma property "Gender".
public enum ShAvatarSilhouetteGender {
    case female
    case male
}

/// sh-avatar-silhouette: the no-photo figure. Decorative; the parent says "No photo".
public struct ShAvatarSilhouette: View {
    public var gender: ShAvatarSilhouetteGender

    public init(gender: ShAvatarSilhouetteGender = .female) {
        self.gender = gender
    }

    public var body: some View {
        Image(gender == .male ? "sh-avatar-silhouette/male" : "sh-avatar-silhouette/female")
            .resizable()
            .scaledToFit()
            .aspectRatio(1, contentMode: .fit)
            .accessibilityHidden(true)
    }
}

#Preview("sh-avatar-silhouette") {
    HStack(spacing: SH.Space.step24) {
        ShAvatarSilhouette(gender: .female).frame(width: SH.Space.step80 * 2)
        ShAvatarSilhouette(gender: .male).frame(width: SH.Space.step80 * 2)
    }
    .padding(SH.Space.step24)
    .background(SH.Gradient.placeholderAvatar.view)
}
