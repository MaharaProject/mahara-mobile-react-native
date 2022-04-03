import {getItemTagsStrings} from '../../store/reducers/userTagsReducer';
import {MOCK_FILE_IDS, MOCK_ROOT_STATE} from '../mockConstants';

describe('userTagsReducer selectors', () => {
  it('should select user item tag strings with valid item  ', () => {
    const result = getItemTagsStrings(MOCK_ROOT_STATE, MOCK_FILE_IDS[0]);
    expect(result).toEqual(['tag0', 'tag1', 'tag2']);
  });

  it('should select user item tag strings with invalid item  ', () => {
    const result = getItemTagsStrings(MOCK_ROOT_STATE, 'abc');
    expect(result).toEqual([]);
  });
});
