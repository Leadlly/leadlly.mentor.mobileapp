import { Dimensions } from "react-native";

const { width, height, scale, fontScale } = Dimensions.get("window");
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export {
  width,
  height,
  scale,
  fontScale,
  horizontalScale,
  verticalScale,
  moderateScale,
};

export const colors = Object.freeze({
  primary: "#9654F4",
  primary200: "rgba(150, 84, 244, 0.5)",
  inputBorder: "#D9D8D8",
  tabItemGray: "#828282",
  secondaryText: "#6E6E6E",
  iconGray: "#7F7F7F",
  leadllyGreen: "#ff2e2e",
  leadllyYellow: "#ff9900",
  leadllyRed: "#0fd679",
  leadllyCyan: "#72EFDD",
  leadllyChartYellow: "#FFDA57",
  white: "#FFFFFF",
  black: "#000000",
  tabItemGrayLight: "#b3b3b3", // Lighter version of tabItemG
});

export const tabBarItems = [
  {
    name: "dashboard",
    title: "Dashboard",
  },
  {
    name: "community",
    title: "Community",
  },
];

export const studentTabBarItems = [
  {
    name: "dashboard",
    title: "Dashboard",
  },
  {
    name: "planner",
    title: "Planner",
  },
  {
    name: "tracker",
    title: "Tracker",
  },
  {
    name: "(chats)",
    title: "Chats",
  },
  // {
  //   name: "(quizzes)",
  //   title: "Quizzes",
  // },
  {
    name: "errorbook",
    title: "Errorbook",
  },
  // {
  //   name: "growth-meter",
  //   title: "Growth Meter",
  // },
  // {
  //   name: "workshops",
  //   title: "Workshops",
  // },
  // {
  //   name: "library",
  //   title: "Library",
  // },
  // {
  //   name: "study-room",
  //   title: "Study Room",
  // },
];
export const progressAnalyticsMenus = [
  {
    id: "weekly",
    name: "weekly",
  },
  {
    id: "monthly",
    name: "monthly",
  },
  {
    id: "overall",
    name: "overall",
  },
];

export const teachersTabBarItems = [
  {
    name: "dashboard",
    title: "Dashboard",
    headerTitle: "Teachers Dashboard",
  },
  {
    name: "classes",
    title: "Classes",
    headerTitle: "Classes",
  },
  {
    name: "add-classes",
    title: "Add Classes",
    headerTitle: "Create Class",
  },
];

export const calculateProgress = (overallProgress: number) => {
  if (typeof overallProgress !== "number" || isNaN(overallProgress)) {
    return 0; // Default to 0 if the value is invalid
  }
  return Math.min(Math.max(overallProgress / 100, 0), 1);
};
