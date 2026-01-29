export interface Task {
  id: number;
  title: string;
  description: string | null;
  link: string | null;
  image: string | null;
  createdAt: number;
  updatedAt: number;
}
