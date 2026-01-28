export interface Task {
  id: number;
  title: string;
  description?: string;
  link?: string;
  image?: string;
  createdAt: number;
  updatedAt: number;
}
