import React, { useEffect, useState } from 'react';
import { View, Text, Keyboard, TouchableWithoutFeedback, StyleSheet, Button, TouchableOpacity,} from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Colors from "../constants/Colors"
import Btn from '../components/btn';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from '../stor/actions/userLogin';

const LoginRegister = (props) => {
  const dispatch = useDispatch();
  
  const SEller =async () => {
  AsyncStorage.getItem("access_token")
  .then(Token => {
    console.log(Token);
    if (Token == null) {
      setAnimating(false);
      props.navigation.replace('login')
    } else {
      dispatch(setAccessToken(Token))
      props.navigation.replace('dashboard')
    }
  }).catch(err => {

  });


}

React.useEffect(() => {
  const ac = new AbortController();


 
  SEller();
 



  return () => ac.abort();
}, []);



  return (

    <View style={styles.viewcontainer}>

      <View style={styles.viewlogo}>
        <MaterialCommunityIcons name="fingerprint" color={Colors.primary} size={100} />
        <Text style={{ fontFamily: "MontserratLight", fontSize: 25 }}>چیوانه</Text>
      </View>









      <View style={styles.viewbtn}>


        <Btn
          style={{ width: "45%", height: 55, }}
          textStyle={{ fontSize: 16, bottom: 7 }}
          touchableStyle={{ backgroundColor: Colors.secondary, marginLeft: 10 }}
          label=" ثبت نام"
          onPress={() => props.navigation.navigate("register1")}
        />





        <Btn style={{ width: "45%", height: 55 }}
          textStyle={{ fontSize: 16, bottom: 8 }}
          touchableStyle={{ marginLeft: 5 }}
          label="ورود "
          onPress={() => props.navigation.navigate("login")}
        />
      </View>

    </View>

  )
}

export default LoginRegister;

const styles = StyleSheet.create({
  viewcontainer: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.background,
    alignItems: "center",
    position: "relative"
  },
  viewlogo: {
    flexDirection: "column",
    width: "50%",
    height: 150,
    alignItems: "center",
    position: "absolute",
    top: "25%"
  },
  viewbtn: {
    flexDirection: "row",
    width: "100%",
    height: 150,
    position: "absolute",
    bottom: "25%",
    justifyContent: 'center'
  }

})