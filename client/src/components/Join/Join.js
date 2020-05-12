//jshint  esversion: 6
/*
Instead of using redux or react props, we are using react-hooks to track the state of the components
*/
import React,{useState} from "react";
import { Link } from "react-router-dom"; //use to link to /chat path

import "./Join.css";

const Join = ()=> {// declare hooks inside function based components
  const [name, setName] = useState("") ;// declaring a hook. We use an array. The first parameter is a variable and the second is a setter function.
  //To set a state we call the useState passing in the initial value of the variable. In this case, it is empty;
  const [room, setRoom] = useState("");
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        {/*event contains the value of the input field. Here we say that onChange, trigger an arrow function. This arrow function,
          calls the setName/setRoom function passing in the value input by the field. These are setter functions which will
          process the value and set the hook variable to that value.
        */}
        <div><input placeholder="Name" className="joinInput" type="text" onChange={(event)=>setName(event.target.value)}/></div>
        <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event)=>setRoom(event.target.value)}/></div>
        {/*
          Here we are using the link to redirect the user to the /chat route with a query String. We manually specify
          what the query String contains i.e. the name and the room of the user.
          We also have the onClick function. This function checks if the user has actually entered values in the fields
          because failing to do so will break our app. So we specify an arrow function such that if there is no name or no room,
          a ternary operator will trigger event.preventDefault() which basically prevents redirecting, otherwise it does nothing.
          */}
        <Link onClick={(event)=>(!name || !room)?event.preventDefault():null} to={'/chat?name='+name+'&room='+room}>
          <button className="button mt-20" type="submit">Sign in</button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
