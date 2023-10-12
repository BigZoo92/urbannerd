"use client";
import { Planet, IconContext, IconProps } from "@phosphor-icons/react";

export const PlanetIcons = ({ iconProps }: { iconProps: IconProps }) => {
  return (
    <IconContext.Provider value={iconProps}>
      <Planet size={iconProps.size}></Planet>
    </IconContext.Provider>
  );
};
