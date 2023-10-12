"use client";
import { Bookmark, IconContext, IconProps } from "@phosphor-icons/react";

export const BookmarkIcons = ({ iconProps }: { iconProps: IconProps }) => {
  return (
    <IconContext.Provider value={iconProps}>
      <Bookmark size={iconProps.size}></Bookmark>
    </IconContext.Provider>
  );
};
