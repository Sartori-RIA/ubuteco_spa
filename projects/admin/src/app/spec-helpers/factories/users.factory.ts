import {User} from '../../core/models/user';
import {roles} from './roles.factory';
import {organization} from './organizations.factory';

export const superAdmin: User = {
  id: 1,
  name: 'user_admin',
  email: 'super_admin@email.com',
  role_id: 1,
  role: roles[0]
};

export const admin: User = {
  id: 2,
  name: 'admin',
  email: 'admin@email.com',
  role_id: 2,
  role: roles[1],
  organization,
  organization_id: organization.id
};

export const kitchen: User = {
  id: 3,
  name: 'kitchen',
  email: 'kitchen@email.com',
  role_id: 3,
  role: roles[2],
  organization,
  organization_id: organization.id
};

export const customer: User = {
  id: 4,
  name: 'customer',
  email: 'customer@email.com',
  role_id: 4,
  role: roles[3],
};

export const waiter: User = {
  id: 5,
  name: 'waiter',
  email: 'waiter@email.com',
  role_id: 5,
  role: roles[4],
  organization,
  organization_id: organization.id
};

export const cashRegister: User = {
  id: 6,
  name: 'cash_register',
  email: 'cash_register@email.com',
  role_id: 6,
  role: roles[5],
  organization,
  organization_id: organization.id
};
