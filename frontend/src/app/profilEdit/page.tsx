'use client';

import React, { useRef, useState } from "react";
import './style.scss'
import { useAuthContext } from "../provider/AuthProvider";
import { useForm } from "react-hook-form";
import { EditProfilType } from "../types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { UserIcons } from "../components/Icons/User";
import { colors } from "../constant";
import Link from "next/link";
import { ArrowLeftIcons } from "../components/Icons";
import { getUrl, openFileUpload } from "../utils";
import InputText from "../components/InputText";
import PhotoProfil from "../components/PhotoProfil";
import { Toast } from "@capacitor/toast";
import { useRouter } from 'next/navigation';
import { editProfil } from "./editProfil";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
defineCustomElements(window);

const Home = () => {
  const { register, handleSubmit, formState: {errors} } = useForm<EditProfilType>();
  const {user, fetchUser} = useAuthContext()
  const [previews, setPreviews] = useState<string | undefined>(user?.pp && getUrl(user?.pp));
  const [files, setFiles] = useState<File | null>(null);
  const filesRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles(newFiles[0]);
      for (const file of newFiles) {
        const previewUrl = URL.createObjectURL(file);
        setPreviews(previewUrl);
      }
    }
  }
  const onSubmit = async (formData: EditProfilType, files: File | null) => {
    const showSaveChangeProfilToast = async () => {
      await Toast.show({
        text: 'Your changes are saved!',
        position: 'top'
      },
      );
    };
      try {
        //@ts-ignore
        await editProfil(formData, files);
        await showSaveChangeProfilToast()
        await fetchUser()
        router.push('/profile')
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    return (
      <>
        <main className="profil_settings_main">
        <Link href={'/profile'} className="back_arrow">
        <ArrowLeftIcons 
        iconProps={{
              size: 32,
              color: colors.colorWhite,
            }}></ArrowLeftIcons>
      </Link>
        <form onSubmit={handleSubmit((formData) => onSubmit(formData, files))} className='authForm'>
        <div className="pp">
        <PhotoProfil userPP={user?.pp} onClick={() => openFileUpload(filesRef)}/>
         </div>
            <label>
              <input
                type="file"
              accept=".webp, .jpg, .png, .gif"
                {...register('pp')}
                onChange={handleFileChange}
                ref={filesRef}
                style={{display: 'none'}}
              />
              {errors && errors.pp && (
                <span>{errors.pp.message}</span>
              )}
            </label>
            <label>
            <textarea
              defaultValue={user?.bio} 
              {...register('bio')}
              placeholder="My bio"
              rows={5}
            />
            {errors && errors.bio && (
              <span>{errors.bio.message}</span>
            )}
          </label>
          <InputText inputName={'website'}></InputText>
            <button type="submit">Save Changes</button>
            <Link href={'/profile'}className='btn_ouline'>Cancel</Link>
          </form>
        </main>
      </>
    );
  };
  
  export default Home;
  