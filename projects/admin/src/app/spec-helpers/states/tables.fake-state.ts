import {TableState} from '../../store/tables/table.reducer';
import {tablesDictionary} from '../dictionaries/tables.dictionary';

export const tablesInitialState: TableState = {
  ids: [],
  entities: tablesDictionary,
  loaded: true,
  loading: false,
  total: 0
};
