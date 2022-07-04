import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from "react-native";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import INPU from "../components/input";
import Btn from "../components/btn";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getcomment, replycomment } from "../stor/actions/commandreport";
import { getsellerinfo } from "../stor/actions/userLogin";
import { useIsFocused } from "@react-navigation/native";

// const Commenting = (props) => {

//     return (
//         <SafeAreaView>
//             <View style={styles.viewCommenting}>
//                 <Btn style={{ width: "26%", height: 40, marginLeft: "5%" }}
//                     textStyle={{ bottom: 10, fontSize: 12 }}
//                     label="مشاهده سفارش"
//                     onPress={props.onPress}
//                 />
//                 <View style={styles.viewtext}>
//                     <Text style={styles.textname}>{props.name}</Text>
//                     <Text style={styles.textdate}>{props.date}</Text>
//                 </View>
//                 <View style={styles.viewimage}>
//                     <Image source={props.Images} style={{ width: 50, height: 50, borderRadius: 50 }} />
//                 </View>
//                 <View style={styles.viewrate} >
//                     <Text style={styles.textrate}>{props.rating}</Text>
//                 </View>
//             </View>

//             <View style={styles.viewcomment}>
//                 <Text style={styles.textcomment}>{props.comment}</Text>
//             </View>

//         </SafeAreaView>
//     )
// }

const Comments = (props) => {
  const dispatch = useDispatch();
  const [Commen, setCommen] = useState([]);
  const [reply, setreply] = useState([]);
  const [rating, setrating] = useState("");
  const [loading, setloading] = useState(true);
  const [replycom, setreplycom] = useState("");
  const [resultcom, setresultcom] = useState("");
  const [resultdata, setresultdata] = useState("");
  const [refreshData, setRefreshData] = useState(false);
  // const token ="c6e51a7a85f6de25e8724dca9cddd4b14da8d358fc31592a74bd98986b04a7a11d181bd80dcb5d787fd8e21f7adcc66f981f7cba7bbc1fc7eb9b238d99d5de60";
  const token = useSelector((store) => store.userLogin.datatoken);
  const Seller = useSelector((store) => store.userLogin.dataseller);
  const [load, setload] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const getcommentHandler = async () => {
    try {
      setIsFetching(true);
      const res = await dispatch(getcomment(token, props.route.params.IDs));
      setrating(res.data.rating);
      setCommen(res.data.comments);
      //setreply(res.data.comments.reply)

      setIsFetching(false);
    } catch (err) {
      console.log(err);
    }
  };

  const setreplyHandler = async (id) => {
    try {
      setload(true);
      const res = await replycomment(token, replycom.text, id);

      setresultcom(res.message);
      setload(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getgetsellerHandler = async () => {
    try {
      const res = await dispatch(getsellerinfo(token));

      //console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const isfocuse = useIsFocused();
  useEffect(() => {
    getgetsellerHandler();
    getcommentHandler();
  }, [isfocuse]);

  return (
    <View style={styles.container}>
      <View style={styles.viewlogo}>
        <View style={styles.viewimagelogo}>
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
          <Text
            style={{
              fontFamily: "MontserratBold",
              fontSize: 14,
              color: Colors.primary,
            }}
          >
            {" "}
            {Seller.shop_name}
          </Text>
        </View>
      </View>

      <View style={styles.viewbox}>
        <View style={styles.box}>
          <View style={styles.viewicon}>
            <MaterialCommunityIcons
              name="currency-usd"
              size={30}
              color={Colors.background}
            />
          </View>
          <Text style={styles.textratebox}>میانگین امتیازات شما</Text>
          <Text style={styles.ratebox}>{rating}</Text>
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
        {resultdata}
      </Text>

      <FlatList
        onRefresh={getcommentHandler}
        refreshing={isFetching}
        data={Commen}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, i }) => (
          <SafeAreaView key={i}>
            <View style={styles.viewCommenting}>
              <Btn
                style={{ width: "26%", height: 40, marginLeft: "5%" }}
                textStyle={{ bottom: 10, fontSize: 12 }}
                label="مشاهده سفارش"
                onPress={() =>
                  props.navigation.navigate("order", {
                    ids: item.order_id,
                  })
                }
              />
              <View style={styles.viewtext}>
                <Text style={styles.textname}>
                  {item.user.first_name + " " + item.user.last_name}
                </Text>
                <Text style={styles.textdate}>{item.comment_date}</Text>
              </View>
              <View style={styles.viewimage}>
                <Image
                  source={{ uri: item.user.avatar }}
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                />
              </View>
              <View style={styles.viewrate}>
                <Text style={styles.textrate}>{item.rating}</Text>
              </View>
            </View>

            <View style={styles.viewcomment}>
              <Text style={styles.textcomment}>{item.comment_content}</Text>
            </View>

            {item.reply.map((itemreplay, t) => {
              return (
                <View key={t} style={styles.viewansver}>
                  <View style={{ width: "70%", height: 50, left: 18 }}>
                    <Text style={styles.textansver}>
                      <Text
                        style={{
                          fontFamily: "MontserratBold",
                          fontSize: 13,
                          color: Colors.secondText3,
                        }}
                      >
                        پاسخ شما:
                      </Text>
                      {itemreplay.comment_content}
                    </Text>
                  </View>
                  <View style={{ width: "7%", height: 50, left: 20 }}>
                    <MaterialCommunityIcons
                      name="reply"
                      size={25}
                      color={Colors.secondText3}
                    />
                  </View>
                </View>
              );
            })}

            {item.reply.length == 0 ? (
              <SafeAreaView>
                <View style={styles.viewansverbox}>
                  <Text
                    style={{
                      fontFamily: "MontserratBold",
                      fontSize: 15,
                      color: "red",
                    }}
                  >
                    {resultcom}
                  </Text>
                  <Image
                    source={require("../../assets/image/image13.png")}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 30,
                      left: 145,
                      top: 40,
                    }}
                  />
                  <TextInput
                    key={i}
                    placeholder="به این دیدگاه پاسخ دهید..."
                    placeholderTextColor={Colors.secondText3}
                    onChangeText={(text) => setreplycom({ text })}
                    style={styles.textinput}
                  />
                </View>
                <Btn
                  touchableStyle={{
                    width: "86%",
                    height: 50,
                    backgroundColor: Colors.secondary,
                  }}
                  textStyle={{ bottom: 10, fontSize: 16 }}
                  style={{ marginLeft: 23, marginTop: 10, marginBottom: 50 }}
                  loading={load}
                  colorspin={Colors.background}
                  sizespin={25}
                  label="ارسال پاسخ"
                  onPress={() => setreplyHandler(item.id)}
                />
              </SafeAreaView>
            ) : (
              <View></View>
            )}
          </SafeAreaView>
        )}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.viewtouch}>
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

        <TouchableOpacity style={styles.touch}>
          <MaterialCommunityIcons
            name="forum"
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
            نظرات
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("dashboard")}
          style={styles.touch}
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
};

