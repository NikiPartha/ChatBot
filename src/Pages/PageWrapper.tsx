// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Camera, Paperclip, Mic, ArrowUp } from "lucide-react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { addMessageToChat, getChatById, type ChatMessage } from "../api/chat";

// const ChatPage: React.FC = () => {
//   const { chatId } = useParams<{ chatId: string }>();
//   const navigate = useNavigate();
//   const [message, setMessage] = useState("");
//   const queryClient = useQueryClient();

//   const { data: chat } = useQuery({
//     queryKey: ["chat", chatId],
//     queryFn: () => getChatById(chatId!),
//     refetchInterval: 1000,
//   });

//   const mutation = useMutation({
//     mutationFn: (msg: ChatMessage) => addMessageToChat(chatId!, msg),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["chat", chatId] });
//       setMessage("");
//     },
//   });

//   const sendMessage = () => {
//     if (!message.trim()) return;
//     mutation.mutate({ id: Date.now().toString(), text: message, sender: "user" });
//   };

//   if (!chat) return <p className="p-6 text-gray-600">Loading chat...</p>;

//   return (
//     <div className="h-screen flex flex-col bg-gradient-to-br from-purple-200 via-white to-blue-100">
//       {/* Header */}
//       <div className="p-4 bg-white shadow-md flex justify-between">
//         <h1 className="text-2xl font-bold text-gray-800">Chat Session {chatId}</h1>
//         <button
//           className="bg-purple-500 text-white px-4 py-1 rounded-lg hover:bg-purple-600"
//           onClick={() => navigate("/")}
//         >
//           Home
//         </button>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-6 space-y-4">
//         {chat.messages.length === 0 ? (
//           <p className="text-gray-400 text-center">No messages yet. Start chatting!</p>
//         ) : (
//           chat.messages.map((msg: ChatMessage) => (
//             <div
//               key={msg.id}
//               className={`p-3 rounded-lg max-w-xs ${
//                 msg.sender === "user" ? "bg-purple-100 ml-auto" : "bg-gray-200 mr-auto"
//               }`}
//             >
//               {msg.text}
//             </div>
//           ))
//         )}
//       </div>

//       {/* Input */}
//       <div className="p-4 bg-white shadow-lg flex items-center">
//         <div className="flex-1 flex items-center border border-gray-400 rounded-lg overflow-hidden">
//           <div className="flex items-center space-x-2 px-2">
//             <button className="text-gray-500 hover:text-purple-600">
//               <Paperclip size={16} />
//             </button>
//             <button className="text-gray-500 hover:text-purple-600">
//               <Camera size={16} />
//             </button>
//           </div>
//           <input
//             type="text"
//             placeholder="Ask me anything..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="flex-1 outline-none px-4 py-3 text-gray-700"
//           />
//           <div className="px-3">
//             {message.trim() === "" ? (
//               <button className="text-gray-500 hover:text-purple-600">
//                 <Mic size={20} />
//               </button>
//             ) : (
//               <button
//                 onClick={sendMessage}
//                 className="bg-purple-500 text-black p-2 rounded-full hover:bg-purple-600 transition"
//               >
//                 <ArrowUp size={18} />
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;
// src/pages/PageWrapper.tsx
import React, { useState } from "react";

interface PageWrapperProps {
  pages: React.ReactNode[];
}

const PageWrapper: React.FC<PageWrapperProps> = ({ pages }) => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div>
      {pages[currentPage]}
      {/* Pagination controls (optional) */}
    </div>
  );
};

export default PageWrapper;
