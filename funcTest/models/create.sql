-- Active: 1715096709552@@127.0.0.1@3306@funcTest
CREATE DATABASE funcTest;

--로그인 작업을 위한 유저 테이블
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT,
    email VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255),
    isLoggedIn BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (user_id)
);

--이벤트 테이블 : D-day 혹은 일정을 저장하는 데이터베이스
CREATE TABLE Events (
  event_id INT NOT NULL PRIMARY KEY,
  user_id INT NOT NULL,
  event_title VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  auto_clear BOOLEAN NOT NULL,
  isclear BOOLEAN NOT NULL,
  `description` TEXT,
  tags VARCHAR(50),
  Foreign Key (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Tasks(
  task_id INT NOT NULL PRIMARY KEY,
  user_id INT NOT NULL,
  task_title VARCHAR(255),
  `description` TEXT,
  auto_clear BOOLEAN NOT NULL,
  isclear BOOLEAN NOT NULL,
  start_date DATETIME NOT NULL,
  due_date DATETIME NOT NULL,
  tags VARCHAR(50),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);