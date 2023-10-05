import * as yup from 'yup';

export const applicantValidationSchema = yup.object().shape({
  resume: yup.string().required(),
  application_date: yup.date().required(),
  status: yup.string().required(),
  position_applied: yup.string().nullable(),
  interview_date: yup.date().nullable(),
  user_id: yup.string().nullable().required(),
});
