import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function HomeBanner() {
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Featured</Text>
      <View style={styles.imageContainer}>
        <View style={styles.imageItem}>
          <Image
            source={{
              uri: 'https://images.ctfassets.net/eqb1x10m46e1/1CpwVcsDC8GYEgu86L0UXT/626bcf45bf17b4aafccaf491dc0f4ef1/CMP-Baunfire-Services-Websites-6.jpg?w=625&h=815&q=90',
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.imageItem}>
          <Image
            source={{
              uri: 'https://media.istockphoto.com/id/2152515127/photo/southern-lights-over-lake-te-anau.jpg?s=1024x1024&w=is&k=20&c=UgpP14LeS2aeICcMxkkTH8jtnYE5V8DRsPaA_qlimlQ=',
            }}
            style={styles.image}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginVertical: 8,
    overflow: 'scroll',
  },
  imageItem: {
    width: 200,
    height: 100,
    backgroundColor: 'red',
    borderRadius: 10,
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    objectFit: 'cover',
    borderWidth: 1,
    borderColor: '#dedede',
  },
});
