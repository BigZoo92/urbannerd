'use client';
import { Cube, IconContext, IconProps } from '@phosphor-icons/react';

export const CubeIcons = ({ iconProps }: { iconProps: IconProps }) => {
  return (
    <IconContext.Provider value={iconProps}>
      <Cube size={iconProps.size}></Cube>
    </IconContext.Provider>
  );
};
