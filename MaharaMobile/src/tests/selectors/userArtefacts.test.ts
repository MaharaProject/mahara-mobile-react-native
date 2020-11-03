import {selectUserBlogs} from '../../store/reducers/userArtefactsReducer';
import {MOCK_BLOGS, MOCK_ROOT_STATE} from '../mockConstants';

describe('userArtefactsReducer selectors', () => {
  it('should select user blogs ', () => {
    const result = selectUserBlogs(MOCK_ROOT_STATE);
    expect(result).toEqual(MOCK_BLOGS);
  });
});
