--creation de la base de données
CREATE DATABASE tpgestion;

--afficher les bases de données
SHOW DATABASES;

--création de la table offres mobiles
CREATE TABLE offre_mobile (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    prix DECIMAL(10, 2) NOT NULL,
    data_incluse INT NOT NULL,
    appels_sms_inclus TEXT
);

--insertion de données dans la table offres mobiles
INSERT INTO offre_mobile (nom, prix, data_incluse, appels_sms_inclus)
VALUES 
('Offre Za hayiri', 9.99, 100,"Appel et SMS ilimité en France métropolitaine, Mayotte et Reunion");

INSERT INTO offre_mobile (nom, prix, data_incluse, appels_sms_inclus)
VALUES
('Offre Baraka', 29.99, 150, "Appel et SMS illimité en France métropolitaine, Mayotte et Reunion");

INSERT INTO offre_mobile (nom, prix, data_incluse, appels_sms_inclus)
VALUES
('Offre C', 39.99, 200, "Appel et SMS illimité en France métropolitaine, Mayotte et Reunion");
INSERT INTO offre_mobile (nom, prix, data_incluse, appels_sms_inclus)
VALUES
('Offre D', 49.99, 300, "Appel et SMS illimité en France métropolitaine, Mayotte et Reunion");

--création de la table telephone
CREATE TABLE telephone (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    marque VARCHAR(255) NOT NULL,
    modele VARCHAR(255) NOT NULL,
    prix DECIMAL(10, 2) NOT NULL,
    memoire INT NOT NULL,
    ram INT NOT NULL
);

--insertion de données dans la table telephone
INSERT INTO telephone (marque, modele, prix, memoire, ram)
VALUES 
('Samsung', 'Galaxy S21', 799.99, 128, 8);

INSERT INTO telephone (marque, modele, prix, memoire, ram)
VALUES
('Apple', 'iPhone 12', 809.99, 64, 4);

INSERT INTO telephone (marque, modele, prix, memoire, ram)
VALUES
('Xiaomi', 'Mi 11', 699.99, 256, 12);

INSERT INTO telephone (marque, modele, prix, memoire, ram)
VALUES
('iPhone', '16 Pro', 1199.99, 128, 8);

INSERT INTO telephone (marque, modele, prix, memoire, ram)
VALUES
('iPhone', '17 Pro ', 1499.99, 256, 12);

--création de la table clients
CREATE TABLE client (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    numero_identite VARCHAR(20) NOT NULL UNIQUE,
    date_naissance DATE NOT NULL,
    adress_postale VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

--insertion de données dans la table clients
INSERT INTO client (nom, prenom, numero_identite, date_naissance, adress_postale, email)
VALUES
('Doe', 'John', '123456789', '1990-01-01', '123 Main St, Anytown, USA', 'john.doe@example.com');



--création de la table panier
CREATE TABLE panier (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    telephone_id INT NULL,
    offre_mobile_id INT NULL,
    client_id INT NULL,
    nom VARCHAR(255),
    marque VARCHAR(255),
    modele VARCHAR(255),
    data_incluse INT,
    appels_sms_inclus TEXT,
    prix DECIMAL(10, 2) NOT NULL,
    date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (telephone_id) REFERENCES telephone(id),
    FOREIGN KEY (offre_mobile_id) REFERENCES offre_mobile(id),
    FOREIGN KEY (client_id) REFERENCES client(id)
);

--insertion de données dans la table panier
INSERT INTO panier (client_id, telephone_id, offre_mobile_id) VALUES (1, 1, 1);

