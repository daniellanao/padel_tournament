"use client";

import { useEffect, useState } from "react";

interface Team {
  team_id: number;
  team_name: string;
  player1name: string;
  player2name: string;
  player1level: number;
  player2level: number;
  total_level: number;
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch("/data/teams.json");
      const data = await res.json();
      setTeams(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="font-sans min-h-screen bg-[#f8fafa] flex flex-col items-center pb-6 px-2">
      <h1 className="text-2xl font-extrabold mb-4 text-[#0f7b7b] text-center tracking-tight">Teams</h1>
      {loading ? (
        <div className="text-lg text-[#0f7b7b]">Loading teams...</div>
      ) : (
        <div className="w-full max-w-xl sm:max-w-6xl bg-white rounded-2xl shadow-lg p-4 sm:p-12">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-xl text-left">
              <thead>
                <tr className="bg-[#159f9f] text-white">
                  <th className="py-2 px-2 sm:py-6 sm:px-8 rounded-tl-xl">Team</th>
                  <th className="py-2 px-2 sm:py-6 sm:px-8">Player 1</th>
                  <th className="py-2 px-2 sm:py-6 sm:px-8">P1 Level</th>
                  <th className="py-2 px-2 sm:py-6 sm:px-8">Player 2</th>
                  <th className="py-2 px-2 sm:py-6 sm:px-8">P2 Level</th>
                  <th className="py-2 px-2 sm:py-6 sm:px-8 rounded-tr-xl">Total Level</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, idx) => (
                  <tr
                    key={team.team_id}
                    className={
                      idx % 2 === 0 ? "bg-[#f3fbfb]" : "bg-white"
                    }
                  >
                    <td className="py-2 px-2 sm:py-6 sm:px-8 font-bold text-[#159f9f]">{team.team_name}</td>
                    <td className="py-2 px-2 sm:py-6 sm:px-8 text-[#0f7b7b] font-semibold">{team.player1name}</td>
                    <td className="py-2 px-2 sm:py-6 sm:px-8 text-[#159f9f] font-bold text-center">{team.player1level}</td>
                    <td className="py-2 px-2 sm:py-6 sm:px-8 text-[#0f7b7b] font-semibold">{team.player2name}</td>
                    <td className="py-2 px-2 sm:py-6 sm:px-8 text-[#159f9f] font-bold text-center">{team.player2level}</td>
                    <td className="py-2 px-2 sm:py-6 sm:px-8 text-[#0f7b7b] font-extrabold text-center">{team.total_level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 