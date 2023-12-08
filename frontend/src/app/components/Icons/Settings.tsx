'use client';
import { GearSix , IconContext, IconProps } from '@phosphor-icons/react';

export const SettingsIcons = ({ iconProps }: { iconProps: IconProps }) => {
  return (
    <IconContext.Provider value={iconProps}>
      <div className='SettingsIcon'>
        <GearSix  size={iconProps.size}></GearSix >
      </div>
    </IconContext.Provider>
  );
};
