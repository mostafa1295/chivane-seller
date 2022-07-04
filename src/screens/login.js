import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
} from "react-native";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import INPU from "../components/input";
import Btn from "../components/btn";
import {
  getsellerinfo,
  login,
  setAccessToken,
} from "../stor/actions/userLogin";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = (props) => {
  const dispatch = useDispatch();
  const [error, seterror] = useState("");
  const [userName, setuserName] = useState("");
  const [pass, setPass] = useState("");
  const [load, setload] = useState(false);
  const [done, setDone] = useState(false);

  async function sendloginHandler() {
    try {
      setload(true);
      const response = await dispatch(login(userName, pass));

      console.log(response);

      setload(false);
      if (response.status == 400) {
        seterror("لطفا فیلدها را با دقت کامل کنید");
      }
      if (response.data.access_token) {
        await dispatch(setAccessToken(response.data.access_token));
        await AsyncStorage.setItem("access_token", response.data.access_token);
        await getStorage();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getStorage = async () => {
    AsyncStorage.getItem("access_token")
      .then((Token) => {
        console.log(Token);
        if (Token != null) {
          setDone(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (done) {
      props.navigation.replace("dashboard");
    }
  }, [done]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={{ backgroundColor: Colors.background }}>
        <View style={styles.viewlogo}>
          <MaterialCommunityIcons
            name="fingerprint"
            color={Colors.primary}
            size={100}
          />
          <Text style={{ fontFamily: "MontserratLight", fontSize: 25 }}>
            چیوانه
          </Text>
        </View>

        <INPU
          label="نام کاربری"
          styleview={{ marginTop: 140 }}
          stylelabel={{ width: "16%" }}
          value={userName}
          onChangeText={(task) => setuserName(task)}
          keyboardType="default"
        />

        <INPU
          label=" رمز عبور"
          styleview={{ marginTop: 30 }}
          stylelabel={{ width: "14%" }}
          value={pass}
          onChangeText={(pass) => setPass(pass)}
        />

        <View
          style={{ width: "100%", height: 30, top: 30, alignItems: "center" }}
        >
          <Text
            style={{ fontFamily: "MontserratBold", fontSize: 18, color: "red" }}
          >
            {error}
          </Text>
        </View>

        <Btn
          label="ورود"
          touchableStyle={{ height: 55 }}
          style={{ marginLeft: "5%", marginTop: 80, marginBottom: 10 }}
          textStyle={{ bottom: 10, fontSize: 16 }}
          loading={load}
          colorspin={Colors.background}
          sizespin={25}
          onPress={() => {
            sendloginHandler();
          }}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
const styles = StyleSheet.create({
  viewlogo: {
    flexDirection: "column",
    width: "100%",
    height: 150,
    alignItems: "center",
    top: 80,
  },
});
