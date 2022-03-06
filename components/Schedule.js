import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Keyboard } from 'react-native';
import { Ionicons, EvilIcons, SimpleLineIcons   } from '@expo/vector-icons';

const Schedule = (props) => {
    return (
        <TouchableOpacity>
            <View style={styles.scheduleTaskWrapper}>
                <Text><EvilIcons name="bell" size={24} color="#9598A1" /></Text>
                <Text style={styles.scheduleTask}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    scheduleTaskWrapper: {
        backgroundColor: '#F2F2F2',
        height: 32,
        borderRadius: 60,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 12,
        marginRight: 5
    },
    scheduleTask: {
        color: '#9598A1',
        fontSize: 16
    },
})

export default Schedule;