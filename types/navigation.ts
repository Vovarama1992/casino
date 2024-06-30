import { SVGProps } from 'react';

export interface INavigation {
  title: string;
  type?: 'social-media';
  isExpand?: boolean;
  list: {
    name: string;
    icon?: SVGProps<SVGSVGElement> | any;
    link: string;
  }[];
}
