import {User} from '../../core/models/user';

export namespace LocalStorage {
  export const user = (): User => JSON.parse(atob(localStorage.getItem(btoa('user'))));

  export const setUser = (data: User): void => localStorage.setItem(btoa('user'), btoa(JSON.stringify(data)));

  export const jwt = (): string => localStorage.getItem('token');

  export const setJwt = (token: string): void => localStorage.setItem('token', token);

  export const reset = (): void => localStorage.clear();

  export const setCountry = (name: string) => localStorage.setItem('country', name);

  export const country = () => localStorage.getItem('country') || 'br';
}
