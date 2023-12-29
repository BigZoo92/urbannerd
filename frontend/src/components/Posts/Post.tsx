import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { previewMedia } from '@urbannerd/utils';
import { checkIfPostIsLiked, getUrl, getUserInfoWithId, toggleLikePost } from '@urbannerd/utils';
import LazyVideo from '../LazyVideo';
import Model from '../Model';
import { ArrowLeftIcons, BookmarkIcons, ChatCircleIcons, ExportIcons, HeartStraightIcons } from '../Icons';
import { colors } from '@urbannerd/constant';
import Link from 'next/link';
import { AuthSchemaType } from '@urbannerd/types';
import PhotoProfil from '../PhotoProfil';
import { checkIfPostIsBookmarked, toggleBookmark } from '@urbannerd/utils/query/post/fetchBookmark';
import { Toast } from '@capacitor/toast';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Share } from '@capacitor/share';
import { fetchPostLikesCount } from '@urbannerd/utils/query/post/fetchPostLikesCount';
import { useAuthContext } from '@urbannerd/provider/AuthProvider';
import { toggleFollow } from '@urbannerd/utils/query/user/toggleFollow';
import { fetchIsUserFollowing } from '@urbannerd/utils/query/user/fetchIsUserFollowing';

export interface PostProps {
  id: number;
  content?: string;
  createdAt: string;
  files?: string[];
  userId: number;
}

const Post = ({ post }: { post: PostProps }) => {
  const [renderMediaPost, setRenderMediaPost] = useState<{ [key: string]: string }>({});
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [user, setUser] = useState<{user: AuthSchemaType} | null>(null)
  const {fetchPost} = useAuthContext()
  const [isLike, setIslike] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState<number | null>(null)
  const [isFollow, setIsFollow] = useState(false)
  
    useEffect(() => {
      (async() => {
        const test = await fetchPostLikesCount(post?.id)
        setLikeCount(test.likesCount)
      })()
  }, [post]);

  const fetchFollow = async() => {
    if(!user?.user.id)return
    const test = await fetchIsUserFollowing(user?.user.id)
    setIsFollow(test)
  }

  useEffect(() => {
    fetchFollow()
}, [user, toggleLikePost]);

  const showLikeToast = async () => {
    defineCustomElements(window);
    await Toast.show({
      text: 'You liked this Post!',
      position: 'top'
    },
    );
  };

  const showBookmarkToast = async () => {
    defineCustomElements(window);
    await Toast.show({
      text: 'You saved this Post!',
      position: 'top'
    },
    );
  };

  

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

  useEffect(() => {
    const loadPreviews = async () => {
      if (post.files && post.files.length > 0) {
        const promises = post.files.map(file => previewMedia(file));
        const mediaPreviews = await Promise.all(promises);
        const mediaMap = post.files.reduce((acc, file, index) => {
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
    
  }, [post.files]);

  const handleMediaClick = (url: string) => {
    setSelectedMedia(url);
    //@ts-ignore
    document.querySelector('html').style.overflow = 'hidden'
  };

  const closeMedia = () => {
    setSelectedMedia(null);
    //@ts-ignore
    document.querySelector('html').style.overflow = 'visible'
  };

  useEffect(() => {
    if(!post) return
    (async() => {
      setUser(await getUserInfoWithId(post.userId))
    })()
  }, [post])
  const fetchLikeStatus = async () => {
    const isLiked = await checkIfPostIsLiked(post.id);
    setIslike(isLiked)
  };

  const fetchBookmarkStatus = async () => {
    const isBookmark = await checkIfPostIsBookmarked(post.id);
    setIsBookmarked(isBookmark)
  };

  useEffect(() => {
    fetchLikeStatus();
    fetchBookmarkStatus();
    
  }, [post.id]);

  const handleLikeClick = async () => {
    await toggleLikePost(post.id);
    await fetchLikeStatus()
    await showLikeToast()
    await fetchPost()
  };
  const handleBookmarkClick = async () => {
    await toggleBookmark(post.id);
    await fetchBookmarkStatus()
    await showBookmarkToast()
  };
  

  const previewClass = (() => {
    const count = post.files?.length || 0;
    switch (count) {
      case 1: return 'one-image';
      case 2: return 'two-images';
      case 3: return 'three-images';
      case 4: return 'four-images';
      default: return '';
    }
  })();

  const shareMedia = async(url: string) => {
    await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url,
      dialogTitle: 'Share with buddies',
    });
  }
  if(!user) return null
  return (
    <div className="post">
      <Link href={'/'}>
      <PhotoProfil userPP={user?.user?.pp}/>
      </Link>
       <div className='post_content'>
        <div className='userInfo'>
          <p>{user.user.username}</p>
          <span onClick={async() => {
            await toggleFollow(user?.user.id)
            await fetchFollow()
            }}
          >
              {isFollow ? 'follow' : 'followed'}
          </span>
          </div>
      {post.content && <p>{post.content}</p>}
      <div className='post_media'>
        {post.files?.length !== 0 && (
          <div className={`post_preview ${previewClass}`}>
          {Object.entries(renderMediaPost).map(([file, url], index) => (
              <LazyLoadImage src={url} alt="Media Preview" crossOrigin="anonymous" key={index} onClick={() => handleMediaClick(file)}/>
          ))}
        </div>
        )}
      </div>
      <div className="card_actions">
          <ChatCircleIcons
            iconProps={{
              size: 32,
              color: colors.colorWhite,
            }}
          />
          <div onClick={handleLikeClick}>
          <HeartStraightIcons
            iconProps={{
              size: 32,
              fill: isLike ? colors.colorPurple : "transparent",
              stroke: isLike ? "transparent" : colors.colorWhite,
              strokeWidth: 15,
            }}
            
          />
          <span>{likeCount}</span>
          </div>
          <div onClick={handleBookmarkClick}>
          <BookmarkIcons
            iconProps={{
              size: 32,
              fill: isBookmarked  ? colors.colorPurple : "transparent",
              stroke: isBookmarked  ? "transparent" : colors.colorWhite,
              strokeWidth: 15,
            }}
          />
          </div>
        </div>
      </div>
      {selectedMedia && (
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
      )}
      
    </div>
  );
};

export default Post;

