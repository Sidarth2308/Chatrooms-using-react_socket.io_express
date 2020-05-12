import React from "react";
import ScrollToBottom from 'react-scroll-to-bottom';


import Message from "./Message/Message";

import "./Messages.css";

const Messages = (props) =>(
      <ScrollToBottom  className="messages">
        {/*Looping through the messages*/}
        {props.messages.map((message,i) =><div key={i}> <Message message={message} name={props.name} /></div>)}
      </ScrollToBottom>
    );


export default Messages;
