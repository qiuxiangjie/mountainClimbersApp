import React, {useState, useEffect} from 'react';
import {View, Button, ImageBackground, StyleSheet} from 'react-native';
import LoginInput from './components/login-input';

function Login({navigation}) {
  const [form, onChangeForm] = useState({
    userName: '',
    password: '',
  });
  const onChangeText = (val, key) => {
    console.log(val, key);
    onChangeForm({
      ...form,
      [key]: val,
    });
  };

  useEffect(() => {
    console.log(111, form);
  }, [form]);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../images/login_bg.png')}
        style={styles.bgImage}>
        <View style={styles.main}>
          <LoginInput
            name="Username"
            onChange={(val) => {
              onChangeText(val, 'userName');
            }}
          />
          <LoginInput
            name="Password"
            secureTextEntry={true}
            onChange={(val) => {
              onChangeText(val, 'password');
            }}
          />
          <ImageBackground
            source={require('../images/button_bg.png')}
            style={[
              styles.btnImage,
              {
                marginTop: 30,
                opacity: form.userName && form.password ? 1 : 0.5,
              },
            ]}>
            <View style={styles.button}>
              <Button
                style={styles.button}
                title="LOGIN"
                color="#fff"
                onPress={() =>
                  form.userName &&
                  form.password &&
                  navigation.navigate('Detail')
                }
              />
            </View>
          </ImageBackground>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 120,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  btnImage: {
    width: '90%',
    height: 40,
    justifyContent: 'center',
    opacity: 0.5,
  },
});

export default Login;
