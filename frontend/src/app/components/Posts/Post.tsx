import React from 'react';
import * as THREE from 'three';;
import Model from '../Model/Model';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LazyVideo from '../LazyVideo';

export interface PostProps {
  content?: string;
  createdAt: string;
  images?: string[];
  model3D?: string[];
  videos?: string[];
  tags?: string[];
}

const getUrl = (path: string) => 'http://localhost:4000/' + path

const Post = ({ post }: { post: PostProps }) => {
  return (
    <div className="post">
      <div className='post_content'>
      {post.content && <p>{post.content}</p>}
        <div className='post_media'>
        {post.createdAt && <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>}
        {post.images?.length !== 0 || post.videos?.length !== 0 || post.model3D?.length  && (<div className='media_post'>

        </div>)}
        {post.images && post.images.map((image, index) => (
          <LazyLoadImage key={index} src={getUrl(image)} alt={`Image ${index}`} crossOrigin="anonymous"/>
        ))}
  
        {post.videos && post.videos.map((video, index) => (
          <LazyVideo videoUrl={getUrl(video)} key={index} />
        ))}
      {post.model3D && post.model3D.map((model, index) => (
          <Model url={getUrl(model)} key={index}/>
      ))}
      </div>      
      {post.tags && <ul>{post.tags.map((tag, index) => <li key={index}>{tag}</li>)}</ul>}
      </div>
    </div>
  );
};

export default Post;
