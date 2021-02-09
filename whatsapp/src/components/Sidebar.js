import React, { useEffect, useState } from "react";
import "../styles/Sidebar.scss";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DonutLargeOutlinedIcon from "@material-ui/icons/DonutLargeOutlined";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import db, { auth } from "../firebase";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import SidebarChat from "./SidebarChat";

function Sidebar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);


  const signOut = () => {
      auth.signOut();
      dispatch(logout());
  }

  const addRoom = () => {
    const roomName = prompt("Choose your room name");

    db.collection("rooms").add({
      name: roomName,
      admin: user.displayName,
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="top-left">
          <IconButton onClick={signOut}>
            <Avatar  src={user.photoUrl} />
          </IconButton>
        </div>
        <div className="top-right">
          <IconButton>
            <DonutLargeOutlinedIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar-addRoom">
        <Button onClick={addRoom}>Add Room</Button>
      </div>
      <div className="sidebar-input">
        <SearchIcon />
        <input type="text" placeholder="Search or start new chat" />
      </div>
      <div className="sidebar-rooms">
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
