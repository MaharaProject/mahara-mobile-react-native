import React, { useState } from 'react';
import { MaharaFile, MaharaPendingFile } from '../../models/models';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, Button, Image } from 'react-native';
import Card from '../Card/Card';
import { styles } from './UploadItem.style';
import { styles as variables } from '../../assets/styles/variables'


type Props = {
    uploadList: Array<MaharaPendingFile>;
    dispatch: any;
    navigation: any;
    file: MaharaPendingFile;
}

type State = {
    uploadRequestPending: boolean;
    uploadRequestReceived: boolean;
    successMessage: string;
    selectedFiles: Array<MaharaFile>
}

const UploadItem = (props: any) => {
    const [id, setId] = useState(props.id ? '' : props.id);
    const [title, setTitle] = useState(props.title ? '' : props.title);
    const [description, setDesc] = useState(props.description ? props.description : '');

    const fileName: string = props.title;
    const displayName: string = fileName.length > 25 ? fileName.substring(0, 25) + '...' : fileName;

    return (
        <TouchableOpacity>
            <View style={styles.uploadItem}>
                <Card style={{ ...styles.pendingCard }}>
                    <View style={styles.imageContainer}>
                        <Image source={props.image} style={styles.thumbnail} />

                    </View>
                    <View style={styles.textContainer}>
                        <Text>{displayName} </Text>
                        <Text>{description.length > 20 ? description.substring(0.20) + '...' : description}</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button
                                title='Remove'
                                onPress={() => props.onRemove(id)}
                                color={variables.colors.primary}
                            // backgroundColor={variables.colors.primary} iOS
                            />
                        </View>

                        <View style={styles.button}>
                            <Button
                                title="Details"
                                // onPress={props.onEdit.bind({ fileId: fileId, nav: props.navigation })}
                                onPress={() => props.onEdit(id)}
                                color={variables.colors.secondary}
                            // backgroundColor={variables.colors.secondary} iOS
                            />
                        </View>
                    </View>
                </Card>
            </View>
        </TouchableOpacity>
    )

}

export default UploadItem;


