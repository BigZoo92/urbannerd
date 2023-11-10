'use client';
import { HeartStraight, IconContext, IconProps } from '@phosphor-icons/react';

export const HeartStraightIcons = ({ iconProps }: { iconProps: IconProps }) => {
  return (
    <IconContext.Provider value={iconProps}>
      <HeartStraight size={iconProps.size}></HeartStraight>
    </IconContext.Provider>
  );
};
