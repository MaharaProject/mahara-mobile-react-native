import React from 'react';
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
    const fileId: string = props.file.id;
    const fileName: string = props.file.maharaFormData.title;
    const fileDesc: string = props.file.maharaFormData.description;

    return (
        <TouchableOpacity>
            <View style={styles.uploadItem}>
                <Card style={{ ...styles.pendingCard }}>
                    <View style={styles.imageContainer}>
                        <Image source={props.image} style={styles.thumbnail} />


                    </View>
                    <View style={styles.textContainer}>
                        <Text>Filename: {fileName.length > 25 ? fileName.substring(0, 25) + '...' : fileName.length}</Text>
                        <Text>Description: {fileDesc.length > 20 ? fileDesc.substring(0.20) + '...' : fileDesc}</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button
                                title='Remove'
                                onPress={() => props.onRemove(fileId)}
                                color={variables.colors.primary}
                            // backgroundColor={variables.colors.primary} iOS
                            />
                        </View>

                        <View style={styles.button}>
                            <Button
                                title="Details"
                                onPress={props.onEdit.bind({ fileId: fileId, nav: props.navigation })}
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


