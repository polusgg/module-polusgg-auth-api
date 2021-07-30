import { Perk } from "./perk";
import { GameOptionJson } from "@polusgg/plugin-polusgg-api/src/services/gameOptions/gameOption";

export type UserResponseStructure = {
  client_id: string;
  client_token: string;
  discord_id: string | null;
  display_name: string;
  banned_until?: string;
  perks: Perk[];
  settings: {
    "lobby.code.custom": string | null;
    "name.color.gold": boolean;
    "name.color.match": boolean;
  };
  options: Record<string, GameOptionJson[]> & { gamemode: GameOptionJson, version: number } | null;
};
