import React, { Component } from 'react';
import { styles } from '../../assets/styles/variables';
import { View, Text } from 'react-native';
import { Store } from 'redux';
import { connect, useSelector } from 'react-redux';
import { MaharaStore, MaharaPendingFile, JournalEntry } from '../../models/models';

const DetailsScreen = (props: any) => {
    const uploadList = useSelector((state: MaharaStore) => state.app.uploadList);
    const fileId = props.navigation.getParam('id');
    const blank: MaharaPendingFile = {
        id: '',
        maharaFormData: {
            description: '',
            filetoupload: {
                name: '',
                type: '',
                uri: '',
            },
            foldername: '',
            title: '',
            webservice: '',
            wstoken: '',
        },
        url: ''
    };


    const findFile = uploadList.files.find(
        (file: MaharaPendingFile) => file.id === fileId
    );
    // TODO: FIND THE RIGHT FILE OR JOURNAL ENTRIES FOR DETAILS PAGE
    // const fileJournalEntry = uploadList.journalEntries.find(
    //     (entry: JournalEntry)
    // )

    const selectedFile = findFile ? findFile : blank;

    return (
        <View style={styles.screen}>
            <View style={styles.heading} >
                <Text style={styles.titleContainer}> Filename: </Text>
                <Text style={styles.title}> {selectedFile.maharaFormData.title}} </Text>

            </View>
        </View>


    );


}

// export default connect(mapStateToProps)(DetailsScreen);
export default DetailsScreen;