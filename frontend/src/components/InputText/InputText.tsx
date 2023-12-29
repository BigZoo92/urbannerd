import { useState } from 'react';
import { EditProfilType } from '@urbannerd/types';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '@urbannerd/provider/AuthProvider';

const InputText = ({inputName}: {inputName: "pp" | "bio" | "website"}) => {
    const [activeInput, setActiveInput] = useState<string[]>([]);
    const {user} = useAuthContext()
    const { register, formState: {errors} } = useForm<EditProfilType>();
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, inputName: string) => {
        const text = event.target.value;
        if (text.trim() !== '') {
          setActiveInput((prev) => [...prev, inputName]);
        } else {
          setActiveInput((prev) => prev.filter(item => item !== inputName));
        }
      };
    return (
        <label>
            <input
              type="text"
              defaultValue={user?.website} 
              {...register(inputName)}
              onChange={(e) => handleInputChange(e, inputName)}
            />
            <span className={activeInput.includes(inputName) ? 'label labelActive' : 'label'}>{inputName}</span>
            {errors && errors[inputName] && (
              <span>{errors[inputName]?.message}</span>
            )}
          </label>
    )
}

export default InputText