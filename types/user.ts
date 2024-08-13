export interface IUser {
  id: number;
  username: string;
  fullname: string;
  avatar: string;
  telegram_id: number;
  telegram_fullname: string;
  telegram_username: string;
  vk_id: number;
  is_vk_linked: boolean;
  telegram_code: string;
  created_at: string;
  balance: string;
  pure_balance: string;
  bonus_balance: string;
}
