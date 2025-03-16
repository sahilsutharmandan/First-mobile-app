import React, {useEffect} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SearchItemBg from '../../assets/images/search_item.png';
import {useCounterStore} from '../../store/weaterStore';
export default function SearchView({navigation}) {
  const {citiesWeatherData, searchWeatherData} = useCounterStore();
  useEffect(() => {
    searchWeatherData('');
  }, []);
  return (
    <LinearGradient colors={['#2E335A', '#1C1B33']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.text}>Weather</Text>
            <TextInput
              style={styles.input}
              placeholder="Search"
              placeholderTextColor="#fff"
            />
          </View>
          <View style={styles.searchContainer}>
            {citiesWeatherData.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Details', {
                    city: item?.location?.name,
                    country: item?.location?.country,
                  });
                }}
                style={styles.searchItem}
                key={index}>
                <ImageBackground
                  source={SearchItemBg}
                  style={styles.background}>
                  <View style={styles.searchItemHeader}>
                    <Text style={styles.searchItemHeaderText}>
                      {Math.floor(item?.current?.temp_c)}°
                    </Text>
                    <Image
                      source={{uri: `https:${item?.current?.condition?.icon}`}}
                      style={styles.searchItemHeaderIcon}
                    />
                  </View>
                  <View style={styles.searchItemContent}>
                    <View style={styles.searchItemTemp}>
                      <Text style={styles.searchItemTempHLText}>
                        H:26° L:18°
                      </Text>
                      <Text style={styles.searchItemTempText}>
                        {item?.location?.name}, {item?.location?.country}
                      </Text>
                    </View>
                    <Text style={styles.searchItemContentText}>
                      {item?.current?.condition?.text}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  text: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  input: {
    backgroundColor: '#1C1B33',
    padding: 10,
    borderRadius: 10,
    color: 'rgba(235, 235, 245, 0.6)',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: 'normal',
    marginTop: 10,
  },
  searchContainer: {
    marginTop: 20,
    flexDirection: 'column',
    gap: 20,
  },
  searchItem: {
    width: '100%',
    height: 185,
  },
  background: {
    width: '100%',
    height: 185,
  },
  searchItemHeaderIcon: {
    width: 160,
    height: 160,
  },
  searchItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -20,
    paddingLeft: 20,
  },
  searchItemHeaderText: {
    fontSize: 64,
    lineHeight: 70,
    color: '#fff',
  },
  searchItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: -40,
    padding: 20,
  },
  searchItemTempHLText: {
    fontSize: 16,
    lineHeight: 28,
    color: 'rgba(235, 235, 245, 0.6)',
  },
  searchItemTempText: {
    fontSize: 18,
    lineHeight: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  searchItemContentText: {
    fontSize: 16,
    lineHeight: 20,
    color: '#fff',
    fontWeight: 'medium',
  },
});
