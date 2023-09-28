import { createPool } from "mysql2/promise";

interface Options {
  query: string;
  values?: any[];
}

const pool = createPool({
  host: "localhost",
  user: "root",
  database: "todo_nuxt",
  password: "root",
});

export const sqlQuery = async ({ query, values }: Options) => {
  const [rows] = await pool.query(query, values);
  return rows;
};
