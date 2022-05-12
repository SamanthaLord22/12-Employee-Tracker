INSERT INTO departments (department_name)
VALUES (FrontEnd),
        (BackEnd),
        (Design),
        (Sales);

INSERT INTO roles (department_name, job_title, job_salary)
VALUES (FrontEnd, MidLevelF, 80k),
        (FrontEnd, JuniorF, 60k),
        (BackEnd, MidLevelB, 80k),
       (BackEnd, JuniorB, 60k),
       (Design, MidLevelD, 80k),
       (Sales, MidLevelS, 80k)

INSERT INTO employee_data (first_name, last_name, job_title, department_name)
VALUES (John, Doe, MidLevelF, FrontEnd),
        (Jane, Park, JuniorF, FrontEnd),
        (Jim, Peters, MidLevelB, BackEnd),
       (Ellen, James, JuniorB, BackEnd),
       (Adele, Jones, MidLevelD, Design),
       (Steve, Adams, MidLevelS, Sales)