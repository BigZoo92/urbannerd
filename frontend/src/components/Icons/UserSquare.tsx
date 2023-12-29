'use client';
import { UserSquare, IconContext, IconProps } from '@phosphor-icons/react';

export const UserSquareIcons = ({ iconProps }: { iconProps: IconProps }) => {
  return (
    <IconContext.Provider value={iconProps}>
      <UserSquare size={iconProps.size}></UserSquare>
    </IconContext.Provider>
  );
};
