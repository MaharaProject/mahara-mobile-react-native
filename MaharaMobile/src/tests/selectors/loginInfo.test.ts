import {selectUrl} from '../../store/reducers/loginInfoReducer';
import {MOCK_ROOT_STATE, MOCK_URL} from '../mockConstants';

// TODO: only one selector tested
describe('loginInfoReducer selectors', () => {
  it('should select login token', () => {
    // do nothing
  });
  const result = selectUrl(MOCK_ROOT_STATE);
  expect(result).toBe(MOCK_URL);
});
