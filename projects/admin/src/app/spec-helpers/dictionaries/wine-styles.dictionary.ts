import {Dictionary} from '@ngrx/entity';
import {WineStyle} from '../../core/models/wine-style';

export const wineStylesDictionary: Dictionary<WineStyle> = {
  1: {
    id: 1,
    name: 'wine_style_1'
  },
  2: {
    id: 2,
    name: 'wine_style_2'
  }
};
