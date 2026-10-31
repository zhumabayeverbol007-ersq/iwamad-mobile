export type CampusEvent = {
  id: number;
  title: string;
  date: string;
  place: string;
  seats: number;
};

export const events: CampusEvent[] = [
  {
    id: 1,
    title: 'React study night',
    date: '2026-10-22',
    place: 'Room 302',
    seats: 20,
  },
  {
    id: 2,
    title: 'TypeScript workshop',
    date: '2026-11-05',
    place: 'Library Hall',
    seats: 15,
  },
  {
    id: 3,
    title: 'Project demo day',
    date: '2026-11-12',
    place: 'Auditorium A',
    seats: 3,
  },
  {
    id: 4,
    title: 'Career talk: frontend',
    date: '2026-11-20',
    place: 'Room 101',
    seats: 30,
  },
];