import {EmployeeState} from '../../store/employees/employees.reducer';
import {employeesDictionary} from '../dictionaries/employees.dictionary';
import {roles} from '../factories/roles.factory';

export const employeesInitialState: EmployeeState = {
  roles,
  entities: employeesDictionary,
  ids: [],
  loaded: true,
  loading: false,
  total: 0
};
