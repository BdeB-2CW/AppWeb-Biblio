DROP TABLE IF EXISTS Livres, Droits, Utilisateurs, Emprunts, Reservations;

CREATE TABLE Livres (
    Id               INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    Auteur	         VARCHAR(50) NOT NULL,
    Titre            VARCHAR(50) NOT NULL,
    DateParution     INT NOT NULL,
    NbCopies         INT NOT NULL,
    NbDisponible     INT NOT NULL,
    MaisonEdition    VARCHAR(50) NOT NULL,
    ISBN             VARCHAR(15) NOT NULL,
    Cout             FLOAT NOT NULL,
    Description      TEXT NOT NULL,
    Photo            TEXT
);

CREATE TABLE Droits(
    Id              INT PRIMARY KEY NOT NULL,
    Description     VARCHAR(25) NOT NULL
);

CREATE TABLE Utilisateurs (
    Id         INT PRIMARY KEY NOT NULL  AUTO_INCREMENT,
    Nom        VARCHAR(25) NOT NULL,
    Prenom     VARCHAR(25) NOT NULL,
    Telephone  VARCHAR(20) NOT NULL,
    Email      VARCHAR(50) NOT NULL,
    Password   VARCHAR(25) NOT NULL,
    Photo      VARCHAR(150),
    MaxPret    INT,
    NbPret     INT,
    Droit_id   INT,
    FOREIGN KEY (Droit_id) REFERENCES Droits(Id)
);


CREATE TABLE Emprunts(
    Id                  INT PRIMARY KEY NOT NULL  AUTO_INCREMENT,     
    DatePret            DATE,
    DateRetourPrevu     DATE,
    DateRetour          DATE,
    Livre_id            INT,
    Utilisateur_id      INT,
    FOREIGN KEY (Livre_id) REFERENCES Livres(Id),
    FOREIGN KEY (Utilisateur_id) REFERENCES Utilisateurs(Id)
);

CREATE TABLE Reservations(
    Id                  INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    DateReservation     DATE,
    DateAnnulation      DATE,
    Livre_id            INT,
    Utilisateur_id      INT,
    FOREIGN KEY (Livre_id) REFERENCES Livres(Id),
    FOREIGN KEY (Utilisateur_id) REFERENCES Utilisateurs(Id)
);
ALTER TABLE Livres AUTO_INCREMENT=1;
insert into Livres (ID, Titre, Auteur, DateParution, NbCopies, NbDisponible, MaisonEdition, ISBN, Cout, Description, Photo) VALUES (ID, 'La peste', 'Albert Camus', 2007, 5, 5, 'folio', 'ACLP002', 11.99, ' L\'intrigue du roman présente l\'histoire d\'une épidémie de peste qui sévit sur la ville d\'Oran dans les années 1940. Des rats viennent mourir au grand jour ; ils portent le bacille de la peste.', '\\Images\\Livres\\AlbertCamus\\laPeste.jpg') ; 
insert into Livres (ID, Titre, Auteur, DateParution, NbCopies, NbDisponible, MaisonEdition, ISBN, Cout, Description, Photo) VALUES (ID, 'La chute', 'Albert Camus', 1998, 4, 4, 'folio', 'ACLC003', 8.99, ' Sur le pont, je passai derrière une forme penchée sur le parapet, et qui semblait regarder le fleuve. De plus près, je distinguai une mince jeune femme, habillée de noir.', '\\Images\\Livres\\AlbertCamus\\laChute.jpg');
insert into Livres (ID, Titre, Auteur, DateParution, NbCopies, NbDisponible, MaisonEdition, ISBN, Cout, Description, Photo) VALUES (ID, 'Les justes', 'Albert Camus', 2002, 4, 4, 'folio', 'ACLJ004', 9.99, ' Ne pleurez pas. Non, non, ne pleurez pas ! Vous voyez bien que c\'est le jour de la justification. Quelque chose s\'élève à cette heure qui est notre témoignage à nous autres révoltés : Yanek n\'est plus un meurtrier.', '\\Images\\Livres\\AlbertCamus\\lesJustes.jpg');
insert into Livres (ID, Titre, Auteur, DateParution, NbCopies, NbDisponible, MaisonEdition, ISBN, Cout, Description, Photo) VALUES (ID, 'L\'étranger', 'Albert Camus', 2001, 3, 3, 'folio', 'ACLE001', 12.99, ' Récit intérieur de Meursault, employé de bureau anonyme pour les autres et pour lui-même, qui tue finalement de cinq balles un Algérien sur la plage de Tipaza à Alger.', '\\Images\\Livres\\AlbertCamus\\lEtanger.jpg'); 

