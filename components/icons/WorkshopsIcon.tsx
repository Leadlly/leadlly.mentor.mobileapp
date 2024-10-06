import { Path, Svg } from "react-native-svg";

const WorkshopsIcon = ({ ...props }) => {
  return (
    <Svg
      viewBox="0 0 21 15"
      width={20}
      height={19}
      fill="none"
      strokeWidth={2}
      {...props}>
      <Path
        d="M4.23764 13.9999C4.3013 14 4.3669 14 4.43455 14H10.2376M4.23764 13.9999C3.24937 13.9991 2.73098 13.9857 2.32944 13.7641C1.95311 13.5564 1.64737 13.224 1.45563 12.8163C1.23764 12.3529 1.23764 11.747 1.23764 10.5335V4.46688C1.23764 3.25343 1.23764 2.64626 1.45563 2.18278C1.64737 1.7751 1.95311 1.44388 2.32944 1.23615C2.75726 1 3.31773 1 4.43784 1H16.0378C17.1579 1 17.7172 1 18.145 1.23615C18.5214 1.44388 18.8281 1.7751 19.0199 2.18278C19.2376 2.6458 19.2376 3.25224 19.2376 4.46332V10.5367C19.2376 11.7478 19.2376 12.3533 19.0199 12.8163C18.8281 13.224 18.5214 13.5564 18.145 13.7641C17.7176 14 17.1586 14 16.0407 14H10.2376M4.23764 13.9999C4.23768 12.8034 5.58081 11.8333 7.23764 11.8333C8.8945 11.8333 10.2376 12.8034 10.2376 14M4.23764 13.9999C4.23764 14 4.23764 13.9999 4.23764 13.9999ZM16.2376 9.66667H12.2376M16.2376 6.41667H13.2376M7.23764 8.58333C6.13307 8.58333 5.23764 7.61328 5.23764 6.41667C5.23764 5.22005 6.13307 4.25 7.23764 4.25C8.34221 4.25 9.23764 5.22005 9.23764 6.41667C9.23764 7.61328 8.34221 8.58333 7.23764 8.58333Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default WorkshopsIcon;
