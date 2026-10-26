// sh-avatar — SwiftUI
// Spec: ../sh-avatar.md · Figma node 2486:15378 · Size sm / md / lg × Type Image / Initial / Icon
//
// A member's identity: photo, initials or a gender glyph in a circle with an icon/on-image ring.
// Needs dist/ios/SHTokens.swift, the type kit (ShTypography.swift),
// ../../profile-card/sh-user-images/swiftui/ShUserImages.swift (Image) and ../../sh-avatar-glyph/swiftui/ShAvatarGlyph.swift (Icon).

import SwiftUI

/// Figma "Size": sm 32 · md 48 · lg 96.
public enum ShAvatarSize: CaseIterable {
    case sm, md, lg
}

/// Figma "Type": the member's photo, their initials (Figma "Label"), or a gender glyph (Figma "Icon" swap).
public enum ShAvatarType: CaseIterable {
    case image, initial, icon
}

/// sh-avatar. Not interactive.
///
/// Root: size per Size, ring stroke icon/on-image (inside), radius sh-radius/avatar. Media sits inside the ring:
/// Image = sh-user-images (Style Normal); Initial = background/strong + Label in text/secondary
/// (sm Support/Label · md Body/MD/Default · lg Heading/SM); Icon = background/strong + sh-avatar-glyph in
/// icon/secondary (sm 16 · md 24 · lg 40).
public struct ShAvatar: View {
    public var size: ShAvatarSize
    public var type: ShAvatarType
    public var image: Image?
    public var initials: String
    public var gender: ShAvatarGlyphGender

    /// - Parameters:
    ///   - image: the member's photo (Type Image). nil leaves the Media empty.
    ///   - initials: Figma "Label" (Type Initial), e.g. "SH".
    ///   - gender: Figma "Icon" swap (Type Icon): sh-avatar-glyph Male or Female.
    public init(size: ShAvatarSize = .sm, type: ShAvatarType = .image, image: Image? = nil,
                initials: String = "", gender: ShAvatarGlyphGender = .male) {
        self.size = size; self.type = type; self.image = image; self.initials = initials; self.gender = gender
    }

    public var body: some View {
        let shape = RoundedRectangle(cornerRadius: SH.Radius.avatar, style: .continuous)
        // no token: Figma's ring weight is unbound (1) → sh-stroke/default
        let ring = SH.Stroke.default
        let diameter = ShAvatarMetrics.diameter(size)

        media
            .frame(width: diameter - 2 * ring, height: diameter - 2 * ring)
            .background(type == .image ? Color.clear : SH.Color.backgroundStrong.color)
            .clipShape(shape)
            .padding(ring)                                              // Media sits inside the ring
            .overlay(shape.strokeBorder(SH.Color.iconOnImage.color, lineWidth: ring))
            .frame(width: diameter, height: diameter)
    }

    @ViewBuilder private var media: some View {
        switch type {
        case .image:
            ShUserImage(image)
        case .initial:
            Text(initials)
                .shTextStyle(ShAvatarMetrics.labelStyle(size))
                .foregroundStyle(SH.Color.textSecondary.color)
                .multilineTextAlignment(.center)
                .lineLimit(1)
                .fixedSize()
        case .icon:
            ShAvatarGlyph(gender: gender, size: ShAvatarMetrics.glyphSize(size), color: SH.Color.iconSecondary.color)
        }
    }
}

private enum ShAvatarMetrics {
    static func diameter(_ size: ShAvatarSize) -> CGFloat {
        switch size {
        case .sm: return SH.Space.step32
        case .md: return SH.Space.step48
        case .lg: return SH.Space.step48 * 2       // no token: Figma leaves lg (96) unbound = 2 × sh-space/48
        }
    }

    static func labelStyle(_ size: ShAvatarSize) -> ShTextStyle {
        switch size {
        case .sm: return .supportLabel
        case .md: return .bodyMd
        case .lg: return .headingSm
        }
    }

    static func glyphSize(_ size: ShAvatarSize) -> ShAvatarGlyphSize {
        switch size {
        case .sm: return .s16
        case .md: return .s24
        case .lg: return .s40
        }
    }
}

#Preview("sh-avatar") {
    VStack(spacing: SH.Space.step16) {
        ForEach(ShAvatarSize.allCases, id: \.self) { size in
            HStack(spacing: SH.Space.step16) {
                ShAvatar(size: size, type: .image, image: ShUserImageRequested.female.image)
                ShAvatar(size: size, type: .initial, initials: "SH")
                ShAvatar(size: size, type: .icon, gender: .female)
            }
        }
    }
    .padding(SH.Space.step16)
}
