import {MakerState} from '../../store/makers/makers.reducer';
import {makersDictionary} from '../dictionaries/makers.dictionary';

export const makersInitialState: MakerState = {
  ids: [1],
  entities: makersDictionary,
  loaded: true,
  loading: false,
  total: 1
};
