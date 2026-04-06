import { BsLightningChargeFill } from "react-icons/bs";
import { ImSpinner8 } from "react-icons/im";
import { TbBulb } from "react-icons/tb";

const EmptyState = ({ onGenerate, generating }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
    
    {/* ICON */}
    <div className="w-14 h-14 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center shadow-lg">
      <TbBulb className="w-7 h-7 text-cyan-400" />
    </div>

    {/* TEXT */}
    <div>
      <p className="text-white font-semibold text-base">
        No questions yet
      </p>
      <p className="text-gray-400 text-sm mt-1">
        Generate AI-powered questions for this session.
      </p>
    </div>

    {/* BUTTON */}
    <button
      onClick={onGenerate}
      disabled={generating}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg 
      bg-linear-to-r from-cyan-400 to-blue-500 
      text-black text-sm font-medium 
      hover:scale-105 transition duration-300 
      shadow-lg hover:shadow-cyan-500/40 
      disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {generating ? (
        <>
          <ImSpinner8 className="animate-spin w-4 h-4" /> Generating…
        </>
      ) : (
        <>
          <BsLightningChargeFill className="w-4 h-4" /> Generate Questions
        </>
      )}
    </button>

  </div>
);

export default EmptyState;