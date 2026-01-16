import { useAppTheme } from "@libs/theme";
import {
  Button,
  Card,
  Checkbox,
  Icon,
  ListItem,
  Radio,
  Switch,
  TextField,
  Text as UIText,
} from "@libs/ui";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

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

      {/* Components Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Components</Text>

        <View style={styles.componentItem}>
          <Text style={[styles.componentLabel, { color: colors.text }]}>UI Text Presets</Text>
          <UIText preset="heading" text="Heading Preset" />
          <UIText preset="subheading" text="Subheading Preset" />
          <UIText preset="bold" text="Bold Preset" />
          <UIText preset="default" text="Default Preset" />
        </View>

        <View style={styles.componentItem}>
          <Text style={[styles.componentLabel, { color: colors.text }]}>Buttons</Text>
          <View style={styles.row}>
            <Button text="Default" style={{ flex: 1, marginRight: 8 }} />
            <Button preset="filled" text="Filled" style={{ flex: 1, marginRight: 8 }} />
            <Button preset="reversed" text="Reversed" style={{ flex: 1 }} />
          </View>
        </View>

        <View style={styles.componentItem}>
          <Text style={[styles.componentLabel, { color: colors.text }]}>Inputs & Toggles</Text>
          <TextField
            label="Label"
            placeholder="Placeholder"
            helper="Helper text"
            containerStyle={{ marginBottom: 16 }}
          />
          <View style={styles.row}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
              <Switch value />
              <UIText text="Switch" style={{ marginLeft: 8 }} />
            </View>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
              <Checkbox value />
              <UIText text="Checkbox" style={{ marginLeft: 8 }} />
            </View>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
              <Radio value />
              <UIText text="Radio" style={{ marginLeft: 8 }} />
            </View>
          </View>
        </View>

        <View style={styles.componentItem}>
          <Text style={[styles.componentLabel, { color: colors.text }]}>Icons</Text>
          <View style={styles.row}>
            <Icon icon="ladybug" size={32} />
            <View style={{ width: 16 }} />
            <Icon icon="settings" size={32} />
            <View style={{ width: 16 }} />
            <Icon icon="bell" size={32} />
            <View style={{ width: 16 }} />
            <Icon icon="check" size={32} />
            <View style={{ width: 16 }} />
            <Icon icon="lock" size={32} />
          </View>
        </View>

        <View style={styles.componentItem}>
          <Text style={[styles.componentLabel, { color: colors.text }]}>Card & ListItem</Text>
          <Card
            heading="Card Heading"
            content="This is the card content. It can be quite long and should wrap inside the card container."
            footer="Card Footer"
            style={{ marginBottom: 16 }}
          />
          <ListItem
            topSeparator
            bottomSeparator
            text="List Item Title"
            LeftComponent={<Icon icon="bell" style={{ marginRight: 12 }} />}
            RightComponent={<Icon icon="caretRight" />}
          >
            <UIText preset="bold" size="xxs" text="Secondary description text" />
          </ListItem>
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
  componentItem: {
    marginBottom: 32,
  },
  componentLabel: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 12,
    textTransform: "uppercase",
    opacity: 0.6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
