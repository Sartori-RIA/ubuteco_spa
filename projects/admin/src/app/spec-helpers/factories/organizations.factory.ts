import {Organization} from '../../core/models/organization';
import {cnpj} from 'cpf-cnpj-validator';
import {theme} from './themes.factory';

export const organization: Organization = {
  id: 1,
  cnpj: cnpj.generate(),
  phone: '',
  theme,
  name: 'fake company',
  theme_id: theme.id,
};
