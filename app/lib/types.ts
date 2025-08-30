interface FighterData {
  dob: string | null;
  draws: number | null;
  height: number | null;
  id: string | null;
  losses: number | null;
  name: string;
  nick_name: string | null;
  reach: number | null;
  sapm: number | null;
  splm: number | null;
  stance: string | null;
  str_acc: number | null;
  str_def: number | null;
  sub_avg: number | null;
  td_avg: number | null;
  td_avg_acc: number | null;
  td_def: number | null;
  weight: number | null;
  wins: number | null;
  img: string | null;
}

interface Events {
  b_id: string;
  b_name: string;
  b_img: string | null;
  b_record: string | null;
  b_stance: string | null;
  b_nickname: string | null;

  r_id: string;
  r_name: string;
  r_img: string | null;
  r_record: string | null;
  r_stance: string | null;
  r_nickname: string | null;

  pred_winner_id: string;
  pred_winner_name: string;

  winner_id?: string;
  winner_name?: string;
}


export type { FighterData, Events };
