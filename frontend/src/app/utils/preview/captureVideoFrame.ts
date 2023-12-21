export const captureVideoFrame = (videoFile: File | string): Promise<string> => {
    return new Promise((resolve, reject) => {
      
      const videoElement = document.createElement('video');
      if (videoFile instanceof File) {
        videoElement.src = URL.createObjectURL(videoFile);
      } 
      else if (typeof videoFile === 'string') {
        videoElement.src = videoFile;
      } 
      videoElement.crossOrigin = 'Anonymous';
      videoElement.load();
      videoElement.addEventListener('loadeddata', () => {
        videoElement.currentTime = 1; 
      });
      videoElement.addEventListener('seeked', () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
            if(!blob)return
          resolve(URL.createObjectURL(blob));
        }, 'image/jpeg');
      });
    });
  };