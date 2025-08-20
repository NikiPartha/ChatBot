// chat.ts
import { QueryClient } from "@tanstack/react-query";

export type ChatMessage = {
  id: string;
  text: string;
  sender: "user" | "bot";
};

export type ChatSession = {
  id: string;
  messages: ChatMessage[];
};

// In-memory sessions
let chatSessions: ChatSession[] = [];

// Helper: find or create session
const getOrCreateSession = (chatId: string): ChatSession => {
  let chat = chatSessions.find((c) => c.id === chatId);
  if (!chat) {
    chat = { id: chatId, messages: [] };
    chatSessions.push(chat);
  }
  return chat;
};

// Fake bot reply
const generateBotReply = (userMessage: string): string => {
  if (userMessage.toLowerCase().includes("hi")) return "Hello! How can I help you today?";
  if (userMessage.toLowerCase().includes("how are you")) return "I'm good, how about you?";
  if (userMessage.toLowerCase().includes("what are you doing")) return "I'm chatting with you!";
  return "Interesting! Tell me more.";
};

// Get chat by ID
export const getChatById = async (chatId: string): Promise<ChatSession> => {
  return new Promise((resolve) => setTimeout(() => resolve(getOrCreateSession(chatId)), 200));
};

// Add a new message
export const addMessageToChat = async (
  chatId: string,
  message: ChatMessage,
  onBotReply?: (reply: ChatMessage) => void,
  // _queryClient?: QueryClient
): Promise<void> => {
  const chat = getOrCreateSession(chatId);
  chat.messages.push(message);

  // Simulate bot reply after 1 sec
  setTimeout(() => {
    // console.log("🧠 Bot is replying to:", message.text);
    const botMessage: ChatMessage = {
      id: Date.now().toString(),
      text: generateBotReply(message.text),
      sender: "bot",
    };
    chat.messages.push(botMessage);
    // console.log("🧠 Bot is replying to:",botMessage );

    if (onBotReply) onBotReply(botMessage);
    // if (_queryClient) _queryClient.invalidateQueries({ queryKey: ["chat", chatId] });
  }, 100);

  return new Promise((resolve) => setTimeout(() => resolve(), 200));
};

// Clear a chat session
export const clearChat = async (chatId: string): Promise<void> => {
  const chat = getOrCreateSession(chatId);
  chat.messages = [];
  return new Promise((resolve) => setTimeout(() => resolve(), 200));
};
