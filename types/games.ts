import { StaticImageData } from 'next/image';

export interface IGame {
  name: string;
  image: StaticImageData;
  link: string;
}

export interface ISlot {
  name: string;
  provider: string;
  image: string;
  id: string;
  has_lobby?: boolean; // Указывает, есть ли лобби у игры
  lobby_data?: string; // Данные лобби, если есть
  className?: string;
}
