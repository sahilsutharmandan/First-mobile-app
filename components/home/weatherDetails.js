import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {isHourMatch, useCounterStore} from '../../store/weaterStore';
import {BlurView} from '@react-native-community/blur';
import {convertToAMPM} from '../../helpers/dateTimeFormat';
import sunRise from '../../assets/images/sunrise.png';
import sunSet from '../../assets/images/sunsets.png';
export default function WeatherDetails({route}) {
  const {city, country} = route.params;
  const {weatherData, getWeatherData, forecastData} = useCounterStore();
  console.log(forecastData, 'forecastData');

  useEffect(() => {
    getWeatherData(city);
  }, [city]);
  return (
    <LinearGradient colors={['#2E335A', '#1C1B33']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerCityText}>{city}</Text>
          <Text style={styles.headerTempText}>
            {Math.round(weatherData?.current?.temp_c)}° |{' '}
            {weatherData?.current?.condition?.text}
          </Text>
        </View>
        <View style={styles.weatherDetails}>
          <BlurView style={styles.blur} blurType="dark" blurAmount={20} />
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[
              'rgba(46, 51, 90, 1)',
              'rgba(46, 51, 90, 0.5)',
              'rgba(46, 51, 90, 1)',
            ]}
            style={styles.gradientCircle}
          />
          <View style={styles.weatherDetailsHeader}>
            <Text style={styles.weatherDetailsHeaderText}>Hourly Forecast</Text>
            <Text style={styles.weatherDetailsHeaderText}>Weekly Forecast</Text>
          </View>
          <View>
            <FlatList
              data={forecastData?.hour}
              renderItem={({item, index}) => (
                <Item item={item} index={index} forecastData={forecastData} />
              )}
              keyExtractor={item => item.time_epoch}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 10,
                marginVertical: 10,
              }}
            />
          </View>
          <AirQuality />
          <View style={styles.sunRiseSetContainer}>
            <View style={styles.sunRise}>
              <Text style={styles.sunRiseHeaderText}>Sunrise</Text>
              <Text style={styles.sunRiseText}>
                {forecastData?.astro?.sunrise}
              </Text>
              <Image source={sunRise} style={styles.sunRiseIcon} />
            </View>
            <View style={styles.sunRise}>
              <Text style={styles.sunRiseHeaderText}>Sunset</Text>
              <Text style={styles.sunRiseText}>
                {forecastData?.astro?.sunset}
              </Text>
              <Image source={sunSet} style={styles.sunRiseIcon} />
            </View>
          </View>
          <UvQuality />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
const Item = ({item, index, forecastData}) => {
  return (
    <View
      key={item?.time_epoch}
      style={[
        styles.forecastItem,
        isHourMatch(item?.time) && styles.selectedForecast,
        {
          marginLeft: index === 0 ? 20 : 0,
          marginRight: index === forecastData.hour.length - 1 ? 20 : 0,
        },
      ]}>
      <Text style={styles.forecastTime}>{convertToAMPM(item?.time)}</Text>
      <Image
        source={{uri: `https:${item?.condition?.icon}`}}
        style={styles.forecastIcon}
      />
      <Text style={styles.forecastTemperature}>
        {Math.floor(item?.temp_c)}°
      </Text>
    </View>
  );
};
const AirQuality = () => (
  <View style={styles.airQualityContainer}>
    <View style={styles.airQualityHeader}>
      <Text style={styles.airQualityHeaderText}>Air Quality</Text>
    </View>
    <View style={styles.airQualityContent}>
      <Text style={styles.airQualityContentText}>3-Low Health Risk</Text>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[
          'rgba(57, 89, 178, 1)',
          'rgba(100, 89, 196, 1)',
          'rgba(160, 89, 222, 1)',
          'rgba(211, 78, 193, 1)',
          'rgba(231, 67, 149, 1)',
        ]}
        style={styles.bar}>
        <View style={styles.barStat} />
      </LinearGradient>
    </View>
    <View style={styles.airQualityFooter}>
      <Text style={styles.airQualityFooterText}>See More</Text>
    </View>
  </View>
);
const UvQuality = () => (
  <View style={styles.airQualityContainer}>
    <View style={styles.airQualityHeader}>
      <Text style={styles.airQualityHeaderText}>UV Index</Text>
    </View>
    <View style={styles.airQualityContent}>
      <Text style={styles.airQualityContentText}>4 Moderate</Text>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[
          'rgba(57, 89, 178, 1)',
          'rgba(100, 89, 196, 1)',
          'rgba(160, 89, 222, 1)',
          'rgba(211, 78, 193, 1)',
          'rgba(231, 67, 149, 1)',
        ]}
        style={styles.bar}>
        <View style={styles.barStat} />
      </LinearGradient>
    </View>
    {/* <View style={styles.airQualityFooter}>
      <Text style={styles.airQualityFooterText}>See More</Text>
    </View> */}
  </View>
);

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  headerCityText: {
    fontSize: 40,
    lineHeight: 50,
    textAlign: 'center',
    color: '#fff',
  },
  headerTempText: {
    fontSize: 20,
    lineHeight: 20,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)',
  },
  weatherDetails: {
    flex: 1,
    position: 'relative',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    // position: 'relative',
    // zIndex: 2,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    position: 'relative',
    // zIndex: 1,
  },
  gradientCircle: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    // borderRadius: 100,
  },
  weatherDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 10,
    borderTopWidth: 2,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  weatherDetailsHeaderText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
  },
  forecastItem: {
    alignItems: 'center',
    paddingVertical: 15,
    minWidth: 70,
    height: 130,
    borderRadius: 35,
    borderWidth: 1,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(72, 49, 157, 0.2)',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,

    elevation: 6,
  },
  forecastTime: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  forecastTemperature: {
    fontWeight: 'bold',
    color: '#fff',
  },
  forecastIcon: {
    width: 60,
    height: 35,
    marginVertical: 16,
  },
  selectedForecast: {
    backgroundColor: '#48319D',
    borderRadius: 35,
  },
  airQualityContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    // marginTop: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(35, 30, 75, 1)',
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
  },
  airQualityHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 10,
  },
  airQualityContentText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 1)',
    marginBottom: 10,
  },
  bar: {
    width: '100%',
    height: 6,
    borderRadius: 10,
    position: 'relative',
    marginBottom: 20,
  },
  barStat: {
    width: 6,
    height: 6,
    position: 'absolute',
    left: 50,
    top: 0,
    bottom: 0,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 10,
  },
  airQualityFooter: {
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 15,
    paddingBottom: 5,
    // paddingHorizontal: 20,
  },
  airQualityFooterText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: 'bold',
  },
  sunRiseSetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 10,
  },
  sunRise: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(58, 43, 94, 0.4)',
    // justifyContent: 'center',
    width: '48%',
    overflow: 'hidden',
    // aspectRatio: 1,
  },
  sunRiseText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'start',
    width: '100%',
    color: 'rgba(255,255,255,1)',
    marginLeft: 20,
    marginTop: 5,
  },
  sunRiseHeaderText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'start',
    width: '100%',
    color: 'rgba(255,255,255,0.5)',
    marginLeft: 20,
    textTransform: 'uppercase',
  },
  sunRiseIcon: {
    width: '100%',
    marginTop: 15,
    objectFit: 'contain',
    // height: 50,
    // marginBottom: -5,
  },
});
