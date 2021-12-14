-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2021-12-06 22:36:16.812

-- tables
-- Table: Department
CREATE TABLE Department (
    Dept_id int NOT NULL AUTO_INCREMENT,
    Name varchar(50) NOT NULL,
    NumOfWorkers int NOT NULL,
    DateOfStart date NOT NULL,
    CONSTRAINT Department_pk PRIMARY KEY (Dept_id)
);

-- Table: Employee
CREATE TABLE Employee (
    Employee_id int NOT NULL AUTO_INCREMENT,
    Name varchar(50) NOT NULL,
    LastName varchar(50) NOT NULL,
    Email varchar(100) NOT NULL,
    CONSTRAINT Employee_pk PRIMARY KEY (Employee_id)
);

-- Table: Employment
CREATE TABLE Employment (
    Employment_id int NOT NULL AUTO_INCREMENT,
    Employee_id int NULL,
    Dept_id int NULL,
    DataOd date NOT NULL,
    PhoneNumber int NOT NULL,
    CONSTRAINT Employment_pk PRIMARY KEY (Employment_id)
    FOREIGN KEY(Employee_id)
        REFERENCES Employee(Employee_id)
        ON DELETE CASCADE
    FOREIGN KEY(Dept_id)
        REFERENCES Department(Dept_id)
        ON DELETE CASCADE
);

-- foreign keys
-- Reference: Employment_Department (table: Employment)
ALTER TABLE Employment ADD CONSTRAINT Employment_Department FOREIGN KEY Employment_Department (Dept_id)
    REFERENCES Department (Dept_id);

-- Reference: Employment_Employee (table: Employment)
ALTER TABLE Employment ADD CONSTRAINT Employment_Employee FOREIGN KEY Employment_Employee (Employee_id)
    REFERENCES Employee (Employee_id);

-- End of file.

INSERT into Employee(Name,LastName,Email) VALUES
('Maria', 'Tanchyn', 'mariatanshyn@gmail.com'),
('Max', 'Dubakow', 'maxdubakow@gmail.com'),
('Poliana', 'Kryaczenko', 'poliaaaaaa@gmail.com');

INSERT into Department(Name,NumOfWorkers,DateOfStart) VALUES
('Liryk',3,'2020-02-01'),
('Dramat',3,'2010-01-11'),
('Epos',3,'2020-12-31');

INSERT into Employment (Employee_id,Dept_id,DataOd,PhoneNumber) VALUES
(1,1,'2021-02-01',243567890),
(2,2,'2021-02-02',567878237),
(3,3,'2021-02-22',256734728);
