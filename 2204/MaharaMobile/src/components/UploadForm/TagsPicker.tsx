import React, { useEffect, useState } from 'react';
// import {t} from '@lingui/macro';
import {
  Box,
  Center,
  HStack,
  Icon,
  Input,
  Item,
  Picker,
  Select,
  Text,
  View,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import buttons from '../../assets/styles/buttons';
import forms from '../../assets/styles/forms';
import styles from '../../assets/styles/variables';
// import i18n from '../../i18n';
import { UserTag } from '../../models/models';
import { newUserTag } from '../../models/typeCreators';
import { findUserTagByString } from '../../utils/helperFunctions';
import SubHeading from '../UI/SubHeading/SubHeading';
import uploadFormStyles from './UploadForm.style';

type Props = {
  existingTags: Array<UserTag>;
  userTags: Array<UserTag>;
  onAddNewUserTag: Function;
  onUpdateItemTagsIds: Function;
  onSetItemUploadTagsString: Function;
};

type State = {
  selectedTags: Array<UserTag>;
  selectedTag: UserTag;
  newTags: Array<UserTag>;
  itemTagIds: Array<number>;
};

const TagsPicker = (props: Props) => {
  const [newTagText, setNewTagText] = useState('');
  const [selectedDropdownTag, setSelectedDropdownTag] =
    useState<State['selectedTag']>();
  const [showTagInput, setShowTagInput] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Array<UserTag>>(
    props.existingTags || []
  );

  const getSelectedTagsAsStrings = () => {
    return selectedTags.map((tag: UserTag) => {
      return tag.tag;
    });
  };

  const getSelectedTagsAsIds = () => {
    return selectedTags.map((tag: UserTag) => {
      return tag.id;
    });
  };

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
    props.onSetItemUploadTagsString(getSelectedTagsAsStrings());
    props.onUpdateItemTagsIds(getSelectedTagsAsIds());
  }, [selectedTags]);

  return (
    <View>
      <View style={uploadFormStyles.tagsContainer}>
        {/* <SubHeading text={t`Tags`} /> */}
        <SubHeading text="Tags" />
        {/* Display selected tags */}
        {getSelectedTagsAsStrings().map((value: string, index: number) => (
          <TouchableOpacity
            key={Math.floor(Math.random() * 100) + value}
            onPress={() => onRemoveTag(index)}
            accessibilityRole="button"
            accessibilityLabel={value}
            // accessibilityHint={i18n._(t`Tap to remove tag`)}
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
          <View>
            <Input>Input</Input>
            {/* <Center>
              <Input
                // placeholder={i18n._(t`New tag...`)}
                placeholder="New tag..."
                onChangeText={(text: string) => setNewTagText(text)}
              />
            </Center>

            <Icon
              onPress={() => selectTagHandler(newTagText)}
              name="checkmark-outline"
            />
            <Icon onPress={() => setShowTagInput(false)} name="close-outline" /> */}
          </View>
        )}
      </View>
      {/* Display drop down of existing tags */}
      <Box style={[buttons.default]}>
        <Select
          mode="dropdown"
          iosHeader="Select tags"
          // placeholder={i18n._(t`Select tags`)}
          placeholder="Select tags"
          // accessibilityLabel={i18n._(t`Select tags`)}
          selectedValue={selectedDropdownTag}
          onValueChange={(itemValue: string) => selectTagHandler(itemValue)}>
          <Select.Item
            // label={i18n._(t`Select tags...`)}
            label="Select tags..."
            value=""
            color={styles.colors.darkgrey}
          />
          {/* <Select.Item label={i18n._(t`Add new tag +`)} value="Add new tag +" /> */}
          <Select.Item label="Add new tag +" value="Add new tag +" />
          {props.userTags.map((value: UserTag, index: number) => (
            <Select.Item
              label={value.tag}
              value={value.tag}
              key={props.userTags[index].id}
            />
          ))}
        </Select>
      </Box>
    </View>
  );
};

export default TagsPicker;
