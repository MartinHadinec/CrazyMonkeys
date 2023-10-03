-- Active: 1695396250235@@localhost@3306@formular

CREATE DATABASE formular DEFAULT CHARSET "utf8mb4";

CREATE TABLE
    dotaznik_formular(
        ID INT NOT NULL AUTO_INCREMENT,
        jmeno VARCHAR (255) NOT NULL,
        prijmeni VARCHAR (255) NOT NULL,
        telefonni_cislo INT NOT NULL,
        zprava VARCHAR (255) NOT NULL,
        PRIMARY KEY (ID)
    );

DESC dotaznik_formular 

DELETE FROM dotaznik_formular;

ALTER TABLE dotaznik_formular ADD datum_odeslani DATETIME;