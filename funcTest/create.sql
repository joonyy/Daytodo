-- Active: 1715096709552@@127.0.0.1@3306@funcTest
CREATE DATABASE funcTest;

--로그인 작업을 위한 유저 테이블
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(30),
    username VARCHAR(30),
    password VARCHAR(30),
    isLoggedIn BOOLEAN NOT NULL DEFAULT FALSE,
);

--이벤트 테이블 : D-day 혹은 일정을 저장하는 데이터베이스
CREATE TABLE Events (
  event_id VARCHAR(100) NOT NULL PRIMARY KEY,
  user_id INT NOT NULL,
  event_title VARCHAR(255),
  `description` TEXT,
  Foreign Key (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Tasks(
  task_id INT PRIMARY KEY,
  user_id VARCHAR(20) NOT NULL,
  task_title VARCHAR(255),
  `description` TEXT,
  due_date DATE,
  priority INT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);