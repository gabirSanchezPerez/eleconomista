export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Fomrs {
  id: number;
  name: string;
  user: User;
  hasFile: string;
  created_at	: string
}

export interface Filters {
  date: string;
  user: string;
  hasFile: string;
}

