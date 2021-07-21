import React, {useState,useEffect} from 'react';
import {Button,FormControl,InputLabel, Input} from '@material-ui/core'
import './App.css';
import Message from './Message';
import db from './firebase'
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {
  
   const[input,setInput]= useState('');
  const[messages,setMessages]=useState([ ]);
   const[username,setUsername]= useState('');

//useState= variable in REACT
//useEffect= run a code on  a condition

  useEffect(() => {
    //run once when the app component loads
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data()})))
    })
  }, [])






useEffect(() => {
       //run code here...
       //if its blank inside[], this code runs ONCE when the app component loads
       //if we have varaible like input ,it runs every time input changes
       //u can have multiple useeffects

       //const username= prompt('please enter your name');

       setUsername(prompt('Please enter your name'));


   }, []) //condition (it is called as dependencies)

   const sendMessage=(event) => {
        //all the message logic goes here
        event.preventDefault();
         db.collection('messages').add({
           message:input,
           username:username,
           timestamp:firebase.firestore.FieldValue.serverTimestamp()
         })

        
        setInput('');
   }

  return (
    <div className="App">
        <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" alt="messenger-logo"/>
        <h1> Hello owais!</h1>
                
         <form className="app_form">  {/*we are using here form becoz enter is not working its an trick jjust*/}
          
         <FormControl className="app_formControl">
      {/*  <InputLabel >Enter your message</InputLabel> */}

         
           {/*input field*/}
        <Input className="app_input" placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value)} />


               <IconButton
                       className="app_iconButton"      disabled={!input} variant="contained" color="primary" type="submit"  onClick={sendMessage}
               >
                    
                      <SendIcon/>


               </IconButton>



          {/*button*/}
        
        </FormControl>


      

         
         </form>
         <FlipMove>   
          {/*messages themselves*/}
          {messages.map(({id,message}) => (
            <Message key={id}  username={username} message={message}/>
          
          ))}

         </FlipMove>

    </div>
  );
}

export default App;
