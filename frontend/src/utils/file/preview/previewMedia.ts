import { getUrl } from "../processing/getUrl";
import { captureModelFrame } from "./captureModelFrame";
import { captureVideoFrame } from "./captureVideoFrame";

export const previewMedia = async(file: File | string) => {
    
    let previewUrl: string = ''
    if(file instanceof  File){
        if (file.type.startsWith('video/')) {
            previewUrl = await captureVideoFrame(file);
          } else if (file.name.endsWith('.gltf') || file.name.endsWith('.glb')) {
            const modelUrl = URL.createObjectURL(file); 
            previewUrl = await captureModelFrame(modelUrl);
          } else {
            previewUrl = URL.createObjectURL(file); 
          }
    }
    else if(typeof file === 'string'){
        const input = file as string
        const fileExtension = input?.split('.')?.pop()?.toLowerCase();
        if(!fileExtension)return
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension)) {
            previewUrl = getUrl(file); 
        }else if (['mp4'].includes(fileExtension)){
            previewUrl = await captureVideoFrame(getUrl(file));
        }
        else if (['glb', 'gltf'].includes(fileExtension)){
            
            previewUrl = await captureModelFrame(getUrl(file));  
            
        }
    }   
    return previewUrl
}