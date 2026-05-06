/**
 * App theme colors.
 */

import { Platform } from "react-native";

const tintColorLight = "#111827";
const tintColorDark = "#FFFFFF";

export const Colors = {
  light: {
    text: "#111827",
    mutedText: "#6B7280",
    inverseText: "#FFFFFF",

    background: "#FFFFFF",
    surface: "#F9FAFB",
    surfaceMuted: "#F3F4F6",
    border: "#E5E7EB",

    tint: tintColorLight,
    icon: "#6B7280",
    tabIconDefault: "#6B7280",
    tabIconSelected: tintColorLight,

    primary: "#111827",
    primaryText: "#FFFFFF",

    secondary: "#F9FAFB",
    secondaryText: "#111827",

    danger: "#DC2626",
    dangerText: "#FFFFFF",
  },

  dark: {
    text: "#FFFFFF",
    mutedText: "#D1D5DB",
    inverseText: "#111827",

    background: "#111827",
    surface: "#1F2937",
    surfaceMuted: "#374151",
    border: "#374151",

    tint: tintColorDark,
    icon: "#D1D5DB",
    tabIconDefault: "#9CA3AF",
    tabIconSelected: tintColorDark,

    primary: "#FFFFFF",
    primaryText: "#111827",

    secondary: "#1F2937",
    secondaryText: "#FFFFFF",

    danger: "#DC2626",
    dangerText: "#FFFFFF",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
