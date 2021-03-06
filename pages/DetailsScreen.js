// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Modal, Portal, Provider, Button } from 'react-native-paper';
import Subtask from '../components/Subtask';

const DetailsScreen = ({ route, navigation }) => {
    const [forceUpdate, setForceUpdate] = useState(0);

    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const [subtask, setSubtask] = useState();
    const [subtaskItems, setSubtaskItems] = useState([]);
    const [addTaskShowUp, setAddTaskShowUp] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(true);

    const addSubtask = () => {
        setSubtaskItems([...subtaskItems, null]);
        setAddTaskShowUp(false);
    };

    //For editing new tasks
    const setCurrentSubtask = (input, index) => {
        setSubtask(input);
        setCurrentIndex(index);
    }

    useEffect(() => {
        updateCurrentSubtask(currentIndex);
    }, [currentIndex])

    const updateCurrentSubtask = (index) => {
        let subtaskItemsCopy = [...subtaskItems];
        subtaskItemsCopy[index] = subtask;
        setSubtaskItems(subtaskItemsCopy);
        setAddTaskShowUp(true);
    }

    const removeInputField = (index) => {
        let subtaskItemsCopy = [...subtaskItems];
        subtaskItemsCopy.splice(index, 1);
        setSubtaskItems(subtaskItemsCopy);
        setAddTaskShowUp(true);
    }

    //For editing default tasks
    const updateSubtaskItemsArray = (input, index) => {
        if (route.params.pageToNavigate == "Today") {
            route.params.todayTaskItemSubtasks[index] = input;
            let subtaskArr = [...route.params.todayTaskItemSubtasks];
            let todayTasksSubtaskItemsCopy = [...route.params.todayTasksSubtaskItems];
            todayTasksSubtaskItemsCopy[route.params.index] = subtaskArr;
            route.params.setTodaySubtaskItems(todayTasksSubtaskItemsCopy);
        }
        
        if (route.params.pageToNavigate == "Tomorrow") {

            route.params.tomorrowTaskItemSubtasks[index] = input;
            let subtaskArr = [...route.params.tomorrowTaskItemSubtasks];
            let tomorrowTasksSubtaskItemsCopy = [...route.params.tomorrowTasksSubtaskItems];
            tomorrowTasksSubtaskItemsCopy[route.params.index] = subtaskArr;
            route.params.setTomorrowSubtaskItems(tomorrowTasksSubtaskItemsCopy);
        }
    }

    const [task, setTask] = useState(route.params.taskName);

    const handleEditTask = () => {
        if (task != "" && task != null) {

            if (route.params.pageToNavigate == "Today") {

                //Edit Task Name
                let todayTaskItemsCopy = [...route.params.todayTaskItems];
                todayTaskItemsCopy[route.params.index] = task;
                route.params.setTodayTaskItems(todayTaskItemsCopy);

                //Edit Subtask Items
                let subtaskArr = [];
                if (route.params.todayTaskItemSubtasks != null) {
                    subtaskArr = [...route.params.todayTaskItemSubtasks, ...subtaskItems];
                } else {
                    subtaskArr = [...subtaskItems];
                }

                //let subtaskArr = [...route.params.todayTaskItemSubtasks, ...subtaskItems];
                let todayTasksSubtaskItemsCopy = [...route.params.todayTasksSubtaskItems];
                todayTasksSubtaskItemsCopy[route.params.index] = subtaskArr;
                route.params.setTodaySubtaskItems(todayTasksSubtaskItemsCopy);

                // route.params.setTodayTaskStatus([...route.params.todayTaskStatus, "pending"])
                // route.params.setTodayTaskSchedules([...route.params.todayTaskSchedules, schedule])
            }

            if (route.params.pageToNavigate == "Tomorrow") {

                //Edit Task Name
                let tomorrowTaskItemsCopy = [...route.params.tomorrowTaskItems];
                tomorrowTaskItemsCopy[route.params.index] = task;
                route.params.setTomorrowTaskItems(tomorrowTaskItemsCopy);

                //Edit Subtask Items
                let subtaskArr = [...route.params.tomorrowTaskItemSubtasks, ...subtaskItems];
                let tomorrowTasksSubtaskItemsCopy = [...route.params.tomorrowTasksSubtaskItems];
                tomorrowTasksSubtaskItemsCopy[route.params.index] = subtaskArr;
                route.params.setTomorrowSubtaskItems(tomorrowTasksSubtaskItemsCopy);

                // route.params.setTomorrowTaskStatus([...route.params.tomorrowTaskStatus, "pending"])
                // route.params.setTomorrowTaskSchedules([...route.params.tomorrowTaskSchedules, route.params.tomorrow])
            }

            if (route.params.pageToNavigate == "Upcoming") {
                route.params.setNextWeekTaskItems([...route.params.nextWeekTaskItems, task])
                route.params.setNextWeekTaskStatus([...route.params.nextWeekTaskStatus, "pending"])
                route.params.setNextWeekTaskSchedules([...route.params.nextWeekTaskSchedules, route.params.nextWeek])
            }

            //setSchedule("default");
            setTask(null);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.Heading}>Edit task</Text>
                {/* <Text>{route.params.todayTaskItemSubtasks.length}</Text> */}
                {/* <Text>{subtaskItems.length}</Text> */}
                <View style={{ paddingBottom: 25 }}>
                    <Text style={styles.subHeading}>Task Name</Text>
                    <TextInput style={styles.input} placeholder={'Example: Wake up'} value={task} onChangeText={text => setTask(text)} />
                </View>

                <View style={{ paddingBottom: 25 }}>
                    <Text style={styles.subHeading}>Subtasks</Text>
                    {route.params.pageToNavigate == "Today" && route.params.todayTaskItemSubtasks != null && route.params.todayTaskItemSubtasks != "" &&
                        route.params.todayTaskItemSubtasks.map((item, index) => {
                            return (
                                <View key={index}>
                                    <Subtask text={item} key={index} index={index} isOnEditPage={true}
                                        updateSubtaskItemsArray={updateSubtaskItemsArray}
                                        isDefaultSubtask={true} value={forceUpdate}
                                        setValue={setForceUpdate} numOfSubtasks={subtaskItems.length} setCurrentSubtask={setCurrentSubtask} addSubtask={addSubtask} removeInputField={removeInputField} />
                                </View>
                            )
                        })
                    }
                    {route.params.pageToNavigate == "Tomorrow" &&
                        route.params.tomorrowTaskItemSubtasks.map((item, index) => {
                            return (
                                <View key={index}>
                                    <Subtask text={item} index={index} isOnEditPage={true}
                                        updateSubtaskItemsArray={updateSubtaskItemsArray}
                                        isDefaultSubtask={true} value={forceUpdate}
                                        setValue={setForceUpdate} numOfSubtasks={subtaskItems.length}
                                        setCurrentSubtask={setCurrentSubtask} addSubtask={addSubtask} removeInputField={removeInputField} />
                                </View>
                            )
                        })
                    }
                    {
                        subtaskItems.map((item, index) => {
                            return (
                                <View key={index}>
                                    <Subtask text={item} index={index} isOnEditPage={true} updateSubtaskItemsArray={updateSubtaskItemsArray}
                                        isDefaultSubtask={false} value={forceUpdate} setValue={setForceUpdate} numOfSubtasks={subtaskItems.length} setCurrentSubtask={setCurrentSubtask} addSubtask={addSubtask}
                                        removeInputField={removeInputField} />
                                </View>
                            )
                        })
                    }
                    {addTaskShowUp == true &&
                        <TouchableOpacity onPress={addSubtask}>
                            <Text style={styles.addSubtask}>+   New Subtask</Text>
                        </TouchableOpacity>
                    }
                </View>

                <View style={{ paddingBottom: 25 }}>
                    <Text style={styles.subHeading}>Notes</Text>
                    <TouchableOpacity style={styles.notesWrapper} onPress={showModal}><Text style={styles.placeholder}>Tap to add notes</Text></TouchableOpacity>
                </View>

                <View style={styles.fixToText}>
                    <TouchableOpacity onPress={() => { handleEditTask(); navigation.navigate('Home') }}
                        style={[styles.actionButton, { backgroundColor: '#F6A02D' }]}>
                        <Text style={styles.actionText}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Home')}
                        style={[styles.actionButton, { backgroundColor: '#FFECD9' }]}>
                        <Text style={[styles.actionText, { color: '#F6A02D' }]}>Cancel</Text>
                    </TouchableOpacity>
                </View>

                <Provider>
                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                            <TextInput placeholder={'Write a note...'} multiline={true} autoFocus={true} />
                        </Modal>
                    </Portal>
                </Provider>
            </View>
        </TouchableWithoutFeedback >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        paddingHorizontal: 20,
        backgroundColor: "#FFF"
    },
    Heading: {
        paddingTop: 25,
        paddingBottom: 30,
        fontSize: 22,
        fontWeight: "600"
    },
    subHeading: {
        fontSize: 18,
        fontWeight: "500",
        marginBottom: 8,
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 17,
        backgroundColor: '#FFF',
        borderRadius: 10,
        // borderColor: '#DCDBDB',
        // borderWidth: 1,
        shadowColor: '#DCDBDB',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
        width: "100%",
        height: 40,
    },
    notesWrapper: {
        width: "100%",
        height: 40,
        borderWidth: 2,
        borderStyle: 'dotted',
        borderColor: "#CCCBB7",
        borderRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    placeholder: {
        color: "#777",
        fontWeight: "500"
    },
    addSubtask: {
        fontSize: 15,
        color: "#444"
    },
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
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        width: "48%"
    },
    actionText: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    modalContainer: {
        backgroundColor: 'white',
        width: "90%",
        height: "35%",
        paddingLeft: 18,
        paddingRight: 18,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 250,
        borderRadius: 10,
        paddingTop: 10,
        justifyContent: "flex-start"
    }
});
export default DetailsScreen;
