"use client";

import { useEffect, useState } from "react";

interface Standing {
  position: number;
  team_name: string;
  round1: string;
  round2: string;
  round3: string;
  round4: string;
  matches_won: number;
  matches_lost: number;
  games_won: number;
  games_lost: number;
  difference: number;
}

export default function Standings() {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      //const res = await fetch("/data/standings.json");
      const res = await fetch("https://sportchain.itzimi.com/api/standings");
      const data = await res.json();
      setStandings(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="font-sans min-h-screen bg-[#f8fafa] flex flex-col items-center pb-6 px-2">
      <h1 className="text-2xl font-extrabold mb-4 text-[#0f7b7b] text-center tracking-tight">Standings</h1>
      {loading ? (
        <div className="text-lg text-[#0f7b7b]">Loading standings...</div>
      ) : (
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead>
                <tr className="bg-[#159f9f] text-white">
                  <th className="py-2 px-2 rounded-tl-xl">#</th>
                  <th className="py-2 px-2">Team</th>
                  <th className="py-2 px-1">R1</th>
                  <th className="py-2 px-1">R2</th>
                  <th className="py-2 px-1">R3</th>
                  <th className="py-2 px-1">R4</th>
                  <th className="py-2 px-1">W</th>
                  <th className="py-2 px-1">L</th>
                  <th className="py-2 px-1">GW</th>
                  <th className="py-2 px-1">GL</th>
                  <th className="py-2 px-2 rounded-tr-xl">Diff</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((team, idx) => (
                  <tr
                    key={team.position}
                    className={
                      idx < 4
                        ? "bg-[#e0f7f7] font-bold text-[#0f7b7b]"
                        : idx % 2 === 0
                        ? "bg-[#f3fbfb]"
                        : "bg-white"
                    }
                  >
                    <td className="py-2 px-2 text-center">{team.position}</td>
                    <td className="py-2 px-2 font-semibold truncate max-w-[90px]">{team.team_name}</td>
                    <td className="py-2 px-1 text-center">{team.round1}</td>
                    <td className="py-2 px-1 text-center">{team.round2}</td>
                    <td className="py-2 px-1 text-center">{team.round3}</td>
                    <td className="py-2 px-1 text-center">{team.round4}</td>
                    <td className="py-2 px-1 text-center text-[#0f7b7b] font-bold">{team.matches_won}</td>
                    <td className="py-2 px-1 text-center">{team.matches_lost}</td>
                    <td className="py-2 px-1 text-center">{team.games_won}</td>
                    <td className="py-2 px-1 text-center">{team.games_lost}</td>
                    <td className="py-2 px-2 text-center font-bold {team.difference >= 0 ? 'text-[#159f9f]' : 'text-red-500'}">
                      {team.difference}
                    </td>
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