interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: ['Customer'],
  tenantRoles: ['Owner', 'HR Manager', 'Employee', 'Administrator', 'Applicant'],
  tenantName: 'Company',
  applicationName: 'HR Management Application',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Manage your customer information',
    'View your purchase history',
    'View your total spent',
    'View your last purchase date',
  ],
  ownerAbilities: [
    'Manage user information',
    'Manage company data',
    'Manage employee details',
    'Manage applicant records',
    'Manage HR manager information',
    'Manage customer data',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/50ebb478-1d27-4f7f-8289-c17079ead7ca',
};
