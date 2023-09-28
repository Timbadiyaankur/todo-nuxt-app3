import { sqlQuery } from "~~/server/mysqldb";

export const read = async () => {
  const result = await sqlQuery({
    query:
      "SELECT id, title, content, status, created_at, updated_at FROM todos",
  });
  return result;
};

export const create = async (data) => {
  await sqlQuery({
    query: `INSERT INTO todos (title, content) VALUES (?, ?)`,
    values: [data.title, data.content],
  });
  return await read();
};

export const details = async (data) => {
  const result = await sqlQuery({
    query: "SELECT id FROM todos WHERE title = ?",
    values: [data.title],
  });
  return !!result.length;
};

export const update = async (id, data) => {
  await sqlQuery({
    query: `UPDATE todos SET title = ?, content = ? WHERE id = ?`,
    values: [data.title, data.content, id],
  });
  return await read();
};

export const markComplete = async (id) => {
  await sqlQuery({
    query: `UPDATE todos SET status = ? WHERE id = ?`,
    values: [true, id],
  });
  return await read();
};

export const remove = async (id) => {
  await sqlQuery({
    query: "DELETE FROM todos WHERE id = ?",
    values: [id],
  });
  return await read();
};