export default Comments;

const styles = StyleSheet.create({
  viewCommenting: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: 75,
  },
  viewtext: {
    marginLeft: "18%",
    width: "30%",
    height: 50,
    alignItems: "flex-end",
  },
  textname: {
    fontFamily: "Montserrat",
    fontSize: 15,
  },
  textdate: {
    fontFamily: "Montserrat",
    fontSize: 13,
    color: Colors.secondText3,
  },
  viewimage: {
    marginLeft: 5,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  viewrate: {
    elevation: 4,
    right: 14,
    top: 15,
    width: 18,
    height: 18,
    borderRadius: 7,
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  textrate: {
    fontFamily: "MontserratBold1",
    fontSize: 8,
    color: Colors.background,
  },
  viewcomment: {
    width: "89%",
    marginLeft: "5%",
    alignItems: "center",
  },
  textcomment: {
    fontFamily: "Montserrat",
    fontSize: 16,
    color: Colors.secondText3,
    textAlign: "right",
  },
  container: {
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
    marginRight: "11%",
  },
  viewimagelogo: {
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
  viewbox: {
    width: "100%",
    height: 150,
    marginTop: 10,
    alignItems: "center",
  },
  box: {
    width: "89%",
    height: 120,
    right: 4,
    borderRadius: 5,
    backgroundColor: Colors.success,
    alignItems: "center",
  },
  viewicon: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: Colors.RGB2,
    alignItems: "center",
    justifyContent: "center",
    top: 10,
  },
  textratebox: {
    fontFamily: "MontserratLight",
    fontSize: 12,
    marginTop: 14,
    color: Colors.background,
  },
  ratebox: {
    fontFamily: "MontserratBold",
    fontSize: 12,
    marginTop: 4,
    color: Colors.background,
  },
  viewansver: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textansver: {
    fontFamily: "Montserrat",
    fontSize: 13,
    color: Colors.secondText3,
    textAlign: "right",
  },
  viewansverbox: {
    width: "85%",
    marginLeft: 50,
    right: 25,
    alignItems: "center",
  },
  textinput: {
    flexDirection: "row-reverse",
    width: "100%",
    height: 90,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.secondText2,
    padding: 10,
    paddingRight: 60,
    paddingBottom: 50,
    fontFamily: "Montserrat",
  },
  viewtouch: {
    flexDirection: "row",
    width: "88%",
    height: 70,
    borderRadius: 20,
    marginTop: 30,
    marginLeft: 20,
    backgroundColor: Colors.primary,
    marginBottom: 30,
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
