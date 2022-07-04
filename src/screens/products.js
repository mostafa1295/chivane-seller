import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getproduct, productSearch } from "../stor/actions/productuser";
import { getsellerinfo } from "../stor/actions/userLogin";



const Products = (props) => {
  const dispatch = useDispatch();
  // const [Ordercompelet, setOrderOrdercompelet] = useState("");
 // const access_token ="43f1f56e5924a38566387cccc99334bd3596bc246dc0abe8186f539b93000f2826758c28622c8822ed8525e7a1f4588450c958bb7c80a13991b8c6df7bbb271f";
  //const searchdata = useSelector((store) => store.productuser.datasearch);
  const access_token = useSelector((store) => store.userLogin.datatoken);
  const [searching, setsearching] = useState("");
  const [Product, setProduct] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const Ordercompelet = useSelector((store) => store.userLogin.dataseller);
  const [resultcom, setresultcom] = useState("");

  const getgetsellerHandler = async () => {
    try {
      const res = await dispatch(getsellerinfo(access_token));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getgetsellerHandler();
    getproductHandler();
  }, []);

  const getproductHandler = async () => {
    try {
      setIsFetching(true);
      const res = await dispatch(getproduct(access_token));
     
    

       console.log(res.data);

      setProduct(res.data);

      if (res.data==[] ) {
        setresultcom("اطلاعاتی موجود نمی باشد")
    }
      setIsFetching(false);
    } catch (err) {
      console.log(err);
    }
  };

 
  const searchHandler = async () => {
    try {
      const search = await productSearch(access_token, searching);
     // console.log(search);
    } catch (err) {
      console.log(err);
    }
  };

  function separate(set) {
    let number = set.replace(/\D/g, "");
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewlogo}>
        <View style={styles.viewimagelogo}>
          <Image
            source={{
              uri: Ordercompelet.image_avatar
                ? Ordercompelet.image_avatar
                : "https://chivane.com/wp-content/uploads/2022/03/luminus-logo-simple.png",
            }}
            alt="image"
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
            {Ordercompelet.first_name + " " + Ordercompelet.last_name}
          </Text>
          <Text style={styles.textlogo}>{Ordercompelet.shop_name}</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", width: "100%", height: 70 }}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("product", {
              ids: "",
              Img: "بدون عکس",
            })
          }
          style={styles.touchadd}
        >
          <Ionicons name="add-outline" size={30} color={Colors.primary} />
        </TouchableOpacity>

        <TextInput
          placeholder="جست وجو در محصولات"
          placeholderTextColor={Colors.secondText3}
          style={styles.textinput}
          onChangeText={(searching) => setsearching(searching)}
          onKeyPress={searchHandler}
        />

        <MaterialCommunityIcons
          name="magnify"
          size={35}
          color="#767F9D"
          style={{ right: "36%", top: 11, zIndex: 2 }}
        />
      </View>
                <Text style={{ fontFamily: "MontserratBold", fontSize: 15, color: "red", right: 140 }}>
                        {resultcom}
                    </Text>
      <FlatList
        onRefresh={getproductHandler}
        refreshing={isFetching}
        data={Product}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("product", {
                ids: item.id,
                Img: item.thumbnail
                  ? item.thumbnail
                  : "https://chivane.com/wp-content/uploads/2022/03/luminus-logo-simple.png",
              })
            }
            style={styles.viewproducting}
          >
            <View style={styles.viewimageproducting}>
              <Image
                source={{
                  uri: item.thumbnail
                    ? item.thumbnail 
                    : "https://chivane.com/wp-content/uploads/2022/06/IMG-20220525-WA0008.jpg",
                }}
                alt="image"
                style={{ width: 70, height: 70, borderRadius: 10 }}
              />
            </View>

            <View style={{ width: "50%", height: 60, marginRight: 10 }}>
              <Text style={styles.textproducting}>{item.title}</Text>
              <Text style={styles.priceproducting}>
                {separate(JSON.stringify(item.price))} تومان
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />

      {/* <ScrollView style={{ backgroundColor: Colors.background, }}>





                <Producting
                    product="پیتزادولوپی بابیکیو"
                    price={"45000"}
                    sourceimage={require('../../assets/image/image80.png')}
                    onPress={() => props.navigation.navigate("product")}
                />

                <Producting
                    product="پیتزادولوپی بابیکیو"
                    price={"48000"}
                    sourceimage={require('../../assets/image/image80.png')}
                    onPress={() => props.navigation.navigate("product")}
                />

                <Producting
                    product="پیتزادولوپی بابیکیو"
                    price={"46000"}
                    sourceimage={require('../../assets/image/image80.png')}
                    onPress={() => props.navigation.navigate("product")}
                />

                <Producting
                    product="پیتزادولوپی بابیکیو"
                    price={"45000"}
                    sourceimage={require('../../assets/image/image80.png')}
                    onPress={() => props.navigation.navigate("product")}
                />

                <Producting
                    product="پیتزادولوپی بابیکیو"
                    price={"48000"}
                    sourceimage={require('../../assets/image/image80.png')}
                    onPress={() => props.navigation.navigate("product")}
                />

                <Producting
                    product="پیتزادولوپی بابیکیو"
                    price={"46000"}
                    sourceimage={require('../../assets/image/image80.png')}
                    onPress={() => props.navigation.navigate("product")}
                />

            </ScrollView> */}

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

        <TouchableOpacity
          onPress={() => props.navigation.navigate("comments")}
          style={styles.touch}
        >
          <MaterialCommunityIcons name="forum" size={25} color={Colors.RGB} />

          <Text style={styles.texttouch}>نظرات</Text>
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

        <TouchableOpacity style={styles.touch}>
          <MaterialCommunityIcons
            name="cart"
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
            محصولات
          </Text>
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

export default Products;

const styles = StyleSheet.create({
  viewproducting: {
    flexDirection: "row-reverse",
    width: "100%",
    height: 80,
    alignItems: "center",
  },
  viewimageproducting: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    borderRadius: 15,
    marginRight: 30,
  },
  textproducting: {
    fontFamily: "MontserratLight",
    fontSize: 17,
    marginTop: 5,
    color: Colors.black,
  },
  priceproducting: {
    fontFamily: "MontserratLight",
    fontSize: 13,
    color: Colors.primary,
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
    marginRight: "10%",
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
  textlogo: {
    fontFamily: "MontserratBold",
    fontSize: 14,
    color: Colors.primary,
  },
  touchadd: {
    width: "15%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.secondText,
    borderRadius: 15,
    marginLeft: "4%",
  },
  textinput: {
    flexDirection: "row-reverse",
    width: "69%",
    height: 60,
    backgroundColor: "#FCFCFD",
    left: "5%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    padding: 10,
    paddingRight: 50,
    fontFamily: "Montserrat",
  },
  viewtouch: {
    flexDirection: "row",
    width: "88%",
    height: 70,
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 20,
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
