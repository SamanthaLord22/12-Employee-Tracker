USE employee_tracker;

select * from departments;
select * from roles;
select * from employee_data;

select d.department_name,r.job_title,r.job_salary,
CONCAT(e.first_name,' ',e.last_name) AS 'Employee Name',CONCAT(m.first_name,' ',m.last_name) AS 'Manager Name'
from employee_data e 
left join roles r on e.role_id = r.id
left join departments d on d.id = r.department_id
left join employee_data m on e.manager_id = m.id;

 select * from employee_data where manager_id IS NULL;