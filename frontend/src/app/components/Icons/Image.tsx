'use client';
import { Image, IconContext, IconProps } from '@phosphor-icons/react';

export const ImageIcons = ({ iconProps }: { iconProps: IconProps }) => {
  return (
    <IconContext.Provider value={iconProps}>
      <Image size={iconProps.size}></Image>
    </IconContext.Provider>
  );
};
