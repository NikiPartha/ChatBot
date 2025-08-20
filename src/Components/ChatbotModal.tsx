import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getChatbotConfig, updateChatbotConfig } from "../api/chatbot";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ChatbotModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();

  const { data: config } = useQuery({
    queryKey: ["chatbotConfig"],
    queryFn: getChatbotConfig,
  });

  const [name, setName] = useState(config?.name || "");
  const [gender, setGender] = useState<"male" | "female">(config?.gender || "male");

  const mutation = useMutation({
    mutationFn: updateChatbotConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatbotConfig"] });
      onClose();
    },
  });

  const avatar =
    gender === "male"
      ? "https://i.pravatar.cc/100?img=12"
      : "https://i.pravatar.cc/100?img=47";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Customize Profile</h2>

        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <img src={avatar} alt="Avatar" className="w-20 h-20 rounded-full border" />
        </div>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Enter chatbot name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        {/* Gender Selection */}
        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="male"
              checked={gender === "male"}
              onChange={() => setGender("male")}
            />
            Male
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="female"
              checked={gender === "female"}
              onChange={() => setGender("female")}
            />
            Female
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              mutation.mutate({ name, gender, avatar })
            }
            className="px-4 py-2 bg-purple-500 text-black rounded hover:bg-purple-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;
