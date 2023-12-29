'use client';
import { ChatCircle, IconContext, IconProps } from '@phosphor-icons/react';

export const ChatCircleIcons = ({ iconProps }: { iconProps: IconProps }) => {
  return (
    <IconContext.Provider value={iconProps}>
      <ChatCircle size={iconProps.size}></ChatCircle>
    </IconContext.Provider>
  );
};
