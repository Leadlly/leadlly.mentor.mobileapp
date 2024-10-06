import { Rect, Svg } from "react-native-svg";

const DashboardIcon = ({ ...props }) => {
  return (
    <Svg
      viewBox="0 0 20 19"
      width={20}
      height={19}
      fill="none"
      strokeWidth={2}
      {...props}>
      <Rect x="1.23764" y="1" width="7" height="7" rx="2.5" />
      <Rect x="1.23764" y="11" width="7" height="7" rx="2.5" />
      <Rect x="11.2376" y="1" width="7" height="7" rx="2.5" />
      <Rect x="11.2376" y="11" width="7" height="7" rx="2.5" />
    </Svg>
  );
};

export default DashboardIcon;
