"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Match {
  id: number;
  team1_id: number;
  team2_id: number;
  games_team1: number;
  games_team2: number;
  winner_team_id: number | null;
}

interface Team {
  id: number;
  teamname: string;
}

export default function Home() {
  const [currentRound, setCurrentRound] = useState<number | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const roundRes = await fetch("/data/current_round.json");
      const roundData = await roundRes.json();
      setCurrentRound(roundData.current_round);

      const teamsRes = await fetch("/data/teams.json");
      const teamsData = await teamsRes.json();
      setTeams(teamsData);

      const matchesRes = await fetch(`/data/rounds/round${roundData.current_round}.json`);
      const matchesData = await matchesRes.json();
      setMatches(matchesData);
      setLoading(false);
    }
    fetchData();
  }, []);

  function getTeamName(id: number) {
    return teams.find((t) => t.id === id)?.teamname || `Team ${id}`;
  }

  return (
    <div className="font-sans min-h-screen bg-[#f8fafa] flex flex-col items-center pb-6 px-2">
      <Image
        src="/padel_tournament.jpg"
        alt="Padel Tournament"
        width={320}
        height={120}
        className="rounded-xl mb-3 shadow-md object-cover w-full max-w-xs"
        priority
      />
      <h1 className="text-2xl font-extrabold mb-2 text-[#0f7b7b] text-center tracking-tight">Padel Tournament</h1>
      <h2 className="text-lg font-semibold mb-6 text-[#159f9f] text-center">
        {loading || currentRound === null ? "Loading..." : `Current Round: ${currentRound}`}
      </h2>
      {loading ? (
        <div className="text-lg text-[#0f7b7b]">Loading matches...</div>
      ) : (
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <h3 className="text-base font-bold mb-4 text-center text-[#159f9f]">Matches</h3>
          <div className="w-full">
            <div className="hidden sm:grid grid-cols-7 gap-2 px-2 pb-2 text-xs font-semibold text-[#0f7b7b] border-b border-[#159f9f]">
              <div className="col-span-2 text-right">Team 1</div>
              <div className="text-center">Score</div>
              <div className="text-center">vs</div>
              <div className="text-center">Score</div>
              <div className="col-span-2 text-left">Team 2</div>
            </div>
            <ul className="divide-y divide-[#e0f2f2]">
              {matches.map((match, idx) => (
                <li
                  key={match.id}
                  className={`grid grid-cols-7 gap-2 items-center px-2 py-3 text-base sm:text-sm ${idx % 2 === 0 ? "bg-[#f3fbfb]" : "bg-white"} rounded-xl`}
                >
                  <div className="col-span-2 text-right font-medium text-[#0f7b7b] truncate">
                    {getTeamName(match.team1_id)}
                  </div>
                  <div className="text-center font-mono text-lg sm:text-base text-[#159f9f]">
                    {match.games_team1}
                  </div>
                  <div className="text-center font-semibold text-[#0f7b7b]">vs</div>
                  <div className="text-center font-mono text-lg sm:text-base text-[#159f9f]">
                    {match.games_team2}
                  </div>
                  <div className="col-span-2 text-left font-medium text-[#159f9f] truncate">
                    {getTeamName(match.team2_id)}
                  </div>
                  <div className="col-span-7 text-center mt-1 sm:mt-0 text-xs sm:text-sm">
                    {match.winner_team_id ? (
                      <span
                        className={
                          match.winner_team_id === match.team1_id
                            ? "font-semibold text-[#0f7b7b]"
                            : "font-semibold text-[#159f9f]"
                        }
                      >
                        Winner: {getTeamName(match.winner_team_id)}
                      </span>
                    ) : (
                      <span className="text-gray-400">Draw</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
