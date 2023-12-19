'use client';

import React, { useRef, useState } from 'react';

import './style.scss';

import { ArrowLeftIcons, CubeIcons, ImageIcons, PencilSimpleLineIcons, VideoIcons } from '@/app/components/Icons';
import { colors } from '@/app/constant';
import { PostSchemaType } from '@/app/types';
import { useForm } from 'react-hook-form';
import { captureModelFrame } from './captureModelFrame';
import { captureVideoFrame } from './captureVideoFrame';
import { onSubmit } from './onSubmit';

const PostForm = () => {
  const [isShow, setIsShow] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm<PostSchemaType>();
  const filesRef = useRef<HTMLInputElement>(null)

  const openFileUpload = () => {
    if (filesRef.current) {
      filesRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles((prev) => [...prev, ...newFiles].slice(0, 4));
      for (const file of newFiles) {
        let previewUrl: any
        if (file.type.startsWith('video/')) {
          previewUrl = await captureVideoFrame(file);
        } else if (file.name.endsWith('.gltf') || file.name.endsWith('.glb')) {
          const modelUrl = URL.createObjectURL(file); 
          previewUrl = await captureModelFrame(modelUrl);
        } else {
          previewUrl = URL.createObjectURL(file); 
        }
        setPreviews(prev => [...prev, previewUrl]);
      }
    }
  };

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
    <form onSubmit={handleSubmit((formData) => {
      onSubmit(formData, files)
      setIsShow(!isShow)
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
      <div className='post_preview'>
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
