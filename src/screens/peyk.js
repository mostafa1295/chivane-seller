import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import Colors from "../constants/Colors";
import INPU from "../components/input";
import Btn from "../components/btn";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllcity, updateshopcity } from "../stor/actions/userLogin";

const Peyk = (props) => {
  const [loading, setloading] = useState(true);
  const [myData, setMyData] = useState([]);
  const dispatchs = useDispatch();
  const Price = useSelector((store) => store.userLogin.dataallcity);
  const [Ordercompelet, setOrderOrdercompelet] = useState([]);
  //const token ="43f1f56e5924a38566387cccc99334bd3596bc246dc0abe8186f539b93000f2826758c28622c8822ed8525e7a1f4588450c958bb7c80a13991b8c6df7bbb271f";
  const token = useSelector((store) => store.userLogin.datatoken);
  const [load, setload] = useState(false);
  const [resultcom, setresultcom] = useState("");

  const getallcityHandler = async () => {
    try {
      const res = await dispatchs(getAllcity(token));
      if (Ordercompelet == "") {
        setloading(false);
      }
      // console.log(res.data);
      setOrderOrdercompelet(res.data);
      if (res.data == []) {
        setresultcom("اطلاعاتی موجود نمی باشد");
      }
      setloading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getallcityHandler();
  }, []);

  const updateFieldChanged = (text, i) => {
    const newprice = [...Ordercompelet];
    newprice[i].price = text.replace(/\D/g, "");
    setOrderOrdercompelet(newprice);
  };

  const updateswitchChanged = (text, i) => {
    const newactive = [...Ordercompelet];
    newactive[i].active = text;

    setOrderOrdercompelet(newactive);
  };

  const sendshopcityHandler = async () => {
    try {
      setload(true);
      const resp = await updateshopcity(token, Ordercompelet);
      if (resp.ok) {
        Alert.alert("پیام سیستم", "با موفقیت ثبت شد", [
          {
            text: "باشه",
            onPress: () => {
              props.navigation.navigate("dashboard");
            },
          },
        ]);
      } else {
        Alert.alert("پیام سیستم", "با موفقیت ثبت شد", [
          {
            text: resp.data,
          },
        ]);
      }
      setload(false);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(Ordercompelet);

  const separate = (num) => {
    let number = num.replace(/\D/g, "");
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewlogo}>
        <Text style={{ fontFamily: "MontserratBold", fontSize: 20 }}>
          هزینه پیک
        </Text>

        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.touchback}
        >
          <Ionicons
            name="chevron-back-outline"
            size={25}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontFamily: "MontserratBold",
          fontSize: 15,
          color: "red",
          right: 140,
        }}
      >
        {resultcom}
      </Text>
      <ScrollView>
        {loading ? (
          <View
            style={{
              width: "100%",
              height: 50,
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <ActivityIndicator
              animating={loading}
              size={30}
              color={Colors.primary}
            />
          </View>
        ) : (
          Ordercompelet.map((item, i) => {
            return (
              <View
                key={i}
                style={{ flexDirection: "row", width: "100%", marginTop: 15 }}
              >
                <INPU
                  label="هزینه"
                  styleview={{ width: "50%", left: 10 }}
                  stylelabel={{ width: 40 }}
                  keyboardType="numeric"
                  editable={item.active ? true : false}
                  value={
                    item.active ? separate(JSON.stringify(item.price)) : ""
                  }
                  onChangeText={(text) => updateFieldChanged(text, i)}
                />

                <View style={styles.viewtext}>
                  <Text
                    style={{
                      fontFamily: "MontserratLight",
                      fontSize: 14,
                      color: item.active ? "black" : Colors.secondText3,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>

                <Switch
                  value={item.active}
                  onValueChange={(text) => updateswitchChanged(text, i)}
                  thumbColor={item.active ? Colors.primary : Colors.secondText3}
                  trackColor={{
                    false: Colors.secondText3,
                    true: Colors.primary,
                  }}
                  style={{ position: "absolute", right: 20, bottom: 10 }}
                />
              </View>
            );
          })
        )}
      </ScrollView>

      <Btn
        label="ثبت تغییرات"
        touchableStyle={{ height: 55 }}
        style={{ marginLeft: "5%", marginTop: 50, marginBottom: 50 }}
        textStyle={{ bottom: 10, fontSize: 16 }}
        loading={load}
        colorspin={Colors.background}
        sizespin={25}
        onPress={(Ordercompelet) => sendshopcityHandler(Ordercompelet)}
      />
    </View>
  );
};

export default Peyk;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.background,
  },
  viewlogo: {
    flexDirection: "row-reverse",
    width: "100%",
    height: 80,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  viewtext: {
    width: "25%",
    height: 30,
    top: 8,
    marginLeft: 25,
    alignItems: "center",
  },
  touchback: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.secondText,
    borderRadius: 15,
    right: "6%",
    position: "absolute",
  },
});
