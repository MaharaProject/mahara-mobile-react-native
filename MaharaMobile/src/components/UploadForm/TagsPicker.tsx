import React, { useCallback, useEffect, useState } from 'react';
import { t } from '@lingui/macro';
import { Box, CheckIcon, DeleteIcon, IconButton, Input, Select, Text, View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import buttons from 'assets/styles/buttons';
import forms from 'assets/styles/forms';
import styles from 'assets/styles/variables';
import SubHeading from 'components/UI/SubHeading/SubHeading';
import { UserTag } from 'models/models';
import { newUserTag } from 'models/typeCreators';
import { findUserTagByString } from 'utils/helperFunctions';
import uploadFormStyles from './UploadForm.style';

type Props = {
  existingTags: Array<UserTag>;
  userTags: Array<UserTag>;
  onAddNewUserTag: (tag: UserTag) => void;
  onUpdateItemTagsIds: (ids: number[]) => void;
  onSetItemUploadTagsString: (tags: string[]) => void;
};

type State = {
  selectedTags: Array<UserTag>;
  selectedTag: UserTag;
  newTags: Array<UserTag>;
  itemTagIds: Array<number>;
};

function TagsPicker({ onSetItemUploadTagsString, onUpdateItemTagsIds, ...props }: Props) {
  const [newTagText, setNewTagText] = useState('');
  const [selectedDropdownTag, setSelectedDropdownTag] = useState<State['selectedTag']>();
  const [showTagInput, setShowTagInput] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Array<UserTag>>(props.existingTags || []);

  const getSelectedTagsAsStrings = useCallback(
    () => selectedTags.map((tag: UserTag) => tag.tag),
    [selectedTags]
  );

  const getSelectedTagsAsIds = useCallback(
    () => selectedTags.map((tag: UserTag) => tag.id),
    [selectedTags]
  );

  const updateSelectedTags = (tag: UserTag, addTag = true) => {
    const itemTags = new Set(selectedTags);
    if (addTag) {
      itemTags.add(tag);
    } else {
      itemTags.delete(tag);
    }
    setSelectedTags(Array.from(itemTags));
  };

  const hideTagInput = () => {
    setShowTagInput(false);
    setSelectedDropdownTag(newUserTag('...'));
  };

  const onRemoveTag = (index: number) => {
    const tag = selectedTags[index];
    updateSelectedTags(tag, false);
  };

  /**
   * Creates a new UserTag instance and adds it to the set of tags of the current item being
   * created/edited. - then add to set of new tags being created to later add to redux and
   * hides the tag input.
   *
   * @param tagString string of tag to be created.
   */
  const addNewTag = (tagString: string): UserTag => {
    const newTag = newUserTag(tagString);
    updateSelectedTags(newTag);
    props.onAddNewUserTag(newTag);

    hideTagInput();
    return newTag;
  };
  /**
   * Handles action for the item selected in the tags picker dropdown.
   *
   * - If tagString === 'Add new tag +', show the tag input
   * - If the tagString matches an existing UserTag, assign that tagString as the selected one.
   * - If the tagString does not match an existing UserTag, assign that tagString as the
   *   selected one and addNewTagToItem().
   * @param tagString for new UserTag
   */
  const selectTagHandler = (tagString: string) => {
    if (tagString === '') {
      return;
    }
    if (tagString === 'Add new tag +') {
      setShowTagInput(true);
      return;
    }

    const selectedTagsAsStrings = getSelectedTagsAsStrings();

    if (selectedTagsAsStrings.includes(tagString)) {
      return;
    }

    // Find a matching tag
    const tagMatch = findUserTagByString(tagString, props.userTags);
    if (tagMatch) {
      setSelectedDropdownTag(tagMatch);
      updateSelectedTags(tagMatch);
    } else {
      const newTag = addNewTag(tagString);
      updateSelectedTags(newTag);
    }
  };

  useEffect(() => {
    onSetItemUploadTagsString(getSelectedTagsAsStrings());
    onUpdateItemTagsIds(getSelectedTagsAsIds());
  }, [
    getSelectedTagsAsIds,
    getSelectedTagsAsStrings,
    onSetItemUploadTagsString,
    onUpdateItemTagsIds
  ]);

  return (
    <View>
      <View style={uploadFormStyles.tagsContainer}>
        <SubHeading text={t`Tags`} />
        {/* Display selected tags */}
        {getSelectedTagsAsStrings().map((value: string, index: number) => (
          <TouchableOpacity
            key={value}
            onPress={() => onRemoveTag(index)}
            accessibilityRole="button"
            accessibilityLabel={value}
            accessibilityHint={t`Tap to remove tag`}
          >
            <View style={forms.tag}>
              <Text style={forms.tagText}>{value}</Text>
              <Text style={forms.tagClose} accessibilityLabel="">
                x
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        {/* Create new tag */}
        {showTagInput && (
          <View style={uploadFormStyles.tagsContainer}>
            <Input
              placeholder={t`New tag...`}
              onChangeText={(text: string) => setNewTagText(text)}
              InputRightElement={[
                <IconButton
                  key="add-button"
                  mr="1"
                  icon={<CheckIcon />}
                  onPress={() => {
                    setNewTagText('');
                    selectTagHandler(newTagText);
                  }}
                  isDisabled={!newTagText}
                />,
                <IconButton
                  key="remove-button"
                  mr="1"
                  colorScheme="warning"
                  icon={<DeleteIcon />}
                  onPress={() => {
                    setNewTagText('');
                    setShowTagInput(false);
                  }}
                />
              ]}
            />
          </View>
        )}
      </View>
      {/* Display drop down of existing tags */}
      <Box style={[buttons.default]}>
        <Select
          height={styles.heights.input}
          mode="dropdown"
          iosHeader="Select tags"
          placeholder={t`Select tags`}
          accessibilityLabel={t`Select tags`}
          selectedValue={selectedDropdownTag}
          onValueChange={(itemValue: string) => selectTagHandler(itemValue)}
        >
          <Select.Item
            label={t`Select tags...`}
            value=""
            color={styles.colors.darkgrey}
            isDisabled
          />
          <Select.Item label={t`Add new tag +`} value="Add new tag +" />

          {props.userTags
            .filter((tag) => !selectedTags.find((selectedTag) => selectedTag.id === tag.id))
            .map((value) => (
              <Select.Item label={value.tag} value={value.tag} key={value.id} />
            ))}
        </Select>
      </Box>
    </View>
  );
}

export default TagsPicker;
