import Buttons from "./Buttons";
import Content from "./Content";
import UserInfo from "./UserInfo";
import { auth, db } from "./../../firebase/config";
import Dropdown from "./DropDown";
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useState } from "react";
import EditMode from "./EditMode";

const Post = ({ tweet }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  // silme butonuna tıklanınca
  const handleDelete = () => {
    const tweetRef = doc(db, "tweets", tweet.id);

    deleteDoc(tweetRef)
      .then(() => toast.warn("Tweet akıştan kaldırıldı"))
      .catch((err) => toast.error("Tweet silinirken bir sorun oluştu"));
  };

  // düzenle butonuna tıklanınca
  const handleEdit = () => {
    setIsEditMode(true);
  };

  // oturumu açık olan kullanıcı bu tweeti like'ladımı?
  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  // like butonuna tıklanınca
  const toggleLike = async () => {
    // güncellenicek belgenin referanısını al
    const tweetRef = doc(db, "tweets", tweet.id);

    // tweeti like'lamışsa
    await updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid) // diziden kaldır
        : arrayUnion(auth.currentUser.uid), // değilse diziye ekle
    });
  };

  return (
    <div className="flex gap-3 border-b py-6 px-3 border-zinc-600">
      <img
        className="w-12 h-12 rounded-full"
        src={tweet.user.photo}
        alt={tweet.user.name}
      />

      <div className="w-full">
        <div className="flex justify-between items-center">
          <UserInfo tweet={tweet} />
          {auth.currentUser.uid === tweet.user.id && (
            <Dropdown handleDelete={handleDelete} handleEdit={handleEdit} />
          )}
        </div>

        {isEditMode ? (
          <EditMode tweet={tweet} close={() => setIsEditMode(false)} />
        ) : (
          <Content tweet={tweet} />
        )}

        <Buttons
          isLiked={isLiked}
          toggleLike={toggleLike}
          likeCount={tweet.likes.length}
        />
      </div>
    </div>
  );
};

export default Post;
