import {Dictionary} from '@ngrx/entity';
import {Maker} from "../../core/models/maker";
import {Role} from "../../core/models/role";

export const rolesDictionary: Dictionary<Role> = {
  1: {
    id: 1,
    name: 'SUPER_ADMIN'
  },
  2: {
    id: 2,
    name: 'ADMIN'
  },
  3: {
    id: 3,
    name: 'KITCHEN'
  },
  4: {
    id: 4,
    name: 'CUSTOMER'
  },
  5: {
    id: 5,
    name: 'WAITER'
  },
  6: {
    id: 6,
    name: 'CASH_REGISTER'
  }
};
