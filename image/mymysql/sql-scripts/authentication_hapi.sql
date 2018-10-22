CREATE DATABASE police;
USE police;
CREATE TABLE users (
    id int(11) NOT NULL AUTO_INCREMENT, 
    username varchar(180) NOT NULL, 
    nom varchar(180)  NOT NULL, 
    pnom varchar(180)  NOT NULL, 
    role varchar(180)  NOT NULL, 
    password CHAR(128)  NOT NULL,
    actif boolean NOT NULL,
    PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
ALTER TABLE users add unique (username);
INSERT INTO users (id, username, nom, pnom, role, password, actif ) VALUES (1, 'testUser', 'testNom','testPnom', 'testRole',sha2('testmdp',512), true);
