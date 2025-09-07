import React from "react";
const RulesPage: React.FC = () => {
  const rules: string[] = [
    "Do not upload inappropriate videos as your workout verification.",
    "Do not spam our servers with multiple account creation requests.",
    "Only upload videos that you have recorded yourself; no stock or prerecorded content.",
    "Ensure your video clearly shows you performing the entire workout (no hidden cuts).",
    "Videos must be in an accepted format (MP4, MOV) and under 100 MB in size.",
    "Avoid profanity, hate speech, or any form of harassment in your uploads.",
  ];
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 bg-[url('/centerBackground.png')]">
      <h1 className="text-3xl font-bold mb-6">Workout App Rules</h1>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md overflow-hidden">
        <ol className="list-decimal list-inside p-6 space-y-10">
          {rules.map((rule, idx) => (
            <li key={idx} className="text-gray-800">
              {rule}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RulesPage;