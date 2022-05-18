import React, { useState, useEffect, useRef } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, Modal, Pressable, Dimensions, Touchable, Button, View, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from '../components/Task';
import ScheduleOption from '../components/ScheduleOption';
import { MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import KeyboardListener from 'react-native-keyboard-listener';
import * as Haptics from 'expo-haptics';
import DateTimePicker from '@react-native-community/datetimepicker';

const HomeScreen = ({ navigation }) => {
  const [forceUpdate, setForceUpdate] = useState(0);

  const [task, setTask] = useState();
  const [schedule, setSchedule] = useState("default");

  // const [taskItems, setTaskItems] = useState([]);
  // const [taskStatus, setTaskStatus] = useState([]);
  // const [taskSchedules, setTaskSchedules] = useState([]);

  const [todayTaskItems, setTodayTaskItems] = useState([]);
  const [todayTaskStatus, setTodayTaskStatus] = useState([]);
  const [todayTaskSchedules, setTodayTaskSchedules] = useState([]);
  const [todaySubtaskItems, setTodaySubtaskItems] = useState([[]]);

  const [tomorrowTaskItems, setTomorrowTaskItems] = useState([]);
  const [tomorrowTaskStatus, setTomorrowTaskStatus] = useState([]);
  const [tomorrowTaskSchedules, setTomorrowTaskSchedules] = useState([]);
  const [tomorrowSubtaskItems, setTomorrowSubtaskItems] = useState([[]]);

  const [nextWeekTaskItems, setNextWeekTaskItems] = useState([]);
  const [nextWeekTaskStatus, setNextWeekTaskStatus] = useState([]);
  const [nextWeekTaskSchedules, setNextWeekTaskSchedules] = useState([]);

  const [keyboardStatus, setKeyboardStatus] = useState("hide");

  /*Date Time Picker*/
  const [modalVisible, setModalVisible] = useState(false);
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [customSchedule, setCustomSchedule] = useState();
  const [showInputWrapper, setShowInputWrapper] = useState(true);

  const onChangeDatetime = (event, value) => {
    setDate(value);
  };

  const confirmCustomSchedule = () => {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    setCustomSchedule(day + "/" + month + "/" + year + " " + hour + ":" + minutes);
  };

  const [isInputFocused, setInputFocused] = useState(false);
  const [isModalInputFocused, setModalInputFocused] = useState(false);

  const inputRef = useRef(null);
  const modalInputRef = useRef(null);

  useEffect(() => {
    //console.log(isInputFocused);
    isInputFocused ? inputRef.current.focus() : inputRef.current.blur();
  }, [isInputFocused]);

  useEffect(() => {
    if (modalVisible == true) {
      isModalInputFocused ? modalInputRef.current.focus() : modalInputRef.current.blur();
    }
  }, [isModalInputFocused]);

  const handleInputFocus = () => setInputFocused(true);
  const handleInputBlur = () => setInputFocused(false);

  const handleModalInputFocus = () => setModalInputFocused(true);
  const handleModalInputBlur = () => setModalInputFocused(false);

  const handleOpenModalPress = () => {
    inputRef.current.blur();
    setModalVisible(true);
  };

  const handleCloseModalPress = () => {
    setModalVisible(false);
    inputRef.current.blur();
  }

  const switchSchedule = () => {
    setInputFocused(true);
    setModalVisible(false);
  }

  useEffect(() => {
    if (modalVisible == true) {
      setModalInputFocused(true);
    } else {
      setModalInputFocused(false);
    }
  }, [modalVisible]);


  useEffect(() => {
    if (schedule == custom && keyboardStatus == "show" && modalVisible == false && isInputFocused == true) {
      handleOpenModalPress();
    }
  });

  const today = new Date();
  const laterToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours() + 4, 0).toLocaleString();
  const thisEvening = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 0).toLocaleString();

  const tmr = new Date(today);
  tmr.setDate(tmr.getDate() + 1);
  const tomorrow = new Date(tmr.getFullYear(), tmr.getMonth(), tmr.getDate(), 9, 0).toLocaleString();

  const dayOfWeek = today.getDay();
  const dateOfSunday = new Date();
  dateOfSunday.setDate(today.getDate() + 7 - dayOfWeek);
  const nextWeek = new Date(dateOfSunday.getFullYear(), dateOfSunday.getMonth(), dateOfSunday.getDate(), 9, 0).toLocaleString();

  const someday = "Someday";
  const custom = "Custom";

  const getDisplayText = (assignedSchedule) => {
    switch (assignedSchedule) {
      case laterToday:
        return "Today, " + (today.getHours() + 4) + ":00";
      case thisEvening:
        return "Today, 18:00";
      case tomorrow:
        return tmr.toLocaleString('en-us', { weekday: 'long' }) + ", 09:00";
      case nextWeek:
        return "Sunday, 09:00";
      case "default":
        return "Today"
      default:
        return ""
    }
  }

  const handleAddTask = () => {
    if (task != "" && task != null) {

      if (schedule == laterToday || schedule == thisEvening || schedule == "default") {
        setTodayTaskItems([...todayTaskItems, task])
        setTodayTaskStatus([...todayTaskStatus, "pending"])
        setTodayTaskSchedules([...todayTaskSchedules, schedule])
        setTodaySubtaskItems([...todaySubtaskItems, null])
      }

      if (schedule == tomorrow) {
        setTomorrowTaskItems([...tomorrowTaskItems, task])
        setTomorrowTaskStatus([...tomorrowTaskStatus, "pending"])
        setTomorrowTaskSchedules([...tomorrowTaskSchedules, schedule])
        setTomorrowSubtaskItems([tomorrowSubtaskItems, null])
      }

      if (schedule == nextWeek) {
        setNextWeekTaskItems([...nextWeekTaskItems, task])
        setNextWeekTaskStatus([...nextWeekTaskStatus, "pending"])
        setNextWeekTaskSchedules([...nextWeekTaskSchedules, schedule])
      }

      setSchedule("default");
      setTask(null);
    }
  }

  const assignSchedule = (option) => {
    if (schedule != option) {
      setSchedule(option);
    } else {
      setSchedule("default");
    }
  }

  const completeTask = (index, schedule) => {

    if (schedule == laterToday || schedule == thisEvening || schedule == "default") {
      let todayItemsCopy = [...todayTaskStatus];
      if (todayItemsCopy[index] == "completed") {
        todayItemsCopy[index] = "pending"
      } else {
        todayItemsCopy[index] = "completed";
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      setTodayTaskStatus(todayItemsCopy);
    }

    if (schedule == tomorrow) {
      let tomorrowItemsCopy = [...tomorrowTaskStatus];
      if (tomorrowItemsCopy[index] == "completed") {
        tomorrowItemsCopy[index] = "pending"
      } else {
        tomorrowItemsCopy[index] = "completed";
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      setTomorrowTaskStatus(tomorrowItemsCopy);
    }

    if (schedule == nextWeek) {
      let nextWeekItemsCopy = [...nextWeekTaskStatus];
      if (nextWeekItemsCopy[index] == "completed") {
        nextWeekItemsCopy[index] = "pending"
      } else {
        nextWeekItemsCopy[index] = "completed";
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      setNextWeekTaskStatus(nextWeekItemsCopy);
    }
  }

  const deleteTask = (index, schedule) => {
    // let itemsCopy = [...taskItems];
    // itemsCopy.splice(index, 1);
    // setTaskItems(itemsCopy);

    if (schedule == laterToday || schedule == thisEvening || schedule == "default") {
      let todayItemsCopy = [...todayTaskItems];
      todayItemsCopy.splice(index, 1);
      setTodayTaskItems(todayItemsCopy);

      let todaySubtaskItemsCopy = [...todaySubtaskItems];
      todaySubtaskItemsCopy.splice(index, 1);
      setTodaySubtaskItems(todaySubtaskItemsCopy);

      let todayStatusCopy = [...todayTaskStatus];
      todayStatusCopy.splice(index, 1);
      setTodayTaskStatus(todayStatusCopy);

      let todayScheduleCopy = [...todayTaskSchedules];
      todayScheduleCopy.splice(index, 1);
      setTodayTaskSchedules(todayScheduleCopy);
    }

    if (schedule == tomorrow) {
      let tomorrowItemsCopy = [...tomorrowTaskItems];
      tomorrowItemsCopy.splice(index, 1);
      setTomorrowTaskItems(tomorrowItemsCopy);

      let tomorrowSubtaskItemsCopy = [...tomorrowSubtaskItems];
      tomorrowSubtaskItemsCopy.splice(index, 1);
      setTomorrowSubtaskItems(tomorrowSubtaskItemsCopy);

      let tomorrowStatusCopy = [...tomorrowTaskStatus];
      tomorrowStatusCopy.splice(index, 1);
      setTomorrowTaskStatus(tomorrowStatusCopy);

      let tomorrowScheduleCopy = [...tomorrowTaskSchedules];
      tomorrowScheduleCopy.splice(index, 1);
      setTomorrowTaskSchedules(tomorrowScheduleCopy);
    }

    if (schedule == nextWeek) {
      let nextWeekItemsCopy = [...nextWeekTaskItems];
      nextWeekItemsCopy.splice(index, 1);
      setNextWeekTaskItems(nextWeekItemsCopy);

      let nextWeekStatusCopy = [...nextWeekTaskStatus];
      nextWeekStatusCopy.splice(index, 1);
      setNextWeekTaskStatus(nextWeekStatusCopy);

      let nextWeekScheduleCopy = [...nextWeekTaskSchedules];
      nextWeekScheduleCopy.splice(index, 1);
      setNextWeekTaskSchedules(nextWeekScheduleCopy);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, isInputFocused == true || modalVisible == true ? styles.dimBackground : styles.brightBackground]}>
        <View style={styles.tasksWrapper}>
          <Text style={[styles.sectionTitle, isInputFocused == true || modalVisible == true ? styles.dimColor : styles.brightColor]}>
            <MaterialCommunityIcons name="text" size={32} color="#4A4A4A" />
            <Text style={{ fontSize: 24 }}>ALL TASKS</Text>
            {/* <Text>{date.toString}</Text> */}
          </Text>
          <View style={styles.items}>
            <View style={styles.header}>
              <Text style={styles.heading}>TODAY</Text>
              <TouchableOpacity style={styles.addIcon} onPress={() => navigation.navigate('AddTask', {
                pageToNavigate: "Today",
                todayTaskItemSubtasks: todayTaskItems,
                setTodayTaskItems: setTodayTaskItems,
                todayTaskStatus: todayTaskStatus,
                setTodayTaskStatus, setTodayTaskStatus,
                todayTaskSchedules: todayTaskSchedules,
                setTodayTaskSchedules: setTodayTaskSchedules,
                todayTasksSubtaskItems: todaySubtaskItems,
                setTodaySubtaskItems: setTodaySubtaskItems
              })}>
                <View style={styles.addScheduledTaskWrapper}>
                  <Text><Ionicons name={"add"} size={21} color="#FFF" /></Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.taskList}>
              {
                todayTaskItems.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => {
                      setForceUpdate(forceUpdate => forceUpdate + 1);
                      navigation.navigate('Details',
                        {
                          value: forceUpdate,
                          taskName: item,
                          todayTaskItemSubtasks: todaySubtaskItems[index], //an array of the subtasks of the current task
                          index: index,
                          pageToNavigate: "Today",
                          todayTaskItems: todayTaskItems,
                          setTodayTaskItems: setTodayTaskItems,
                          todayTasksSubtaskItems: todaySubtaskItems, //a jagged array [[subtasks of task 1], [subtasks of task 2]...]
                          setTodaySubtaskItems: setTodaySubtaskItems
                          // todayTaskStatus: todayTaskStatus,
                          // setTodayTaskStatus, setTodayTaskStatus,
                          // todayTaskSchedules: todayTaskSchedules,
                          // setTodayTaskSchedules: setTodayTaskSchedules,
                        })
                    }}>
                      <Task text={item} key={index} status={todayTaskStatus[index]} schedule={getDisplayText(todayTaskSchedules[index])} onPressSquare={() => completeTask(index, todayTaskSchedules[index])} onPressCircular={() => deleteTask(index, todayTaskSchedules[index])} />
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
          <View style={styles.items}>
            <View style={styles.header}>
              <Text style={styles.heading}>TOMORROW</Text>
              <TouchableOpacity style={styles.addIcon} onPress={() => navigation.navigate('AddTask',
                {
                  pageToNavigate: "Tomorrow",
                  tomorrow: tomorrow,
                  tomorrowTaskItems: tomorrowTaskItems,
                  setTomorrowTaskItems: setTomorrowTaskItems,
                  tomorrowTaskStatus: tomorrowTaskStatus,
                  setTomorrowTaskStatus, setTomorrowTaskStatus,
                  tomorrowTaskSchedules: tomorrowTaskSchedules,
                  setTomorrowTaskSchedules: setTomorrowTaskSchedules,
                  tomorrowSubtaskItems: tomorrowSubtaskItems,
                  setTomorrowSubtaskItems: setTomorrowSubtaskItems
                })}>
                <View style={styles.addScheduledTaskWrapper}>
                  <Text><Ionicons name={"add"} size={21} color="#FFF" /></Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.taskList}>
              {
                tomorrowTaskItems.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => navigation.navigate('Details',
                      {
                        taskName: item,
                        tomorrowSubtasks: tomorrowSubtaskItems[index], //a 1d array of the subtasks of the task
                        index: index,
                        pageToNavigate: "Tomorrow",
                        tomorrowTaskItems: tomorrowTaskItems,
                        setTomorrowTaskItems: setTomorrowTaskItems,
                        tomorrowTasksSubtaskItems: tomorrowSubtaskItems, //a two-dimensional array [[subtasks of task 1], [subtasks of task 2]...]
                        setTomorrowSubtaskItems: setTomorrowSubtaskItems
                      })}>
                      <Task text={item} key={index} status={tomorrowTaskStatus[index]} schedule={getDisplayText(tomorrowTaskSchedules[index])} onPressSquare={() => completeTask(index, tomorrowTaskSchedules[index])} onPressCircular={() => deleteTask(index, tomorrowTaskSchedules[index])} />
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
          <View style={styles.items}>
            <View style={styles.header}>
              <Text style={styles.heading}>UPCOMING</Text>
              <TouchableOpacity style={styles.addIcon} onPress={() => navigation.navigate('AddTask',
                {
                  pageToNavigate: "Upcoming",
                  nextWeek: nextWeek,
                  nextWeekTaskItems: nextWeekTaskItems,
                  setNextWeekTaskItems: setNextWeekTaskItems,
                  nextWeekTaskStatus: nextWeekTaskStatus,
                  setNextWeekTaskStatus, setNextWeekTaskStatus,
                  nextWeekTaskSchedules: nextWeekTaskSchedules,
                  setNextWeekTaskSchedules: setNextWeekTaskSchedules,
                })}>
                <View style={styles.addScheduledTaskWrapper}>
                  <Text><Ionicons name={"add"} size={21} color="#FFF" /></Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.taskList}>
              {
                nextWeekTaskItems.map((item, index) => {
                  return (
                    <Task text={item} key={index} status={nextWeekTaskStatus[index]} schedule={getDisplayText(nextWeekTaskSchedules[index])} onPressSquare={() => completeTask(index, nextWeekTaskSchedules[index])} onPressCircular={() => deleteTask(index, nextWeekTaskSchedules[index])} />
                  )
                })
              }
            </View>
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.userInputWrapper}
        >
          <View>
            {isInputFocused == true &&
              <ScrollView horizontal={true} keyboardShouldPersistTaps={'always'} style={styles.OptionWrapper}>
                <TouchableOpacity activeOpacity={1} onPress={() => { handleOpenModalPress(); assignSchedule(custom) }}>
                  <ScheduleOption text="Custom" value={custom} selection={schedule} />
                </TouchableOpacity>

                {new Date().getHours() < 14 &&
                  <TouchableOpacity activeOpacity={1} onPress={() => assignSchedule(laterToday)}>
                    <ScheduleOption text="Later today" value={laterToday} selection={schedule} />
                  </TouchableOpacity>
                }
                {
                  <TouchableOpacity activeOpacity={1} onPress={() => assignSchedule(thisEvening)}>
                    <ScheduleOption text="This evening" value={thisEvening} selection={schedule} />
                  </TouchableOpacity>
                }
                <TouchableOpacity activeOpacity={1} onPress={() => assignSchedule(tomorrow)}>
                  <ScheduleOption text="Tomorrow" value={tomorrow} selection={schedule} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => assignSchedule(nextWeek)}>
                  <ScheduleOption text="Next week" value={nextWeek} selection={schedule} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={{ marginRight: 14 }} onPress={() => assignSchedule(someday)}>
                  <ScheduleOption text="Someday" value={someday} selection={schedule} />
                </TouchableOpacity>
              </ScrollView>
            }

            <View style={styles.writeTaskWrapper}>
              <TextInput ref={inputRef} onFocus={handleInputFocus} onBlur={handleInputBlur} style={styles.input} placeholder={'I want to...'} value={task} onChangeText={text => setTask(text)} />
              <TouchableOpacity activeOpacity={task != "" && task != null ? 1 : 1} onPress={() => handleAddTask()}>
                <View style={[styles.addWrapper, task != "" && task != null ? styles.orangeBgColor : styles.whiteBgColor]}>
                  <Ionicons name={isInputFocused == true ? "arrow-up-outline" : "add"} size={24} color={task != "" && task != null ? "#FFF" : "#4A4A4A"} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>

        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModalPress}
        >
          <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPressOut={handleCloseModalPress}
          ></TouchableOpacity>

          <View style={{ position: 'absolute', bottom: 300 }}>
            <View style={styles.writeTaskWrapper}>
              <TextInput ref={modalInputRef} showSoftInputOnFocus={false} onFocus={handleModalInputFocus} onBlur={handleModalInputBlur} autofocus={true} style={styles.input} placeholder={'I want to...'} value={task} onChangeText={text => setTask(text)} />
              <TouchableOpacity activeOpacity={task != "" && task != null ? 1 : 1} onPress={() => handleAddTask()}>
                <View style={[styles.addWrapper, task != "" && task != null ? styles.orangeBgColor : styles.whiteBgColor]}>
                  <Ionicons name={"arrow-up-outline"} size={24} color={task != "" && task != null ? "#FFF" : "#4A4A4A"} />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.centeredView}>
            <ScrollView horizontal={true} style={[styles.OptionWrapper, { position: 'absolute', bottom: 352 }]}>
              <TouchableOpacity activeOpacity={1}
                onPress={() => { assignSchedule(custom) }}>
                <ScheduleOption text={customSchedule == null ? "Custom" : customSchedule} value={custom} selection={schedule} />
              </TouchableOpacity>
              {/* <TouchableOpacity activeOpacity={1}>
                <ScheduleOption text="Custom" isSelected={true} />
              </TouchableOpacity> */}

              {new Date().getHours() < 14 &&
                <TouchableOpacity onPress={() => { switchSchedule(); assignSchedule(laterToday); }}>
                  <ScheduleOption text="Later today" value={laterToday} selection={schedule} />
                </TouchableOpacity>
              }
              <TouchableOpacity activeOpacity={1} onPress={() => { switchSchedule(); assignSchedule(thisEvening); }}>
                <ScheduleOption text="This evening" value={thisEvening} selection={schedule} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} onPress={() => assignSchedule(tomorrow)}>
                <ScheduleOption text="Tomorrow" value={tomorrow} selection={schedule} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} onPress={() => assignSchedule(nextWeek)}>
                <ScheduleOption text="Next week" value={nextWeek} selection={schedule} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} style={{ marginRight: 14 }} onPress={() => assignSchedule(someday)}>
                <ScheduleOption text="Someday" value={someday} selection={schedule} />
              </TouchableOpacity>
            </ScrollView>

            <View style={styles.modalView}>
              <View style={styles.setCustomScheduleWrapper}>
                <Text style={styles.customTimeDisplayText}>Custom Time</Text>
                <View style={styles.confirmScheduleButton}>
                  <TouchableOpacity onPress={confirmCustomSchedule}>
                    <View style={styles.actionIcon}><AntDesign name="check" size={24} color='rgb(80, 80, 80)' /></View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleCloseModalPress}>
                    <View style={styles.actionIcon}><AntDesign name="close" size={24} color='rgb(164, 164, 164)' /></View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* The date picker */}
              <DateTimePicker
                value={date}
                mode={'datetime'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                onChange={onChangeDatetime}
                style={styles.datePicker}
              />
            </View>
          </View>
        </Modal>

        <KeyboardListener
          onWillShow={() => setKeyboardStatus("show")}
          onWillHide={() => { setKeyboardStatus("hide") }}
        />
      </View >
    </TouchableWithoutFeedback >
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  brightBackground: {
    backgroundColor: '#FFF',
  },
  dimBackground: {
    backgroundColor: '#F2F2F2',
  },
  tasksWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: "left",
    marginBottom: 10
  },
  brightColor: {
    color: "#4A4A4A"
  },
  dimColor: {
    color: "#252525"
  },
  header: {
    flexDirection: 'row',
  },
  heading: {
    fontSize: 23,
    fontWeight: "500",
    paddingLeft: 5,
    marginBottom: 15
  },
  addIcon: {
    marginLeft: 'auto'
  },
  items: {
    marginTop: 20,
  },
  taskList: {
    flexDirection: 'column-reverse'
  },
  OptionWrapper: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  userInputWrapper: {
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
  },
  writeTaskWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFD8AB',
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 17,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#DCDBDB',
    borderWidth: 0,
    width: 315,
    height: 40,
    marginLeft: 5,
    marginBottom: 6,
    marginTop: 6
  },
  addScheduledTaskWrapper: {
    width: 30,
    height: 30,
    backgroundColor: '#F6A02D',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#F6A02D',
    borderWidth: 1,
    shadowColor: '#F6A02D',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  addWrapper: {
    width: 40,
    height: 40,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#DCDBDB',
    borderWidth: 0,
    marginRight: 5
  },
  whiteBgColor: {
    backgroundColor: '#FFF',
  },
  orangeBgColor: {
    backgroundColor: '#F6A02D',
  },
  addText: {

  },
  HideOptions: {
    display: "none"
  },
  ShowOptions: {
    display: "flex"
  },
  datePicker: {
    width: "100%",
    zIndex: 999,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0
  },
  modalView: {
    width: '100%',
    height: 300,
    backgroundColor: "white",
    elevation: 5,
    position: 'absolute',
    bottom: 0,
  },
  datetimePickerWrapper: {
    padding: 35,
    alignItems: "center",
  },
  customTimeDisplayText: {
    alignItems: "flex-start",
  },
  setCustomScheduleWrapper: {
    padding: 20,
    flexDirection: 'row',
  },
  confirmScheduleButton: {
    marginLeft: 'auto',
    flexDirection: 'row',
    paddingRight: 7
  },
  actionIcon: {
    paddingLeft: 20,
    // backgroundColor: '#000'
  }
});
export default HomeScreen;
