const setTagString = (tags: Array<string>) => {
  const tagsArray = tags.map((tag: string, index: number) => `${tag}&tags[${index + 1}]=`);
  const tagsString = tagsArray.join('');
  const string = '&tags[0]=' + tagsString;

  return string;
};

export default setTagString;
