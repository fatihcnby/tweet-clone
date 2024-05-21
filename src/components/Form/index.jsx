import { BsCardImage } from "react-icons/bs";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "./../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import React, { useState } from "react";
import Loader from "../Loader";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);

  // tweet kolleksiyonunun referansı
  const tweetsCol = collection(db, "tweets");

  // medyayı storage yükler ve url'ini döndürür
  const uploadImage = async (file) => {
    //1) dosya resim değilse ve dosya yoksa fonksiiyonu durdur
    if (!file || !file?.type.startsWith("image")) return null;

    //2) dosyanın yükleneceği konumun referansını al
    const imageRef = ref(storage, v4() + file.name);

    try {
      //3) referansını oluşturduğumuz koduma dosyayı yükle
      await uploadBytes(imageRef, file);

      //4) storage'a yüklenen dosyanın url'ini al ve return et
      return await getDownloadURL(imageRef);
    } catch (err) {
      toast.error("resmi yüklerken bir sorun oluştu");
      return null;
    }
  };

  // form gönmderilince
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1) inputlardaki verilere eriş
    const text = e.target[0].value.trim();
    const file = e.target[1].files[0];

    // 2) yazı ve resim içeriği yoksa uyarı ver
    if (!text && !file)
      return toast.info("Lütfen içerik giriniz", { position: "bottom-right" });

    // yüklenmenin başaladığını belirt
    setIsLoading(true);

    try {
      // 3) resim varsa resmi storage'a yükle
      const url = await uploadImage(file);

      // 4) yeni tweet dökümanını kollekisyona ekle
      await addDoc(tweetsCol, {
        textContent: text,
        imageContent: url,
        createdAt: serverTimestamp(),
        likes: [],
        isEdited: false,
        user: {
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL,
        },
      });
    } catch (err) {
      toast.error("Tweet'i gönderirken bir sorun oldu");
    }

    // yüklenmenin bittiğini belirt
    setIsLoading(false);

    // formu sıfırla
    e.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 border-b border-zinc-600 p-4"
    >
      <img
        className="rounded-full h-[35px] md:h-[45px] mt-1"
        src={user?.photoURL}
      />

      <div className="w-full">
        <input
          className="w-full mt-1 mb-2 bg-transparent outline-none md:text-lg"
          placeholder="Neler Oluyor?"
          type="text"
        />

        <div className="flex justify-between items-center">
          <label
            className="text-lg transition p-4 cursor-pointer rounded-full hover:bg-gray-800"
            htmlFor="icon"
          >
            <BsCardImage />
            <input className="hidden" id="icon" type="file" />
          </label>

          <button className="bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800">
            {isLoading ? <Loader /> : "Tweetle"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default React.memo(Form);
