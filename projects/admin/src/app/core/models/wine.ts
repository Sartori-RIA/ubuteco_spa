import {Product} from './product';
import {WineStyle} from './wine-style';
import {Maker} from './maker';

export interface Wine extends Product {
  description: string;
  wine_style: WineStyle;
  wine_style_id: number;
  maker: Maker;
  maker_id: number;
  abv: number;
  vintage_wine: string;
  visual: string;
  ripening: string;
  grapes: string;
}
