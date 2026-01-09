import type { ThemedStyle } from "@libs/ui";
import { $styles, Screen, Text, useAppTheme } from "@libs/ui";
import { useSafeAreaInsetsStyle } from "@libs/utils";
import type { FC } from "react";
import { type TextStyle, View, type ViewStyle } from "react-native";

export const WelcomeScreen: FC = function WelcomeScreen() {
  const { themed, theme } = useAppTheme();

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"]);

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        {/* <Image style={themed($welcomeLogo)} source={welcomeLogo} resizeMode="contain" /> */}
        <Text
          testID="welcome-heading"
          style={themed($welcomeHeading)}
          text="welcomeScreen:readyForLaunch"
          preset="heading"
        />
        <Text text="welcomeScreen:exciting" preset="subheading" />
        {/* <Image
          style={$welcomeFace}
          source={welcomeFace}
          resizeMode="contain"
          tintColor={theme.colors.palette.neutral900}
        /> */}
      </View>

      <View style={themed([$bottomContainer, $bottomContainerInsets])}>
        <Text text="welcomeScreen:postscript" size="md" />
      </View>
    </Screen>
  );
};

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
});

const $bottomContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
});

const $welcomeHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
});
