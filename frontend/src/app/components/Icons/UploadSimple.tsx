'use client';
import { UploadSimple , IconContext, IconProps } from '@phosphor-icons/react';

export const UploadSimpleIcons = ({ iconProps }: { iconProps: IconProps }) => {
  return (
    <IconContext.Provider value={iconProps}>
      <UploadSimple  size={iconProps.size} weight="fill"></UploadSimple >
    </IconContext.Provider>
  );
};
