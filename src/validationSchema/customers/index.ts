import * as yup from 'yup';

export const customerValidationSchema = yup.object().shape({
  purchase_history: yup.string().required(),
  total_spent: yup.number().integer().required(),
  last_purchase_date: yup.date().required(),
  favorite_product: yup.string().nullable(),
  membership_level: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
