DROP DATABASE IF EXISTS GurrilaMMA_db;

CREATE DATABASE GurrilaMMA_db;

USE GurillaMMA_db;

CREATE TABLE GurillaMMA_db(
    id AUTO_INCREMENT NOT NULL,
    department VARCHAR(20) NOT NULL,
    role VARCHAR(20) NULL,
    NAME VARCHAR(30) NULL,
);

INSERT INTO GurillaMMA_db(department, role, NAME)
VALUES ("BJJ", "Coach", "John");
