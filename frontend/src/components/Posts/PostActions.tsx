import { colors } from "@urbannerd/constant"
import { ChatCircleIcons, HeartStraightIcons, BookmarkIcons } from "../Icons"
import { toggleLikePost, showToast, checkIfPostIsLiked } from "@urbannerd/utils";
import { checkIfPostIsBookmarked, toggleBookmark } from "@urbannerd/utils/query/post/fetchBookmark";
import { useEffect, useState } from "react";
import { useAuthContext } from "@urbannerd/provider";

interface PostActionsType {
    postId: number;
    likeCount: number;
}

const PostActions = ({ postId, likeCount }: PostActionsType) => {
    const {fetchPost} = useAuthContext()
    const [isLiked, setIsliked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const fetchBookmarkStatus = async () => {
        const isBookmark = await checkIfPostIsBookmarked(postId);
        setIsBookmarked(isBookmark)
      };
      const fetchLikeStatus = async () => {
        const isLiked = await checkIfPostIsLiked(postId);
        setIsliked(isLiked)
      };  
    const handleLikeClick = async () => {
        await toggleLikePost(postId);
        await fetchLikeStatus()
        await showToast('You liked this Post!')
        await fetchPost()
      };
      const handleBookmarkClick = async () => {
        await toggleBookmark(postId);
        await fetchBookmarkStatus()
        await showToast('You saved this Post!')
        await fetchPost()
      };

      useEffect(() => {
        fetchLikeStatus();
        fetchBookmarkStatus();
      }, [postId]);
      
    return (
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
              fill: isLiked ? colors.colorPurple : "transparent",
              stroke: isLiked ? "transparent" : colors.colorWhite,
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
    )
  };

  export default PostActions