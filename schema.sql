DROP DATABASE IF EXISTS burgers;
CREATE DATABASE burgers;
USE burgers;

CREATE TABLE burgers (
	id Int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR( 255 ) NOT NULL,
	devoured VARCHAR( 255 ) NOT NULL
);
 
INSERT INTO burgers (name, devoured)
VALUES ('testBurger', false);