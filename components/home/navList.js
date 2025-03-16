import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Canvas,
  Path,
  Paint,
  Text as SkiaText,
  ImageSVG,
  Skia,
} from '@shopify/react-native-skia';
export default function NavList() {
  const lists = [
    {
      id: 1,
      name: 'Home',
      icon: 'home',
      zIndex: 5,
    },
    {
      id: 2,
      name: 'Birthday',
      icon: 'birthday',
      zIndex: 4,
      active: true,
    },
    {
      id: 3,
      name: 'Afterschool',
      icon: 'afterschool',
      zIndex: 3,
    },
    {
      id: 4,
      name: 'Loyalty Program',
      icon: 'loyalty',
      zIndex: 2,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Nav List</Text>
      <View style={styles.listContainer}>
        {lists.map((list, index) => (
          <View key={list.id} style={styles.listItem}>
            <Text style={styles.listItemText}>{list.name}</Text>
            <Canvas style={{flex: 1}}>
              <ImageSVG svg={svg} x={0} y={0} />
            </Canvas>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    flex: 1,
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,

    flexDirection: 'row',
    // overflow: 'hidden',
  },
  listItem: {
    height: 50,
    position: 'relative',
  },
  listItemText: {
    fontSize: 14,
    lineHeight: 32,
    fontWeight: 'semibold',
    color: '#686868',
    paddingHorizontal: 10,
    zIndex: 8,
    position: 'relative',
  },
});
const svg = Skia.SVG.MakeFromString(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="43"
    viewBox="0 0 145 43"
    fill="none">
    <path
      d="M16.4269 22.0368L18.563 12.5836C20.1597 5.51765 26.4377 0.5 33.6818 0.5H111.174C118.358 0.5 124.601 5.4372 126.256 12.4284L128.524 22.0057C130.283 29.4318 136.898 34.6681 144.5 34.7035V42.5H0.5V34.8992C8.14066 34.8225 14.7395 29.5042 16.4269 22.0368Z"
      fill="#F2F2F2"
      stroke="#D6D6D6"
    />
  </svg>,
);
