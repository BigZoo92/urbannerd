'use client';
import { SignOut, IconContext, IconProps } from '@phosphor-icons/react';

export const SignOutIcons = ({ iconProps }: { iconProps: IconProps }) => {
  return (
    <IconContext.Provider value={iconProps}>
      <SignOut size={iconProps.size}></SignOut>
    </IconContext.Provider>
  );
};
