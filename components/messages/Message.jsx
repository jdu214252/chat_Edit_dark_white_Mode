import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler';
import Animated, {
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { theme } from '../../theme';

export default function Message({ time, isLeft, message, onSwipe }) {
  const startingPosition = 0;
  const x = useSharedValue(startingPosition);

  const isOneLeft = (type) => {
    if (isLeft && type === 'messageContainer') {
      return {
        alignSelf: 'flex-start',
        backgroundColor: '#f0f0f0',
        borderTopLeftRadius: 0,
      };
    } else if (isLeft && type === 'message') {
      return {
        color: '#000',
      };
    } else if (isLeft && type === 'time') {
      return {
        color: 'darkgray',
      };
    } else {
      return {
        borderTopRightRadius: 0,
      };
    }
  };

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {},
    onActive: (event, ctx) => {
      x.value = isLeft ? 50 : -50; // Move the message
    },
    onEnd: (event, ctx) => {
      x.value = withSpring(startingPosition); // { damping: 10, stiffness: 100 }
      // onSwipeEnd(); // Trigger swipe end handler
    },
  });

  const uas = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
    };
  });

  return (
    <FlingGestureHandler
      direction={isLeft ? Directions.RIGHT : Directions.LEFT}
      onGestureEvent={eventHandler}

    onHandlerStateChange={({ nativeEvent }) => {
  if (nativeEvent.state === State.ACTIVE) {
    if (typeof onSwipe === 'function') {
      onSwipe(message, isLeft);
    }
  }
}}
    >
      <Animated.View style={[styles.container, uas]}>
        <View style={[styles.messageContainer, isOneLeft('messageContainer')]}>
          <View style={styles.messageView}>
            <Text style={[styles.message, isOneLeft('message')]}>{message}</Text>
          </View>
          <View style={styles.timeView}>
            <Text style={[styles.time, isOneLeft('time')]}>{time}</Text>
          </View>
        </View>
      </Animated.View>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 5,
  },
  messageContainer: {
    backgroundColor: theme.colors.messageBackground,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },
  messageView: {
    backgroundColor: 'transparent',
    maxWidth: '80%',
  },
  timeView: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingLeft: 10,
  },
  message: {
    color: 'white',
    alignSelf: 'flex-start',
    fontSize: 15,
  },
  time: {
    color: 'lightgray',
    alignSelf: 'flex-end',
    fontSize: 10,
  },
});
