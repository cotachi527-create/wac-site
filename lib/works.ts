export type Work = {
  id: string;
  src: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
};

export const works: Work[] = [
  {
    id: "001",
    src: "/images/works/day001.png",
    title: "タイトル",
    date: "2026-04-01",
    description: "",
    tags: [],
  },
  {
    id: "002",
    src: "/images/works/day002.png",
    title: "タイトル",
    date: "2026-04-02",
    description: "",
    tags: [],
  },
  {
    id: "003",
    src: "/images/works/day003.jpg",
    title: "タイトル",
    date: "2026-04-03",
    description: "",
    tags: [],
  },
];
