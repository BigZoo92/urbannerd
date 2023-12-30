import { Toast } from "@capacitor/toast";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

export const showToast = async (text : string) => {
    defineCustomElements(window);
    await Toast.show({
      text,
      position: 'top'
    },
    );
  };