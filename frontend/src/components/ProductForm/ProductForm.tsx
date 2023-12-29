'use client';

import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { previewMedia } from '@urbannerd/utils';
import { ProductSchemaType } from '@urbannerd/types';
import { onSubmitProduct } from './onSubmitProduct';
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { Camera, CameraResultType } from '@capacitor/camera';
import { Toast } from '@capacitor/toast';
import { colors } from '@urbannerd/constant';
import { ArrowLeftIcons, CubeIcons, ImageIcons, PencilSimpleLineIcons, UploadSimpleIcons } from '../Icons';


const ProductForm = () => {
  const [isShow, setIsShow] = useState(false);
  const [activeInput, setActiveInput] = useState<string[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [model, setModel] = useState<File | null>(null);
  const { register, handleSubmit, formState: {errors}  } = useForm<ProductSchemaType>();
  const filesRef = useRef<HTMLInputElement>(null);
  const modelRef = useRef<HTMLInputElement>(null);

  const convertToBlob = async (photoUri: string) => {
    const response = await fetch(photoUri);
    const blob = await response.blob();
    return blob;
  };
  
  const convertBlobToFile = (blob: Blob, fileName: string): File => {
    return new File([blob], fileName, { type: "image/jpeg" });
  };

  const openFileUpload = () => {
    if (filesRef.current) {
      filesRef.current.click();
    }
  };

  const openModelUpload = () => {
    if (modelRef.current) {
      modelRef.current.click();
    }
  };

  const showCreatProductToast = async () => {
    defineCustomElements(window);
    await Toast.show({
      text: 'Your Product is posted!',
      position: 'top'
    },
    );
  };

  const takePicture = async () => {
    defineCustomElements(window);
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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
      for (const file of newFiles) {
        const previewUrl = await previewMedia(file);
        if (previewUrl) {
          setPreviews(prev => [...prev, previewUrl]);
        }
      }
    }
  };
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, inputName: string) => {
    const text = event.target.value;
    if (text.trim() !== '') {
      setActiveInput((prev) => [...prev, inputName]);
    } else {
      setActiveInput((prev) => prev.filter(item => item !== inputName));
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
      await onSubmitProduct(formData, files, model);
      await showCreatProductToast()
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
      <label>
        <input
          type="text"
          {...register('name', { required: 'This field is required' })}
          onChange={(e) => handleInputChange(e, 'name')}
        />
        <span className={activeInput.includes('name')  ? 'label labelActive' : 'label'}>Name's Product</span>
        {errors && errors.name && (
          <span>{errors.name.message}</span>
        )}
      </label>
      <div className='input_number'>
      <label>
        <input
          type="number"
          {...register('price', { required: 'This field is required' })}
          onChange={(e) => handleInputChange(e, 'price')}
        />
        <span className={activeInput.includes('price')  ? 'label labelActive' : 'label'}>Price's Product</span>
        {errors && errors.price && (
          <span>{errors.price.message}</span>
        )}
      </label>
      <label>
        <input
          type="number"
          {...register('stock', { required: 'This field is required' })}
          onChange={(e) => handleInputChange(e, 'stock')}
        />
        <span className={activeInput.includes('stock')  ? 'label labelActive' : 'label'}>Stock's Product</span>
        {errors && errors.stock && (
          <span>{errors.stock.message}</span>
        )}
      </label>
      </div>
      
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
        <CubeIcons 
        iconProps={{
              size: 32,
              color: colors.colorPurple,
              onClick: () => openModelUpload()
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

      
      