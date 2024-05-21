import { LuMessageCircle } from "react-icons/lu";
import { FaRetweet } from "react-icons/fa6";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";

const Buttons = ({ isLiked, toggleLike, likeCount }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="p-3 rounded-full cursor-pointer transition-colors hover:bg-[#00a6ff43]">
        <LuMessageCircle />
      </div>

      <div className="p-3 rounded-full cursor-pointer transition-colors hover:bg-[#00ff1143]">
        <FaRetweet />
      </div>

      <div
        onClick={toggleLike}
        className="flex justify-center items-center gap-2 p-3 rounded-full cursor-pointer transition-colors hover:bg-[#ff5dfa43]"
      >
        {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}

        {likeCount}
      </div>

      <div className="p-3 rounded-full cursor-pointer transition-colors hover:bg-[#78777761]">
        <CiShare2 />
      </div>
    </div>
  );
};

export default Buttons;
