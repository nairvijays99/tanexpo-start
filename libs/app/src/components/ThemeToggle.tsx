import { FC } from "react";
import { Pressable, Text, View } from "react-native";

import { useAppTheme } from "@libs/theme";

export const ThemeToggle: FC = () => {
  const { themeContext, setThemeContextOverride, themed } = useAppTheme();

  const toggleTheme = () => {
    setThemeContextOverride(themeContext === "dark" ? "light" : "dark");
  };

  return (
    <View
      style={themed({
        padding: 16,
        borderRadius: 12,
        backgroundColor: (t) => t.colors.background,
        borderWidth: 1,
        borderColor: (t) => t.colors.border,
      })}
    >
      <Text
        style={themed({
          color: (t) => t.colors.text,
          fontSize: 16,
          marginBottom: 12,
          fontWeight: "600",
        })}
      >
        Current theme: {themeContext}
      </Text>

      <Pressable
        onPress={toggleTheme}
        style={themed({
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 8,
          backgroundColor: (t) => t.colors.tint,
        })}
      >
        <Text
          style={themed({
            color: "#FFFFFF",
            textAlign: "center",
            fontWeight: "600",
          })}
        >
          Toggle Theme
        </Text>
      </Pressable>
    </View>
  );
};
