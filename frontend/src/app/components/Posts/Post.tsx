import React from 'react';
import * as THREE from 'three';;
import Model from '../Model/Model';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LazyVideo from '../LazyVideo';

export interface PostProps {
  content?: string;
  createdAt: string;
  files?: string[];
  tags?: string[];
}

const getUrl = (path: string) => 'http://localhost:4000/' + path

const renderMedia = (filePath: string) => {
  const fileExtension = filePath.split('.').pop();

  switch (fileExtension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
      return <LazyLoadImage src={getUrl(filePath)} alt="Image" crossOrigin="anonymous" />;
    
    case 'mp4':
    case 'mov':
    case 'avi':
      return <LazyVideo videoUrl={getUrl(filePath)} />;
    
    case 'gltf':
    case 'glb':
      return <Model url={getUrl(filePath)} />;

    default:
      return null;
  }
};

const Post = ({ post }: { post: PostProps }) => {
  return (
    <div className="post">
      <div className='post_content'>
      {post.content && <p>{post.content}</p>}
        <div className='post_media'>
        {post.createdAt && <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>}
        {post.files?.length !== 0  && (<div className='post_preview'>
        {post.files && post.files.map((file, index) => (
          <div key={index}>
            {renderMedia(file)}
          </div>
        ))}
        </div>)}
      </div>      
      {post.tags && <ul>{post.tags.map((tag, index) => <li key={index}>{tag}</li>)}</ul>}
      </div>
    </div>
  );
};

export default Post;
