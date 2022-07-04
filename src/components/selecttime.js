import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { NativeBaseProvider, Select } from "native-base";
import { gettime, settime } from "../stor/actions/userLogin";
import { useDispatch, useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";

const SELECT = (props) => {
  const dispatch = useDispatch();
  const token =
    "c6e51a7a85f6de25e8724dca9cddd4b14da8d358fc31592a74bd98986b04a7a11d181bd80dcb5d787fd8e21f7adcc66f981f7cba7bbc1fc7eb9b238d99d5de60";
  // const [time,dispatch] = useReducer(Reducer,initialState);
  const timing = useSelector((store) => store.userLogin.datatime);
  const [nameShop, setnameShop] = useState("");
  const [myTime, setMyTime] = useState();

  // const gettimeHandler = async () => {
  //     try {

  //         const res = await dispatch(gettime(token));
  //     //console.log(res.data.saturday.part_1.open);

  //         setnameShop(res.data.saturday.part_1.open)

  //     } catch (err) {
  //         console.log(err);
  //     }
  // };

  // useEffect(() => {
  //     gettimeHandler();
  // }, [])

  // var timestemp = new Date( 23456789000 );
  // var day = timestemp.getMinutes();
  // console.log(day);

  return (
    <NativeBaseProvider>
      <View
        style={{
          width: "100%",
          height: 20,
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat",
            fontSize: 10,
            color: Colors.secondText3,
            left: 120,
          }}
        >
          نوبت {props.label1}
        </Text>
        <Text
          style={{
            fontFamily: "Montserrat",
            fontSize: 10,
            color: Colors.secondText3,
            right: 125,
          }}
        >
          نوبت {props.label2}
        </Text>
      </View>

      <View
        style={{
          width: "100%",
          height: 80,
          flexDirection: "row-reverse",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            width: "20%",
            alignItems: "center",
            marginRight: "5%",
          }}
        >
          <View
            style={{
              width: "50%",
              height: 20,
              backgroundColor: Colors.background,
              alignItems: "center",
              zIndex: 2,
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat",
                fontSize: 12,
                color: Colors.secondText3,
              }}
            >
              دقیقه
            </Text>
          </View>

          <Picker
            selectedValue={props.selectedValue1}
            onValueChange={props.onValueChange1}
            style={Styles.pickerStyle}
          >
            <Picker.Item label="00" value="00" />
            <Picker.Item label="01" value="01" />
            <Picker.Item label="02" value="02" />
            <Picker.Item label="03" value="03" />
            <Picker.Item label="04" value="04" />
            <Picker.Item label="05" value="05" />
            <Picker.Item label="06" value="06" />
            <Picker.Item label="07" value="07" />
            <Picker.Item label="08" value="08" />
            <Picker.Item label="09" value="09" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
            <Picker.Item label="12" value="12" />
            <Picker.Item label="13" value="13" />
            <Picker.Item label="14" value="14" />
            <Picker.Item label="15" value="15" />
            <Picker.Item label="16" value="16" />
            <Picker.Item label="17" value="17" />
            <Picker.Item label="18" value="18" />
            <Picker.Item label="19" value="19" />
            <Picker.Item label="20" value="20" />
            <Picker.Item label="21" value="21" />
            <Picker.Item label="22" value="22" />
            <Picker.Item label="23" value="23" />
            <Picker.Item label="24" value="24" />
            <Picker.Item label="25" value="25" />
            <Picker.Item label="26" value="26" />
            <Picker.Item label="27" value="27" />
            <Picker.Item label="28" value="28" />
            <Picker.Item label="29" value="29" />
            <Picker.Item label="30" value="30" />
            <Picker.Item label="31" value="31" />
            <Picker.Item label="32" value="32" />
            <Picker.Item label="33" value="33" />
            <Picker.Item label="34" value="34" />
            <Picker.Item label="35" value="35" />
            <Picker.Item label="36" value="36" />
            <Picker.Item label="37" value="37" />
            <Picker.Item label="38" value="38" />
            <Picker.Item label="39" value="39" />
            <Picker.Item label="40" value="40" />
            <Picker.Item label="41" value="41" />
            <Picker.Item label="42" value="42" />
            <Picker.Item label="43" value="43" />
            <Picker.Item label="44" value="44" />
            <Picker.Item label="45" value="45" />
            <Picker.Item label="46" value="46" />
            <Picker.Item label="47" value="47" />
            <Picker.Item label="48" value="48" />
            <Picker.Item label="49" value="49" />
            <Picker.Item label="50" value="50" />
            <Picker.Item label="51" value="51" />
            <Picker.Item label="52" value="52" />
            <Picker.Item label="53" value="53" />
            <Picker.Item label="54" value="54" />
            <Picker.Item label="55" value="55" />
            <Picker.Item label="56" value="56" />
            <Picker.Item label="57" value="57" />
            <Picker.Item label="58" value="58" />
            <Picker.Item label="59" value="59" />
          </Picker>
        </View>

        <View
          style={{
            width: 10,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20, color: Colors.secondText3 }}>:</Text>
        </View>

        <View
          style={{
            flexDirection: "column",
            width: "20%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "50%",
              height: 20,
              backgroundColor: Colors.background,
              alignItems: "center",
              zIndex: 2,
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat",
                fontSize: 12,
                color: Colors.secondText3,
              }}
            >
              ساعت
            </Text>
          </View>

          <Picker
            selectedValue={props.selectedValue2}
            onValueChange={props.onValueChange2}
            style={Styles.pickerStyle}
          >
            <Picker.Item label="00" value="00" />
            <Picker.Item label="01" value="01" />
            <Picker.Item label="02" value="02" />
            <Picker.Item label="03" value="03" />
            <Picker.Item label="04" value="04" />
            <Picker.Item label="05" value="05" />
            <Picker.Item label="06" value="06" />
            <Picker.Item label="07" value="07" />
            <Picker.Item label="08" value="08" />
            <Picker.Item label="09" value="09" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
            <Picker.Item label="12" value="12" />
            <Picker.Item label="13" value="13" />
            <Picker.Item label="14" value="14" />
            <Picker.Item label="15" value="15" />
            <Picker.Item label="16" value="16" />
            <Picker.Item label="17" value="17" />
            <Picker.Item label="18" value="18" />
            <Picker.Item label="19" value="19" />
            <Picker.Item label="20" value="20" />
            <Picker.Item label="21" value="21" />
            <Picker.Item label="22" value="22" />
            <Picker.Item label="23" value="23" />
          </Picker>
        </View>

        <View
          style={{
            flexDirection: "column",
            width: "20%",
            alignItems: "center",
            marginRight: "5%",
          }}
        >
          <View
            style={{
              width: "50%",
              height: 20,
              alignItems: "center",
              zIndex: 2,
              backgroundColor: Colors.background,
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat",
                fontSize: 12,
                color: Colors.secondText3,
              }}
            >
              دقیقه
            </Text>
          </View>

          <Picker
            selectedValue={props.selectedValue3}
            onValueChange={props.onValueChange3}
            style={Styles.pickerStyle}
          >
            <Picker.Item label="00" value="00" />
            <Picker.Item label="01" value="01" />
            <Picker.Item label="02" value="02" />
            <Picker.Item label="03" value="03" />
            <Picker.Item label="04" value="04" />
            <Picker.Item label="05" value="05" />
            <Picker.Item label="06" value="06" />
            <Picker.Item label="07" value="07" />
            <Picker.Item label="08" value="08" />
            <Picker.Item label="09" value="09" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
            <Picker.Item label="12" value="12" />
            <Picker.Item label="13" value="13" />
            <Picker.Item label="14" value="14" />
            <Picker.Item label="15" value="15" />
            <Picker.Item label="16" value="16" />
            <Picker.Item label="17" value="17" />
            <Picker.Item label="18" value="18" />
            <Picker.Item label="19" value="19" />
            <Picker.Item label="20" value="20" />
            <Picker.Item label="21" value="21" />
            <Picker.Item label="22" value="22" />
            <Picker.Item label="23" value="23" />
            <Picker.Item label="24" value="24" />
            <Picker.Item label="25" value="25" />
            <Picker.Item label="26" value="26" />
            <Picker.Item label="27" value="27" />
            <Picker.Item label="28" value="28" />
            <Picker.Item label="29" value="29" />
            <Picker.Item label="30" value="30" />
            <Picker.Item label="31" value="31" />
            <Picker.Item label="32" value="32" />
            <Picker.Item label="33" value="33" />
            <Picker.Item label="34" value="34" />
            <Picker.Item label="35" value="35" />
            <Picker.Item label="36" value="36" />
            <Picker.Item label="37" value="37" />
            <Picker.Item label="38" value="38" />
            <Picker.Item label="39" value="39" />
            <Picker.Item label="40" value="40" />
            <Picker.Item label="41" value="41" />
            <Picker.Item label="42" value="42" />
            <Picker.Item label="43" value="43" />
            <Picker.Item label="44" value="44" />
            <Picker.Item label="45" value="45" />
            <Picker.Item label="46" value="46" />
            <Picker.Item label="47" value="47" />
            <Picker.Item label="48" value="48" />
            <Picker.Item label="49" value="49" />
            <Picker.Item label="50" value="50" />
            <Picker.Item label="51" value="51" />
            <Picker.Item label="52" value="52" />
            <Picker.Item label="53" value="53" />
            <Picker.Item label="54" value="54" />
            <Picker.Item label="55" value="55" />
            <Picker.Item label="56" value="56" />
            <Picker.Item label="57" value="57" />
            <Picker.Item label="58" value="58" />
            <Picker.Item label="59" value="59" />
          </Picker>
        </View>

        <View
          style={{
            width: 10,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20, color: Colors.secondText3 }}>:</Text>
        </View>

        <View
          style={{
            flexDirection: "column",
            width: "20%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "50%",
              height: 20,
              backgroundColor: Colors.background,
              alignItems: "center",
              zIndex: 2,
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat",
                fontSize: 12,
                color: Colors.secondText3,
              }}
            >
              ساعت
            </Text>
          </View>

          <Picker
            selectedValue={props.selectedValue4}
            onValueChange={props.onValueChange4}
            style={Styles.pickerStyle}
          >
            <Picker.Item label="00" value="00" />
            <Picker.Item label="01" value="01" />
            <Picker.Item label="02" value="02" />
            <Picker.Item label="03" value="03" />
            <Picker.Item label="04" value="04" />
            <Picker.Item label="05" value="05" />
            <Picker.Item label="06" value="06" />
            <Picker.Item label="07" value="07" />
            <Picker.Item label="08" value="08" />
            <Picker.Item label="09" value="09" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
            <Picker.Item label="12" value="12" />
            <Picker.Item label="13" value="13" />
            <Picker.Item label="14" value="14" />
            <Picker.Item label="15" value="15" />
            <Picker.Item label="16" value="16" />
            <Picker.Item label="17" value="17" />
            <Picker.Item label="18" value="18" />
            <Picker.Item label="19" value="19" />
            <Picker.Item label="20" value="20" />
            <Picker.Item label="21" value="21" />
            <Picker.Item label="22" value="22" />
            <Picker.Item label="23" value="23" />
          </Picker>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

const Styles = StyleSheet.create({
  pickerStyle: {
    width: 85,
    height: 40,
  },
});

export default SELECT;
