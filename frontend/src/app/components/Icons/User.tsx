'use client';
import { User, IconContext, IconProps } from '@phosphor-icons/react';

export const UserIcons = ({ iconProps }: { iconProps: IconProps }) => {
  return (
    <IconContext.Provider value={iconProps}>
      <User size={iconProps.size}></User>
    </IconContext.Provider>
  );
};
