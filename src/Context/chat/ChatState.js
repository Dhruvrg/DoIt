import { useState } from "react";
import ChatContext from "./chatContext";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";

const ChatState = (props) => {
  const [otheUserId, setOtheUserId] = useState(0);
  const [email, setUserEmail] = useState("dhruvrg2003@gmail.com");
  const [list, setList] = useState([]);

  const getOtherUsers = async () => {
    try {
      const data = await getDocs(collection(db, "users"));
      setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        otheUserId,
        setOtheUserId,
        email,
        setUserEmail,
        getOtherUsers,
        list,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};
export default ChatState;
