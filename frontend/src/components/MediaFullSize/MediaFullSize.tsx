import { colors } from "@urbannerd/constant"
import { getUrl } from "@urbannerd/utils"
import { ArrowLeftIcons, ExportIcons } from "../Icons"
import { LazyLoadImage } from "react-lazy-load-image-component";
import LazyVideo from "../LazyVideo";
import Model from "../Model";
import { Share } from "@capacitor/share";

interface MediaFullSizeType {
    selectedMedia: string | null;
    setSelectedMedia: React.Dispatch<React.SetStateAction<string | null>>;
}

const MediaFullSize = ({selectedMedia, setSelectedMedia}: MediaFullSizeType) => {

    const shareMedia = async(url: string) => {
        await Share.share({
          title: 'See cool stuff',
          text: 'Really awesome thing you need to see right meow',
          url,
          dialogTitle: 'Share with buddies',
        });
      }

    const renderMedia = (filePath: string) => {
        const fileExtension = filePath.split('.').pop();
      
        switch (fileExtension) {
          case 'jpg':
          case 'jpeg':
          case 'png':
          case 'gif':
          case 'webp':
            return <LazyLoadImage src={getUrl(filePath)} alt="Image" crossOrigin="anonymous" className='img_post' />;
          
          case 'mp4':
          case 'mov':
          case 'avi':
            return <LazyVideo videoUrl={getUrl(filePath)}/>;
          
          case 'gltf':
          case 'glb':
            return <Model url={getUrl(filePath)} />;
      
          default:
            return null;
        }
      };
    
      const closeMedia = () => {
        setSelectedMedia(null);
        //@ts-ignore
        document.querySelector('html').style.overflow = 'visible'
      };

    return selectedMedia ? (
            <div className="media_fullscreen">
              <div className='cd_arrow'>
              <ArrowLeftIcons 
            iconProps={{
                  size: 32,
                  color: colors.colorWhite,
                  onClick: () => closeMedia()
                }}></ArrowLeftIcons>
              </div>
              <div className='cd_share'>
              <ExportIcons 
            iconProps={{
                  size: 32,
                  color: colors.colorWhite,
                  onClick: async() => await shareMedia(getUrl(selectedMedia))
                }}></ExportIcons>
              </div>
              {renderMedia(selectedMedia)}
            </div>
          ):(null)
}

export default MediaFullSize