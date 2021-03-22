import {Dictionary} from '@ngrx/entity';
import {Maker} from '../../core/models/maker';

export const makersDictionary: Dictionary<Maker> = {
  1: {
    id: 1,
    name: 'ambev',
    country: 'BR',
    state: 'RS',
  }
};
