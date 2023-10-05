import * as yup from 'yup';

export const hrManagerValidationSchema = yup.object().shape({
  department_managed: yup.string().required(),
  employees_managed: yup.number().integer().required(),
  hire_date: yup.date().required(),
  termination_date: yup.date().nullable(),
  salary: yup.number().integer().nullable(),
  user_id: yup.string().nullable().required(),
});
