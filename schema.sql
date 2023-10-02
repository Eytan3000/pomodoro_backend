Select * FROM tasks;
-- Select * FROM users;
-- desc tasks;
-- desc users;
-- Show databases;
-- USE pomodoro_tasks;
-- SHOW TABLES;
-- CREATE TABLE tasks_active (
--         id INT AUTO_INCREMENT PRIMARY KEY,
--     content VARCHAR(500),
--     status enum('active', 'done') NOT NULL,
--     uid VARCHAR(100) REFERENCES users(uid)
-- );

-- CREATE TABLE tasks_active (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     content VARCHAR(500),
--     status ENUM('active', 'done') NOT NULL,
--     uid INT,
--     FOREIGN KEY (uid) REFERENCES users(id)
-- );



-- CREATE TABLE users (
--         uid VARCHAR(100) NOT NULL PRIMARY KEY,
--         email VARCHAR(100) NOT NULL
-- );
-- DROP TABLE users;
-- @block
-- ALTER TABLE tasks
-- DROP COLUMN status;

ALTER TABLE tasks
ADD COLUMN uid VARCHAR(100) REFERENCES users(uid);
-- DROP COLUMN uid;

-- ALTER TABLE notes
-- ADD COLUMN uid VARCHAR(100) NOT NULL PRIMARY KEY;


-- RENAME COLUMN id TO uid;
-- MODIFY COLUMN password VARCHAR(100) NOT NULL;
-- @block
-- INSERT INTO tasks (content, status)
-- VALUES 
--     (
--         'task 2 Non unde reiciendis aut eaque voluptatibus', 'done'
--     ),
--     (
--         'task 3 Non unde reiciendis aut eaque voluptatibus', 'done'
--     ),
--     (
--         'task 4 est quae similique sed animi assumenda ut repellat deserunt a consequatur voluptas. Et repellendus nesciunt et iste voluptate.', 'active'
--     );

-- INSERT INTO tasks (content, status)
-- VALUES (
--         'task 1 Non unde reiciendis aut eaque voluptatibus', 'active'
--     );

-- @block
-- SELECT * FROM tasks WHERE status='active';
-- SELECT * FROM tasks WHERE status='done';

-- INSERT INTO tasks (content, status) VALUES ('content1', 'active')
UPDATE tasks SET status='done' WHERE id=7;
-- @block
Select * FROM users;
-- @block
Select * FROM tasks;


-- @block
-- INSERT INTO tasks (content, status, uid) VALUES ('a', 'active', 'F71RWCR7QqdtdrGyzJGMba8hzWj2');

-- SELECT * FROM tasks WHERE status= 'active' AND uid='F71RWCR7QqdtdrGyzJGMba8hzWj2';

DELETE FROM users
WHERE EMAIL NOT IN ('1@gmail.com');
