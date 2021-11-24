DROP TABLE if exists users;

CREATE TABLE users(  
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    username TEXT,
    password TEXT,
    latitude TEXT,
    longitude TEXT,
    language TEXT
);

CREATE TABLE friendships(  
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    friend_id INTEGER NOT NULL,

     FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
     FOREIGN KEY (friend_id) REFERENCES users (id)
   
);

SELECT * FROM users;
SELECT * FROM friendships;

INSERT INTO users (email, username, password, latitude, longitude, language) VALUES ('ioan3@test.com', 'ioan', '123456', '40.4284374','-3.5306775', 'es');

 Update users set email='ioanbeilic@test.com', username='ioan beilic', password='123123', latitude='40.4284376', longitude='-3.5306774', language='en' where id="1";


INSERT INTO friendships (user_id, friend_id) VALUES (1,7);

select * from users LEFT Join friendships  on users.id = friendships.friend_id ;

select * from friendships  Join users on users.id = friendships.friend_id where user_id=1;

select count(*) as count from friendships  Join users on users.id = friendships.friend_id where user_id=1;