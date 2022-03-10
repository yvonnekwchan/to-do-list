import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import KeyboardListener from 'react-native-keyboard-listener';
import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import Schedule from './Schedule';

const Task = (props) => {
    const [keyboardStatus, setKeyboardStatus] = useState("hide");

    return (
        <View style={styles.item}>
            <View style={[styles.itemLeft, props.status == "completed" ? styles.completed : null]}>
                <TouchableOpacity disabled={keyboardStatus == "show" ? true : false} key={props.index} onPress={props.onPressSquare}>
                    {props.status != "completed" &&
                        <View style={styles.square}></View>
                    }
                    {props.status == "completed" &&
                        <Text style={styles.checksquare}><AntDesign name="checksquare" size={18} color="black" /></Text>
                    }
                </TouchableOpacity>

                <View style={{ maxWidth: '100%', flex: 1, flexDirection: 'row', position: 'relative' }}>
                    {props.status == "completed" &&
                        <View
                            style={styles.strike}
                        />
                    }
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={styles.itemText}>{props.text}</Text>
                        <Schedule text={props.schedule} status={props.status}/>
                    </View>
                </View>
            </View>

            <TouchableOpacity disabled={keyboardStatus == "show" ? true : false} key={props.index} onPress={props.onPressCircular}>
                {props.status == "completed" &&
                    <Text><AntDesign name="closecircle" size={17} color={keyboardStatus == "hide" ? "#979DA9" : "#484B52"} /></Text>
                }
            </TouchableOpacity>

            <KeyboardListener
                onWillShow={() => setKeyboardStatus("show")}
                onWillHide={() => setKeyboardStatus("hide")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        paddingBottom: 15,
        paddingTop: 15,
        paddingLeft: 5,
        paddingRight: 18,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 16,
        height: 16,
        borderRadius: 2,
        marginRight: 15,
        borderWidth: 1,
        position: 'relative',
        borderColor: '#444444',
        opacity: 0.7
    },
    checksquare: {
        marginRight: 13,
        borderColor: '#4A4A4A',
        opacity: 0.5,
        position: 'relative'
    },
    addWrapper: {
        width: 40,
        height: 40,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#DCDBDB',
        borderWidth: 0,
        marginRight: 5,
        backgroundColor: '#55BCF6'
    },
    itemText: {
        maxWidth: '100%',
        fontSize: 17,
        paddingEnd: 5
    },
    addStrike: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    completed: {
        opacity: 0.3
    },
    strike: {
        width: '93%',
        zIndex: 1,
        opacity: 0.5,
        borderBottomColor: 'black',
        borderBottomWidth: 1.3,
        top: 11,
        position: 'absolute'
    },
    circular: {
        width: 12,
        height: 12,
        opacity: 0.4,
        borderColor: '#4A4A4A',
        borderWidth: 1,
        borderRadius: 6,
    },
})

export default Task;
