'use client';
import { Export , IconContext, IconProps } from '@phosphor-icons/react';

export const ExportIcons = ({ iconProps }: { iconProps: IconProps }) => {
  return (
    <IconContext.Provider value={iconProps}>
      <Export  size={iconProps.size}></Export >
    </IconContext.Provider>
  );
};
