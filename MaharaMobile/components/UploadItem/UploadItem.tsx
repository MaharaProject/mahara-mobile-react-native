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
    return (
        <TouchableOpacity /*onPress={props.onDelete.bind(this, props.id)}*/>
            <View style={styles.uploadItem}>
                <Card style={{ ...styles.todoCard, ...props.style }}>
                    <View style={styles.imageContainer}>
                        <Image source={props.image} style={styles.thumbnail} />


                    </View>
                    <View style={styles.textContainer}>
                        <Text>Filename: {props.file.maharaFormData.title.length > 25 ? props.file.maharaFormData.title.substring(0, 25) + '...' : props.file.maharaFormData.title.length}</Text>
                        <Text>Description: {props.file.maharaFormData.description.length > 20 ? props.file.maharaFormData.description.substring(0.20) + '...' : props.file.maharaFormData.description}</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button
                                title='Remove'
                                onPress={() => props.onRemove(props.file.id)}
                                color={variables.colors.primary}
                            // backgroundColor={variables.colors.primary} iOS
                            />
                        </View>

                        <View style={styles.button}>
                            <Button
                                title="Details"
                                onPress={() => props.onEdit.bind(props.file.id)}
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


