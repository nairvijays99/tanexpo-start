import { CommonKeys, useT } from "@libs/i18n";
import { useAppTheme } from "@libs/theme";
import { Suspense } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface NotFoundProps {
  onGoBack?: () => void;
  title?: string;
  message?: string;
}

const NotFoundContent: React.FC<NotFoundProps> = ({ onGoBack, title, message }) => {
  const { theme } = useAppTheme();
  const { colors } = theme;
  const { t } = useT("common");

  const displayTitle = title || t(CommonKeys.notFoundTitle);
  const displayMessage = message || t(CommonKeys.notFoundMessage);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.code, { color: colors.tint }]}>404</Text>
        <Text style={[styles.title, { color: colors.text }]}>{displayTitle}</Text>
        <Text style={[styles.message, { color: colors.textDim }]}>{displayMessage}</Text>
        {onGoBack && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.tint }]}
            onPress={onGoBack}
          >
            <Text style={[styles.buttonText, { color: colors.background }]}>
              {t(CommonKeys.goBackHome)}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export const NotFound: React.FC<NotFoundProps> = (props) => (
  <Suspense fallback={<ActivityIndicator style={{ flex: 1 }} />}>
    <NotFoundContent {...props} />
  </Suspense>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  content: {
    alignItems: "center",
    maxWidth: 400,
  },
  code: {
    fontSize: 80,
    fontWeight: "800",
    opacity: 0.2,
    marginBottom: -24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: "center",
    lineHeight: 24,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