insert into Livres (ID, Titre, Auteur, DateParution, NbCopies, NbDisponible, MaisonEdition, ISBN, Cout, Description, Photo) VALUES (ID, 'Le chien', 'Eric-Emmanuel Schmitt', 2001, 5, 4, 'Albin Michel', 'ESLC001', 5.99, ' Samuel Heymann, un médecin du Hainaut, se suicide quelques jours après la mort de son chien.', '\\Images\\Livres\\EricEmannuelShmitt\\leChien.jpg'); 
insert into Livres (ID, Titre, Auteur, DateParution, NbCopies, NbDisponible, MaisonEdition, ISBN, Cout, Description, Photo) VALUES (ID, 'Les deux messieurs de Bruxelles', 'Eric-Emmanuel Schmitt', 2015, 4, 4, 'Livre de Poche', 'ACLE001', 12.99, ' Cinq nouvelles sur le mystère des sentiments inavoués.', '\\Images\\Livres\\EricEmannuelShmitt\\deuxMessieursdeBruxelles.jpg');
insert into Livres (ID, Titre, Auteur, DateParution, NbCopies, NbDisponible, MaisonEdition, ISBN, Cout, Description, Photo) VALUES (ID, 'Monsieur Ibrahim et les fleurs du coran', 'Eric-Emmanuel Schmitt', 2016, 4, 3,'Livre de Poche', 'ESMF003', 15.99, ' Paris dans les années 60. Moïse, dit Momo, est un garçon de 12 ans qui s\'ennuie. Quand son père, un avocat juif neurasthénique, se suicide, il est adopté par Monsieur Ibrahim, épicier arabe, musulman, plus exactement soufi.', '\\Images\\Livres\\EricEmannuelShmitt\\fleursDuCoran.jpg');
insert into Livres (ID, Titre, Auteur, DateParution, NbCopies, NbDisponible, MaisonEdition, ISBN, Cout, Description, Photo) VALUES (ID, 'Oscar et la dame rose', 'Eric-Emmanuel Schmitt', 2008, 3, 3,'Livre de Poche', 'ESOD004', 17.99, ' Sur le conseil de Mamie Rose, une visiteuse, le jeune Oscar, âgé de 10 ans et condamné par un cancer, écrit à Dieu depuis son lit d\'hôpital afin de lui confier le récit de sa vie.', '\\Images\\Livres\\EricEmannuelShmitt\\oscarDameRose.jpg');

