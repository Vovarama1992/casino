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
  className?: string;
}
