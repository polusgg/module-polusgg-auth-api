import { Perk } from "./perk";
import { GameOptionJson } from "@polusgg/plugin-polusgg-api/src/services/gameOptions/gameOption";

export type UserResponseStructure = {
  client_id: string;
  client_token: string;
  display_name: string;
  banned_until?: string;
  perks: Perk[];
  settings: {
    "lobby.code.custom": string | null;
    "name.color.gold": boolean;
    "name.color.match": boolean;
  };
  options: GameOptionJson[] | null;
};
