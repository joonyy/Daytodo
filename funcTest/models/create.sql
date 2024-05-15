-- Active: 1715096709552@@127.0.0.1@3306@funcTest
CREATE DATABASE funcTest;

--로그인 작업을 위한 유저 테이블
CREATE TABLE Users (
    user_id INT NOT NULL AUTO_INCREMENT ,
    email VARCHAR(255),
    username VARCHAR(255),
    user_pw VARCHAR(255),
    PRIMARY KEY (user_id)
);

--이벤트 테이블 : D-day 혹은 일정을 저장하는 데이터베이스
CREATE TABLE Todos (
  todo_id INT NOT NULL PRIMARY KEY,
  user_id INT NOT NULL,
  todo_title VARCHAR(255) NOT NULL,
  todo_date DATE NOT NULL,
  isclear BOOLEAN NOT NULL,
  `description` TEXT,
  tag_id INT,
  Foreign Key(user_id) REFERENCES Users(user_id)
);

CREATE TABLE Tags(
  tag_id INT NOT NULL PRIMARY KEY,
  todo_id INT NOT NULL,
  tag_name VARCHAR(255),
  FOREIGN KEY (todo_id) REFERENCES Todos(todo_id)
);
