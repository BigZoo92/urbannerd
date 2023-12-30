import { AuthSchemaType } from "@urbannerd/types";
import { getUserInfoWithId } from "@urbannerd/utils";
import { fetchIsUserFollowing } from "@urbannerd/utils/query/user/fetchIsUserFollowing";
import { toggleFollow } from "@urbannerd/utils/query/user/toggleFollow";
import { useState, useEffect } from "react";

const UserInfo = ({ userId }: {userId: number}) => {
    const [user, setUser] = useState<AuthSchemaType | null>(null);
    const [isFollow, setIsFollow] = useState(false)
    const fetchFollow = async() => {
      if(!user?.id)return
      const test = await fetchIsUserFollowing(user?.id)
      setIsFollow(test)
    }
    useEffect(() => {
      (async () => {
        const userInfo = await getUserInfoWithId(userId);
        if(!userInfo)return
        setUser(userInfo.user);
      })();
    }, [userId]);
  
    if (!user) return null;
    return (
      <div className='userInfo'>
        <p>{user.username}</p>
        <span onClick={async() => {
          await toggleFollow(user?.id)
          await fetchFollow()
        }}
        >
        {isFollow ? 'follow' : 'followed'}
        </span>
      </div>
    )
  };

export default UserInfo