'use client';

import React, { useRef, useState } from 'react';

import './style.scss';

import { ArrowLeftIcons, ImageIcons, PencilSimpleLineIcons, UploadSimpleIcons } from '@/app/components/Icons';
import { colors } from '@/app/constant';
import { PostSchemaType } from '@/app/types';
import { useForm } from 'react-hook-form';
import { onSubmit } from './onSubmit';
import { previewMedia } from '@/app/utils/preview';
import { Toast } from '@capacitor/toast';
import { getAllPosts } from '@/app/utils';
import { useAuthContext } from '@/app/provider/AuthProvider';
import { Camera, CameraResultType } from '@capacitor/camera';
import { defineCustomElements } from "@ionic/pwa-elements/loader";
defineCustomElements(window);


const PostForm = () => {
  const [isShow, setIsShow] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const { register, handleSubmit } = useForm<PostSchemaType>();
  const filesRef = useRef<HTMLInputElement>(null)
  const {fetchPost} = useAuthContext()

  const convertToBlob = async (photoUri: string) => {
    const response = await fetch(photoUri);
    const blob = await response.blob();
    return blob;
  };
  
  const convertBlobToFile = (blob: Blob, fileName: string): File => {
    return new File([blob], fileName, { type: "image/jpeg" });
  };
  

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
  
    const blob = await convertToBlob(image.webPath!);
    const newFile = convertBlobToFile(blob, "photo.jpg");
  
    setFiles((prev) => [...prev, newFile].slice(0, 4));
    const previewUrl = await previewMedia(newFile);
    if (previewUrl) {
      setPreviews(prev => [...prev, previewUrl]);
    }
  };

  const openFileUpload = () => {
    if (filesRef.current) {
      filesRef.current.click();
    }
  };

  const showCreatPostToast = async () => {
    await Toast.show({
      text: 'Your Post is posted!',
      position: 'top'
    },
    );
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

  const previewClass = (() => {
    const count = previews?.length || 0;
    switch (count) {
      case 1: return 'one-image';
      case 2: return 'two-images';
      case 3: return 'three-images';
      case 4: return 'four-images';
      default: return '';
    }
  })();

  const handleRemovePreview = (indexToRemove: number) => {
    setPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
    {!isShow && (
      <span onClick={() => setIsShow(!isShow)} className='openForm'>
      <PencilSimpleLineIcons
        iconProps={{
          size: 25,
          color: colors.colorWhite,
          onClick: () => setIsShow(!isShow)
        }}
      />
      </span>
    )}
    {isShow && (
    <form onSubmit={handleSubmit(async (formData) => {
      onSubmit(formData, files)
      await fetchPost()
      setIsShow(!isShow)
      await showCreatPostToast()
      })} 
      className="cd_createPost"
    >
      <nav>
        <ArrowLeftIcons 
        iconProps={{
              size: 32,
              color: colors.colorWhite,
              onClick: () => setIsShow(!isShow)
            }}></ArrowLeftIcons>
        <input type='submit' value={'Post'}></input>
      </nav>
      <textarea id="content" cols={30} rows={8} placeholder='What is happening ?!' {...register('content')}></textarea>
      <div className='action_post_form'>
      <ImageIcons 
        iconProps={{
              size: 32,
              color: colors.colorPurple,
              onClick: () => openFileUpload()
            }}></ImageIcons>
        <UploadSimpleIcons 
        iconProps={{
              size: 32,
              color: colors.colorPurple,
              onClick: () => takePicture()
            }}></UploadSimpleIcons>
            <input
              type="file"
              accept=".gltf, .glb, .webp, .jpg, .png, .mp4"
              {...register('files')}
              ref={filesRef}
              onChange={handleFileChange}
              multiple
              max={4}
            />
      </div>
      <div className={`post_preview ${previewClass}`}>
        {previews.map((url, index) => (
          <div key={index} >
          <img src={url} alt="Preview" />
          <span 
              onClick={() => handleRemovePreview(index)}>
              x
            </span>
            </div>
        ))}
      </div>
    </form>
    )}
    </>
  );
};

export default PostForm;
