import React, { useCallback } from 'react';
import {
    faBookOpen,
    faCheckCircle,
    faEdit,
    faFile,
    faImage,
    faMusic,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Box, Text } from '@gluestack-ui/themed-native-base';
import { Image, ImageSourcePropType, TouchableOpacity, View } from 'react-native';
import generic from '../../assets/styles/generic';
import styles from '../../assets/styles/variables';
import Card from '../UI/Card/Card';
import uploadItemStyles from './UploadItem.style';

type Props = {
    title: string;
    mimetype: string;
    // image: ImageSourcePropType;
    onRemove: () => void;
    onEdit: () => void;
    successfullyUploadedItem: boolean;
    image?: ImageSourcePropType;
};

function UploadItem(props: Props) {
    const title = props.title ? props.title : '';
    const displayName: string = title;

    const Thumbnail = useCallback(() => {
        const isImage = props.mimetype.includes('image');
        const isAudio = props.mimetype.includes('audio');
        const isJournal = props.mimetype.includes('journalEntry');

        if (isImage && props.image && 'uri' in props.image && props.image.uri) {
            return (
                <View style={uploadItemStyles.imageContainer}>
                    <Image
                        source={props.image as ImageSourcePropType}
                        style={uploadItemStyles.thumbnail}
                    />
                </View>
            );
        }

        return (
            <View style={uploadItemStyles.imageContainer}>
                <Box style={uploadItemStyles.icon}>
                    {isImage && <FontAwesomeIcon icon={faImage} size={32} color="#919191" />}
                    {isAudio && <FontAwesomeIcon icon={faMusic} size={32} color="#919191" />}
                    {isJournal && <FontAwesomeIcon icon={faBookOpen} size={32} color="#919191" />}
                    {!isImage && !isAudio && !isJournal && (
                        <FontAwesomeIcon icon={faFile} size={32} color="#919191" />
                    )}
                </Box>
            </View>
        );
    }, [props.mimetype, props.image]);

    return (
        <View style={uploadItemStyles.uploadItem}>
            <Card
                style={{
                    ...uploadItemStyles.pendingCard,
                    ...(props.successfullyUploadedItem ? uploadItemStyles.success : {})
                }}
            >
                <Thumbnail />
                <View style={uploadItemStyles.textContainer}>
                    <Text
                        style={{ ...generic.regularText }}
                        isTruncated
                        fontSize="md"
                        fontWeight="light"
                    >
                        {displayName}{' '}
                    </Text>
                </View>
                <View style={uploadItemStyles.buttonContainer}>
                    {!props.successfullyUploadedItem && (
                        <>
                            <View style={uploadItemStyles.button}>
                                <TouchableOpacity
                                    accessibilityRole="button"
                                    accessibilityLabel="Remove"
                                    onPress={props.onRemove}
                                >
                                    <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        style={uploadItemStyles.remove}
                                        size={styles.font.xl}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={uploadItemStyles.button}>
                                <TouchableOpacity
                                    accessibilityRole="button"
                                    accessibilityLabel="Edit"
                                    onPress={props.onEdit}
                                >
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        style={uploadItemStyles.edit}
                                        size={styles.font.xl}
                                    />
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                    {props.successfullyUploadedItem && (
                        <View style={uploadItemStyles.button}>
                            <FontAwesomeIcon
                                icon={faCheckCircle}
                                style={uploadItemStyles.success}
                                size={styles.font.xl}
                            />
                        </View>
                    )}
                </View>
            </Card>
        </View>
    );
}

export default UploadItem;
