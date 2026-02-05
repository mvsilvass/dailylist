export interface Task {
  id: number;
  title: string;
  description: string | null;
  link: string | null;
  image: string | null;
  isDone: boolean | null;
  targetDate: number;
  priority: number;
  createdAt: number;
  updatedAt: number;
}
