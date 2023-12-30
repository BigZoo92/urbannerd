import { previewClass, previewMedia } from "@urbannerd/utils";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface MediaContentType{
    setSelectedMedia: React.Dispatch<React.SetStateAction<string | null>>;
    files: string[] | undefined
}

const MediaContent = ({setSelectedMedia, files}: MediaContentType) => {
    const [renderMediaPost, setRenderMediaPost] = useState<{ [key: string]: string }>({});

    const handleMediaClick = (url: string) => {
        setSelectedMedia(url);
        //@ts-ignore
        document.querySelector('html').style.overflow = 'hidden'
      };

      useEffect(() => {
        const loadPreviews = async () => {
          if (files && files.length > 0) {
            const promises = files.map(file => previewMedia(file));
            const mediaPreviews = await Promise.all(promises);
            const mediaMap = files.reduce((acc, file, index) => {
              if (mediaPreviews[index]) {
                //@ts-ignore
                acc[file] = mediaPreviews[index];
              }
              return acc;
            }, {});
            setRenderMediaPost(mediaMap);
          }
          
        };
        loadPreviews();
      }, [files]);

    return (
        <div className='post_media'>
        {Object.keys(renderMediaPost).length !== 0 && (
          <div className={`post_preview ${previewClass}`}>
          {Object.entries(renderMediaPost).map(([file, url], index) => (
              <LazyLoadImage src={url} alt="Media Preview" crossOrigin="anonymous" key={index} onClick={() => handleMediaClick(file)}/>
          ))}
        </div>
        )}
      </div>
    )
  };

  export default MediaContent