import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Modal,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import INPU from "../components/input";
import Btn from "../components/btn";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { CheckIcon, NativeBaseProvider, Select, VStack } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import {
  createproduct,
  getCategory,
  getdetailsproduct,
} from "../stor/actions/productuser";
import { upload_to_wp } from "../stor/actions/upload";

const Product = (props) => {
  const dispatch = useDispatch();

  const [error, seterror] = useState("");
  //const token ="43f1f56e5924a38566387cccc99334bd3596bc246dc0abe8186f539b93000f2826758c28622c8822ed8525e7a1f4588450c958bb7c80a13991b8c6df7bbb271f";
  const token = useSelector((store) => store.userLogin.datatoken);

  const [active, setactive] = useState(true);

  const [load, setload] = useState(false);

  const [DetailsProduct, setDetailsProduct] = useState({
    name: "",
    description: "",
    regular_price: "",
    sale_price: "",

    extra_food_addon_one: "",
    extra_food_addon_price_one: "",

    extra_food_addon_two: "",
    extra_food_addon_price_two: "",

    extra_food_addon_three: "",
    extra_food_addon_price_three: "",

    in_stock: "",

    category_id: "",
    image: props.route.params.Img,
  });

  const getDetailsproductHandler = async () => {
    try {
      const res = await dispatch(
        getdetailsproduct(token, props.route.params.ids)
      );

      console.log(res.data);

      setDetailsProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendPakeActiveHandler = async () => {
    try {
      setactive(active == true ? false : true);
    } catch (err) {
      console.log(err);
    }
  };

  const sendCreateProductHandler = async () => {
    try {
      setload(true);
      const resp = await createproduct(
        token,
        DetailsProduct.name,
        DetailsProduct.description,
        DetailsProduct.regular_price,
        DetailsProduct.sale_price,

        DetailsProduct.extra_food_addon_one,
        DetailsProduct.extra_food_addon_price_one,

        DetailsProduct.extra_food_addon_two,
        DetailsProduct.extra_food_addon_price_two,

        DetailsProduct.extra_food_addon_three,
        DetailsProduct.extra_food_addon_price_three,
        DetailsProduct.image,
        active,
        DetailsProduct.category_id
      );
      setload(false);
      if (resp.status == 400) {
        seterror(resp.message);
      }

      if (resp.status == 201) {
        props.navigation.navigate("products");
      }

      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(DetailsProduct.category_id);

  // ست کردن دسته بندی
  const [Categorytag, setCategorytag] = useState("");
  const setcityhandler = async () => {
    try {
      const tok = await dispatch(getCategory(token));
      // console.log(tok.data.cat_ID);

      setCategorytag(
        Object.keys(tok.data).map(function (key) {
          return tok.data[key];
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  let fresh = [];
  for (let i = 0; i < Categorytag.length; i++) {
    fresh.push(
      <Select.Item
        key={i}
        _text={{
          style: { fontFamily: "Montserrat" },
        }}
        label={Categorytag[i].name}
        value={Categorytag[i].term_id}
      />
    );
  }

  useEffect(() => {
    setcityhandler();
    getDetailsproductHandler();
  }, []);

  const uploadHandler = () => {
    upload_to_wp(token, "image/*", 2097152)
      .then((response) => {
        setDetailsProduct({ ...DetailsProduct, image: response });
      })
      .catch((e) => {
        if (e == "SizeLimit") {
          Alert.alert("پیام سیستم", "حداکثر حجم مجاز ۲ مگابایت", [
            { text: "باشه" },
          ]);
        }
      });
  };

  function separate(set) {
    let number = set.replace(/\D/g, "");
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    if (DetailsProduct.in_stock == true) {
      setactive(true);
    } else {
      setactive(false);
    }
  }, [DetailsProduct]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <NativeBaseProvider>
        <View style={styles.container}>
          <View style={styles.viewlogo}>
            {props.route.params.ids ? (
              <Text style={{ fontFamily: "MontserratBold", fontSize: 20 }}>
                ویرایش محصول
              </Text>
            ) : (
              <Text style={{ fontFamily: "MontserratBold", fontSize: 20 }}>
                افزودن محصول
              </Text>
            )}

            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={styles.touchlogo}
            >
              <Ionicons
                name="chevron-back-outline"
                size={25}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ backgroundColor: Colors.background }}>
            <INPU
              label="عنوان محصول "
              styleview={{ marginTop: 50 }}
              stylelabel={{ width: 90 }}
              value={DetailsProduct.name}
              onChangeText={(text) =>
                setDetailsProduct({ ...DetailsProduct, name: text })
              }
              keyboardType="default"
            />

            <INPU
              label="توضیحات"
              styleview={{ marginTop: 30, marginBottom: 90 }}
              stylelabel={{ width: 65 }}
              value={DetailsProduct.description}
              onChangeText={(text) =>
                setDetailsProduct({ ...DetailsProduct, description: text })
              }
              styleinput={{ height: 150, paddingBottom: 100 }}
              multiline={true}
            />

            <View style={styles.viewcamera}>
              <TouchableOpacity onPress={uploadHandler} style={styles.touchadd}>
                <Ionicons name="add-outline" size={25} color={Colors.primary} />
              </TouchableOpacity>
              <View style={{ width: "50%", height: 60, marginRight: 40 }}>
                <Text
                  style={{
                    fontFamily: "MontserratLight",
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  تصویر محصول
                </Text>
                <Text
                  style={{
                    fontFamily: "MontserratLight",
                    fontSize: 12,
                    color: Colors.primary,
                  }}
                >
                  حداکثرحجم 1 مگابایت
                </Text>
              </View>
              {
                DetailsProduct.image !== null ? (
                  <Image
                    source={{ uri: DetailsProduct.image }}
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: "contain",
                      right: 50,
                      borderRadius: 50,
                    }}
                  />
                ) : (
                  <Image
                    source={{ uri: DetailsProduct.image }}
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: "contain",
                      right: 50,
                      borderRadius: 50,
                    }}
                  />
                )
                //<Text style={{ fontFamily: "MontserratLight", fontSize: 12, color: Colors.black }}>بدون تصویر</Text>
              }
            </View>

            <View
              style={{ flexDirection: "row", width: "100%", marginTop: 20 }}
            >
              <INPU
                label="قیمت ویژه "
                styleview={{ width: "47%", left: 12 }}
                stylelabel={{ width: 70 }}
                value={DetailsProduct.sale_price}
                onChangeText={(text) =>
                  setDetailsProduct({ ...DetailsProduct, sale_price: text })
                }
                keyboardType="numeric"
              />
              <INPU
                label="قیمت عادی"
                styleview={{ width: "47%", left: 12 }}
                stylelabel={{ width: 75 }}
                value={DetailsProduct.regular_price}
                onChangeText={(text) =>
                  setDetailsProduct({ ...DetailsProduct, regular_price: text })
                }
                keyboardType="numeric"
              />
            </View>
            <Text style={styles.textmini}>قیمت ها به تومان وارد شوند</Text>

            <View style={styles.viewselect}>
              <View style={styles.viewtitleselect}>
                <Text style={styles.texttitleselect}>دسته بندی</Text>
              </View>

              <Ionicons
                name="chevron-down-outline"
                size={20}
                color={Colors.secondText3}
                style={{ top: "34%", right: "37%" }}
              />
              <Select
                selectedValue={DetailsProduct.category_id}
                w="90%"
                h={60}
                dropdownIcon={true}
                paddingRight={5}
                borderColor={Colors.secondText3}
                borderWidth={1}
                bottom={1}
                variant="outline"
                fontFamily="Montserrat"
                fontSize={12}
                flexDirection="row-reverse"
                accessibilityLabel="محصولات خود را انتخاب کنید"
                placeholder="محصول خود را انتخاب کنید"
                onValueChange={(text) =>
                  setDetailsProduct({ ...DetailsProduct, category_id: text })
                }
                _selectedItem={{
                  bg: Colors.primary,
                  endIcon: <CheckIcon size={5} color={Colors.black} />,
                }}
              >
                {fresh}
              </Select>
            </View>

            <View style={{ width: "80%", height: 28, left: 59 }}>
              <Text
                style={{
                  fontFamily: "MontserratBold",
                  fontSize: 15,
                  color: Colors.black,
                }}
              >
                افزودنی ها
              </Text>
            </View>

            <View style={{ width: "100%", height: 250, alignItems: "center" }}>
              <Text style={styles.title}>افزودنی 1</Text>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <INPU
                  label="قیمت"
                  styleview={{ width: "47%", left: 12 }}
                  stylelabel={{ width: 42 }}
                  value={separate(DetailsProduct.extra_food_addon_price_one)}
                  onChangeText={(text) =>
                    setDetailsProduct({
                      ...DetailsProduct,
                      extra_food_addon_price_one: text,
                    })
                  }
                  keyboardType="numeric"
                />
                <INPU
                  label="عنوان"
                  styleview={{ width: "47%", left: 12 }}
                  stylelabel={{ width: 40 }}
                  value={DetailsProduct.extra_food_addon_one}
                  onChangeText={(text) =>
                    setDetailsProduct({
                      ...DetailsProduct,
                      extra_food_addon_one: text,
                    })
                  }
                />
              </View>
              <Text style={styles.title}>افزودنی 2</Text>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <INPU
                  label="قیمت"
                  styleview={{ width: "47%", left: 12 }}
                  stylelabel={{ width: 40 }}
                  value={separate(DetailsProduct.extra_food_addon_price_two)}
                  onChangeText={(text) =>
                    setDetailsProduct({
                      ...DetailsProduct,
                      extra_food_addon_price_two: text,
                    })
                  }
                  keyboardType="numeric"
                />
                <INPU
                  label="عنوان"
                  styleview={{ width: "47%", left: 12 }}
                  stylelabel={{ width: 40 }}
                  value={DetailsProduct.extra_food_addon_two}
                  onChangeText={(text) =>
                    setDetailsProduct({
                      ...DetailsProduct,
                      extra_food_addon_two: text,
                    })
                  }
                />
              </View>
              <Text style={styles.title}>افزودنی 3</Text>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <INPU
                  label="قیمت"
                  styleview={{ width: "47%", left: 12 }}
                  stylelabel={{ width: 40 }}
                  keyboardType="numeric"
                  value={separate(DetailsProduct.extra_food_addon_price_three)}
                  onChangeText={(text) =>
                    setDetailsProduct({
                      ...DetailsProduct,
                      extra_food_addon_price_three: text,
                    })
                  }
                />
                <INPU
                  label="عنوان"
                  styleview={{ width: "47%", left: 12 }}
                  stylelabel={{ width: 40 }}
                  value={DetailsProduct.extra_food_addon_three}
                  onChangeText={(text) =>
                    setDetailsProduct({
                      ...DetailsProduct,
                      extra_food_addon_three: text,
                    })
                  }
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "90%",
                height: 50,
                borderRadius: 5,
                left: 20,
                top: 130,
                backgroundColor:
                  active == true ? Colors.success : Colors.primary,
              }}
            >
              <Text style={styles.mojodtext}>
                {" "}
                وضعیت موجودی محصول : {active == true ? "موجود" : "ناموجود "}
              </Text>

              <Btn
                style={styles.btnmojod}
                touchableStyle={{ backgroundColor: Colors.background }}
                label={active == true ? "ناموجودکن" : "موجود کن"}
                textStyle={{
                  color: active == true ? Colors.success : Colors.primary,
                  position: "absolute",
                  fontSize: 13,
                }}
                onPress={sendPakeActiveHandler}
              />
            </View>

            <View
              style={{
                width: "100%",
                height: 30,
                top: 30,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "MontserratBold",
                  fontSize: 18,
                  color: "red",
                }}
              >
                {error}
              </Text>
            </View>

            <Btn
              label="ثبت محصول"
              touchableStyle={{ height: 55, width: "91%" }}
              style={{ marginLeft: "4%", marginTop: 180, marginBottom: 50 }}
              loading={load}
              colorspin={Colors.background}
              sizespin={25}
              textStyle={{ bottom: 10, fontSize: 16 }}
              onPress={sendCreateProductHandler}
            />
          </ScrollView>
        </View>
      </NativeBaseProvider>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.background,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    width: 200,
    height: 200,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "100%",
    marginBottom: 10,
    bottom: 10,
  },
  buttonClose: {
    backgroundColor: Colors.primary,
  },
  textStyle: {
    color: Colors.background,
    textAlign: "center",
    fontFamily: "Montserrat",
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
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  touchlogo: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.secondText,
    borderRadius: 15,
    right: "5%",
    position: "absolute",
  },
  viewcamera: {
    flexDirection: "row-reverse",
    width: "100%",
    height: 100,
    marginTop: 20,
    alignItems: "center",
  },
  touchadd: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.secondText,
    borderRadius: 15,
    left: 21,
  },
  textmini: {
    fontFamily: "Montserrat",
    fontSize: 10,
    color: Colors.secondText3,
    right: 23,
    marginTop: 5,
  },
  viewselect: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    marginRight: "5%",
    marginTop: "2%",
    marginBottom: "8%",
  },
  viewtitleselect: {
    width: "18%",
    height: 20,
    backgroundColor: Colors.background,
    alignItems: "center",
    zIndex: 2,
    left: "33%",
    top: "22%",
  },
  texttitleselect: {
    fontFamily: "Montserrat",
    fontSize: 12,
    color: Colors.secondText3,
  },
  title: {
    fontFamily: "Montserrat",
    fontSize: 10,
    color: Colors.secondText3,
    marginBottom: 10,
    marginTop: 10,
  },
  mojodtext: {
    fontFamily: "Montserrat",
    fontSize: 10,
    position: "absolute",
    right: 20,
    marginTop: 13,
    color: Colors.background,
  },
  btnmojod: {
    width: "35%",
    height: 40,
    marginTop: 8,
    position: "absolute",
    left: 18,
  },
});

export default Product;
