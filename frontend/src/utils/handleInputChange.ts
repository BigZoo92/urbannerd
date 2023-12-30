import { useState } from "react";

export const useHandleInputChange = () => {
    const [activeInput, setActiveInput] = useState<string[]>([]);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, inputName: string) => {
        const text = event.target.value;
        if (text.trim() !== '') {
        setActiveInput((prev) => [...prev, inputName]);
        } else {
        setActiveInput((prev) => prev.filter(item => item !== inputName));
        }
    }
    
    return {activeInput, handleInputChange}
  };