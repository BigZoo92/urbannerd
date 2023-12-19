import { PostSchemaType } from "@/app/types";
import { createPost } from '@/app/utils/post';


export const onSubmit = async (formData: PostSchemaType, files: File[]) => {

    if (files.length > 4) {
      alert('You can upload a maximum of 4 media files.');
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append('content', formData.content || '');
    
    
    files.forEach(file => {
      formDataObj.append('files', file);
    });
  
    try {
      //@ts-ignore
      await createPost(formDataObj);
    } catch (error) {
      console.error('Create Post failed:', error);
    }
  };