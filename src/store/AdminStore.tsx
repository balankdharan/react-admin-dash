import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {
  eventSeed,
  kanbanSeed,
  orderRows,
  postSeed,
  products,
  userRows,
} from "../data";

// Everything the dashboard can change lives here and is saved in the
// browser (localStorage), so the app works without a backend.

export type Row = { id: number; [key: string]: unknown };

export type Comment = { id: number; author: string; text: string };

export type Post = {
  id: number;
  author: string;
  role: string;
  avatar: string;
  text: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
  createdAt: string;
};

export type KanbanColumnId = "todo" | "doing" | "done";

export type KanbanCardData = {
  id: number;
  title: string;
  description: string;
  column: KanbanColumnId;
};

export type CalendarEvent = { id: number; date: string; title: string };

export type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export type LogEntry = { id: number; time: string; text: string };

export type Settings = { name: string; email: string; avatar: string };

export type AdminData = {
  users: Row[];
  products: Row[];
  orders: Row[];
  posts: Post[];
  kanban: KanbanCardData[];
  events: CalendarEvent[];
  messages: Message[];
  logs: LogEntry[];
  settings: Settings;
  session: { email: string } | null;
};

export type TableName = "users" | "products" | "orders";

const STORAGE_KEY = "admin-dash-data";

export const isoDate = (date: Date) => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};

export const today = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
};

export const nextId = (list: { id: number }[]) =>
  list.reduce((max, item) => Math.max(max, item.id), 0) + 1;

// "today+2" in the seed data becomes a real date, so the calendar always
// has something to show this month.
const seedDate = (value: string) => {
  const offset = Number(value.split("+")[1] ?? 0);
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return isoDate(d);
};

export const defaultData = (): AdminData => ({
  users: userRows.map((row) => ({ ...row })),
  products: products.map((row) => ({ ...row })),
  orders: orderRows.map((row) => ({ ...row })),
  posts: postSeed.map((post) => ({ ...post, comments: [...post.comments] })),
  kanban: kanbanSeed.map((card) => ({ ...card, column: card.column as KanbanColumnId })),
  events: eventSeed.map((event) => ({ ...event, date: seedDate(event.date) })),
  messages: [],
  logs: [],
  settings: {
    name: "Jane Doe",
    email: "admin@example.com",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  session: null,
});

const load = (): AdminData => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...defaultData(), ...JSON.parse(saved) };
  } catch {
    // Private mode or broken data: start from the demo data.
  }
  return defaultData();
};

type Store = {
  data: AdminData;
  update: (change: (data: AdminData) => AdminData, log?: string) => void;
  addRow: (table: TableName, row: Omit<Row, "id">, label: string) => void;
  deleteRow: (table: TableName, id: number) => void;
  replaceAll: (data: AdminData, log: string) => void;
};

const StoreContext = createContext<Store | null>(null);

export const AdminStoreProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<AdminData>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage full or blocked: changes stay for this visit only.
    }
  }, [data]);

  const update: Store["update"] = (change, log) => {
    setData((current) => {
      const next = change(current);
      if (!log) return next;
      const entry = { id: nextId(next.logs), time: new Date().toLocaleString(), text: log };
      return { ...next, logs: [entry, ...next.logs].slice(0, 200) };
    });
  };

  const addRow: Store["addRow"] = (table, row, label) =>
    update(
      (d) => ({ ...d, [table]: [...d[table], { ...row, id: nextId(d[table]) }] }),
      `Added ${label} to ${table}`
    );

  const deleteRow: Store["deleteRow"] = (table, id) =>
    update(
      (d) => ({ ...d, [table]: d[table].filter((row) => row.id !== id) }),
      `Deleted #${id} from ${table}`
    );

  const replaceAll: Store["replaceAll"] = (next, log) => update(() => next, log);

  return (
    <StoreContext.Provider value={{ data, update, addRow, deleteRow, replaceAll }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useAdminStore = () => {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useAdminStore must be used inside AdminStoreProvider");
  return store;
};
