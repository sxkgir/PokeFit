import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function JoinWorldButton() {
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <div
      className="flex items-center justify-center h-screen"
    >
      <button
        onClick={() => setRedirect(true)}
        className="px-8 py-4 bg-blue-600 text-white font-extrabold text-2xl rounded-full shadow-2xl border-4     hover:bg-blue-700 active:scale-95 transition-all duration-150"
      >
        Begin Your Fitness Journey!
      </button>
    </div>
  );
}
