import React from "react";
import Svg, { Path } from "react-native-svg";

const FilterIcon = ({ ...props }) => (
  <Svg width={18} height={16} viewBox="0 0 18 16" fill="none" {...props}>
    <Path
      d="M7.125 13.25H16.75M1 13.25H3.625M3.625 13.25V15M3.625 13.25V11.5M15.875 8H16.75M1 8H12.375M12.375 8V9.75M12.375 8V6.25M10.625 2.75H16.75M1 2.75H7.125M7.125 2.75V4.5M7.125 2.75V1"
      stroke="black"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default FilterIcon;
