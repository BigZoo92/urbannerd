'use client';
import { Hoodie, IconContext, IconProps } from '@phosphor-icons/react';

export const HoodieIcons = ({ iconProps }: { iconProps: IconProps }) => {
  return (
    <IconContext.Provider value={iconProps}>
      <Hoodie size={iconProps.size}></Hoodie>
    </IconContext.Provider>
  );
};
