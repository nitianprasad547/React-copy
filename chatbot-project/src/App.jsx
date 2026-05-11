import { useState, useRef , useEffect } from 'react'
import { Chatbot} from 'supersimpledev';
import RobotProfileImage from './assets/robot.png';
import UserProfileImage from './assets/cat.png'
import './App.css'
          function ChatInput({chatMessages, setChatMessages}){
            const [inputText , setInputText] = useState('');
            const [isLoading , setIsLoading] = useState(false);
            function saveInputText(event){
                setInputText(event.target.value);
            }
            
            async function sendMessage(){
                if (isLoading || inputText===''){
                    return;
                }
                setIsLoading(true)
                setInputText('');
                const newChatMessages =[
                        ...chatMessages,
                        {
                            message : inputText,
                            sender : 'user',
                            id : crypto.randomUUID()
                        }
                    ]
                    setChatMessages([
                        ...newChatMessages,
                        {
                            message : 'Loading...',
                            sender : 'robot',
                            id : crypto.randomUUID()
                        }
                    ]);
                //When we used for resopnse then when we give input that was not seen in the page because we give an empty sring below so the previous code not shown us.We will store that in a variable.
                const response = await Chatbot.getResponseAsync(inputText);
                setChatMessages([
                    ...newChatMessages,
                    {
                        message : response,
                        sender : 'robot',
                        id : crypto.randomUUID()
                    }
                ]);
                setIsLoading(false);
            }
            
            function enter(event){
                if((event.key)==='Enter'){
                    sendMessage()
                }
                else if(event.key === 'Escape'){
                    setInputText('')
                }
             }
            return(
                <div className="flex mb-12.5">
                    <input 
                    placeholder="Send a message to Chatbot" 
                    size="30" 
                    onChange = {saveInputText}
                    value = {inputText}
                    onKeyDown = {enter}
                    className="border-2 px-4 py-3 rounded-xl grow"
                    />
                    <button 
                        onClick={sendMessage}
                        className="bg-emerald-700 border-0 px-5 py-3.5 text-amber-50 rounded-xl ml-2 cursor-pointer"
                    >Send</button>    
                </div>
            );
        }

        function ChatMessage(props){
            //const message = props.message;
            //const sender = props.sender;
            const {message , sender } = props;
            /*if(sender === 'robot'){
                return(
                    <div>
                        <img src="robot.png" width="40"/>
                        {message}
                    </div>
                );
                }*/
                return(
                    <div className=
                        {sender ==='user' ? 
                        "flex justify-end items-start" : 
                        "flex items-start"}>
                        {sender === 'robot' && <img className="rounded-2xl border-2 w-12.5" src={RobotProfileImage}/>}
                        <div className="bg-gray-200 py-3.75 px-5 rounded-xl mx-2.5 mb-5 max-w-75">
                            {message}
                        </div>
                        {sender === 'user' && <img className="rounded-2xl border-2 w-12.5"  src={UserProfileImage}/>}  
                    </div> 
                );
            }
        function ChatMessages({chatMessages}){
            const chatMessagesref = useRef(null);
            useEffect(()=>{
                const containerElem = chatMessagesref.current;
                if(containerElem){
                    containerElem.scrollTop = containerElem.scrollHeight;
                }
            },[chatMessages]);
            
            return(
            <div ref={chatMessagesref} className="grow mt-5 overflow-scroll scrollbar-none">
                {chatMessages.map((chatMessage)=>{
                return(
                    <ChatMessage 
                    message={chatMessage.message} sender={chatMessage.sender} key={chatMessage.id} />   
                )
            })}
            </div>
            );
        };

function App(){
            const array = useState(
                [
                {
                    message :'Hello Chatbot',
                    sender : 'user',
                    id : 'id1'
                },
                {
                    message : 'Hello! How can I help You?',
                    sender : 'robot',
                    id : 'id2'
                },
                {
                    message : 'can you get me today\'s date?',
                    sender : 'user',
                    id : 'id3'
                },
                {
                    message : 'Today is September 27',
                    sender : 'robot',
                    id : 'id4'
                }
            ]
            )
            //shortcut notation of below lines
            const [chatMessages , setChatMessages] = array;
            // const chatMessages = array[0];
            // const setChatMessages = array[1];//This the function(Updater function)
            //First value will be the current data that is given to the user.
            
            // ... is a operator that creates a copy of a function.
            return(
                <div className="max-w-150 ml-auto mr-auto h-screen flex flex-col">
                <ChatMessages
                    chatMessages={chatMessages}
                />
                <ChatInput 
                    chatMessages={chatMessages}
                    setChatMessages={setChatMessages}
                />
                </div>
            )
        };

export default App
