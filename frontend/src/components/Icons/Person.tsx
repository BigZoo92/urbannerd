'use client';
import { PersonSimple, IconContext, IconProps } from '@phosphor-icons/react';

export const PersonIcons = ({ iconProps }: { iconProps: IconProps }) => {
  return (
    <IconContext.Provider value={iconProps}>
      <div className='personIcon'>
        <PersonSimple size={iconProps.size}></PersonSimple>
      </div>
    </IconContext.Provider>
  );
};
