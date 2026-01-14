import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "@libs/theme";

export function AppTheme() {
  const { theme, themeContext, setThemeContextOverride } = useAppTheme();
  const { colors, spacing, typography } = theme;

  const toggleTheme = () => {
    setThemeContextOverride(themeContext === "dark" ? "light" : "dark");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>App Theme</Text>
        <Pressable
          onPress={toggleTheme}
          style={[styles.toggleButton, { backgroundColor: colors.tint }]}
        >
          <Text style={styles.toggleButtonText}>
            Toggle {themeContext === "dark" ? "Light" : "Dark"}
          </Text>
        </Pressable>
      </View>

      {/* Colors Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Colors</Text>
        <View style={styles.grid}>
          {Object.entries(colors).map(([key, value]) => {
            if (key === "palette") return null;
            if (typeof value !== "string") return null;
            return (
              <View key={key} style={styles.colorItem}>
                <View
                  style={[styles.colorBox, { backgroundColor: value, borderColor: colors.border }]}
                />
                <Text style={[styles.colorLabel, { color: colors.text }]} numberOfLines={1}>
                  {key}
                </Text>
                <Text style={[styles.colorValue, { color: colors.textDim }]}>{value}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Palette Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Palette</Text>
        <View style={styles.grid}>
          {Object.entries(colors.palette).map(([key, value]) => (
            <View key={key} style={styles.colorItem}>
              <View
                style={[styles.colorBox, { backgroundColor: value, borderColor: colors.border }]}
              />
              <Text style={[styles.colorLabel, { color: colors.text }]} numberOfLines={1}>
                {key}
              </Text>
              <Text style={[styles.colorValue, { color: colors.textDim }]}>{value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Typography Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Typography</Text>
        <View style={styles.typographyContainer}>
          {Object.entries(typography.primary).map(([weight, style]) => (
            <View key={weight} style={styles.typographyItem}>
              <Text style={[styles.typographyLabel, { color: colors.textDim }]}>
                Primary {weight}
              </Text>
              <Text style={[style, { color: colors.text, fontSize: 24 }]}>
                The quick brown fox jumps over the lazy dog
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Spacing Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Spacing</Text>
        <View style={styles.spacingContainer}>
          {Object.entries(spacing).map(([key, value]) => (
            <View key={key} style={styles.spacingItem}>
              <Text style={[styles.spacingLabel, { color: colors.textDim }]}>
                {key} ({value}px)
              </Text>
              <View
                style={[
                  styles.spacingBar,
                  {
                    width: value,
                    backgroundColor: colors.tint,
                  },
                ]}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  toggleButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
  },
  colorItem: {
    width: "33.33%",
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  colorBox: {
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  colorLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  colorValue: {
    fontSize: 10,
    fontFamily: "monospace",
  },
  typographyContainer: {
    gap: 24,
  },
  typographyItem: {
    gap: 4,
  },
  typographyLabel: {
    fontSize: 12,
    textTransform: "uppercase",
  },
  spacingContainer: {
    gap: 16,
  },
  spacingItem: {
    gap: 8,
  },
  spacingLabel: {
    fontSize: 12,
  },
  spacingBar: {
    height: 24,
    borderRadius: 4,
  },
});
