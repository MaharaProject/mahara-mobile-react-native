import React, { useState } from 'react';
import { t } from '@lingui/macro';
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import variables from '../../../assets/styles/variables';
import { maharaTheme } from '../../../utils/theme';

const dropdownStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end'
    },
    dropdownContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        maxHeight: 300,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 8
    },
    dropdownItem: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: variables.border
    },
    dropdownItemLast: {
        borderBottomWidth: 0
    },
    dropdownItemText: {
        fontSize: 16,
        color: '#333'
    },
    dropdownItemTextSelected: {
        color: maharaTheme.colors.navActiveGreenTint,
        fontWeight: '600'
    }
});

type Props<T> = {
    options: Array<{ label: string; value: T }>;
    selectedValue: T;
    onSelect: (value: T) => void;
    size?: 'sm' | 'md' | 'lg';
    accessibilityLabel?: string;
};

export default function Dropdown<T extends string | number>({
    options,
    selectedValue,
    onSelect,
    size = 'lg',
    accessibilityLabel
}: Props<T>) {
    const [modalVisible, setModalVisible] = useState(false);

    const selectedLabel = options.find((o) => o.value === selectedValue)?.label ?? '';

    const heightMap = { sm: 40, md: 48, lg: 56 };
    const fontSizeMap = { sm: 14, md: 16, lg: 18 };

    return (
        <>
            <TouchableOpacity
                style={{
                    height: heightMap[size],
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    borderWidth: 1,
                    borderColor: maharaTheme.colors.light,
                    borderRadius: 4,
                    backgroundColor: '#fff'
                }}
                onPress={() => setModalVisible(true)}
                accessibilityLabel={accessibilityLabel}
                accessibilityRole="button"
            >
                <Text style={{ flex: 1, fontSize: fontSizeMap[size], color: '#333' }}>
                    {selectedLabel || t`Please select`}
                </Text>
                <Text style={{ fontSize: fontSizeMap[size], color: '#999' }}>▼</Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable style={dropdownStyles.overlay} onPress={() => setModalVisible(false)}>
                    <View style={dropdownStyles.dropdownContent}>
                        <FlatList
                            data={options}
                            keyExtractor={(item, index) => `${item.value}-${index}`}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    style={[
                                        dropdownStyles.dropdownItem,
                                        index === options.length - 1 &&
                                            dropdownStyles.dropdownItemLast
                                    ]}
                                    onPress={() => {
                                        onSelect(item.value);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text
                                        style={[
                                            dropdownStyles.dropdownItemText,
                                            item.value === selectedValue &&
                                                dropdownStyles.dropdownItemTextSelected
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}
