import React, {Component} from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';

class CirclePercentage extends Component {
  constructor(props) {
    super(props);
    let percent = this.props.percent;
    let leftTransformerDegree = 0;
    let rightTransformerDegree = 0;
    if (percent >= 50) {
      rightTransformerDegree = 180;
      leftTransformerDegree = (percent - 50) * 3.6;
    } else {
      rightTransformerDegree = percent * 3.6;
      leftTransformerDegree = 0;
    }
    console.log('----', leftTransformerDegree, rightTransformerDegree);

    this.state = {
      percent: this.props.percent,
      borderWidth:
        this.props.borderWidth < 2 || !this.props.borderWidth
          ? 2
          : this.props.borderWidth,
      leftTransformerDegree: new Animated.Value(leftTransformerDegree),
      rightTransformerDegree: new Animated.Value(rightTransformerDegree),
      textStyle: this.props.textStyle ? this.props.textStyle : null,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let percent = nextProps.percent;
    let leftTransformerDegree = 0;
    let rightTransformerDegree = 0;
    if (percent >= 50) {
      rightTransformerDegree = 180;
      leftTransformerDegree = (percent - 50) * 3.6;
      Animated.sequence([
        Animated.timing(prevState.rightTransformerDegree, {
          toValue: rightTransformerDegree,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(prevState.leftTransformerDegree, {
          toValue: leftTransformerDegree,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      rightTransformerDegree = percent * 3.6;
      Animated.timing(prevState.rightTransformerDegree, {
        toValue: rightTransformerDegree,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    return {
      percent: nextProps.percent,
      borderWidth:
        nextProps.borderWidth < 2 || !nextProps.borderWidth
          ? 2
          : nextProps.borderWidth,
      //   leftTransformerDegree: leftTransformerDegree,
      //   rightTransformerDegree: rightTransformerDegree,
    };
  }

  render() {
    if (this.props.disabled) {
      return (
        <View
          style={[
            styles.circle,
            {
              width: this.props.radius * 2,
              height: this.props.radius * 2,
              borderRadius: this.props.radius,
            },
          ]}>
          <Text style={styles.text}>{this.props.disabledText}</Text>
        </View>
      );
    }
    return (
      <View
        style={[
          styles.circle,
          {
            width: this.props.radius * 2,
            height: this.props.radius * 2,
            borderRadius: this.props.radius,
            backgroundColor: this.props.bgcolor,
          },
        ]}>
        <View
          style={[
            styles.leftWrap,
            {
              width: this.props.radius,
              height: this.props.radius * 2,
              left: 0,
            },
          ]}>
          <Animated.View
            style={[
              styles.loader,
              {
                left: this.props.radius,
                width: this.props.radius,
                height: this.props.radius * 2,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                backgroundColor: this.props.color,
                transform: [
                  {translateX: -this.props.radius / 2},
                  {
                    rotate: this.state.leftTransformerDegree.interpolate({
                      inputRange: [0, 180],
                      outputRange: ['0deg', '180deg'],
                    }),
                  },
                  {translateX: this.props.radius / 2},
                ],
              },
            ]}
          />
        </View>
        <View
          style={[
            styles.leftWrap,
            {
              left: this.props.radius,
              width: this.props.radius,
              height: this.props.radius * 2,
            },
          ]}>
          <Animated.View
            style={[
              styles.loader,
              {
                left: -this.props.radius,
                width: this.props.radius,
                height: this.props.radius * 2,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                backgroundColor: this.props.color,
                transform: [
                  {translateX: this.props.radius / 2},
                  {
                    rotate: this.state.rightTransformerDegree.interpolate({
                      inputRange: [0, 180],
                      outputRange: ['0deg', '180deg'],
                    }),
                  },
                  {translateX: -this.props.radius / 2},
                ],
              },
            ]}
          />
        </View>
        <View
          style={[
            styles.innerCircle,
            {
              width: (this.props.radius - this.state.borderWidth) * 2,
              height: (this.props.radius - this.state.borderWidth) * 2,
              borderRadius: this.props.radius - this.state.borderWidth,
              backgroundColor: this.props.innerColor,
            },
          ]}>
          {this.props.children ? (
            this.props.children
          ) : (
            <Text style={[styles.text, this.state.textStyle]}>
              {this.props.percent}%
            </Text>
          )}
        </View>
      </View>
    );
  }
}

CirclePercentage.defaultProps = {
  bgcolor: '#e3e3e3',
  innerColor: '#fff',
};

const styles = StyleSheet.create({
  circle: {
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
  },
  leftWrap: {
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
  },
  rightWrap: {
    position: 'absolute',
  },

  loader: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 1000,
  },

  innerCircle: {
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 11,
    color: '#888',
  },
});

module.exports = CirclePercentage;
