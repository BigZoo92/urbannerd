import { PostSchemaType } from "@/app/types";
import { createPost } from '@/app/utils/post';

const countTotalFiles = (formData: PostSchemaType) => {
    let totalFiles = 0;
    if (formData.videos) totalFiles += formData.videos.length;
    if (formData.images) totalFiles += formData.images.length;
    if (formData.model3D) totalFiles += 1; // model3D est un seul fichier
    return totalFiles;
  };

export const onSubmit = async (formData: PostSchemaType) => {
    const totalFiles = countTotalFiles(formData);

    if (totalFiles > 4) {
      alert('You can upload a maximum of 4 media files.');
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append('content', formData.content || '');
    
    if (formData.tags) {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim());
      tagsArray.forEach(tag => {
        formDataObj.append('tags', tag);
      });
    }
    
    if (formData.videos) {
      for (const file of formData.videos)(
        formDataObj.append('videos', file)
      );
    }
  
    if (formData.images) {
        for (const file of formData.images)(
        formDataObj.append('images', file)
      );
    }

    if (formData.model3D) {
        for (const file of formData.model3D)(
          formDataObj.append('model3D', file)
        );
      }
  
    try {
      //@ts-ignore
      await createPost(formDataObj);
    } catch (error) {
      console.error('Create Post failed:', error);
    }
  };