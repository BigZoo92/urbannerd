import { colors } from '@urbannerd/constant';
import { getUrl } from '@urbannerd/utils';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { UserIcons } from '../Icons/User';

const PhotoProfil = ({userPP, onClick}: {userPP: string | undefined, onClick?: React.MouseEventHandler<any>}) => {
    return userPP ? (
            <LazyLoadImage src={getUrl(userPP)} alt="Image" crossOrigin="anonymous" className="pp_img" onClick={onClick}/>
          ) :(
            <div onClick={onClick}>
              <UserIcons
              iconProps={{
                size: 85,
                color: colors.colorWhite,
                className: 'pp_img',    
              }}
            />
            </div>
          )
}

export default PhotoProfil