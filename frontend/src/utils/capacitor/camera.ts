import { CameraResultType, Camera } from "@capacitor/camera";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

export const takePictureWithCamera = async () => {
    defineCustomElements(window);
    const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });
  return image
}