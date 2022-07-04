import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import INPU from "../components/input";
import Btn from "../components/btn";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { CheckIcon, NativeBaseProvider, Select, VStack } from "native-base";
import {
  getCity,
  getsellerinfo,
  infoShop,
  uploadimage,
} from "../stor/actions/userLogin";
import { useDispatch, useSelector } from "react-redux";
import Maps from "./map";

import * as DocumentPicker from "expo-document-picker";
import { upload_to_wp } from "../stor/actions/upload";

const Register2 = (props) => {
  const dispatch = useDispatch();
  const skip = useSelector((store) => store.userLogin.skip);

  // const token = "28bddb76cb7d81d0d883032489a54fd2497ecf213fd37ecc85a6da7a851756542f8d73e50a34dd05ae768767c113650bb487238143a54bfb9686c08d9c25c3e2";
  const token = useSelector((store) => store.userLogin.datatoken);
  const [error, seterror] = useState("");
  const [load, setload] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleimage, setModalVisibleimage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [Position, setPosition] = useState("");
  const [loading, setLoading] = useState(false);

  const [Sellerinfo, setSellerinfo] = useState({
    shop_name: "",
    shop_location: "",
    shop_main_phone_number: "",
    shop_address: "",
    shop_phone_number: "",
    image_avatar: "",
    shop_city: "",
  });
  const [City, setCity] = useState({
    id: "",
  });

  const uploadHandler = () => {
    setLoading(true);
    upload_to_wp(token, "image/*", 2097152, true)
      .then((response) => {
        setSellerinfo({ ...Sellerinfo, image_avatar: response });
        setLoading(false);
      })
      .catch((e) => {
        if (e == "SizeLimit") {
          Alert.alert("پیام سیستم", "حداکثر حجم مجاز ۲ مگابایت", [
            { text: "باشه" },
          ]);
        }
      });
  };

  // ست کردن شهرها
  const [citytag, setcitytag] = useState("");
  const setcityhandler = async () => {
    try {
      const tok = await dispatch(getCity(token));
      // console.log(tok.data);
      setcitytag(tok.data);
    } catch (err) {
      console.log(err);
    }
  };

  let fresh = [];
  for (let i = 0; i < citytag.length; i++) {
    fresh.push(
      <Select.Item
        key={i}
        _text={{
          style: { fontFamily: "Montserrat" },
        }}
        label={citytag[i].name}
        value={citytag[i].term_id}
      />
    );
  }

  useEffect(() => {
    setcityhandler();
    getgetsellerHandler();
  }, []);

  //نقشه
  function handlePosition(value) {
    setPosition(value);
  }

  // const [images, setImages] = useState(null);
  // //آپلود عکس
  // const sendimageuploadHandler = async () => {
  //     try {

  //         let result = await DocumentPicker.getDocumentAsync({});
  //         setImages(result.uri);
  //         console.log(result);
  //         await uploadimage(
  //             token,
  //             images,

  //         )
  //     } catch (err) {
  //         console.log(err);
  //     }
  // };

  console.log(City.id);
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    console.log(result);

    if (!result.cancelled) {
      setSelectedImage({ localUri: result.uri });
      console.log(result.uri);
    }
  };

  //ارسال اطلاعات فروشگاه
  const sendInfoHandler = async () => {
    try {
      setload(true);
      const respon = await dispatch(
        infoShop(
          token,
          Sellerinfo.shop_name,
          Sellerinfo.shop_main_phone_number,
          Sellerinfo.shop_phone_number,
          City.id,
          Sellerinfo.shop_address,
          Position.latitude,
          Position.longitude,
          Sellerinfo.image_avatar.id
        )
      );

      console.log(respon);

      if (respon.status == 400) {
        seterror(respon.message);
      }

      if (respon.status == 201) {
        setTimeout(() => {
          props.navigation.navigate("dashboard");
        }, 1000);
      }
      setload(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getgetsellerHandler = async () => {
    try {
      const res = await dispatch(getsellerinfo(token));

      console.log(res.data);
      setSellerinfo({
        ...res.data,
        image_avatar: { url: res.data.banner, id: null },
      });
      setCity(res.data.shop_city);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <NativeBaseProvider>
        <View style={styles.container}>
          <View style={styles.viewlogo}>
            <Text style={{ fontFamily: "MontserratBold", fontSize: 18 }}>
              اطلاعات فروشگاه
            </Text>
          </View>

          <ScrollView>
            <View style={styles.centeredView}>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleimage}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisibleimage(!modalVisibleimage);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalViewimage}>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        if (openCamera) {
                          openCamera();

                          setModalVisibleimage(!modalVisibleimage);
                        }
                      }}
                    >
                      <Text style={styles.textStyle}>دوربین</Text>
                    </Pressable>

                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        if (openImagePickerAsync) {
                          openImagePickerAsync();

                          setModalVisibleimage(!modalVisibleimage);
                        }
                      }}
                    >
                      <Text style={styles.textStyle}>گالری</Text>
                    </Pressable>

                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        setModalVisibleimage(!modalVisibleimage);
                      }}
                    >
                      <Text style={styles.textStyle}>انصراف</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>

            {/* 

                        <TouchableOpacity onPress={() => setModalVisibleimage(true)} style={styles.viewimage}>
                        {(selectedImage !== null)

                            ?
                            <Image
                                source={{ uri: selectedImage.localUri }}
                                style={{ width: 120, height: 120,  borderRadius: 100 }}
                            />
                            :
                            
                            <View style={styles.viewtextimage}>
                                <Text style={{ fontFamily: "Montserrat", fontSize: 12, color: Colors.background }}>تصویر فروشگاه</Text>
                            </View>
}
                        </TouchableOpacity> */}

            <View style={styles.viewimage}>
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: Colors.primary,
                  borderRadius: 50,
                }}
                onPress={() => {
                  if (!skip) {
                    // sendimageuploadHandler();
                    uploadHandler();
                  }
                }}
              >
                {!skip && !loading && (
                  <SafeAreaView>
                    {!Sellerinfo.image_avatar ? (
                      <Text
                        style={{
                          fontFamily: "Montserrat",
                          fontSize: 12,
                          color: Colors.background,
                          zIndex: 2,
                        }}
                      >
                        تصویر فروشگاه
                      </Text>
                    ) : (
                      <Image
                        // source={{ uri: image != null ? image : alert("fdfdfd") }}
                        source={
                          Sellerinfo.image_avatar
                            ? { uri: Sellerinfo.image_avatar.url }
                            : { uri: undefined }
                        }
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 50,
                        }}
                      />
                    )}
                  </SafeAreaView>
                )}

                {/* {skip && !loading && (
                                    <Image
                                        source={{
                                            uri: "https://banet.app/wp-content/uploads/2021/12/none.jpg",
                                        }}
                                        style={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: 50,
                                        }}
                                    />
                                )}  */}
                {loading && <ActivityIndicator size="small" color="#fff" />}
              </TouchableOpacity>
            </View>

            <INPU
              label="نام فروشگاه"
              styleview={{ marginTop: 140 }}
              stylelabel={{ width: "19%" }}
              value={Sellerinfo.shop_name}
              onChangeText={(text) =>
                setSellerinfo({ ...Sellerinfo, shop_name: text })
              }
              keyboardType="default"
            />

            <INPU
              label=" شماره ثابت فروشگاه"
              styleview={{ marginTop: 30 }}
              stylelabel={{ width: "33%" }}
              value={Sellerinfo.shop_main_phone_number}
              onChangeText={(text) =>
                setSellerinfo({ ...Sellerinfo, shop_main_phone_number: text })
              }
              maxLength={11}
              keyboardType="numeric"
            />

            <INPU
              label="شماره موبایل "
              styleview={{ marginTop: 30 }}
              stylelabel={{ width: "20%" }}
              value={Sellerinfo.shop_phone_number}
              onChangeText={(text) =>
                setSellerinfo({ ...Sellerinfo, shop_phone_number: text })
              }
              maxLength={11}
              keyboardType="numeric"
            />

            <View style={styles.viewselect}>
              <View style={styles.viewtitle}>
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: 12,
                    color: Colors.secondText3,
                  }}
                >
                  شهر
                </Text>
              </View>

              <Ionicons
                name="chevron-down-outline"
                size={18}
                color={Colors.secondText3}
                style={{ top: "34%", right: "37%" }}
              />
              <Select
                selectedValue={City.id}
                w="90%"
                h={60}
                dropdownIcon={true}
                paddingRight={3}
                borderColor={Colors.secondText3}
                borderWidth={1}
                bottom={1}
                variant="outline"
                fontFamily="Montserrat"
                fontSize={12}
                flexDirection="row-reverse"
                accessibilityLabel="شهر خود را انتخاب کنید"
                placeholder="شهر خود را انتخاب کنید"
                onValueChange={(text) => setCity({ ...City, id: text })}
                _selectedItem={{
                  bg: Colors.primary,
                  startIcon: <CheckIcon size={5} color={Colors.black} />,
                }}
              >
                {fresh}
              </Select>
            </View>

            <INPU
              label="آدرس فروشگاه"
              styleview={{ bottom: 20 }}
              stylelabel={{ width: "23%" }}
              value={Sellerinfo.shop_address}
              onChangeText={(text) =>
                setSellerinfo({ ...Sellerinfo, shop_address: text })
              }
              keyboardType="default"
            />

            <View style={styles.centeredView}>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Maps onSelectPos={handlePosition} />
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <Text style={styles.textStyle}>تایید</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>

            <View style={styles.viewlocation}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.addicon}
              >
                <Ionicons name="add-outline" size={25} color={Colors.primary} />
              </TouchableOpacity>
              <View style={styles.viewtextadd}>
                <Text style={styles.textadd}>افزودن لوکیشن</Text>
                <Text style={styles.textlocation}> موقعیت مکانی فروشگاه</Text>
              </View>
            </View>

            <View style={{ width: "100%", height: 30, alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "MontserratBold",
                  fontSize: 15,
                  color: Colors.secondText3,
                }}
              >
                {Position
                  ? Position.latitude + " , " + Position.longitude
                  : Sellerinfo.shop_location}
              </Text>
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
              label="ثبت تغییرات فروشگاه"
              touchableStyle={{ height: 55 }}
              style={{ marginLeft: "5%", marginTop: 40, marginBottom: 50 }}
              textStyle={{ bottom: 8, fontSize: 16 }}
              loading={load}
              colorspin={Colors.background}
              sizespin={25}
              onPress={() => {
                //sendimageuploadHandler();
                sendInfoHandler();
                //props.navigation.navigate("register3")
              }}
            />
          </ScrollView>
        </View>
      </NativeBaseProvider>
    </TouchableWithoutFeedback>
  );
};

export default Register2;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    alignItems: "center",
    width: 400,
    height: 600,
    elevation: 5,
  },
  modalViewimage: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    alignItems: "center",
    width: 300,
    height: 250,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "90%",
    marginTop: 30,
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
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  viewimage: {
    width: "100%",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    top: 40,
  },
  viewtextimage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
  viewselect: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    marginRight: "5%",
    marginBottom: "11%",
  },
  viewtitle: {
    width: "8%",
    height: 20,
    backgroundColor: Colors.background,
    alignItems: "center",
    zIndex: 2,
    left: "37%",
    top: "20%",
  },
  viewlocation: {
    flexDirection: "row-reverse",
    width: "100%",
    height: 100,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  addicon: {
    borderWidth: 2,
    borderColor: Colors.secondText,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginRight: 30,
  },
  viewtextadd: {
    width: "50%",
    height: 60,
    marginRight: 20,
  },
  textadd: {
    fontFamily: "MontserratLight",
    fontSize: 16,
    marginRight: 3,
    marginTop: 5,
  },
  textlocation: {
    fontFamily: "MontserratLight",
    fontSize: 12,
    color: Colors.primary,
  },
});
