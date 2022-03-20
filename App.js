import * as React from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';

import HomeScreen from './pages/HomeScreen';
import AddTaskScreen from './pages/AddTaskScreen';
import DetailsScreen from './pages/DetailsScreen';
import ProfileScreen from './pages/ProfileScreen';
import SettingsScreen from './pages/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={
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
          tabBarActiveTintColor: '#F6A02D',
          tabBarInactiveTintColor: '#F6C481',
        })}>
      <Tab.Screen
        name="Tasks"
        component={HomeScreen}
        options={{ title: 'Tasks', headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Feed"
      >
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{
            headerShown: false,
            tabBarLabel: 'Tasks',
          }}
        />
        <Stack.Screen
          name="AddTask"
          component={AddTaskScreen}
          options={{
            presentation: 'modal', title: 'Add Task', headerShown: false
          }}
        />
         <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            presentation: 'modal', title: 'Details Page', headerShown: false
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile Page'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;