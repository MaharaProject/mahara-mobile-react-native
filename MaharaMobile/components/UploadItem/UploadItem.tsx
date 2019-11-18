import React, { Component } from 'react';
import { Store } from 'redux';
import { MaharaFile, MaharaPendingFile } from '../../models/models';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, Button } from 'react-native';
import Card from '../Card/Card';
import { styles } from './UploadItem.style';
import { styles as variables } from '../../assets/styles/variables'


type Props =
    {
        uploadList: Array<MaharaPendingFile>;
        dispatch: any;
        navigation: any;
    }

type State =
    {
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

                    <View style={styles.textContainer}>
                        {/* <Text style={styles.date}>              {props.date.toDateString()}
                        </Text> */}

                        {/* <Text style={!currentTodoIsDone
                            ? styles.title : styles.doneTitle}>{props.title}
                        </Text> */}

                        <Text>{props.file.name}</Text>
                        {/* <Text>{props.description.length > 25 ? props.description.substring(0, 25) + ' ...' : props.description}</Text> */}
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button
                                title='Remove'
                                onPress={() => null/*toggleTodoDoneHandler*/}
                                color={variables.colors.primary}
                                backgroundColor={variables.colors.primary}
                            />
                        </View>

                        <View style={styles.button}>
                            <Button
                                title="Details"
                                onPress={() => null/*props.onEdit.bind(this, props.id)*/}
                                color={variables.colors.secondary}
                                backgroundColor={variables.colors.secondary}
                            />
                        </View>
                    </View>
                </Card>
            </View>
        </TouchableOpacity>
    )

}

export default UploadItem;


