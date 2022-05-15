USE employee_tracker;
INSERT INTO departments (department_name)
VALUES ("IT"),
        ("Production"),
        ("Design"),
        ("Sales");

INSERT INTO roles ( job_title, job_salary,department_id)
VALUES ("IT Manager", 80000,1), 
        ("FrontEnd developer", 60000, 1), 
        ("BackEnd Engineer", 80000, 1),
       ("BackEnd developer", 60000, 1), 
       ("Producer Executive", 80000, 2),
       ("Design Executive", 80000, 3), 
       ("Sale Executive", 80000, 4);

INSERT INTO employee_data
 (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe",5, NULL), 
        ("Samantha","Lord",1,NULL) ,
        ("Jane", "Park", 6,NULL), 
        ("Jim", "Peters", 7, NULL),
       ("Ellen", "James", 4, 2),
       ("Adele", "Jones", 2, 2),
       ("Steve", "Adams", 3, 2);
