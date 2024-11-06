import React from "react";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

const StudentCardLoader = (props: any) => (
  <ContentLoader
  className="bg-primary/10"
    speed={1.3}
    width={"100%"}
    animate={true}
    height={100}
    backgroundColor="#e6e0e0"
    foregroundColor="#efe6e6"
    preserveAspectRatio="xMinYMin meet"
    viewBox="0 0 400 100"
    {...props}
  >
    <Circle cx="50" cy="70" r="30" />
    <Rect x="100" y="59" rx="4" ry="4" width="109" height="18" />
    <Rect x="100" y="31" rx="4" ry="4" width="244" height="18" />
    <Rect x="100" y="87" rx="4" ry="4" width="244" height="17" />
  </ContentLoader>
);

export default StudentCardLoader;
