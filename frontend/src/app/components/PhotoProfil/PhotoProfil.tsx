import { colors } from '@/app/constant';
import { getUrl } from '@/app/utils';
import './style.scss'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { UserIcons } from '../Icons/User';

const PhotoProfil = ({userPP, onClick}: {userPP: string | undefined, onClick?: React.MouseEventHandler<SVGSVGElement>}) => {
    return userPP ? (
            //@ts-ignore
            <LazyLoadImage src={getUrl(userPP)} alt="Image" crossOrigin="anonymous" className="pp_img" onClick={onClick}/>
          ) :(
            
              <UserIcons
              iconProps={{
                size: 85,
                color: colors.colorWhite,
                
                onClick: onClick
              }}
            />
           
          )
}

export default PhotoProfil