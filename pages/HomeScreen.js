import React, { useState, useEffect } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, Modal, Pressable, Dimensions, Touchable, Button, View, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from '../components/Task';
import ScheduleOption from '../components/ScheduleOption';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
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
  const [showInputWrapper, setShowInputWrapper] = useState(true);

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  useEffect(() => {
    console.log("modalVisible: " + modalVisible);
    if (modalVisible == false)
      setShowInputWrapper(true)
    console.log("showInputWrapper: " + showInputWrapper);
  }, [modalVisible]);

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
        setTodaySubtaskItems([todaySubtaskItems, null])
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
      <View style={[styles.container, keyboardStatus == "show" || modalVisible == true ? styles.dimBackground : styles.brightBackground]}>
        <View style={styles.tasksWrapper}>
          <Text style={[styles.sectionTitle, keyboardStatus == "show" || modalVisible == true ? styles.dimColor : styles.brightColor]}>
            <MaterialCommunityIcons name="text" size={32} color="#4A4A4A" />
            <Text style={{ fontSize: 24 }}>ALL TASKS</Text>
          </Text>
          <View style={styles.items}>
            <View style={styles.header}>
              <Text style={styles.heading}>TODAY</Text>
              <TouchableOpacity style={styles.addIcon} onPress={() => navigation.navigate('AddTask', {
                pageToNavigate: "Today",
                todayTaskItems: todayTaskItems,
                setTodayTaskItems: setTodayTaskItems,
                todayTaskStatus: todayTaskStatus,
                setTodayTaskStatus, setTodayTaskStatus,
                todayTaskSchedules: todayTaskSchedules,
                setTodayTaskSchedules: setTodayTaskSchedules,
                todaySubtaskItems: todaySubtaskItems,
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
                    <TouchableOpacity onPress={() => {
                      setForceUpdate(forceUpdate => forceUpdate + 1);
                      navigation.navigate('Details',
                        {
                          value: forceUpdate,
                          taskName: item,
                          todaySubtasks: todaySubtaskItems[index], //an array of the subtasks of the current task
                          index: index,
                          pageToNavigate: "Today",
                          todayTaskItems: todayTaskItems,
                          setTodayTaskItems: setTodayTaskItems,
                          todaySubtaskItems: todaySubtaskItems, //a jagged array [[subtasks of task 1], [subtasks of task 2]...]
                          setTodaySubtaskItems: setTodaySubtaskItems
                          // todayTaskStatus: todayTaskStatus,
                          // setTodayTaskStatus, setTodayTaskStatus,
                          // todayTaskSchedules: todayTaskSchedules,
                          // setTodayTaskSchedules: setTodayTaskSchedules,
                        })
                    }}>
                      <Text>{todaySubtaskItems[index]}</Text>
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
                    <TouchableOpacity onPress={() => navigation.navigate('Details',
                      {
                        taskName: item,
                        tomorrowSubtasks: tomorrowSubtaskItems[index], //a 1d array of the subtasks of the task
                        index: index,
                        pageToNavigate: "Tomorrow",
                        tomorrowTaskItems: tomorrowTaskItems,
                        setTomorrowTaskItems: setTomorrowTaskItems,
                        tomorrowSubtaskItems: tomorrowSubtaskItems, //a two-dimensional array [[subtasks of task 1], [subtasks of task 2]...]
                        setTomorrowSubtaskItems: setTomorrowSubtaskItems
                      })}>
                      {/* <Text>{tomorrowSubtaskItems[index]}</Text> */}
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
          style={[styles.userInputWrapper, showInputWrapper == true ? styles.bottomPosition : null]}
        >
          {showInputWrapper == true &&
            <View>
              {keyboardStatus == "show" &&
                <ScrollView horizontal={true} keyboardShouldPersistTaps={'always'} style={styles.OptionWrapper}>
                  <TouchableOpacity activeOpacity={1} onPress={() => { Keyboard.dismiss(); setShowInputWrapper(false); setModalVisible(true); }}>
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
                <TextInput style={styles.input} placeholder={'I want to...'} value={task} onChangeText={text => setTask(text)} />
                <TouchableOpacity activeOpacity={task != "" && task != null ? 1 : 1} onPress={() => handleAddTask()}>
                  <View style={[styles.addWrapper, task != "" && task != null ? styles.orangeBgColor : styles.whiteBgColor]}>
                    <Ionicons name={keyboardStatus == "show" ? "arrow-up-outline" : "add"} size={24} color={task != "" && task != null ? "#FFF" : "#4A4A4A"} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          }
        </KeyboardAvoidingView>

        <Modal
          animationInTiming={1}
          animationOutTiming={200}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPressOut={() => { setModalVisible(false); }}
          ></TouchableOpacity>

          {/* <View style={{ position: 'absolute', bottom: 300 }}>
            <ScrollView horizontal={true} style={styles.OptionWrapper}>
              <TouchableOpacity activeOpacity={1}>
                <ScheduleOption text="Custom" isSelected={true}/>
              </TouchableOpacity>

              {new Date().getHours() < 14 &&
                <Pressable onPress={() => assignSchedule(laterToday)}>
                  <ScheduleOption text="Later today" value={laterToday} selection={schedule} />
                </Pressable>
              }
              {
                <Pressable onPress={() => assignSchedule(thisEvening)}>
                  <ScheduleOption text="This evening" value={thisEvening} selection={schedule} />
                </Pressable>
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

            <View style={styles.writeTaskWrapper}>
              <TextInput style={styles.input} placeholder={'I want to...'} value={task} onChangeText={text => setTask(text)} />
              <TouchableOpacity activeOpacity={task != "" && task != null ? 1 : 1} onPress={() => handleAddTask()}>
                <View style={[styles.addWrapper, task != "" && task != null ? styles.orangeBgColor : styles.whiteBgColor]}>
                  <Ionicons name={"arrow-up-outline"} size={24} color={task != "" && task != null ? "#FFF" : "#4A4A4A"} />
                </View>
              </TouchableOpacity>
            </View>
          </View> */}

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* The date picker */}
              <DateTimePicker
                value={date}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                onChange={onChange}
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
  },
  bottomPosition: {
    position: 'absolute',
    bottom: 0,
  },
  writeTaskWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFD8AB'
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
    zIndex: 999
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
    padding: 35,
    alignItems: "center",
    elevation: 5,
    position: 'absolute',
    bottom: 0,
  },
});
export default HomeScreen;
