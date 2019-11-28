import React, { Component } from 'react';
import { styles } from '../../assets/styles/variables';
import { View, Text } from 'react-native';
import { Store } from 'redux';
import { connect, useSelector } from 'react-redux';
import { MaharaStore, MaharaPendingFile, JournalEntry, PendingJournalEntry } from '../../models/models';

type Props = {
    navigation: any;
}

const DetailsScreen = (props: Props) => {
    const uploadList = useSelector((state: MaharaStore) => state.app.uploadList);
    const itemId = props.navigation.getParam('itemId');

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