import { setTagString } from './formHelper';

jest.useFakeTimers();
test('String should match expected output', () => {
  const tags = ['tagkey', 'tagkey2', 'tagkey3'];
  expect(setTagString(tags)).toEqual(
    '&tags[0]=tagkey&tags[1]=tagkey2&tags[2]=tagkey3&tags[3]='
  );
});
