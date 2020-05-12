//jshint  esversion: 6
// Inside here, we will implement all the socket.io client logic
import React, {useState, useEffect} from "react";
import queryString from "query-string"; //will help with parsing the query String
import io from "socket.io-client";

import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";

let socket;
const ENDPOINT ="https://aqueous-eyrie-93469.herokuapp.com/";

const Chat = ({location})=> {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState('');
  //state to track a single message
  const [message, setMessage] = useState("");
  //state to track all the messages
  const [messages, setMessages] = useState([]);
  useEffect(() =>{
    //This specifies what to do when our component renders. We will retrieve the data through the query String.
    const {name, room} = queryString.parse(location.search); //locations is from react-router through a prop. So we include it in the parameter.

    /* Here When we see the log, we see 2 connections instead of 1. To fix this, we need to specify when the useEffect()
    function is updated and called. Currently it is called 2 times because first is the complete render call and the
    second is the update call. Since we need the update call only when we actually update, we can pass a second parameter
    to the useEffect function. In an array we specify the location.search and the ENDPOINT i.e. the url and the Server endpoint.
    This means that only when these 2 parameters change, will we recall this function.
    */
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    /*
      Here we can also provide a function with the socket.emit. This will be used as a sort of error handling.
      So it goes like this:
      1) The client emits data which is received by the back end.
      2) The server does some logic and tells if there is an error or not. If there is, the callback functions is called passing the error
      3) The error is then reflected as maybe a console.log()  or an alert.
    */
    socket.emit("join", {name, room}, ()=>{
      // alert(error);
    });
    /*
    To complete the useEffect, we need to give a return statement which is basically equal to unmounting and disconnecting.
    */
    return () =>{
      socket.emit("disconnect");
      socket.off();
    }
  }, [location.search, ENDPOINT]);


  //Second useEffect function for handling messages
  useEffect(()=>{
    socket.on("message",(message)=>{
      /*
      We are doing somthing similar to pushing into the array.
      Since this is a state and we cannot mutate a state, we will spread all other messages and add the current message at the end.
      */
      setMessages(messages=>[...messages, message]);
      //updating only when the messages array changes
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  // function for sending messages
  const sendMessages = (event) =>{
    event.preventDefault();  //prevents refreshing the page.
    if(message){
      socket.emit("sendMessage", message, ()=>{
        setMessage("");
      });
    }
  }
console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
       <InfoBar room={room}/>
       <Messages messages = {messages} name={name}/>
       <Input message={message} setMessage={setMessage} sendMessages={sendMessages} />
      </div>
      <TextContainer users={users} />
    </div>
  );
};




export default Chat;
