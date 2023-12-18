'use client';
import { PencilSimpleLine, IconContext, IconProps } from '@phosphor-icons/react';

export const PencilSimpleLineIcons = ({ iconProps }: { iconProps: IconProps }) => {
  return (
    <IconContext.Provider value={iconProps}>
      <PencilSimpleLine size={iconProps.size}></PencilSimpleLine>
    </IconContext.Provider>
  );
};
