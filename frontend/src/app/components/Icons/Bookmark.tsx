'use client';
import { BookmarkSimple , IconContext, IconProps } from '@phosphor-icons/react';

export const BookmarkIcons = ({ iconProps }: { iconProps: IconProps }) => {
  return (
    <IconContext.Provider value={iconProps}>
      <BookmarkSimple  size={iconProps.size} weight="fill"></BookmarkSimple >
    </IconContext.Provider>
  );
};
