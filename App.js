import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import userLogin from "./src/stor/reducers/userLogin"
import productuser from './src/stor/reducers/productuser';
import commandreport from "./src/stor/reducers/commandreport"
import MainNavigate from './src/navigation/mainnavigate';

export default function App() {
  const [loaded] = useFonts({
    Montserrat: require('./assets/font/IRANSansMobile.ttf'),
    Montserrat1: require('./assets/font/IRANSansMobile1.ttf'),
    MontserratBold: require('./assets/font/IRANSansMobileBold.ttf'),
    MontserratBold1: require('./assets/font/IRANSansMobileBold1.ttf'),
    MontserratLight: require('./assets/font/IRANSansMobileLight.ttf'),
  });
  if (!loaded) {
    return null;
  }
 
  const appReducer = combineReducers({
     userLogin,
     productuser,
     commandreport,
  })

  const rootReducer = (state, action) => {
    if (action.type === "USER_LOGOUT") {
      return appReducer(undefined, action);
    }
    return appReducer(state, action);
  };
  const store=createStore(rootReducer,applyMiddleware(thunk))

  return (

    <Provider store={store}>
    <NavigationContainer>
    <StatusBar backgroundColor="white" />
    <MainNavigate/>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
