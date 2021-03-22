import {selectBeerStyleById} from './beer-styles.selectors';
import {beerStyleInitialState} from '../../spec-helpers/states/beer-styles.fake-state';

describe('Selectors', () => {
  describe('should select the beer_style by id', () => {
    it('with valid id', () => {
      const result = selectBeerStyleById(1).projector(beerStyleInitialState);
      expect(result).toEqual({id: 1, name: 'beer_style_1'});
    });
    it('with invalid id', () => {
      const result = selectBeerStyleById(99).projector(beerStyleInitialState);
      expect(result).toBeUndefined();
    });
  });
});
