import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import DashboardIcon from "../icons/DashboardIcon";

export const tabBarIcons = {
  dashboard: ({ color }: { color: string }) => <DashboardIcon stroke={color} />,
  classes: ({ color }: { color: string }) => (
    <MaterialCommunityIcons name="google-classroom" size={24} color={color} />
  ),
  "add-classes": ({ color }: { color: string }) => (
    <MaterialIcons name="format-list-bulleted-add" size={24} color={color} />
  ),
};
