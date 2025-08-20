// Simulating backend API calls
export type ChatbotConfig = {
  name: string;
  gender: "male" | "female";
  avatar: string;
};

let chatbotConfig: ChatbotConfig = {
  name: "Chat Buddy",
  gender: "male",
  avatar: "https://i.pravatar.cc/100?img=12", // male avatar
};

export const getChatbotConfig = async (): Promise<ChatbotConfig> => {
  return new Promise((resolve) => setTimeout(() => resolve(chatbotConfig), 300));
};

export const updateChatbotConfig = async (data: ChatbotConfig): Promise<ChatbotConfig> => {
  return new Promise((resolve) => {
    chatbotConfig = { ...data };
    setTimeout(() => resolve(chatbotConfig), 300);
  });
};
