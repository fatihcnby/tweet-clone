import { useEffect, useState } from "react";
import Form from "../../components/Form";
import Post from "../../components/Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import Loader from "../../components/Loader";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState();

  useEffect(() => {
    // abone oluncak kolleksiyonun referansını alma
    const tweetsCol = collection(db, "tweets");

    // sorgu ayarları belirleme
    const q = query(tweetsCol, orderBy("createdAt", "desc"));

    // kolleksiyondaki verilere abone ol
    const unsub = onSnapshot(q, (snapshot) => {
      // geçici dizi
      const temp = [];

      // belgelerin içerisndeki verilere erişip bir diziye aktardık
      snapshot.docs.forEach((doc) => temp.push({ id: doc.id, ...doc.data() }));

      // state'e aktar
      setTweets(temp);
    });

    // kullanıcı sayfadan ayrılırsa aboneliği sonlandır
    return () => unsub();
  }, []);

  return (
    <div className="border-zinc-600 border overflow-y-auto">
      <header className="font-bold p-4 border-b border-zinc-600">
        Anasayfa
      </header>

      <Form user={user} />

      {!tweets ? (
        <Loader />
      ) : (
        tweets.map((tweet, i) => <Post key={i} tweet={tweet} />)
      )}
    </div>
  );
};

export default Main;
