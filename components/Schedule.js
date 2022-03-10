import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import KeyboardListener from 'react-native-keyboard-listener';
import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

const ScheduleWrapper = (props) => {
    const [keyboardStatus, setKeyboardStatus] = useState("show");
      
    return (
        <View>
            {props.text != "default" && props.text != "Someday" && props.status != "completed" &&
                <View style={[styles.scheduleWrapper, keyboardStatus == "hide" ? styles.brightBackground : styles.dimBackground]}>
                    <Text style={[styles.itemText, keyboardStatus == "hide" ? styles.brightColor : styles.dimColor]}>{props.text}</Text>
                </View>
            }

            <KeyboardListener
                onWillShow={() => setKeyboardStatus("show")}
                onWillHide={() => setKeyboardStatus("hide")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    brightBackground: {
        backgroundColor: '#FFF',
        borderColor: '#979797',
    },
    dimBackground: {
        backgroundColor: '#808080',
        borderColor: '#5F5F5F'
    },
    scheduleWrapper: {
        height: 18,
        borderRadius: 60,
        borderWidth: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginRight: 5,
    },
    itemText: {
        fontSize: 8,
        fontWeight: '600'
    },
    brightColor: {
        color: '#979797',
    },
    dimColor: {
        color: '#4B4B4B',
    }
})

export default ScheduleWrapper;