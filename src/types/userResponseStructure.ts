import { Perk } from "./perk";

export type UserResponseStructure = {
  client_id: string;
  client_token: string;
  display_name: string;
  banned_until?: string;
  perks: Perk[];
  settings: {
    "lobby.code.custom": string;
    "name.color.gold": boolean;
    "name.color.match": boolean;
  };
};
