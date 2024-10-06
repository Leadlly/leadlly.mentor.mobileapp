import { Defs, Image, Pattern, Rect, Svg, Use } from "react-native-svg";

const VoucherIcon = () => {
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <Rect width="32" height="32" fill="url(#pattern0_9086_5775)" />
      <Defs>
        <Pattern
          id="pattern0_9086_5775"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <Use href="#image0_9086_5775" transform="scale(0.0111111)" />
        </Pattern>
        <Image
          id="image0_9086_5775"
          width="90"
          height="90"
          href="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};

export default VoucherIcon;
