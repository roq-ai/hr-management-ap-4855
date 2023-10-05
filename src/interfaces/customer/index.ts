import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CustomerInterface {
  id?: string;
  purchase_history: string;
  total_spent: number;
  last_purchase_date: any;
  favorite_product?: string;
  membership_level?: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface CustomerGetQueryInterface extends GetQueryInterface {
  id?: string;
  purchase_history?: string;
  favorite_product?: string;
  membership_level?: string;
  user_id?: string;
}
