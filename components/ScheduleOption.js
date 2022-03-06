import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Keyboard } from 'react-native';
import { Ionicons, EvilIcons, SimpleLineIcons } from '@expo/vector-icons';

const Schedule = (props) => {
    return (

        <View style={[styles.scheduleTaskWrapper, props.selection == props.text ? styles.blueBgColor : styles.greyBgColor]}>
            <Text><EvilIcons name="bell" size={24} color={props.selection == props.text ? "#FFF" : "#9598A1"} /></Text>
            <Text style={[{ fontSize: 16 }, props.selection == props.text ? styles.whiteText : styles.blackText]}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    scheduleTaskWrapper: {
        height: 32,
        borderRadius: 60,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 12,
        marginRight: 5
    },
    greyBgColor: {
        backgroundColor: '#F2F2F2',
    },
    blueBgColor: {
        backgroundColor: '#0083FF',
    },
    blackText: {
        color: '#9598A1',

    },
    whiteText: {
        color: '#FFF'
    }
})

export default Schedule;