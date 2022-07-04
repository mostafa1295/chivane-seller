import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import INPU from "../components/input";
import Btn from "../components/btn";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getsellerinfo,
  logOut,
  sendShopActive,
} from "../stor/actions/userLogin";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
function Dashboard(props) {
  const [loading, setloading] = useState(true);
  //const token = "c6e51a7a85f6de25e8724dca9cddd4b14da8d358fc31592a74bd98986b04a7a11d181bd80dcb5d787fd8e21f7adcc66f981f7cba7bbc1fc7eb9b238d99d5de60";
  const dispatch = useDispatch();
  const token = useSelector((store) => store.userLogin.datatoken);
  const [Ordercompelet, setOrderOrdercompelet] = useState("");
  const [load, setload] = useState(false);
  //const Ordercompelet=useSelector((store)=>store.userLogin.dataseller)

  const logOutHandler = async () => {
    try {
      console.log("logout");
      await dispatch(logOut());
      await AsyncStorage.removeItem("access_token");
      props.navigation.navigate("loginRegister");
    } catch (err) {
      console.log(err);
    }
  };

  const [active, setactive] = useState(true);
  const sendShopActiveHandler = async () => {
    try {
      setload(true);
      const resp = await sendShopActive(token);
      setactive(active == true ? false : true);
      console.log(resp.data);
      setload(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getgetsellerHandler = async () => {
    try {
      setloading(true);
      const res = await dispatch(getsellerinfo(token));

      console.log(res.data);
      setOrderOrdercompelet(res.data);

      setloading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (Ordercompelet.shop_status == true) {
      setactive(true);
    } else {
      setactive(false);
    }
  }, [Ordercompelet]);

  const isFocuse = useIsFocused();
  useEffect(() => {
    getgetsellerHandler();
  }, [isFocuse]);

  return (
    <View style={styles.container}>
      <View style={styles.viewlogo}>
        <View style={styles.viewimage}>
          <Image
            source={{ uri: Ordercompelet.image_avatar }}
            style={{ width: 50, height: 50, borderRadius: 10 }}
          />
        </View>

        {loading ? (
          <View style={{ width: "100%", height: 50, right: 120 }}>
            <ActivityIndicator
              animating={loading}
              size={30}
              color={Colors.primary}
            />
          </View>
        ) : (
          <View style={styles.viewtext}>
            <Text style={styles.textshop}>
              {Ordercompelet.first_name + "" + Ordercompelet.last_name}
            </Text>
            <Text style={styles.textkabab}>{Ordercompelet.shop_name}</Text>
          </View>
        )}

        <TouchableOpacity onPress={logOutHandler} style={styles.logout}>
          <Ionicons name="log-out-outline" size={25} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{
          backgroundColor: Colors.background,
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            marginTop: "15%",
          }}
        >
          <View style={styles.viewclose}>
            <View
              style={{
                flexDirection: "row",
                width: "88%",
                height: 50,
                borderRadius: 5,
                backgroundColor:
                  active == true ? Colors.success : Colors.primary,
              }}
            >
              <Text style={styles.textclose}>
                {" "}
                وضعیت فروشگاه: {active == true ? "باز" : "بسته "}
              </Text>

              <Btn
                style={styles.btnclose}
                touchableStyle={{ backgroundColor: Colors.background }}
                label={active == true ? "بستن" : "بازکردن"}
                textStyle={{
                  color: active == true ? Colors.success : Colors.primary,
                  position: "absolute",
                }}
                loading={load}
                colorspin={Colors.success}
                sizespin={20}
                onPress={sendShopActiveHandler}
              />
            </View>
          </View>

          <View style={styles.viewupbox}>
            <Btn
              style={styles.btnupR}
              onPress={() => props.navigation.navigate("register3")}
              textStyle={{ fontSize: 13 }}
              viewicon={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Colors.RGB2,
              }}
              label=" تنظیم ساعت کاری"
              nameicon="alarm"
              coloricon="white"
              sizeicon={30}
              styleicon={{
                position: "absolute",
                bottom: "14%",
                left: "15%",
              }}
            />

            <Btn
              style={styles.btnupL}
              textStyle={{ fontSize: 13 }}
              viewicon={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Colors.RGB2,
              }}
              touchableStyle={{ backgroundColor: Colors.secondary }}
              label=" تنظیم هزینه پیک"
              nameicon="map-marker-radius"
              coloricon="white"
              sizeicon={30}
              styleicon={{
                position: "absolute",
                bottom: "14%",
                left: "15%",
              }}
              onPress={() => props.navigation.navigate("peyk")}
            />
          </View>
          <View style={styles.viewdown}>
            <Btn
              style={styles.btndownR}
              onPress={() => props.navigation.navigate("register2")}
              textStyle={{ fontSize: 13 }}
              viewicon={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Colors.RGB2,
              }}
              touchableStyle={{ backgroundColor: Colors.secondary }}
              label=" اطلاعات فروشگاه"
              nameicon="card-account-mail"
              coloricon="white"
              sizeicon={22}
              styleicon={{
                position: "absolute",
                bottom: "20%",
                left: "22%",
              }}
            />

            <Btn
              style={styles.btndownL}
              textStyle={{ fontSize: 13 }}
              viewicon={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Colors.RGB2,
              }}
              label="تنظیم کوپن"
              nameicon="filmstrip"
              coloricon="white"
              sizeicon={25}
              styleicon={{
                position: "absolute",
                bottom: "18%",
                left: "18%",
              }}
              onPress={() => props.navigation.navigate("coupons")}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.viewfooter}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("stats")}
          style={styles.touch}
        >
          <MaterialCommunityIcons
            name="poll-box"
            size={25}
            color={Colors.RGB}
          />
          <Text style={styles.texttouch}>گزارشات</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("comments", {
              IDs: Ordercompelet.ID,
            })
          }
          style={styles.touch}
        >
          <MaterialCommunityIcons name="forum" size={25} color={Colors.RGB} />

          <Text style={styles.texttouch}>نظرات</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touch}>
          <MaterialCommunityIcons
            name="view-dashboard"
            size={25}
            color={Colors.background}
          />
          <Text
            style={{
              fontFamily: "Montserrat",
              fontSize: 11,
              color: Colors.background,
            }}
          >
            داشبورد
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("products")}
          style={styles.touch}
        >
          <MaterialCommunityIcons name="cart" size={25} color={Colors.RGB} />
          <Text style={styles.texttouch}>محصولات</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("orders")}
          style={styles.touch}
        >
          <MaterialCommunityIcons
            name="clipboard-text"
            size={25}
            color={Colors.RGB}
          />
          <Text style={styles.texttouch}>سفارشات</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  viewlogo: {
    flexDirection: "row-reverse",
    width: "100%",
    height: 80,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  viewimage: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    borderRadius: 15,
  },
  viewtext: {
    alignItems: "flex-end",
    width: "50%",
    height: 60,
    marginRight: 10,
  },
  textshop: {
    fontFamily: "MontserratLight",
    fontSize: 12,
    marginTop: 8,
    color: Colors.secondText3,
  },
  textkabab: {
    fontFamily: "MontserratBold",
    fontSize: 14,
    color: Colors.primary,
  },
  logout: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.secondText,
    borderRadius: 15,
    marginRight: "8%",
  },
  viewclose: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textclose: {
    fontFamily: "Montserrat",
    fontSize: 13,
    position: "absolute",
    right: 20,
    marginTop: 13,
    color: Colors.background,
  },
  btnclose: {
    width: "35%",
    height: 40,
    marginTop: 8,
    position: "absolute",
    left: 18,
  },
  viewupbox: {
    flexDirection: "row-reverse",
    width: "100%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  btnupR: {
    width: "45%",
    height: 140,
    marginTop: 30,
    right: "5%",
  },
  btnupL: {
    width: "45%",
    height: 140,
    marginTop: 30,
    right: "5%",
  },
  viewdown: {
    flexDirection: "row-reverse",
    width: "100%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  btndownR: {
    width: "45%",
    height: 140,
    marginTop: 16,
    right: "5%",
  },
  btndownL: {
    width: "45%",
    height: 140,
    marginTop: 16,
    right: "5%",
  },
  viewfooter: {
    flexDirection: "row",
    width: "88%",
    height: 70,
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: Colors.primary,
    marginBottom: 25,
    elevation: 3,
  },
  touch: {
    flexDirection: "column",
    marginTop: 10,
    alignItems: "center",
    width: "20%",
    height: 60,
  },
  texttouch: {
    fontFamily: "Montserrat",
    fontSize: 11,
    color: Colors.RGB,
  },
});
