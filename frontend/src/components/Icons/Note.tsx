'use client';
import { Note, IconContext, IconProps } from '@phosphor-icons/react';

export const NoteIcons = ({ iconProps }: { iconProps: IconProps }) => {
  return (
    <IconContext.Provider value={iconProps}>
      <Note size={iconProps.size}></Note>
    </IconContext.Provider>
  );
};
