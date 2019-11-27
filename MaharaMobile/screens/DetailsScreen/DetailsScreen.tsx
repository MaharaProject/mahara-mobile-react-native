import React, { Component } from 'react';
import { styles } from '../../assets/styles/variables';
import { View, Text } from 'react-native';
import { Store } from 'redux';
import { connect, useSelector } from 'react-redux';
import { MaharaStore, MaharaPendingFile, JournalEntry, PendingJournalEntry } from '../../models/models';

const DetailsScreen = (props: any) => {
    const uploadList = useSelector((state: MaharaStore) => state.app.uploadList);
    const itemId = props.navigation.getParam('itemId');
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

    const blankJ: PendingJournalEntry = {
        id: '',
        journalEntry: {
            blogid: 0,
            body: '',
            isdraft: false,
            tags: [],
            title: '',
            wsfunction: '',
            wstoken: '',
        },
        url: ''
    }

    // Find matching itemId in list of files and journal entries of UploadList
    const findFile = uploadList.files.find(
        (file: MaharaPendingFile) => file.id === itemId
    );

    const findJournalEntry = uploadList.journalEntries.find(
        (entry: PendingJournalEntry) => entry.id === itemId
    );

    if (findFile) {
        return (
            <Text>{findFile.maharaFormData.title}</Text>
        )
    } else if (findJournalEntry) {
        return (
            <Text>{findJournalEntry.journalEntry.title}</Text>
        )
    }
    else {
        return <View></View>
    }
}

export default DetailsScreen;