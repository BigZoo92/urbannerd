export const openFileUpload = (filesRef: React.RefObject<HTMLInputElement>) => {
    if (filesRef.current) {
      filesRef.current.click();
    }
  };