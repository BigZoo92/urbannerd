'use client';
import { ArrowLeft, IconContext, IconProps } from '@phosphor-icons/react';

export const ArrowLeftIcons = ({ iconProps }: { iconProps: IconProps }) => {
  return (
    <IconContext.Provider value={iconProps}>
      <ArrowLeft size={iconProps.size}></ArrowLeft>
    </IconContext.Provider>
  );
};