insert into Livres (ID, Titre, Auteur, DateParution, NbCopies, NbDisponible, MaisonEdition, ISBN, Cout, Description, Photo) VALUES (ID, 'La métamorphose', 'Franz Kafka', 1985, 5, 4, 'folio classique', 'FKLM001', 7.99, ' Un homme, transformé en coléoptère monstrueux, se trouve confronté à sa famille dont l\'ambition est de l\'éliminer.', '\\Images\\Livres\\FranzKafka\\laMetamorphose.jpg'); 
insert into Livres (ID, Titre, Auteur, DateParution, NbCopies, NbDisponible, MaisonEdition, ISBN, Cout, Description, Photo) VALUES (ID, 'Les dessins', 'Franz Kafka', 1986, 4, 3, 'Les Cahiers Dessines', 'FKLD002', 13.99, ' Entre 1901 et 1907, Kafka dessine intensément, saisissant sur le vif des êtres fragiles et instables.', '\\Images\\Livres\\FranzKafka\\lesDessins.jpg'); 
insert into Livres (ID, Titre, Auteur, DateParution, NbCopies, NbDisponible, MaisonEdition, ISBN, Cout, Description, Photo) VALUES (ID, 'Le procès', 'Franz Kafka', 1988, 4, 2, 'folio classique', ' FKLP003', 16.99, ' On raconte que c\'est grâce aux éditions clandestines du samizdat - et donc, sans nom d\'auteur - que fut introduite en Union soviétique la traduction du Procès. ', '\\Images\\Livres\\FranzKafka\\leProces.jpg'); 
insert into Livres (ID, Titre, Auteur, DateParution, NbCopies, NbDisponible, MaisonEdition, ISBN, Cout, Description, Photo) VALUES (ID, 'Le château', 'Franz Kafka', 1982, 3, 2, 'points',' FKLC004', 18.99, ' Le récit suit les aventures de K., qui se bat pour entrer en contact avec les autorités du village où il vient d\'arriver, afin d\'officialiser son statut d\'arpenteur.', '\\Images\\Livres\\FranzKafka\\leChateau.jpg'); 

insert into Livres (ID, Titre, Auteur, DateParution, NbCopies, NbDisponible, MaisonEdition, ISBN, Cout, Description, Photo) VALUES (ID, 'Demian', 'Herman Hesse', 1989, 5, 4, 'Livre de Poche', 'HHDE001', 15.99, ' Demian est le roman d\'une adolescence, roman d\'initiation, de formation, et l\'un des chefs-d\'oeuvre du genre', '\\Images\\Livres\\HermanHesse\\Demian.jpg'); 
insert into Livres (ID, Titre, Auteur, DateParution, NbCopies, NbDisponible, MaisonEdition, ISBN, Cout, Description, Photo) VALUES (ID, 'L\'ornière', 'Herman Hesse', 1995, 4, 3, 'Livre de Poche', 'HHDE001', 5.99, 'L\'histoire d\'un adolescent aux dons et à l\'intelligence exceptionnels mais que le protestantisme et des méthodes d\'enseignement impitoyables et orgueilleuses vont broyer sans remords.', '\\Images\\Livres\\HermanHesse\\Lorniere.jpeg');
insert into Livres (ID, Titre, Auteur, DateParution, NbCopies, NbDisponible, MaisonEdition, ISBN, Cout, Description, Photo) VALUES (ID, 'Le loup des steppes', 'Herman Hesse', 1997, 4, 3, 'Livre de Poche', 'HHLS003', 17.99, 'Expérience spirituelle, récit initiatique, délire de psychopathe, Le Loup des steppes multiplie les registres.', '\\Images\\Livres\\HermanHesse\\loupSteppes.jpg'); 
insert into Livres (ID, Titre, Auteur, DateParution, NbCopies, NbDisponible, MaisonEdition, ISBN, Cout, Description, Photo) VALUES (ID, 'Berthold', 'Herman Hesse', 2000, 3, 3, 'Livre de Poche', 'HHBE004', 13.99, ' Six nouvelles écrites entre 1908 et 1922 qui décrivent l\'itinéraire de cinq hommes - un séminariste. ', '\\Images\\Livres\\HermanHesse\\berthold.jpg'); 

