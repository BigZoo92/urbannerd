'use client';
import { Video, IconContext, IconProps } from '@phosphor-icons/react';
import React from 'react';
export const VideoIcons = ({ iconProps }: { iconProps: IconProps }) => {
  return (
    <IconContext.Provider value={iconProps}>
      <Video size={iconProps.size}></Video>
    </IconContext.Provider>
  );
};
