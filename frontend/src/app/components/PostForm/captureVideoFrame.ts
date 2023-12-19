export const captureVideoFrame = (videoFile: File) => {
    return new Promise((resolve, reject) => {
      const videoElement = document.createElement('video');
      videoElement.src = URL.createObjectURL(videoFile);
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