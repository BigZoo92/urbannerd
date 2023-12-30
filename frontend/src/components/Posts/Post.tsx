import React, { useEffect, useState } from 'react';
import { getUserInfoWithId } from '@urbannerd/utils';
import Link from 'next/link';
import { AuthSchemaType } from '@urbannerd/types';
import PhotoProfil from '../PhotoProfil';
import { fetchPostLikesCount } from '@urbannerd/utils';
import UserInfo from './UserInfo';
import PostActions from './PostActions';
import MediaContent from './MediaContent';
import MediaFullSize from '../MediaFullSize';
export interface PostProps {
  id: number;
  content?: string;
  createdAt: string;
  files?: string[];
  userId: number;
}

const Post = ({ post }: { post: PostProps }) => {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [user, setUser] = useState<{user: AuthSchemaType} | null>(null)
  const [likeCount, setLikeCount] = useState<number | null>(null)

  useEffect(() => {
    if(!post) return
    (async() => {
      const test = await fetchPostLikesCount(post?.id)
      setLikeCount(test.likesCount)
      setUser(await getUserInfoWithId(post.userId))
    })()
  }, [post]);

  if(!user?.user || !post) return null

  return (
    <div className="post">
      <Link href={'/'}>
        <PhotoProfil userPP={user?.user?.pp}/>
      </Link>
      <div className='post_content'>
      <UserInfo userId={user?.user?.id}/>
      {post.content && <p>{post.content}</p>}
      <MediaContent setSelectedMedia={setSelectedMedia} files={post.files} />
      <PostActions postId={post.id} likeCount={likeCount || 0}/>
      </div>
      <MediaFullSize selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia} />
    </div>
  );
};

export default Post;

