export const convertToBlobToFile = async(photoUri: string, fileName: string): Promise<File> => {
    const response = await fetch(photoUri);
    const blob = await response.blob();
    return new File([blob], fileName, { type: "image/jpeg" });
  };