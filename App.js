import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, StatusBar, Dimensions, Touchable, View, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Task from './components/Task';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Header } from 'react-navigation-stack';
import KeyboardListener from 'react-native-keyboard-listener';

function TasksScreen() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [taskStatus, setTaskStatus] = useState([]);
  const [iconName, setIconName] = useState("");
  const [keyboardStatus, setKeyboardStatus] = useState();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("show");
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("hide");
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    // let itemsCopy = [];
    // itemsCopy.fill("pending", 0, index);
    // itemsCopy[index] = "completed";
    // setTaskStatus({ taskStatus: itemsCopy });
  }

  const handleAddTask = () => {
    if (task != "" && task != null) {
      //Keyboard.dismiss();
      setTaskItems([...taskItems, task])
      setTask(null);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, keyboardStatus == "hide" ? styles.brightBackground : styles.dimBackground]}>

        <View style={styles.tasksWrapper}>
          <Text style={[styles.sectionTitle, keyboardStatus == "hide" ? styles.brightColor : styles.dimColor]}>ALL TASKS</Text>
          <View style={styles.items}>
            {
              taskItems.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Task text={item} />
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>

        <KeyboardAvoidingView
          // keyboardVerticalOffset={Header.HEIGHT}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.userInputWrapper}
        >
          <View style={[styles.OptionWrapper, keyboardStatus == "hide" ? styles.HideOptions : styles.ShowOptions]}>
            <TouchableOpacity>
              <View style={styles.scheduleTimeWrapper}>
                <Text><MaterialCommunityIcons name="bell-outline" size={24} color="#9598A1" /></Text>
                <Text style={styles.scheduleTime}>Tomorrow</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.writeTaskWrapper}>
            <TextInput style={styles.input} placeholder={'I want to...'} value={task} onChangeText={text => setTask(text)} />
            <TouchableOpacity onPress={() => handleAddTask()}>
              <View style={[styles.addWrapper, task != "" && task != null ? styles.blueBgColor : styles.greyBgColor]}>
                <Text style={styles.addText}><Ionicons name={keyboardStatus == "hide" ? "add" : "arrow-up-outline"} size={24} color="#fff" /></Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        <KeyboardListener
          onWillShow={() => setKeyboardStatus("show")}
          onWillHide={() => setKeyboardStatus("hide")}
        />
      </View >
    </TouchableWithoutFeedback >
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  const { width, height } = Dimensions.get("window");
  return (
    <View style={{
      width,
      height,
    }}>
      <Tab.Navigator screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Tasks') {
              iconName = focused
                ? 'ios-checkmark-circle'
                : 'ios-checkmark-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-settings-sharp' : 'ios-settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4A4A4A',
          tabBarInactiveTintColor: '#A2A2A2',
        })}>
        <Tab.Screen name="Tasks" component={TasksScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  brightBackground: {
    backgroundColor: '#FFF',
  },
  dimBackground: {
    backgroundColor: '#7F7F7F',
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
  items: {
    marginTop: 30,
  },
  OptionWrapper: {
    width: '100%',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 17,
    paddingVertical: 10,
  },
  scheduleTimeWrapper: {
    backgroundColor: '#F2F2F2',
    height: 30,
    borderRadius: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  scheduleTime: {
    color: '#9598A1',
    fontSize: 16
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
  }
});
