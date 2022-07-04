import React, { useState } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import INPU from "../components/input";
import Btn from "../components/btn";
import { useDispatch } from "react-redux";
import { singup } from "../stor/actions/userLogin";

const Register1 = (props) => {
  const dispatch = useDispatch();
  const [error, seterror] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [family, setfamily] = useState("");
  const [codmeli, setcodmeli] = useState("");
  const [numberCard, setnumberCard] = useState("");
  const [numberBank, setnumberBank] = useState("");
  const [load, setload] = useState(false);

  const sendInfoHandler = async () => {
    try {
      setload(true);
      const respon = await dispatch(
        singup(
          username,
          password,
          name,
          family,
          codmeli,
          numberCard,
          numberBank
        )
      );

      console.log(respon);

      if (respon.status == 400) {
        seterror(respon.message);
      }

      if (respon.code == "existing_user_login") {
        seterror(respon.message);
      }
      if (respon.status == 201) {
        Alert.alert(
          "ثبت نام شدید",
          "با موفقیت ثبت نام شدید. اکنون با همان نام کاربری و رمز ورود کنید و اطلاعات خود را تکمیل نمایید",
          [
            {
              text: "باشه",
              onPress: () => {
                props.navigation.navigate("login");
              },
            },
          ]
        );
      }

      setload(false);
    } catch (err) {
      console.log(err);
    }
  };

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
          stylelabel={{ width: "17%" }}
          value={username}
          onChangeText={(v) => setusername(v)}
        />

        <INPU
          label=" رمز عبور"
          styleview={{ marginTop: 30 }}
          stylelabel={{ width: "15%" }}
          value={password}
          onChangeText={(pass) => setpassword(pass)}
        />
        <INPU
          label="نام "
          styleview={{ marginTop: 30 }}
          stylelabel={{ width: "7%" }}
          value={name}
          onChangeText={(name) => setname(name)}
          keyboardType="default"
        />

        <INPU
          label="نام خانوادگی"
          styleview={{ marginTop: 30 }}
          stylelabel={{ width: "20%" }}
          value={family}
          onChangeText={(pass) => setfamily(pass)}
        />
        <INPU
          label="کدملی"
          styleview={{ marginTop: 30 }}
          stylelabel={{ width: "12%" }}
          value={codmeli}
          onChangeText={(task) => setcodmeli(task)}
          maxLength={10}
          keyboardType="numeric"
        />

        <INPU
          label="شماره کارت"
          styleview={{ marginTop: 30 }}
          stylelabel={{ width: "18%" }}
          value={numberCard}
          onChangeText={(pass) => setnumberCard(pass)}
          maxLength={16}
          keyboardType="numeric"
        />
        <INPU
          label="شماره حساب"
          styleview={{ marginTop: 30 }}
          stylelabel={{ width: "21%" }}
          value={numberBank}
          onChangeText={(pass) => setnumberBank(pass)}
          keyboardType="numeric"
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
          label="ثبت نام"
          touchableStyle={{ height: 55 }}
          style={{ marginLeft: "5%", marginTop: 80, marginBottom: 50 }}
          textStyle={{ bottom: 8, fontSize: 16 }}
          loading={load}
          colorspin={Colors.background}
          sizespin={25}
          onPress={() => {
            sendInfoHandler();
            //props.navigation.navigate("register2");
          }}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Register1;
const styles = StyleSheet.create({
  viewlogo: {
    flexDirection: "column",
    width: "100%",
    height: 150,
    alignItems: "center",
    top: 100,
  },
});
