import * as yup from 'yup';

export const employeeValidationSchema = yup.object().shape({
  job_title: yup.string().required(),
  salary: yup.number().integer().required(),
  hire_date: yup.date().required(),
  termination_date: yup.date().nullable(),
  department: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
