import {
  clearUserBlogs,
  clearUserFolders,
  updateUserBlogs,
  updateUserFolders
} from '../../store/actions/userArtefacts';
import {
  CLEAR_USER_BLOGS,
  CLEAR_USER_FOLDERS,
  UPDATE_USER_BLOGS,
  UPDATE_USER_FOLDERS
} from '../../utils/constants';
import {MOCK_BLOGS, MOCK_USER_FOLDERS} from '../mockConstants';

// USER ARTEFACTS REDUCER ACTION CREATORS

describe('UserArtefacts reducer action creators', () => {
  describe('updateUserBlogs', () => {
    it('should set up update user blogs', () => {
      const action = updateUserBlogs(MOCK_BLOGS);
      expect(action).toEqual({type: UPDATE_USER_BLOGS, userBlogs: MOCK_BLOGS});
    });
  });

  describe('clearUserFolders', () => {
    it('should set up clear user folders', () => {
      const action = clearUserFolders();
      expect(action).toEqual({type: CLEAR_USER_FOLDERS});
    });
  });

  describe('updateUserFolders', () => {
    it('should set up update user folders', () => {
      const action = updateUserFolders(MOCK_USER_FOLDERS);
      expect(action).toEqual({
        type: UPDATE_USER_FOLDERS,
        userFolders: MOCK_USER_FOLDERS
      });
    });
  });

  describe('clearUserBlogs', () => {
    it('should set up clear user blogs', () => {
      const action = clearUserBlogs();
      expect(action).toEqual({type: CLEAR_USER_BLOGS});
    });
  });
});
