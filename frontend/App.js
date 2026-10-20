import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Impor semua layar komponen
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import PersonalizationScreen from './src/screens/PersonalizationScreen';
import HomeScreen from './src/screens/HomeScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import WorkoutDetailScreen from './src/screens/WorkoutDetailScreen';
import EditExerciseScreen from './src/screens/EditExerciseScreen';
import ActiveWorkoutScreen from './src/screens/ActiveWorkoutScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import CreateGroupScreen from './src/screens/CreateGroupScreen';
import SearchGroupScreen from './src/screens/SearchGroupScreen';
import GroupChatScreen from './src/screens/GroupChatScreen';
import ReportScreen from './src/screens/ReportScreen';
import SettingsScreen from './src/screens/SettingsScreen'; // Impor SettingsScreen

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Personalization" 
          component={PersonalizationScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Discover" 
          component={DiscoverScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="WorkoutDetail" 
          component={WorkoutDetailScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="EditExercise" 
          component={EditExerciseScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ActiveWorkout" 
          component={ActiveWorkoutScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Community" 
          component={CommunityScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="CreateGroup" 
          component={CreateGroupScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="SearchGroup" 
          component={SearchGroupScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="GroupChat" 
          component={GroupChatScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Report" 
          component={ReportScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}