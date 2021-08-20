export type KickLogStructure = {
  total: number;
  current_page: number;
  per_page: number;
  from: number;
  to: number;
  path: string;
  prev_page_url: string;
  next_page_url: string;
  first_page: number;
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  data: {
    id: number;
    game_uuid: string | null;
    acting_user_id: number;
    target_user_id: number;
    reason: string;
    acting_user: {
      id: number;
      uuid: string;
      display_name: string;
    };
    target_user: {
      id: number;
      uuid: string;
      display_name: string;
    };
  }[];
};
