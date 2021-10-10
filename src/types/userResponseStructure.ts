import { Perk } from "./perk";
import { GameOptionJson } from "./gameOptionJson";

export type UserResponseStructure = {
  client_id: string;
  client_token: string;
  discord_id: string | null;
  display_name: string;
  created_at: string;
  name_change_available_at: string;
  perks: Perk[];
  settings: {
    "lobby.code.custom": string | null;
    "name.color.gold": boolean;
    "name.color.match": boolean;
  };
  options: Record<string, GameOptionJson[]> & { gamemode: GameOptionJson; version: number } | null;
  cosmetics: null | { [key: string]: number | undefined }
} & (
  {
    banned: true;
    banned_until: string | null;
  } | {
    banned: false;
    banned_until: null;
  }
) & (
  {
    muted: true;
    muted_until: string | null;
  } | {
    muted: false;
    muted_until: null;
  }
);
