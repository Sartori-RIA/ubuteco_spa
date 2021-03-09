import {createAction, props} from '@ngrx/store';
import {User} from '../../core/models/user';
import {Role} from '../../core/models/role';

export const REQUEST_ALL_EMPLOYEES = createAction('[EMPLOYEES/API] find all',
  props<{ page: string, force?: boolean, organization_id: number }>());

export const REQUEST_ALL_EMPLOYEES_FAILED = createAction('[EMPLOYEES/API] find all fail');

export const REQUEST_ALL_EMPLOYEES_DONE = createAction('[EMPLOYEES/API] find all done',
  props<{ data: User[], total: number }>()
);

export const ADD_EMPLOYEE = createAction('[EMPLOYEES/API] create', props<{ data: User }>());

export const ADD_EMPLOYEE_DONE = createAction('[EMPLOYEES/API] create done', props<{ data: User }>());

export const ADD_EMPLOYEE_FAILED = createAction('[EMPLOYEES/API] create failed');

export const UPDATE_EMPLOYEE = createAction('[EMPLOYEES/API] update', props<{ data: User }>());

export const UPDATE_EMPLOYEE_DONE = createAction('[EMPLOYEES/API] update done', props<{ data: User }>());

export const UPDATE_EMPLOYEE_FAILED = createAction('[EMPLOYEES/API] update failed');

export const DELETE_EMPLOYEE = createAction('[EMPLOYEES/API] delete', props<{ id: number }>());

export const DELETE_EMPLOYEE_DONE = createAction('[EMPLOYEES/API] delete done', props<{ id: number }>());

export const DELETE_EMPLOYEE_FAILED = createAction('[EMPLOYEES/API] delete failed');

export const EMPLOYEES_ALREADY_LOADED = createAction(
  '[EMPLOYEES/API] already loaded'
);

export const REQUEST_ROLES = createAction('[ROLES/API] request roles');

export const REQUEST_ROLES_ALREADY_LOADED = createAction('[ROLES/API] request roles already loaded');

export const REQUEST_ROLES_DONE = createAction('[ROLES/API] request roles done', props<{ data: Role[] }>());

export const REQUEST_ROLES_FAIL = createAction('[ROLES/API] request roles fail');
