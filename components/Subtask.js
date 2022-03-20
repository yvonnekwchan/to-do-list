import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const Subtask = (props) => {

    const [inputText, setInputText] = useState();
    const [isCompleted, setIsCompleted] = useState(false);

    const handleSubmit = () => {
        if (inputText == null || inputText.trim() === '') {
            props.removeInputField();
        } else {
            props.updateSubtask();
            if (props.index == props.numOfSubtasks - 1) {
                props.addSubtask();
            }
            //setInputText(null);
        }
    }

    return (
        <View style={[styles.subtaskWrapper, isCompleted == true ? styles.completed : null]}>
            <TouchableOpacity onPress={() => setIsCompleted(!isCompleted)}>
                {isCompleted == false &&
                    <View style={styles.square}></View>
                }
                {isCompleted == true &&
                    <Text style={styles.checksquare}><Ionicons name="checkbox" size={18} color="#C58C3F" /></Text>
                }
            </TouchableOpacity>
            <TextInput
                value={props.editTask == false? inputText: props.item}
                placeholder={'Add a new subtask'}
                autoFocus={true}
                returnKeyType='done'
                onChangeText={text => { props.setSubtask(text); setInputText(text) }}
                onEndEditing={handleSubmit}
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
        flexWrap: 'wrap',
        marginTop: 4,
        marginBottom: 4,
    },
    square: {
        width: 16,
        height: 16,
        borderRadius: 4,
        marginRight: 15,
        borderWidth: 1,
        position: 'relative',
        borderColor: '#CCCBB7',
        opacity: 0.7
    },
    checksquare: {
        marginRight: 13,
        borderColor: '#4A4A4A',
        opacity: 0.5,
        position: 'relative'
    },
    completed: {
        opacity: 0.3
    },
})

export default Subtask;