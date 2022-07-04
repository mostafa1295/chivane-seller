import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getshoporder } from "../stor/actions/productuser";
import { getsellerinfo } from "../stor/actions/userLogin";

function Orders(props) {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.userLogin.datatoken);
  const [Ordercompelet, setOrderOrdercompelet] = useState([]);

  const [isFetching, setIsFetching] = useState(false);
  // const token = "b6cb8966f410ccbb0d83f5d79c86950254ef1dba0daf44b07f41130e7a379aaff662a8d81a3dc1ad76710a74c87a4f14b097e02aab1dbad3134eee7546752d24"

  const Seller = useSelector((store) => store.userLogin.dataseller);
  const [resultcom, setresultcom] = useState("");

  const getordercompeletHandler = async () => {
    try {
      setIsFetching(true);

      const res = await dispatch(getshoporder(token));

      console.log(res.data);
      if (Ordercompelet == "") {
        setIsFetching(false);
      }

      setOrderOrdercompelet(res.data);
      if (res.data == []) {
        setresultcom("اطلاعاتی موجود نمی باشد");
      }
      setIsFetching(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getgetsellerHandler = async () => {
    try {
      const res = await dispatch(getsellerinfo(token));

      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const separate = (num) => {
    let number = num.replace(/\D/g, "");
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  useEffect(() => {
    getordercompeletHandler();
    getgetsellerHandler();
  }, []);

  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewlogo}>
        <View style={styles.viewimage}>
          <Image
            source={{ uri: Seller.image_avatar }}
            style={{ width: 50, height: 50, borderRadius: 10 }}
          />
        </View>

        <View
          style={{
            width: "50%",
            height: 60,
            marginRight: 10,
            alignItems: "flex-end",
          }}
        >
          <Text style={styles.textshop}>
            {Seller.first_name + " " + Seller.last_name}
          </Text>
          <Text style={styles.textkabab}>{Seller.shop_name}</Text>
        </View>
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

      <FlatList
        onRefresh={getordercompeletHandler}
        refreshing={isFetching}
        data={Ordercompelet}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("order", {
                ids: item.id,
              })
            }
            style={styles.touch}
          >
            <View style={{ width: "70%", height: 70 }}>
              <Text style={styles.textaddress}>{item.address}</Text>
            </View>
            <View style={styles.viewtexts}>
              <Text style={{ fontFamily: "MontserratLight", fontSize: 12 }}>
                {item.date}
              </Text>
              <Text style={{ fontFamily: "MontserratLight", fontSize: 12 }}>
                {separate(item.price)} ت
              </Text>
              <Text
                style={{
                  fontFamily: "Montserrat",
                  fontSize: 12,
                  color:
                    item.status === "تکمیل شده"
                      ? Colors.success
                      : Colors.primary,
                  left: item.status === "تکمیل شده" ? 0 : 7,
                }}
              >
                {item.status == "در انتظار تایید فروشنده"
                  ? "در انتظار تایید"
                  : item.status}
              </Text>
            </View>
            <View style={styles.underline}></View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      {/*       
      {(loading ?
          <View style={{ width: "100%", height: 50, alignItems: "center", marginTop: 20 }} >
            <ActivityIndicator
              animating={loading} size={30} color={Colors.primary} />
          </View>
          :

      Ordercompelet.map((item, i) => {
      return (
    <TouchableOpacity key={i} onPress={() => props.navigation.navigate("order",{
      ids:item.id
    })} style={styles.touch}>
      <View style={{ width: "70%", height: 70 }}>
        <Text style={styles.textaddress}>
          {item.address}
        </Text>
      </View>
      <View style={styles.viewtexts}>
        <Text style={{ fontFamily: "MontserratLight", fontSize: 12, }}>{item.date}</Text>
        <Text style={{ fontFamily: "MontserratLight", fontSize: 12, }}>{separate(item.price)} ت</Text>
        <Text style={{ fontFamily: "Montserrat", fontSize: 12, color: item.status.status === "تکمیل شده" ? Colors.success : Colors.primary, left: item.status.status === "تکمیل شده" ? 0 : 7 }}>{item.status.status}</Text>
      </View>
      <View style={styles.underline}></View>
    </TouchableOpacity>
    )
  }))} */}

      {/* 
         <InfoOrder 
          onPress={() => props.navigation.navigate("order")}
          address="بلوار دیلمان،خیابان حمیدی،روبه روی بانک مسکن،ساختمان پوریا،طبقه سوم"
          date="1400/12/22"
          price="45000"
          stutus="در انتظار تایید"
        />

        <InfoOrder
          onPress={() => props.navigation.navigate("order")}
          address="بلوار دیلمان،خیابان حمیدی،روبه روی بانک مسکن،ساختمان پوریا،طبقه سوم"
          date="1400/12/22"
          price="47000"
          stutus="تحویل به پیک"
        />

        <InfoOrder
          onPress={() => props.navigation.navigate("order")}
          address="بلوار دیلمان،خیابان حمیدی،روبه روی بانک مسکن،ساختمان پوریا،طبقه سوم"
          date="1400/12/22"
          price="45000"
          stutus="تکمیل شده"
        />

        <InfoOrder
          onPress={() => props.navigation.navigate("order")}
          address="بلوار دیلمان،خیابان حمیدی،روبه روی بانک مسکن،ساختمان پوریا،طبقه سوم"
          date="1400/12/22"
          price="45000"
          stutus="تکمیل شده"
        />

        <InfoOrder
          onPress={() => props.navigation.navigate("order")}
          address="بلوار دیلمان،خیابان حمیدی،روبه روی بانک مسکن،ساختمان پوریا،طبقه سوم"
          date="1400/12/22"
          price="45000"
          stutus="تکمیل شده"
        /> */}

      <View style={styles.viewtouch}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("stats")}
          style={styles.touchbox}
        >
          <MaterialCommunityIcons
            name="poll-box"
            size={25}
            color={Colors.RGB}
          />
          <Text style={styles.texttouch}>گزارشات</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("comments")}
          style={styles.touchbox}
        >
          <MaterialCommunityIcons name="forum" size={25} color={Colors.RGB} />

          <Text style={styles.texttouch}>نظرات</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("dashboard")}
          style={styles.touchbox}
        >
          <MaterialCommunityIcons
            name="view-dashboard"
            size={25}
            color={Colors.RGB}
          />
          <Text style={styles.texttouch}>داشبورد</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("products")}
          style={styles.touchbox}
        >
          <MaterialCommunityIcons name="cart" size={25} color={Colors.RGB} />
          <Text style={styles.texttouch}>محصولات</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("orders")}
          style={styles.touchbox}
        >
          <MaterialCommunityIcons
            name="clipboard-text"
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
            سفارشات
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 2,
  },
  item: {
    backgroundColor: "#f5f520",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  viewContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.background,
  },
  viewlogo: {
    flexDirection: "row-reverse",
    width: "100%",
    height: 80,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10%",
  },
  viewimage: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    borderRadius: 15,
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
  touch: {
    height: 75,
    flexDirection: "row-reverse",
    marginLeft: 12,
    marginRight: 12,
  },
  textaddress: {
    fontFamily: "MontserratLight",
    fontSize: 13,
    marginRight: 20,
    marginTop: 10,
  },
  viewtouch: {
    flexDirection: "row",
    width: "88%",
    height: 70,
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 20,
    backgroundColor: Colors.primary,
    marginBottom: 30,
    elevation: 3,
  },
  touchbox: {
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
  viewtexts: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: 70,
  },

  underline: {
    width: "89%",
    height: 1,
    backgroundColor: Colors.secondText,
    position: "absolute",
    left: 15,
    top: 75,
  },
});
export default Orders;
