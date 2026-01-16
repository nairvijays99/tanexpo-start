import { useAppTheme } from "@libs/theme";
import {
  Image,
  type ImageStyle,
  type StyleProp,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
  type ViewProps,
  type ViewStyle,
} from "react-native";

import back from "../icons/back.png";
import bell from "../icons/bell.png";
import caretLeft from "../icons/caretLeft.png";
import caretRight from "../icons/caretRight.png";
import check from "../icons/check.png";
import clap from "../icons/demo/clap.png";
import community from "../icons/demo/community.png";
import components from "../icons/demo/components.png";
import debug from "../icons/demo/debug.png";
import github from "../icons/demo/github.png";
import heart from "../icons/demo/heart.png";
import pin from "../icons/demo/pin.png";
import podcast from "../icons/demo/podcast.png";
import slack from "../icons/demo/slack.png";
import hidden from "../icons/hidden.png";
import ladybug from "../icons/ladybug.png";
import lock from "../icons/lock.png";
import menu from "../icons/menu.png";
import more from "../icons/more.png";
import settings from "../icons/settings.png";
import view from "../icons/view.png";
import x from "../icons/x.png";

export type IconTypes = keyof typeof iconRegistry;

type BaseIconProps = {
  /**
   * The name of the icon
   */
  icon: IconTypes;

  /**
   * An optional tint color for the icon
   */
  color?: string;

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number;

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>;

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>;
};

type PressableIconProps = Omit<TouchableOpacityProps, "style"> & BaseIconProps;
type IconProps = Omit<ViewProps, "style"> & BaseIconProps;

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity />
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Icon/}
 * @param {PressableIconProps} props - The props for the `PressableIcon` component.
 * @returns {JSX.Element} The rendered `PressableIcon` component.
 */
export function PressableIcon(props: PressableIconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...pressableProps
  } = props;

  const { theme } = useAppTheme();

  const $imageStyle: StyleProp<ImageStyle> = [
    $imageStyleBase,
    { tintColor: color ?? theme.colors.text },
    size !== undefined && { width: size, height: size },
    $imageStyleOverride,
  ];

  return (
    <TouchableOpacity {...pressableProps} style={$containerStyleOverride}>
      <Image style={$imageStyle} source={iconRegistry[icon]} />
    </TouchableOpacity>
  );
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <View />, use `PressableIcon` if you want to react to input
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Icon/}
 * @param {IconProps} props - The props for the `Icon` component.
 * @returns {JSX.Element} The rendered `Icon` component.
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...viewProps
  } = props;

  const { theme } = useAppTheme();

  const $imageStyle: StyleProp<ImageStyle> = [
    $imageStyleBase,
    { tintColor: color ?? theme.colors.text },
    size !== undefined && { width: size, height: size },
    $imageStyleOverride,
  ];

  return (
    <View {...viewProps} style={$containerStyleOverride}>
      <Image style={$imageStyle} source={iconRegistry[icon]} />
    </View>
  );
}

export const iconRegistry = {
  back,
  bell,
  caretLeft,
  caretRight,
  check,
  clap,
  community,
  components,
  debug,
  github,
  heart,
  hidden,
  ladybug,
  lock,
  menu,
  more,
  pin,
  podcast,
  settings,
  slack,
  view,
  x,
};

const $imageStyleBase: ImageStyle = {
  resizeMode: "contain",
};
