//jshint  esversion: 6
/*
This file contains the helper functions which help us manage the user related tasks.
1) Signing in.
2) Signing out.
3) Getting users etc.
Everything related to users will be kept here.
*/

const users = [];


const addUser = ({id, name, room}) =>{
    name = name.trim().toLocaleLowerCase();
    room = room.trim().toLocaleLowerCase();
    const existingUser = users.find((user)=>user.room === room && user.name === name);
    if(existingUser){
      return {error:"User already exists in the room requested"};
    }
    const user = {id, name, room};
    users.push(user);
    return {user:user};
};

const removeUser = (id) =>{
  const index = users.findIndex((user)=>user.id ===id );
  if(index !== -1){
    return users.splice(index,1)[0];
  }
};

const getUser = (id) =>{
  return users.find((user) => user.id ===id);
};

const getUsersinRoom = (room)=>{
  return users.filter((user) =>user.room ===room);
};
module.exports = {addUser, removeUser, getUsersinRoom, getUser};
