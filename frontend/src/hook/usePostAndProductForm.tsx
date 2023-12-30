import { takePictureWithCamera, convertToBlobToFile, previewMedia, previewClass } from "@urbannerd/utils";
import { useState, useRef, useEffect } from "react";

export const usePostAndProductForm = () => {
    
    const [previews, setPreviews] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [model, setModel] = useState<File | null>(null);
    const filesRef = useRef<HTMLInputElement>(null);
    const modelRef = useRef<HTMLInputElement>(null);

    const handleModelChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          const newFiles = Array.from(event.target.files)[0];
          setModel(newFiles);
            const previewUrl = await previewMedia(newFiles);
            if (previewUrl) {
              setPreviews(prev => [...prev, previewUrl]);
          }
        }
      };

    const takePicture = async () => {
        const image = await takePictureWithCamera()
        const newFile = await convertToBlobToFile(image.webPath!, "photo.jpg");
        setFiles((prev) => [...prev, newFile].slice(0, 4));
        const previewUrl = await previewMedia(newFile);
        if (previewUrl) {
            setPreviews(prev => [...prev, previewUrl]);
        }
      };
    
      const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          const newFiles = Array.from(event.target.files);
          setFiles((prev) => [...prev, ...newFiles].slice(0, 4));
          for (const file of newFiles) {
            const previewUrl = await previewMedia(file)
            if(!previewUrl) return
            setPreviews(prev => [...prev, previewUrl]);
          }
        }
      };
      
      const openFileUpload = (ref: React.RefObject<HTMLInputElement>) => {
        if (ref.current) {
          ref.current.click();
        }
      };
    
      const handleRemovePreview = (indexToRemove: number) => {
        setPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
        setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
      };
    
      useEffect(() => {
        previewClass(previews)
      }, previews)

      return {previews, files, model, filesRef, modelRef, takePicture, openFileUpload, handleFileChange, handleRemovePreview, handleModelChange}
}