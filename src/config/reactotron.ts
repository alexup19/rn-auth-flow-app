import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  Reactotron.configure({ name: 'Test MA' })
    .useReactNative()
    .connect();
}