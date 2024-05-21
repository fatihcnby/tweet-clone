import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./../../firebase/config";

const Aside = () => {
  const [count, setCount] = useState();

  useEffect(() => {
    const tweetsCol = collection(db, "tweets");

    onSnapshot(tweetsCol, (snapshot) => {
      setCount(snapshot.size);
    });
  }, []);

  return (
    <div className="max-xl:hidden p-4">
      <h1 className="text-xl font-semibold">Gönderi Sayısı {count}</h1>
    </div>
  );
};

export default React.memo(Aside);
