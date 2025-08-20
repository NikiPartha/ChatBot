import React, { useState } from 'react'
import { RefreshCw, Camera, Paperclip,  Mic, ArrowUp} from "lucide-react";
import ChatbotModal from "./Components/ChatbotModal";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getChatbotConfig } from "./api/chatbot";
import ThemeModal from './Components/ThemeModal';
import { addMessageToChat, getChatById,  clearChat, type ChatMessage} from "./api/chat";
import PageWrapper from './Pages/PageWrapper';
// import { useTheme, type Theme } from "./context/ThemeContext"; // ✅ Import Theme Context
import { useTheme, type Theme } from "./context/ThemeContext";
import { useNavigate } from "react-router-dom"; // ✅ For pagination navigation


function Frontpage() {

  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const {themeStyles, setTheme } = useTheme(); // ✅ to apply selected theme
  const navigate = useNavigate();

  const handleThemeChange = (theme: Theme) => {
    // console.log("Theme selected:", theme);
    // Here you can apply theme change logic
     setTheme(theme);
  };
  
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient()
  const chatId = 'Default'

  const { data: chatbot } = useQuery({
    queryKey: ["chatbotConfig"],
    queryFn: getChatbotConfig,
    });

   const { data: messages = [] } = useQuery({
    queryKey: ["chatMessages", chatId],
    queryFn:  () => getChatById(chatId),
    refetchInterval: 200, // auto-refresh every second
    select: (data) => data.messages,
  }); 

   const sendMessageMutation = useMutation({
    mutationFn: (msg: ChatMessage) =>addMessageToChat(chatId, msg, () => {
      // console.log("♻️ Invalidating query from bot reply...");
      queryClient.invalidateQueries({ queryKey: ["chatMessages", chatId] });
    }),
    onSuccess: () => {
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["chatMessages", chatId] });
    },
  });

  const refreshChatMutation = useMutation({
    mutationFn: () => clearChat(chatId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["chatMessages", chatId] }),
  });


   const handleSend = () => {
    if (!message.trim()) return;
    sendMessageMutation.mutate({
      id: Date.now().toString(),
      text: message,
      sender: "user",
    });
  };
  
  

  return (
    <div
      style={{
          backgroundColor: themeStyles.color,
          backgroundImage: themeStyles.backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          transition: "all 0.5s ease",
        }} 
        
      className="h-screen flex bg-gradient-to-br from-purple-200 via-white to-blue-100">
      
      {/* Sidebar */}
      <div className="w-15 bg-white shadow-lg flex flex-col items-center gap-2 py-2">
        <button 
        onClick={() => refreshChatMutation.mutate()}
        className="p-1.5 bg-purple-500 text-black rounded-full hover:bg-purple-600 transition">
          <RefreshCw size={18} />
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-1.5 bg-purple-500 text-black rounded-full hover:bg-purple-600 transition">
          <span className="text-sm">👤</span>
        </button> 
        <button
            onClick={() => setIsThemeModalOpen(true)}
            className="p-1.5 bg-purple-500 text-black rounded-full hover:bg-purple-600 transition "
            // Small Btn
          >
           🎨 
            
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Heading */}
        <div className="-py-1 text-center shadow-md bg-white">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            Hi <span className="text-purple-600">{chatbot?.name}</span>,Welcome to <span className="text-purple-600">Chat Bot</span>
          </h1>
          <p className="text-lg text-gray-600 mt-2">How can I help you today?</p>
          {chatbot?.avatar && (
              <img
                src={chatbot.avatar}
                alt="avatar"
                className="absolute right-2 top-9  -translate-y-1/2 w-12 h-12 rounded-full border shadow-md"
              />
           )}
        </div>

          {/* <div className="text-gray-400 text-center mt-10">
          </div> */}
            <div className="flex-1 overflow-y-auto p-6">
                {messages.length === 0 ? (
                <p className="text-gray-400 text-center mt-10">Start the conversation!</p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-lg max-w-xs ${
                      msg.sender === "user" ? "bg-purple-100 ml-auto" : "bg-gray-200 mr-auto"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))
              )}
              
            </div>

        {/* Chat Input */}
        <div className="p-2 bg-white shadow-lg flex items-center">
          <div className="flex-1 flex items-center border border-gray-400 rounded-lg overflow-hidden">
            
            <div className="flex items-center space-x-2 px-2 ">
                <button className="text-gray- hover:text-purple-600">
                  <Paperclip size={16} />
                </button>
                <button className="text-gray-500 hover:text-purple-600">
                  <Camera size={16} />
                </button>
            </div>

            {/* Theam Model  */}
            <ThemeModal
                isOpen={isThemeModalOpen}
                onClose={() => setIsThemeModalOpen(false)}
                onSave={handleThemeChange}
                onSaveAndNext={() => navigate("/nextpage")}
              />

            {/* Input Field */}
            <textarea
                placeholder="Ask me anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                 onKeyDown={(e) => {
                                      if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault(); // prevents newline
                                        handleSend();       // same function as arrow click
                                      }
                                    }}
                                    rows={1}
                className="flex-1 outline-none px-3 py-3 text-gray-700"
            />
            <div className="px-3">
                {message.trim() === "" ? (
                  <button className="text-gray-500 hover:text-purple-600">
                    <Mic size={20} />
                  </button>
                ) : (
                  <button 
                  onClick={handleSend}
                  className="bg-purple-500 text-black p-2 rounded-full hover:bg-purple-600 transition">
                    <ArrowUp size={18} />
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
      <ChatbotModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Frontpage


