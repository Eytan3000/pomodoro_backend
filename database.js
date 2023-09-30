const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// const pool = mysql
//   .createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//   })
//   .promise();

const pool = mysql
  .createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
  })
  .promise();

async function getTasks_active(uid) {
  
  const [rows] = await pool.query(
    'SELECT * FROM tasks WHERE status= ? AND uid= ?',
    ['active', uid]
  );
  return rows;
}

async function getTasks_done(uid) {
  const [rows] = await pool.query(
    'SELECT * FROM tasks WHERE status= ? AND uid= ?',
    ['done', uid]
  );
  return rows;
}

async function createTask(content, uid) {
  const [result] = await pool.query(
    `INSERT INTO tasks (content, status, uid) VALUES (?,?,?);`,
    [content, 'active', uid]
  );
  const id = result.insertId;
  return id;

}

async function deleteTask(id) {
  await pool.query('DELETE FROM tasks WHERE id=?;', [id]);

  return id;
}

async function editTask(id, content) {
  const response = await pool.query(
    `UPDATE tasks SET content=? WHERE id=?;`,
    [content, id]
  );
  return response[0];
}

async function changeStatusToActive(id) {
  const [note] = await pool.query(
    "UPDATE tasks SET status=? WHERE id=?",
    ['active', id]
  );
  // return id;
}
async function changeStatusToDone(id) {
  const [note] = await pool.query("UPDATE tasks SET status=? WHERE id=?", [
    'done',
    id
  ]);
  // return note[0];
}

// Auth -----------------------------------------------

async function insertNewUser(uid, email) {
  const [user] = await pool.query(
    'INSERT INTO users (uid, email) VALUES (?, ?)',
    [uid, email]
  );
  // return note[0];
}

module.exports = {
  getTasks_active,
  getTasks_done,
  createTask,
  deleteTask,
  editTask,
  changeStatusToActive,
  changeStatusToDone,
  insertNewUser,
};
