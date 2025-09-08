import { Instagram, Youtube } from 'lucide-react';
import type { SVGProps } from 'react';

export const Icons = {
  instagram: Instagram,
  youtube: Youtube,
  tiktok: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16.27 4.14a4.14 4.14 0 1 1-8.28 0 4.14 4.14 0 0 1 8.28 0z" />
      <path d="M18.41 19.86v-1.6c-4.47-.2-8.11-3.84-8.31-8.31H8.5v5.18a2.59 2.59 0 0 0 2.59 2.59h2.32a2.59 2.59 0 0 0 2.59-2.59V10a5 5 0 0 0-5-5H8.5v1.6h1.5a3.39 3.39 0 0 1 3.39 3.39z" />
    </svg>
  ),
};