insert into Livres (ID, Titre, Auteur, DateParution, NbCopies, NbDisponible, MaisonEdition, ISBN, Cout, Description, Photo) VALUES (ID, 'L\'Alchimiste', 'Paolo Coelho', 2018, 5, 5, 'J\'ai lu', 'PCAL001', 19.99, 'Le récit de la quête de Santiago et qui appprend à lire les signes du destin et à aller au bout de son rêve.', '\\Images\\Livres\\PaoloCoelho\\lalchimiste.jpg'); 
insert into Livres (ID, Titre, Auteur, DateParution, NbCopies, NbDisponible, MaisonEdition, ISBN, Cout, Description, Photo) VALUES (ID, 'Brida', 'Paolo Coelho', 2015, 4, 4, 'A Novel', 'PCBR002', 17.99, 'Brida est une jeune Irlandaise aux pouvoirs surnaturels qui se lance dans une quête effrénée de sagesse et de magie.', '\\Images\\Livres\\PaoloCoelho\\brida.jpg');
insert into Livres (ID, Titre, Auteur, DateParution, NbCopies, NbDisponible, MaisonEdition, ISBN, Cout, Description, Photo) VALUES (ID, 'La voie de l\'archer', 'Paolo Coelho', 2016, 4, 4, 'Flammarion', 'PCLV003', 21.99, 'Un jeune archer à l\'agilité prodigieuse se rend auprès du maître Tetsuya pour le défier. Ce dernier confie à un jeune garçon les principes fondamentaux de la voie de l\'archer.', '\\Images\\Livres\\PaoloCoelho\\laVoieDeLarcher.jpg');
insert into Livres (ID, Titre, Auteur, DateParution, NbCopies, NbDisponible, MaisonEdition, ISBN, Cout, Description, Photo) VALUES (ID, 'Le Zahir', 'Paolo Coelho', 2016, 3, 0, 'Flammarion', 'PCLZ004', 25.99, 'Un écrivain célèbre raconte la disparition de sa femme, Esther, correspondante de guerre.', '\\Images\\Livres\\PaoloCoelho\\leZahir.jpg'); 

insert into Utilisateurs (ID, Nom, Prenom ,Telephone, Email, Password, MaxPret, NbPret, Droit_id, Photo) VALUES (ID, 'Michelle', 'Horton', '514-299-4742','MichelleHorton@gmail.com', 'abc123', 5, 0, 0, '\\Images\\Profil\\1.png'); 
insert into Utilisateurs (ID, Nom, Prenom ,Telephone, Email, Password, MaxPret, NbPret, Droit_id, Photo) VALUES (ID, 'Maria', 'Duke', '416-243-8749','MariaDuke@gmail.com', 'abc123', 5, 0, 0, '\\Images\\Profil\\2.png'); 
insert into Utilisateurs (ID, Nom, Prenom ,Telephone, Email, Password, MaxPret, NbPret, Droit_id, Photo) VALUES (ID, 'David', 'Day', '416-931-9935','DavidDay@gmail.com', 'abc123', 5, 1, 0, '\\Images\\Profil\\3.png'); 
insert into Utilisateurs (ID, Nom, Prenom ,Telephone, Email, Password, MaxPret, NbPret, Droit_id, Photo) VALUES (ID, 'Augustine', 'Chambers', '905-480-3579','AugustineChambers@gmail.com', 'abc123', 5, 1, 0, '\\Images\\Profil\\4.png'); 
insert into Utilisateurs (ID, Nom, Prenom ,Telephone, Email, Password, MaxPret, NbPret, Droit_id, Photo) VALUES (ID, 'Michael', 'Alexander', '780-999-9518','MichaelAlexander@gmail.com', 'abc123', 5, 1, 0, '\\Images\\Profil\\5.png'); 
insert into Utilisateurs (ID, Nom, Prenom ,Telephone, Email, Password, MaxPret, NbPret, Droit_id, Photo) VALUES (ID, 'Charles ', 'Thomas', '604-452-5679','CharlesThomas@gmail.com', 'abc123', 5, 3, 0, '\\Images\\Profil\\6.png'); 
insert into Utilisateurs (ID, Nom, Prenom ,Telephone, Email, Password, MaxPret, NbPret, Droit_id, Photo) VALUES (ID, 'Wajd', 'Horton', '514-299-4742','MichelleHorton@gmail.com', 'abc123', 5, 1, 0, '\\Images\\Profil\\7.png'); 
insert into Utilisateurs (ID, Nom, Prenom ,Telephone, Email, Password, MaxPret, NbPret, Droit_id, Photo) VALUES (ID, 'Raniya', 'Samaha', '604-928-7185','RaniyaSamaha@gmail.com', 'abc123', 5, 5, 0, '\\Images\\Profil\\8.png'); 
insert into Utilisateurs (ID, Nom, Prenom ,Telephone, Email, Password, MaxPret, NbPret, Droit_id, Photo) VALUES (ID, 'Abdul', 'Naifeh', '705-698-2151','AbdulNaifeh@gmail.com', 'abc123', 5, 1, 0, '\\Images\\Profil\\9.png'); 

