import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const Subtask = (props) => {

    const inputRef = useRef(null);
    const [isInputFocused, setInputFocused] = useState(false);

    useEffect(() => {
        isInputFocused ? inputRef.current.focus() : inputRef.current.blur();
    }, [isInputFocused]);


    const handleInputFocus = () => setInputFocused(true);
    const handleInputBlur = () => setInputFocused(false);

    const [inputText, setInputText] = useState(props.text);

    function setValue() {
        if (props.text != null && (inputText == "" || inputText == null) && isInputFocused == false) {
            setInputText(props.text);
            return props.text;
        } else {
            return inputText;
        }
    }

    const [modifiedInputText, setModifiedInputText] = useState(props.text);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleOnBlur = () => {
        if (props.isDefaultSubtask == false) {
            if (inputText == null || inputText.trim() === '') {
                props.removeInputField(props.index);
            } else {
                props.setCurrentSubtask(inputText, props.index);
            }
        } else {
            props.updateSubtaskItemsArray(modifiedInputText, props.index);
        }
        props.setValue();
    }

    const handleSubmit = () => {
        if (props.isDefaultSubtask == false) {
            if (inputText == null || inputText.trim() === '') {
                props.removeInputField(props.index);
            } else {
                props.setCurrentSubtask(inputText, props.index);
                if (props.index == props.numOfSubtasks - 1) {
                    props.addSubtask();
                }
            }
        } else {
            props.updateSubtaskItemsArray(modifiedInputText, props.index);
        }
    }

    return (
        <View style={[styles.subtaskWrapper, isCompleted == true ? styles.completed : null]}>
            <TouchableOpacity onPress={() => setIsCompleted(!isCompleted)}>
                {isCompleted == false &&
                    <View style={styles.square}></View>
                }
                {isCompleted == true &&
                    <Text style={styles.checksquare}><Ionicons name="checkbox" size={18} color="#D89335" /></Text>
                }
            </TouchableOpacity>
            {isCompleted == true &&
                <Text style={styles.addStrike}>{props.isOnEditPage == false ? inputText : props.text}</Text>
            }
            {/* <Text>item text: {props.text} input text: {inputText} field</Text> */}
            {isCompleted != true &&
                <TextInput
                    style={styles.textInput}
                    ref={inputRef} onFocus={handleInputFocus}
                    value={props.isOnEditPage == true ? modifiedInputText : setValue()}
                    placeholder={'Add a new subtask'}
                    autoFocus={props.isDefaultSubtask == true ? false : true}
                    returnKeyType='done'
                    onChangeText={text => { setModifiedInputText(text); setInputText(text); }}
                    onSubmitEditing={handleSubmit}
                    onBlur={() => { handleInputBlur(); handleOnBlur(); props.setValue(value => value + 1) }}
                />
            }
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
    addStrike: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    textInput:{
        width: "90%",
    }
})

export default Subtask;