import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const ChemistryIcon = ({ stroke = "#818080" }: { stroke?: string }) => {
  return (
    <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <Circle
        cx="11.0007"
        cy="10.9999"
        r="2.86667"
        stroke={stroke}
        stroke-width="1.6"
      />
      <Path
        d="M9.16602 12.8333L6.41602 15.5833"
        stroke={stroke}
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <Path
        d="M9.625 9.625L5.5 5.5"
        stroke={stroke}
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <Circle
        cx="15.8333"
        cy="16.8333"
        r="1.03333"
        stroke={stroke}
        stroke-width="1.6"
      />
      <Path
        d="M12.834 12.8333L16.5007 17.4166"
        stroke={stroke}
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <Circle
        cx="17.416"
        cy="4.58325"
        r="1.95"
        stroke={stroke}
        stroke-width="1.6"
      />
      <Path
        d="M15.584 6.41675L12.834 9.16675"
        stroke={stroke}
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <Circle
        cx="5.04167"
        cy="5.04167"
        r="1.49167"
        fill="#33363F"
        stroke={stroke}
        stroke-width="1.6"
      />
      <Circle
        cx="5.04232"
        cy="16.9583"
        r="2.40833"
        stroke={stroke}
        stroke-width="1.6"
      />
      <Circle cx="5" cy="5" r="1" fill={stroke} />
    </Svg>
  );
};

export default ChemistryIcon;
