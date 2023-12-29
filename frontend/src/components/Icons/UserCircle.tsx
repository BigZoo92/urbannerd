'use client';
import { UserCircle, IconContext, IconProps } from '@phosphor-icons/react';

export const UserCircleIcons = ({ iconProps }: { iconProps: IconProps }) => {
  return (
    <IconContext.Provider value={iconProps}>
      <UserCircle size={iconProps.size}></UserCircle>
    </IconContext.Provider>
  );
};
