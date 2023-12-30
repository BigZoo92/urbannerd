'use client';

import { UseFormRegisterReturn } from 'react-hook-form';
import { useHandleInputChange } from '@urbannerd/utils/handleInputChange';
import { HTMLInputTypeAttribute } from 'react';
interface InputText {
  inputName:  string;
  labelText: string;
  register: UseFormRegisterReturn<any>
  errors: string | undefined
  defaultValue?: string;
  type: HTMLInputTypeAttribute;
}

const InputText = ({inputName, labelText, register, errors, defaultValue, type}: InputText) => {
  const {handleInputChange, activeInput} = useHandleInputChange()
  return (
    <label>
      <input
        type={type}
        defaultValue={defaultValue}
        {...register}
        onChange={(e) => handleInputChange(e, inputName)}
      />
      <span className={activeInput.includes(inputName) ? 'label labelActive' : 'label'}>{labelText}</span>
        {errors &&  ( 
          <span>{errors}</span>
        )}
    </label>
  )
}

export default InputText