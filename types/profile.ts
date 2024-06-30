import { StaticImageData } from 'next/image';
import { SVGProps } from 'react';

export interface IProfileSocialMedia {
  icon: SVGProps<SVGSVGElement> | any;
  status: 'linked' | 'unlinked';
}

export interface IAppeal {
  id: number;
  subject: string;
  created_at: string;
  updated_at: string;
  status: 'open' | 'closed';
  // chat: {
  //   name: string;
  //   message: string;
  //   date: string;
  //   position: 'you' | 'interlocutor';
  // }[];
}

export interface IAvatar {
  url: StaticImageData;
  id: number;
}
