import { colors } from "@/app/constant";
import { BookmarkIcons, ChatCircleIcons, HeartStraightIcons } from "../Icons";

const Card = () => {
  return (
    <div className="card">
      <div className="cd_pp">
        <span className="pp"></span>
      </div>
      <div className="cd_card_info">
        <span className="card_img"></span>
        <div className="card_actions">
          <ChatCircleIcons
            iconProps={{
              size: 32,
              color: colors.colorWhite,
            }}
          />
          <HeartStraightIcons
            iconProps={{
              size: 32,
              color: colors.colorWhite,
            }}
          />
          <BookmarkIcons
            iconProps={{
              size: 32,
              color: colors.colorWhite,
            }}
          />
        </div>
        <div className="comments"></div>
      </div>
    </div>
  );
};

export default Card;
