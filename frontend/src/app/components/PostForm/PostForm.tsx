'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PostSchemaType } from '@/app/types';

import './style.scss';

import { PencilSimpleLineIcons } from '@/app/components/Icons';
import { colors } from '@/app/constant';
import { onSubmit } from './onSubmit';

const PostForm = () => {
  const [isShow, setIsShow] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<PostSchemaType>();

  return (
    <section className="cd_createPost">
      <span onClick={() => setIsShow(!isShow)}>
        <PencilSimpleLineIcons
          iconProps={{
            size: 25,
            color: colors.colorWhite
          }}
        />
      </span>
      <aside style={{ transform: `translateY(${isShow ? 0 : '100dvh'})` }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ opacity: `${isShow ? 1 : 0}` }}>
          <label>
            Content
            <input
              type="text"
              {...register('content', { required: 'This field is required' })}
            />
            {errors && errors.content && (
              <span>{errors.content.message}</span>
            )}
          </label>
          <label>
            Videos (MP4, max 4)
            <input
              type="file"
              accept=".mp4"
              {...register('videos')}
              multiple
            />
            {errors && errors.videos && (
              <span>{errors.videos.message}</span>
            )}
          </label>
          <label>
            Images (WEBP, max 4)
            <input
              type="file"
              accept=".webp"
              {...register('images')}
              multiple
            />
            {errors && errors.images && (
              <span>{errors.images.message}</span>
            )}
          </label>
          <label>
            Model3D (GLTF/GLB)
            <input
              type="file"
              accept=".gltf, .glb"
              {...register('model3D')}
            />
            {errors && errors.model3D && (
              <span>{errors.model3D.message}</span>
            )}
          </label>
          <label>
            Tags
            <input
              type="text"
              {...register('tags')}
            />
            {errors && errors.content && (
              <span>{errors.content.message}</span>
            )}
          </label>
          <button type="submit">Submit</button>
        </form>
      </aside>
    </section>
  );
};

export default PostForm;
