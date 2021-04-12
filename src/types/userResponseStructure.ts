import { Perk } from "./perk";

export type UserResponseStructure = {
  uuid: string;
  api_token: string;
  display_name: string;
  banned_until?: string;
  perks: Perk[];
  settings: Partial<{
    "lobby.code.custom": string;
    "name.color.gold": boolean;
    "name.color.match": boolean;
  }>;
};
