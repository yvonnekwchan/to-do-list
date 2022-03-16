import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Subtask = ({ setAddTaskShowUp, setSubtask, addSubtask, removeField, endEditing }) => {

    const [inputText, setInputText] = useState();
    const handleSubmit = () => {
        if (inputText == null || inputText.trim() === '') {
            removeField();
        } else {
            setSubtask(inputText);
            addSubtask(); //if click done --> addSubtask, if leave focus --> don't add
            setInputText(null);
        }
    }

    const handleEndEditing = () => {
        //setSubtask(null);
        setAddTaskShowUp(true);
    }

    return (
        <View style={styles.subtaskWrapper}>
            <View style={styles.square}></View>
            <TextInput placeholder={'Add a new subtask'}
                autoFocus={true}
                returnKeyType='done'
                //onBlur={handleEndEditing}
                onChangeText={text => setInputText(text)}
                onEndEditing={handleSubmit}
                //onSubmitEditing={handleSubmit}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    subtaskWrapper: {
        paddingBottom: 12,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 16,
        height: 16,
        borderRadius: 4,
        marginRight: 15,
        marginTop: 4,
        borderWidth: 1,
        position: 'relative',
        borderColor: '#CCCBB7',
        opacity: 0.7
    },
})

export default Subtask;