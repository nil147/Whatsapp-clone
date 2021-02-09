import React from "react";
import "../styles/SidebarChat.scss";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

function SidebarChat({ name, id }) {
  return (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar />
        <div className="chat-info">
          <h2>{name}</h2>
          <p>Last message...</p>
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;
