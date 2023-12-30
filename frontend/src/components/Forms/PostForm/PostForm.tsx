'use client';

import React, { useState } from 'react';

import { ArrowLeftIcons, ImageIcons, PencilSimpleLineIcons, UploadSimpleIcons } from '@urbannerd/components/Icons';
import { colors } from '@urbannerd/constant';
import { PostSchemaType } from '@urbannerd/types';
import { useForm } from 'react-hook-form';
import { onSubmit } from './onSubmit';
import { previewClass, showToast } from '@urbannerd/utils';
import { useAuthContext } from '@urbannerd/provider';
import { usePostAndProductForm } from '@urbannerd/hook';

const PostForm = () => {
  const [isShow, setIsShow] = useState(false);
  const { register, handleSubmit } = useForm<PostSchemaType>();
  const {fetchPost} = useAuthContext()
  const { previews, files, filesRef, takePicture, openFileUpload, handleFileChange, handleRemovePreview} = usePostAndProductForm()

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
      await showToast('Your Post is posted!')
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
              onClick: () => openFileUpload(filesRef)
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
