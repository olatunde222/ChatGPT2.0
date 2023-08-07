import { useState } from "react";
import ChatBody from "./components/ChatBody";
import ChatInput from "./components/ChatInput";
import {useMutation} from "react-query"
import { fetchResponse } from "./components/api";

function App() {
  const [chat, setChat] = useState([]);

  const mutation = useMutation({
    mutationFn: () => {
      return fetchResponse (chat);
    },
    onSuccess: (data) => setChat((prev)=>[...prev, {sender:"ai", message:data.message.replace(/^\n\n/,"")}])
  })

  
  // const sendMessage = async (message)=> {
  //   await Promise.resolve(setChat((prev)=>[...prev,message]))
  // }
  const sendMessage = async (message) => {
    try {
      await Promise.resolve(setChat((prev) => [...prev, message]));
      mutation.mutateAsync()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[#1A232E] h-screen py-6 relative sm:px-16 px-12 text-white overflow-hidden flex flex-col justify-between align-middle">
      {/* Gradient */}
      <div className="gradient-01 z-0 absolute"></div>
      <div className="gradient-02 z-0 absolute"></div>
      {/* Header */}
      <div className="uppercase font-bold text-2xl text-center mb-3">
        ChatGPT2.0
      </div>
      {/* Body */}
      <div className="h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center">
        <ChatBody chat={chat} />
      </div>
      {/* Input */}
      <div className="w-full max-w-4xl min-w-[20rem] self-center">
        <ChatInput sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default App;
