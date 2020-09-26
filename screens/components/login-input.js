import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, TextInput, Animated} from 'react-native';

function LoginInput(props) {
  const [form, onChangeForm] = useState({
    val: '',
    focus: false,
  });
  const onChangeText = (val, key) => {
    key === 'val' && props.onChange(val);
    onChangeForm({
      ...form,
      [key]: val,
    });
  };
  const fontSize = useRef(new Animated.Value(16)).current;
  const bottom = useRef(new Animated.Value(0)).current;
  const labelMoveTop = () => {
    Animated.timing(fontSize, {
      toValue: 12,
      duration: 200,
    }).start();
    Animated.timing(bottom, {
      toValue: 40,
      duration: 200,
    }).start();
  };
  const labelMoveBottom = () => {
    Animated.timing(fontSize, {
      toValue: 0,
      duration: 200,
    }).start();
    Animated.timing(bottom, {
      toValue: 16,
      duration: 200,
    }).start();
  };
  useEffect(() => {
    if (form.focus) {
      labelMoveTop();
    } else if (!form.val) {
      labelMoveBottom();
    }
  }, [form]);
  return (
    <View style={styles.inputItme}>
      <Animated.Text
        style={[
          styles.inputLabel,
          {
            fontSize: fontSize,
            bottom: bottom,
          },
        ]}>
        {props.name}
      </Animated.Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: form.focus ? '#fff' : '#7B7B7B',
          },
        ]}
        onChangeText={(text) => onChangeText(text, 'val')}
        onFocus={() => onChangeText(true, 'focus')}
        onBlur={() => onChangeText(false, 'focus')}
        value={form.val}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputItme: {
    height: 70,
    width: '90%',
  },
  inputLabel: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    color: '#7B7B7B',
  },
  input: {
    fontSize: 16,
    height: 30,
    width: '100%',
    color: '#fff',
    borderColor: '#7B7B7B',
    borderWidth: 0,
    borderBottomWidth: 1,
    marginTop: 30,
  },
});

export default LoginInput;
