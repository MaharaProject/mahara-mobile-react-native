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

                if (props.uploadType === 'file') {
                    const thumbnail = { uri: (uploadItem.maharaFormData.filetoupload.uri ? uploadItem.maharaFormData.filetoupload.uri : '') }
                    return (
                        <UploadItem
                            itemId={uploadItem.id}
                            title={uploadItem.maharaFormData.title}
                            onRemove={() => props.onRemove(uploadItem.id)}
                            onEdit={() => props.navigation.navigate({
                                routeName: 'FileDetails',
                                params: {
                                    itemId: uploadItem.id
                                },
                            })}
                            image={thumbnail}
                        />
                    );
                } else if (props.uploadType === 'journalEntry') {
                    return (
                        <UploadItem
                            itemId={uploadItem.id}
                            title={uploadItem.journalEntry.title}
                            onRemove={() => props.onRemove(uploadItem.id)}
                            onEdit={() => props.navigation.navigate({
                                routeName: 'FileDetails',
                                params: {
                                    itemId: uploadItem.id
                                },
                            })}
                        // image={thumbnail}
                        />
                    );
                }
                return null
            }
            }
        />
    )
}

export default PendingList;