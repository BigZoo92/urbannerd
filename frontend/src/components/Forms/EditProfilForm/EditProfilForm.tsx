import { Toast } from "@capacitor/toast";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import PhotoProfil from "@urbannerd/components/PhotoProfil";
import { EditProfilType } from "@urbannerd/types";
import { openFileUpload } from "@urbannerd/utils";
import { useForm } from "react-hook-form";
import Link from "next/link";
import InputText from "../InputText";
import { useAuthContext } from "@urbannerd/provider";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const EditProfilForm = () => {
    const { register, handleSubmit, formState: {errors} } = useForm<EditProfilType>();
    const {user, fetchUser} = useAuthContext()
    const [files, setFiles] = useState<File | null>(null);
    const filesRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          const newFiles = Array.from(event.target.files);
          setFiles(newFiles[0]);
        }
      }

    const onSubmit = async (formData: EditProfilType, files: File | null) => {
        const showSaveChangeProfilToast = async () => {
          defineCustomElements(window);
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
          <InputText inputName={'website'} labelText={'Website'} defaultValue={user?.website} register={register("website")} errors={errors?.website?.message} type={"text"}></InputText>
            <button type="submit">Save Changes</button>
            <Link href={`/profil/${user?.id}`}className='btn_ouline'>Cancel</Link>
          </form>
    )
}

export default EditProfilForm