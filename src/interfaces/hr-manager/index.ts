import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface HrManagerInterface {
  id?: string;
  department_managed: string;
  employees_managed: number;
  hire_date: any;
  termination_date?: any;
  salary?: number;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface HrManagerGetQueryInterface extends GetQueryInterface {
  id?: string;
  department_managed?: string;
  user_id?: string;
}
