import * as React from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import UploadItem from '../UploadItem/UploadItem';
import { MaharaPendingFile } from '../../models/models';
import { Text } from 'react-native';

const PendingList = (props: any) => {
    return (
        <FlatList
            data={props.dataList}
            extraData={props.selectedFiles}
            renderItem={({ item }) => {
                const uploadItem: any = item;
                let isItemSelected = false;

                if (props.selectedFiles) {
                    props.selectedFiles.forEach((file: MaharaPendingFile) => {
                        return (file.id === uploadItem.id) ? isItemSelected = true : false
                    })
                }

                if (props.uploadType === 'file') {
                    const thumbnail = { uri: (uploadItem.maharaFormData.filetoupload.uri ? uploadItem.maharaFormData.filetoupload.uri : '') }
                    return (
                        <TouchableOpacity
                            style={isItemSelected && props.styles.highlighted}
                            onPress={() => props.navigation.navigate('Add')}
                            onLongPress={() => props.handleLongPress(uploadItem)}
                        >
                            <UploadItem
                                file={item}
                                id={uploadItem.id}
                                title={uploadItem.maharaFormData.title}
                                onRemove={props.onRemove}
                                onEdit={() => props.navigation.navigate({
                                    routeName: 'FileDetails',
                                    params: {
                                        fileId: uploadItem.id
                                    },
                                })}
                                image={thumbnail}
                            />
                        </TouchableOpacity>

                    );
                } else if (props.uploadType === 'journalEntry') {
                    return (
                        <TouchableOpacity
                            style={isItemSelected && props.styles.highlighted}
                            onPress={() => props.navigation.navigate('Add')}
                            onLongPress={() => props.handleLongPress(uploadItem)}
                        >
                            <Text>A journal entry</Text>
                            <UploadItem
                                id={uploadItem.id}
                                title={uploadItem.journalEntry.title}
                                onRemove={props.onRemove}
                                onEdit={() => props.navigation.navigate({
                                    routeName: 'FileDetails',
                                    params: {
                                        fileId: uploadItem.id
                                    },
                                })}
                            // image={thumbnail}
                            />
                        </TouchableOpacity>
                    );
                }
                return (
                    null
                )
            }
            }
        // keyExtractor={item => item.id}
        />
    )
}

export default PendingList;