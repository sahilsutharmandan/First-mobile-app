import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import HomeView from './components/home/homeView';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchView from './components/home/searchView';
import WeatherDetails from './components/home/weatherDetails';

const Stack = createNativeStackNavigator();

function HomeScreen({navigation}) {
  return (
    <ImageBackground
      source={require('./assets/images/background.png')}
      style={styles.background}>
      <HomeView navigation={navigation} />
    </ImageBackground>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Search"
          component={SearchView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Details"
          component={WeatherDetails}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
});
