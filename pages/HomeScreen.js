import React, { useState, useEffect } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, Dimensions, Touchable, Button, View, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from '../components/Task';
import ScheduleOption from '../components/ScheduleOption';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-navigation-stack';
import KeyboardListener from 'react-native-keyboard-listener';
import useKeyboardHeight from 'react-native-use-keyboard-height';
import * as Haptics from 'expo-haptics';
import DateTimePicker from '@react-native-community/datetimepicker';

const HomeScreen = ({ navigation }) => {

  const [task, setTask] = useState();
  const [schedule, setSchedule] = useState("default");

  // const [taskItems, setTaskItems] = useState([]);
  // const [taskStatus, setTaskStatus] = useState([]);
  // const [taskSchedules, setTaskSchedules] = useState([]);

  const [todayTaskItems, setTodayTaskItems] = useState([]);
  const [todayTaskStatus, setTodayTaskStatus] = useState([]);
  const [todayTaskSchedules, setTodayTaskSchedules] = useState([]);

  const [tomorrowTaskItems, setTomorrowTaskItems] = useState([]);
  const [tomorrowTaskStatus, setTomorrowTaskStatus] = useState([]);
  const [tomorrowTaskSchedules, setTomorrowTaskSchedules] = useState([]);

  const [nextWeekTaskItems, setNextWeekTaskItems] = useState([]);
  const [nextWeekTaskStatus, setNextWeekTaskStatus] = useState([]);
  const [nextWeekTaskSchedules, setNextWeekTaskSchedules] = useState([]);

  const [keyboardStatus, setKeyboardStatus] = useState("hide");
  const keyboardHeight = useKeyboardHeight();

  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  const showPicker = () => {
    setIsPickerShow(true);
    //Keyboard.dismiss();
  };

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  const [show, setShow] = useState(true);

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
        return (today.getHours() + 4) + ":00";
      case thisEvening:
        return "18:00";
      case tomorrow:
        return tmr.toLocaleString('en-us', { weekday: 'long' }) + ", 09:00";
      case nextWeek:
        return "Sunday, 09:00";
      case "default":
        return "default"
      default:
        return ""
    }
  }

  const completeTask = (index, schedule) => {
    // let itemsCopy = [...taskStatus];
    // if (itemsCopy[index] == "completed") {
    //   itemsCopy[index] = "pending"
    // } else {
    //   itemsCopy[index] = "completed";
    //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // }
    // setTaskStatus(itemsCopy);

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

  const handleAddTask = () => {
    if (task != "" && task != null) {

      if (schedule == laterToday || schedule == thisEvening || schedule == "default") {
        setTodayTaskItems([...todayTaskItems, task])
        setTodayTaskStatus([...todayTaskStatus, "pending"])
        setTodayTaskSchedules([...todayTaskSchedules, schedule])
      }

      if (schedule == tomorrow) {
        setTomorrowTaskItems([...tomorrowTaskItems, task])
        setTomorrowTaskStatus([...tomorrowTaskStatus, "pending"])
        setTomorrowTaskSchedules([...tomorrowTaskSchedules, schedule])
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, keyboardStatus == "hide" ? styles.brightBackground : styles.dimBackground]}>
        <View style={styles.tasksWrapper}>
          <Text style={[styles.sectionTitle, keyboardStatus == "hide" ? styles.brightColor : styles.dimColor]}>ALL TASKS</Text>
          <View style={styles.items}>
            <View style={styles.header}>
              <Text style={styles.heading}>Today</Text>
              <TouchableOpacity style={styles.addIcon} onPress={() => navigation.navigate('Details')}>
                <Text><Ionicons name={"add"} size={26} color="#444" /></Text>
              </TouchableOpacity>
            </View>
            <View style={styles.taskList}>
              {
                todayTaskItems.map((item, index) => {
                  return (
                    <Task text={item} status={todayTaskStatus[index]} schedule={getDisplayText(todayTaskSchedules[index])} index={index} onPressSquare={() => completeTask(index, todayTaskSchedules[index])} onPressCircular={() => deleteTask(index, todayTaskSchedules[index])} />
                  )
                })
              }
            </View>
          </View>
          <View style={styles.items}>
            <View style={styles.header}>
              <Text style={styles.heading}>Tomorrow</Text>
              <TouchableOpacity style={styles.addIcon} onPress={() => navigation.navigate('Details')}>
                <Text><Ionicons name={"add"} size={26} color="#444" /></Text>
              </TouchableOpacity>
            </View>
            <View style={styles.taskList}>
              {
                tomorrowTaskItems.map((item, index) => {
                  return (
                    <Task text={item} status={tomorrowTaskStatus[index]} schedule={getDisplayText(tomorrowTaskSchedules[index])} index={index} onPressSquare={() => completeTask(index, tomorrowTaskSchedules[index])} onPressCircular={() => deleteTask(index, tomorrowTaskSchedules[index])} />
                  )
                })
              }
            </View>
          </View>
          <View style={styles.items}>
            <View style={styles.header}>
              <Text style={styles.heading}>Upcoming</Text>
              <TouchableOpacity style={styles.addIcon} onPress={() => navigation.navigate('Details')}>
                <Text><Ionicons name={"add"} size={26} color="#444" /></Text>
              </TouchableOpacity>
            </View>
            <View style={styles.taskList}>
              {
                nextWeekTaskItems.map((item, index) => {
                  return (
                    <Task text={item} status={nextWeekTaskStatus[index]} schedule={getDisplayText(nextWeekTaskSchedules[index])} index={index} onPressSquare={() => completeTask(index, nextWeekTaskSchedules[index])} onPressCircular={() => deleteTask(index, nextWeekTaskSchedules[index])} />
                  )
                })
              }
            </View>
          </View>
        </View>

        <Button
          onPress={() => navigation.navigate('Details')}
          title="Open Modal"
        />
        <KeyboardAvoidingView
          // keyboardVerticalOffset={Header.HEIGHT}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.userInputWrapper}
        >
          <View>
            <ScrollView horizontal={true} keyboardShouldPersistTaps={'always'} style={[styles.OptionWrapper, keyboardStatus == "hide" ? styles.HideOptions : styles.ShowOptions]}>
              {/* <Button title="Custom" color="purple" onPress={showPicker} /> */}
              <TouchableOpacity activeOpacity={1} onPress={() => assignSchedule(custom)}>
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

            <View style={styles.writeTaskWrapper}>
              <TextInput style={styles.input} placeholder={'I want to...'} value={task} onChangeText={text => setTask(text)} />
              <TouchableOpacity activeOpacity={task != "" && task != null ? 1 : 1} onPress={() => handleAddTask()}>
                <View style={[styles.addWrapper, task != "" && task != null ? styles.blueBgColor : styles.greyBgColor]}>
                  <Text style={styles.addText}><Ionicons name={keyboardStatus == "hide" ? "add" : "arrow-up-outline"} size={24} color="#fff" /></Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>

        {/* The date picker */}
        {/* {isPickerShow && (
            <DateTimePicker
              value={date}
              mode={'date'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={onChange}
              style={styles.datePicker}
            />
          )} */}

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
  bottomSheetContainer: {
    flex: 1,
    backgroundColor: "#808080",
    alignItems: "center",
    justifyContent: "center",
  },
  brightBackground: {
    backgroundColor: '#FFF',
  },
  dimBackground: {
    backgroundColor: '#808080',
  },
  tasksWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: "center",
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
    fontSize: 21,
    fontWeight: "600",
    paddingLeft: 5,
  },
  addIcon: {
    marginLeft: 'auto'
  },
  items: {
    marginTop: 30,
    marginBottom: 10,
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
    backgroundColor: '#ECECEC'
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
  greyBgColor: {
    backgroundColor: '#D2D2D2',
  },
  blueBgColor: {
    backgroundColor: '#0083FF',
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
    position: 'absolute',
    bottom: 0,
    zIndex: 999
  },
});
export default HomeScreen;
