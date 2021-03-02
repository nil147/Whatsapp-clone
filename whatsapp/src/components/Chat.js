import React, { useEffect, useState } from "react";
import "../styles/Chat.scss";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import InsertEmoticonOutlinedIcon from "@material-ui/icons/InsertEmoticonOutlined";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import MicNoneOutlinedIcon from "@material-ui/icons/MicNoneOutlined";
import { useParams } from "react-router-dom";
import db from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import firebase from "firebase";

function Chat() {
  const { roomId } = useParams();
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);

  const user = useSelector(selectUser);

  useEffect(() => {
    //set room name
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      //set messages

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      name: user.displayName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat-top">
        <div className="top-left">
          <IconButton>
            <Avatar />
          </IconButton>
          <h4>{roomName}</h4>
        </div>
        <div className="top-right">
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton>
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat-message">
        {messages.map((message) => (
          <p className={`chat-reciver ${message.name === user.displayName && "message-send"}`}>
            <span className="message-name">{message.name}
              <span className="message-date">
                {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
              </span>
            </span>

            {message.message}

          </p>
        ))}
      </div>
      <div className="chat-bottom">
        <div className="bottom-left">
          <IconButton>
            <InsertEmoticonOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileOutlinedIcon />
          </IconButton>
        </div>
        <div className="bottom-center">
          <form onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Type a message"
            />
          </form>
        </div>
        <div className="bottom-right">
          <IconButton>
            <MicNoneOutlinedIcon />
          </IconButton>
          <button
            onSubmit={sendMessage}
            style={{ visibility: "hidden" }}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
