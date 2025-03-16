import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {BlurView} from '@react-native-community/blur';
import House from '../../assets/images/House.png';
// import BottomDrawer from '../../assets/images/bottom_nav.png';
import Hover from '../../assets/images/Hover.png';
import List from '../../assets/images/List.png';
import BottomPlus from '../../assets/images/bottom-plus.png';
// Import weather icons
// import MoonIcon from '../../assets/images/Moon.png';
// import CloudIcon from '../../assets/images/Cloud.png';
// import SunIcon from '../../assets/images/Sun.png';
// import RainIcon from '../../assets/images/Rain.png';
import {isHourMatch, useCounterStore} from '../../store/weaterStore';
import {convertToAMPM} from '../../helpers/dateTimeFormat';
import LinearGradient from 'react-native-linear-gradient';
export default function HomeView({navigation}) {
  //   const weatherReportList = [
  //     {
  //       time: '12 PM',
  //       temperature: 20,
  //       weather: 'Clear',
  //       icon: SunIcon,
  //       isSelected: false,
  //     },
  //     {
  //       time: 'NOW',
  //       temperature: 22,
  //       weather: 'Cloudy',
  //       icon: CloudIcon,
  //       isSelected: true,
  //     },
  //     {
  //       time: '6 PM',
  //       temperature: 19,
  //       weather: 'Rain',
  //       icon: RainIcon,
  //       isSelected: false,
  //     },
  //     {
  //       time: '9 PM',
  //       temperature: 18,
  //       weather: 'Night',
  //       icon: MoonIcon,
  //       isSelected: false,
  //     },
  //     {
  //       time: '12 AM',
  //       temperature: 18,
  //       weather: 'Night',
  //       icon: MoonIcon,
  //       isSelected: false,
  //     },
  //   ];
  const {getWeatherData, weatherData, forecastData} = useCounterStore();

  useEffect(() => {
    getWeatherData('Chandigarh');
  }, []);
  const onPressNav = nav => {
    if (nav === 'about') {
      navigation.navigate('About');
    } else if (nav === 'search') {
      navigation.navigate('Search');
    } else if (nav === 'list') {
      navigation.navigate('List');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.weatherContainer}>
        <Text style={styles.cityName}>{weatherData?.location?.name}</Text>
        <Text style={styles.temperature}>
          {weatherData?.current?.temp_c &&
            Math.floor(weatherData.current.temp_c)}
          °
        </Text>
        <Text style={styles.weatherDescription}>
          {weatherData?.current?.condition?.text}
        </Text>
        <Text style={styles.temperatureRange}>
          H:{Math.floor(forecastData?.day?.maxtemp_c)}° L:
          {Math.floor(forecastData?.day?.mintemp_c)}°
        </Text>
        <Image source={House} style={{width: 390, height: 390}} />
      </View>
      <View style={styles.bottomContainer}>
        <BlurView style={styles.blur} blurType="light" blurAmount={20} />
        <LinearGradient
          colors={['rgba(20,20,20,0.3)', 'rgba(50,50,50,0.5)']}
          style={styles.gradientOverlay}
        />

        <View style={styles.header}>
          <Text style={styles.headerText}>Hourly Forecast</Text>
          <Text style={styles.headerText}>Weekly Forecast</Text>
        </View>
        <View style={styles.forecastBottomBorder} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.forecastContainer}>
            {forecastData?.hour.map((item, index) => (
              <View
                key={item?.time_epoch}
                style={[
                  styles.forecastItem,
                  isHourMatch(item.time) && styles.selectedForecast,
                  {
                    marginLeft: index === 0 ? 20 : 0,
                    marginRight:
                      index === forecastData.hour.length - 1 ? 20 : 0,
                  },
                ]}>
                <Text style={styles.forecastTime}>
                  {convertToAMPM(item.time)}
                </Text>
                <Image
                  source={{uri: `https:${item?.condition?.icon}`}}
                  style={styles.forecastIcon}
                />
                <Text style={styles.forecastTemperature}>
                  {Math.floor(item?.temp_c)}°
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.bottomDrawer}>
          <TouchableOpacity
            onPress={() => {
              onPressNav('about');
            }}
            style={styles.mapButton}>
            <Image source={Hover} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPressNav('search');
            }}
            style={styles.button}>
            <Image source={BottomPlus} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPressNav('about');
            }}
            style={styles.listButton}>
            <Image source={List} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.otherContainer}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    height: '100vh',
    paddingTop: 120,
    // backgroundColor: 'red',
  },
  weatherContainer: {
    flex: 1,
    alignItems: 'center',
  },
  cityName: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: 'bold',
    color: '#fff',
  },
  temperature: {
    fontSize: 96,
    lineHeight: 105,
    fontWeight: 'thin',
    color: '#fff',
  },
  weatherDescription: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 'normal',
    color: 'rgba(235, 235, 245, 0.6)',
    marginTop: -10,
    textAlign: 'center',
  },
  temperatureRange: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 'normal',
    color: '#fff',
    textAlign: 'center',
  },
  bottomContainer: {
    height: 330,
    width: '100%',
    // backgroundColor: 'rgba(46, 51, 90, 0.5)',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 30,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderTopWidth: 2,

    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  forecastContainer: {
    flexDirection: 'row',
    // paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'space-between',
    overflow: 'scroll',
    gap: 10,
  },
  forecastItem: {
    alignItems: 'center',
    paddingVertical: 15,
    minWidth: 70,
    height: 'auto',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(72, 49, 157, 0.2)',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // Android Shadow
    elevation: 6,
  },
  forecastTime: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  forecastTemperature: {
    // fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  forecastIcon: {
    width: 40,
    height: 40,
    marginVertical: 8,
  },
  selectedForecast: {
    backgroundColor: '#48319D',
    borderRadius: 35,
  },
  forecastBottomBorder: {
    width: '200%',
    height: '100%',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: 'rgba(117, 130, 240, 0.5)',
    position: 'absolute',
    bottom: 65,
    left: '50%',
    transform: [{translateX: '-50%'}],
    borderRadius: '50%',
  },
  bottomDrawer: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  otherContainer: {
    backgroundColor: '#2E335A',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapButton: {
    marginRight: -10,
    marginLeft: 20,
    marginTop: 20,
  },
  listButton: {
    marginLeft: -10,
    marginRight: 20,
    marginTop: 20,
  },

  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
});
