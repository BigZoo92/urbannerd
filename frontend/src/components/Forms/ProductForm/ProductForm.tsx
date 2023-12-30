'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { previewClass, showToast } from '@urbannerd/utils';
import { ProductSchemaType } from '@urbannerd/types';
import { onSubmitProduct } from './onSubmitProduct';
import { colors } from '@urbannerd/constant';
import { ArrowLeftIcons, CubeIcons, ImageIcons, PencilSimpleLineIcons, UploadSimpleIcons } from '../../Icons';
import { usePostAndProductForm } from '@urbannerd/hook';
import InputText from '../InputText';

const ProductForm = () => {
  const [isShow, setIsShow] = useState(false);
  const {previews, files, model, filesRef, modelRef, takePicture, openFileUpload, handleFileChange, handleRemovePreview, handleModelChange} = usePostAndProductForm()
  const { register, handleSubmit, formState: {errors}  } = useForm<ProductSchemaType>();

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
      await onSubmitProduct(formData, files, model);
      await showToast('Your Product is posted!')
    })}
    className="authForm cd_createPost cd_createProduct"
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
      <h1>Add product</h1>
      <textarea id="description" cols={30} rows={8} placeholder='Description of your product' {...register('description')}></textarea>
      <InputText inputName={"name"} labelText={"Name"} register={register("name")} errors={errors.name?.message} type={'text'} />
      <div className='input_number'>
      <InputText inputName={"price"} labelText={"Price"} register={register("price")} errors={errors.price?.message} type={'number'} />
      <InputText inputName={"stock"} labelText={"Stock"} register={register("stock")} errors={errors.stock?.message} type={'number'} />
      </div>
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
        <CubeIcons 
        iconProps={{
              size: 32,
              color: colors.colorPurple,
              onClick: () => openFileUpload(modelRef)
            }}></CubeIcons>
        <input
          type="file"
          accept=".jpg, .png, .webp"
          {...register('images')}
          ref={filesRef}
          onChange={handleFileChange}
          multiple
        />
        <input
          type="file"
          accept=".gltf, .glb"
          {...register('model3D')}
          ref={modelRef}
          onChange={handleModelChange}
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

export default ProductForm;

    
      