insert into Droits (ID, Description) VALUES (99, 'ADMIN');
insert into Droits (ID, Description) VALUES (0, 'Utilisateur');

insert into Emprunts(ID, DatePret, DateRetourPrevu, DateRetour, Livre_id, Utilisateur_id) VALUES (ID, '2022-01-31', '2022-02-14', '2022-02-14', 1, 1);
insert into Emprunts(ID, DatePret, DateRetourPrevu, DateRetour, Livre_id, Utilisateur_id) VALUES (ID, '2022-01-31', '2022-02-14', '2022-02-10', 1, 2);
insert into Emprunts(ID, DatePret, DateRetourPrevu, DateRetour, Livre_id, Utilisateur_id) VALUES (ID, '2022-01-24', '2022-02-07', '2022-02-17', 2, 2);
insert into Emprunts(ID, DatePret, DateRetourPrevu, DateRetour, Livre_id, Utilisateur_id) VALUES (ID, '2022-02-15', '2022-03-01', null, 5, 3);
insert into Emprunts(ID, DatePret, DateRetourPrevu, DateRetour, Livre_id, Utilisateur_id) VALUES (ID, '2022-01-24', '2022-02-07', null, 8, 4);
insert into Emprunts(ID, DatePret, DateRetourPrevu, DateRetour, Livre_id, Utilisateur_id) VALUES (ID, '2022-02-15', '2022-03-01', null, 9, 6);
insert into Emprunts(ID, DatePret, DateRetourPrevu, DateRetour, Livre_id, Utilisateur_id) VALUES (ID, '2022-02-15', '2022-03-01', null, 10, 6);
insert into Emprunts(ID, DatePret, DateRetourPrevu, DateRetour, Livre_id, Utilisateur_id) VALUES (ID, '2022-02-15', '2022-03-01', null, 11, 6);
insert into Emprunts(ID, DatePret, DateRetourPrevu, DateRetour, Livre_id, Utilisateur_id) VALUES (ID, '2022-02-15', '2022-03-01', null, 11, 8);
insert into Emprunts(ID, DatePret, DateRetourPrevu, DateRetour, Livre_id, Utilisateur_id) VALUES (ID, '2022-02-15', '2022-03-01', null, 12, 8);
insert into Emprunts(ID, DatePret, DateRetourPrevu, DateRetour, Livre_id, Utilisateur_id) VALUES (ID, '2022-02-15', '2022-03-01', null, 13, 8);
insert into Emprunts(ID, DatePret, DateRetourPrevu, DateRetour, Livre_id, Utilisateur_id) VALUES (ID, '2022-02-15', '2022-03-01', null, 14, 8);
insert into Emprunts(ID, DatePret, DateRetourPrevu, DateRetour, Livre_id, Utilisateur_id) VALUES (ID, '2022-02-15', '2022-03-01', null, 15, 8);
insert into Emprunts(ID, DatePret, DateRetourPrevu, DateRetour, Livre_id, Utilisateur_id) VALUES (ID, '2022-02-15', '2022-03-01', null, 20, 5);
insert into Emprunts(ID, DatePret, DateRetourPrevu, DateRetour, Livre_id, Utilisateur_id) VALUES (ID, '2022-02-15', '2022-03-01', null, 20, 7);
insert into Emprunts(ID, DatePret, DateRetourPrevu, DateRetour, Livre_id, Utilisateur_id) VALUES (ID, '2022-02-15', '2022-03-01', null, 20, 9);
