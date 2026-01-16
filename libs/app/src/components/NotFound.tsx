import { useAppTheme } from "@libs/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface NotFoundProps {
  onGoBack?: () => void;
  title?: string;
  message?: string;
}

export const NotFound: React.FC<NotFoundProps> = ({
  onGoBack,
  title = "404 - Page Not Found",
  message = "The page you are looking for doesn't exist or has been moved.",
}) => {
  const { theme } = useAppTheme();
  const { colors, spacing } = theme;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.code, { color: colors.tint }]}>404</Text>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.message, { color: colors.textDim }]}>{message}</Text>
        {onGoBack && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.tint }]}
            onPress={onGoBack}
          >
            <Text style={[styles.buttonText, { color: colors.background }]}>Go Back Home</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

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
