import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import CirclePercentage from './components/circle-percentage';
import {BlurView, VibrancyView} from 'react-native-blur';

function Detail() {
  let totalSteps = 3000;
  const [steps, onChangeSteps] = useState(1600);
  useEffect(() => {
    setTimeout(() => {
      onChangeSteps(2500);
    }, 500);
  }, []);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ImageBackground
        source={require('../images/login_bg.png')}
        style={[styles.bgImage, styles.absolute]}></ImageBackground>
      <BlurView style={styles.absolute} blurType="light" blurAmount={10} />
      <View style={styles.user}>
        <Image source={require('../images/ii.jpg')} style={styles.image} />
        <Text style={styles.userName}>Climber</Text>
      </View>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <CirclePercentage
          radius={130}
          percent={(steps / totalSteps) * 100}
          borderWidth={30}
          color="red">
          <Text style={styles.steps}>Steps</Text>
          <Text style={styles.value}>{steps}</Text>
          <Text style={styles.today}>today</Text>
        </CirclePercentage>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  user: {
    position: 'absolute',
    top: 42,
    left: 26,
    flex: 1,
    flexDirection: 'row',
  },
  userName: {
    color: '#000',
    fontSize: 30,
    lineHeight: 76,
    paddingLeft:10
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: 50,
  },
  steps: {
    fontSize: 35,
  },
  value: {
    fontSize: 50,
  },
  today: {
    fontSize: 16,
  },

  // chart: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   width: 300,
  //   height: 300,
  //   borderColor: 'red',
  //   borderWidth: 20,
  //   borderRadius: 300,
  // },
});
export default Detail;
