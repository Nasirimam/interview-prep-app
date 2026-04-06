import { MdRefresh } from "react-icons/md";
import { TbAlertTriangle } from "react-icons/tb";

const ErrorBanner = ({ message, onRetry }) => (
  <div className="rounded-xl border border-red-500/30 bg-red-500/10 backdrop-blur-md p-4 flex items-start justify-between gap-4 shadow-lg">
    
    <div className="flex items-start gap-3">
      <TbAlertTriangle className="text-red-400 w-5 h-5 shrink-0 mt-0.5" />
      
      <div>
        <p className="text-red-300 text-sm font-semibold">
          Failed to load questions
        </p>
        <p className="text-red-400/80 text-xs mt-0.5">
          {message}
        </p>
      </div>
    </div>

    {onRetry && (
      <button
        onClick={onRetry}
        className="shrink-0 inline-flex items-center gap-1.5 text-xs 
        text-cyan-400 hover:text-cyan-300 
        border border-gray-700 hover:border-cyan-400 
        rounded-lg px-3 py-1.5 transition-all duration-200 
        font-medium bg-gray-800 hover:bg-gray-700"
      >
        <MdRefresh className="w-4 h-4" /> Retry
      </button>
    )}
  </div>
);

export default ErrorBanner;