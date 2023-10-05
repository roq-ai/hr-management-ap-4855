import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ApplicantInterface {
  id?: string;
  resume: string;
  application_date: any;
  status: string;
  position_applied?: string;
  interview_date?: any;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ApplicantGetQueryInterface extends GetQueryInterface {
  id?: string;
  resume?: string;
  status?: string;
  position_applied?: string;
  user_id?: string;
}
