import React from "react";

type Pokemon = {
  name: string;
  type: string;
  experience: number;
};

const sampleData: Pokemon[] = [
  { name: "troller", type: "Machop", experience: 1390 },
  { name: "sxygir", type: "Charmander", experience: 940 },
  { name: "Boba", type: "Charmander", experience: 700 },
  { name: "Dux", type: "Machop", experience: 640 },
  { name: "Vokainodragon", type: "Squirtle", experience: 310 },
];

const Leaderboard: React.FC = () => {
  // Sort descending by experience
  const sortedList = [...sampleData].sort(
    (a, b) => b.experience - a.experience
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 bg-[url('/centerBackground.png')]" >
      <h1 className="text-3xl font-bold mb-8">Pokémon Leaderboard</h1>

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Experience</th>
            </tr>
          </thead>
          <tbody>
            {sortedList.map((poke, idx) => (
              <tr
                key={poke.name}
                className={
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }
              >
                <td className="px-6 py-4 font-medium">{idx + 1}</td>
                <td className="px-6 py-4">{poke.name}</td>
                <td className="px-6 py-4">{poke.type}</td>
                <td className="px-6 py-4">{poke.experience.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;