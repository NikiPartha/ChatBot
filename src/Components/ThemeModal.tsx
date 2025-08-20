import React from "react";
// import { useTheme } from "../context/ThemeContext";
// import { useTheme } from "../context/ThemeContext";
import { useTheme, type Theme } from "../context/ThemeContext";

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (theme: Theme) => void;
  onSaveAndNext: () => void;
}

const themes: { name: string; value: Theme }[] = [
  { name: "Black", value: "black" },
  { name: "orange", value: "orange" },
  { name: "Green", value: "green" },
//   { name: "Yellow", value: "yellow" },
];

const ThemeModal: React.FC<ThemeModalProps> = ({ isOpen, onClose,  onSave, onSaveAndNext}) => {
const { theme} = useTheme();
  const [selectedTheme, setSelectedTheme] = React.useState(theme);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-5">
        <h2 className="text-lg font-bold mb-4">Select Theme</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Color</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Themes</th>
            </tr>
          </thead>
          <tbody>
            {themes.map((theme) => (
              <tr key={theme.value}>
                <td className="border border-gray-300 px-4 py-2">{theme.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => {setSelectedTheme(theme.value);
                        onSave(theme.value);
                    }}
                    className={`px-3 py-1 rounded ${
                      selectedTheme === theme.value
                        ? "bg-purple-500 text-black"
                        : "bg-gray-200"
                    }`}
                  >
                    Apply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(selectedTheme);
              onSaveAndNext();
              onClose(); 
            }}
            className="px-4 py-2 rounded bg-purple-500 text-black hover:bg-purple-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeModal;
