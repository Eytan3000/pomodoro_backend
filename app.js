require('dotenv').config();
const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors');
const {
  getTasks_active,
  getTasks_done,
  createTask,
  deleteTask,
  editTask,
  changeStatusToActive,
  changeStatusToDone,
  insertNewUser,
} = require('./database.js');
const { initializeApp } = require('firebase-admin/app'); //Firebase
const admin = require('./config/firebase-config.js');
// const port = process.env.PORT || 8090;
//-------------------------------------------------------
const app = express();
app.use(express.json());


// const allowedOrigins = [process.env.CORS1]; 
// app.use(cors({ origin: allowedOrigins }));
app.use(cors());



app.use(authenticateFirebaseToken);
// Tasks -------------------------------------------------
//get active tasks
app.get('/tasks_active/:uid',  async (req, res) => {
  const uid = req.params.uid;
  const result = await getTasks_active(uid);
  res.send(result);
});

//get completed tasks
app.get('/tasks_done/:uid',  async (req, res) => {
  const uid = req.params.uid;
  
  const result = await getTasks_done(uid);
  res.send(result);
});

//Delete task
app.delete('/task_delete/:id',  async (req, res) => {
  const id = req.params.id;
  const log = await deleteTask(id);
  res.send('DELETE Request Called for id ' + log);
});

// Create Task. Body expected: { "content": "task content", "uid":"uid" }
app.post('/task_create',  async (req, res) => {
  const { content, uid } = req.body;

  const taskId = await createTask(content, uid);
  
  // res.send(taskId);
  res.status(200).send(String(taskId));
});

// Edit tasks. Body expected: { "content": "updated content" }
app.patch('/task_edit/:id',  async (req, res) => {
  const id = req.params.id;
  const { content } = req.body;
  await editTask(id, content);
  res.status(201).send('Task Content Updated');
});

// Change status to Active
app.get(
  '/task_status_toActive/:id',
  
  async (req, res) => {
    const id = req.params.id;
    await changeStatusToActive(id);
    res.status(201).send('Task Status Changed to Active');
  }
);

// Change status to Done
app.get(
  '/task_status_toDone/:id',
  
  async (req, res) => {
    const id = req.params.id;
    await changeStatusToDone(id);
    res.status(201).send('Task Status Changed to Done');
  }
);

// // Auth ------------------------------------------------------

// sign up new user
app.post('/new-user', async (req, res) => {

  try {
    const { uid, email } = req.body;
    
    insertNewUser(uid, email);

    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

async function authenticateFirebaseToken(req, res, next) {
  // get token
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) return res.sendStatus(401);

  // we have valid token, verify that token:
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);

    if (decodeValue) return next();
    return res.json({ message: 'unauthorized' });
  } catch (e) {
    return res.json({ message: 'internal error' });
  }
}

//--------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(process.env.PORT || 8090, () => {
  console.log('server is running on port 8090');
});