import { useState } from "react";
import ReactMarkdown from "react-markdown";

const QAItem = ({ item, onPin }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-700 rounded-xl mb-4 p-4 transition hover:shadow-xl hover:shadow-cyan-500/10">
      <div className="flex justify-between items-center gap-4">
        {/* QUESTION */}
        <h3
          className="font-medium text-white cursor-pointer hover:text-cyan-400 transition"
          onClick={() => setOpen(!open)}
        >
          {item.question}
        </h3>

        {/* PIN BUTTON */}
        <button
          onClick={() => onPin?.(item._id)}
          className="text-xl hover:scale-110 transition"
        >
          {item.pinned ? "📌" : "📍"}
        </button>
      </div>

      {/* ANSWER */}
      {open && (
        <div className="mt-3 text-gray-300 text-sm leading-relaxed border-t border-gray-700 pt-3">
          <ReactMarkdown>{item.answer}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default QAItem;
