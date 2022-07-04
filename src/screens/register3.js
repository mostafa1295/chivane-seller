import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import Colors from "../constants/Colors";
import Btn from "../components/btn";
import SELECT from "../components/selecttime";
import { NativeBaseProvider, Select } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { gettime, settime } from "../stor/actions/userLogin";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";

const reducer = (state, action) => {
  switch (action.type) {
    case "textInput":
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};

const Register3 = (props) => {
  const dispatchs = useDispatch();
  const token =
    "7ae516b960e90b7f5c65d0b04a44b977cb8f9497fe1c987b3fe80d741e0cfce0a297fed5f8abb5ce004a3535539220cd4a4a37be847612226c0612f1726b100c";
  // const token = useSelector((store) => store.userLogin.datatoken);
  // const timings = useSelector((store) => store.userLogin.datatime);

  const [state, setState] = useState({
    ///شنبه
    saturday1: null,
    saturday2: null,
    saturday3: null,
    saturday4: null,

    saturday5: null,
    saturday6: null,
    saturday7: null,
    saturday8: null,

    //یکشنبه
    sunday1: null,
    sunday2: null,
    sunday3: null,
    sunday4: null,

    sunday5: null,
    sunday6: null,
    sunday7: null,
    sunday8: null,

    //دوشنبه

    monday1: null,
    monday2: null,
    monday3: null,
    monday4: null,

    monday5: null,
    monday6: null,
    monday7: null,
    monday8: null,

    //سه شنبه

    tuesday1: null,
    tuesday2: null,
    tuesday3: null,
    tuesday4: null,

    tuesday5: null,
    tuesday6: null,
    tuesday7: null,
    tuesday8: null,

    //چهارشنبه
    wednesday1: null,
    wednesday2: null,
    wednesday3: null,
    wednesday4: null,

    wednesday5: null,
    wednesday6: null,
    wednesday7: null,
    wednesday8: null,

    //پنج شنبه
    thursday1: null,
    thursday2: null,
    thursday3: null,
    thursday4: null,

    thursday5: null,
    thursday6: null,
    thursday7: null,
    thursday8: null,

    //جمعه

    friday1: null,
    friday2: null,
    friday3: null,
    friday4: null,

    friday5: null,
    friday6: null,
    friday7: null,
    friday8: null,
  });

  const gettimeHandler = async () => {
    try {
      const res = await dispatchs(gettime(token));
      //console.log(res.data);
      setState({
        ///شنبه
        saturday1: res.data.saturday.part_1.open
          ? res.data.saturday.part_1.open.substring(3, 5)
          : "00",
        saturday2: res.data.saturday.part_1.open
          ? res.data.saturday.part_1.open.substring(0, 2)
          : "00",
        saturday3: res.data.saturday.part_1.close
          ? res.data.saturday.part_1.close.substring(3, 5)
          : "00",
        saturday4: res.data.saturday.part_1.close
          ? res.data.saturday.part_1.close.substring(0, 2)
          : "00",

        saturday5: res.data.saturday.part_2.open
          ? res.data.saturday.part_2.open.substring(3, 5)
          : "00",
        saturday6: res.data.saturday.part_2.open
          ? res.data.saturday.part_2.open.substring(0, 2)
          : "00",
        saturday7: res.data.saturday.part_2.close
          ? res.data.saturday.part_2.close.substring(3, 5)
          : "00",
        saturday8: res.data.saturday.part_2.close
          ? res.data.saturday.part_2.close.substring(0, 2)
          : "00",

        //یکشنبه
        sunday1: res.data.sunday.part_1.open
          ? res.data.sunday.part_1.open.substring(3, 5)
          : "00",
        sunday2: res.data.sunday.part_1.open
          ? res.data.sunday.part_1.open.substring(0, 2)
          : "00",
        sunday3: res.data.sunday.part_1.close
          ? res.data.sunday.part_1.close.substring(3, 5)
          : "00",
        sunday4: res.data.sunday.part_1.close
          ? res.data.sunday.part_1.close.substring(0, 2)
          : "00",

        sunday5: res.data.sunday.part_2.open
          ? res.data.sunday.part_2.open.substring(3, 5)
          : "00",
        sunday6: res.data.sunday.part_2.open
          ? res.data.sunday.part_2.open.substring(0, 2)
          : "00",
        sunday7: res.data.sunday.part_2.close
          ? res.data.sunday.part_2.close.substring(3, 5)
          : "00",
        sunday8: res.data.sunday.part_2.close
          ? res.data.sunday.part_2.close.substring(0, 2)
          : "00",

        //دوشنبه

        monday1: res.data.monday.part_1.open
          ? res.data.monday.part_1.open.substring(3, 5)
          : "00",
        monday2: res.data.monday.part_1.open
          ? res.data.monday.part_1.open.substring(0, 2)
          : "00",
        monday3: res.data.monday.part_1.close
          ? res.data.monday.part_1.close.substring(3, 5)
          : "00",
        monday4: res.data.monday.part_1.close
          ? res.data.monday.part_1.close.substring(0, 2)
          : "00",

        monday5: res.data.monday.part_2.open
          ? res.data.monday.part_2.open.substring(3, 5)
          : "00",
        monday6: res.data.monday.part_2.open
          ? res.data.monday.part_2.open.substring(0, 2)
          : "00",
        monday7: res.data.monday.part_2.close
          ? res.data.monday.part_2.close.substring(3, 5)
          : "00",
        monday8: res.data.monday.part_2.close
          ? res.data.monday.part_2.close.substring(0, 2)
          : "00",

        //سه شنبه

        tuesday1: res.data.tuesday.part_1.open
          ? res.data.tuesday.part_1.open.substring(3, 5)
          : "00",
        tuesday2: res.data.tuesday.part_1.open
          ? res.data.tuesday.part_1.open.substring(0, 2)
          : "00",
        tuesday3: res.data.tuesday.part_1.close
          ? res.data.tuesday.part_1.close.substring(3, 5)
          : "00",
        tuesday4: res.data.tuesday.part_1.close
          ? res.data.tuesday.part_1.close.substring(0, 2)
          : "00",

        tuesday5: res.data.tuesday.part_2.open
          ? res.data.tuesday.part_2.open.substring(3, 5)
          : "00",
        tuesday6: res.data.tuesday.part_2.open
          ? res.data.tuesday.part_2.open.substring(0, 2)
          : "00",
        tuesday7: res.data.tuesday.part_2.close
          ? res.data.tuesday.part_2.close.substring(3, 5)
          : "00",
        tuesday8: res.data.tuesday.part_2.close
          ? res.data.tuesday.part_2.close.substring(0, 2)
          : "00",

        //چهارشنبه
        wednesday1: res.data.wednesday.part_1.open
          ? res.data.wednesday.part_1.open.substring(3, 5)
          : "00",
        wednesday2: res.data.wednesday.part_1.open
          ? res.data.wednesday.part_1.open.substring(0, 2)
          : "00",
        wednesday3: res.data.wednesday.part_1.close
          ? res.data.wednesday.part_1.close.substring(3, 5)
          : "00",
        wednesday4: res.data.wednesday.part_1.close
          ? res.data.wednesday.part_1.close.substring(0, 2)
          : "00",

        wednesday5: res.data.wednesday.part_2.open
          ? res.data.wednesday.part_2.open.substring(3, 5)
          : "00",
        wednesday6: res.data.wednesday.part_2.open
          ? res.data.wednesday.part_2.open.substring(0, 2)
          : "00",
        wednesday7: res.data.wednesday.part_2.close
          ? res.data.wednesday.part_2.close.substring(3, 5)
          : "00",
        wednesday8: res.data.wednesday.part_2.close
          ? res.data.wednesday.part_2.close.substring(0, 2)
          : "00",

        //پنج شنبه
        thursday1: res.data.thursday.part_1.open
          ? res.data.thursday.part_1.open.substring(3, 5)
          : "00",
        thursday2: res.data.thursday.part_1.open
          ? res.data.thursday.part_1.open.substring(0, 2)
          : "00",
        thursday3: res.data.thursday.part_1.close
          ? res.data.thursday.part_1.close.substring(3, 5)
          : "00",
        thursday4: res.data.thursday.part_1.close
          ? res.data.thursday.part_1.close.substring(0, 2)
          : "00",

        thursday5: res.data.thursday.part_2.open
          ? res.data.thursday.part_2.open.substring(3, 5)
          : "00",
        thursday6: res.data.thursday.part_2.open
          ? res.data.thursday.part_2.open.substring(0, 2)
          : "00",
        thursday7: res.data.thursday.part_2.close
          ? res.data.thursday.part_2.close.substring(3, 5)
          : "00",
        thursday8: res.data.thursday.part_2.close
          ? res.data.thursday.part_2.close.substring(0, 2)
          : "00",

        //جمعه

        friday1: res.data.friday.part_1.open
          ? res.data.friday.part_1.open.substring(3, 5)
          : "00",
        friday2: res.data.friday.part_1.open
          ? res.data.friday.part_1.open.substring(0, 2)
          : "00",
        friday3: res.data.friday.part_1.close
          ? res.data.friday.part_1.close.substring(3, 5)
          : "00",
        friday4: res.data.friday.part_1.close
          ? res.data.friday.part_1.close.substring(0, 2)
          : "00",

        friday5: res.data.friday.part_2.open
          ? res.data.friday.part_2.open.substring(3, 5)
          : "00",
        friday6: res.data.friday.part_2.open
          ? res.data.friday.part_2.open.substring(0, 2)
          : "00",
        friday7: res.data.friday.part_2.close
          ? res.data.friday.part_2.close.substring(3, 5)
          : "00",
        friday8: res.data.friday.part_2.close
          ? res.data.friday.part_2.close.substring(0, 2)
          : "00",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      gettimeHandler();
    }

    return () => {
      unmounted = true;
    };
  }, []);

  const sendtimeHandler = async () => {
    try {
      const resp = await settime(token, state);

      //console.log(resp);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {}, [state]);

  return (
    <NativeBaseProvider>
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: Colors.background,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 60,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <Text style={{ fontFamily: "MontserratBold", fontSize: 18 }}>
            ساعت کاری فروشگاه
          </Text>
        </View>

        <ScrollView>
          <View style={{ width: "80%", height: 30, left: 55, top: 10 }}>
            <Text
              style={{
                fontFamily: "MontserratBold",
                fontSize: 15,
                color: Colors.black,
              }}
            >
              شنبه
            </Text>
          </View>
          <SELECT
            label1="اول از"
            label2="اول تا"
            selectedValue1={state.saturday1}
            onValueChange1={(state) =>
              setState((prev) => ({
                ...prev,
                saturday1: state,
              }))
            }
            selectedValue2={state.saturday2}
            onValueChange2={(state) =>
              setState((prev) => ({
                ...prev,
                saturday2: state,
              }))
            }
            selectedValue3={state.saturday3}
            onValueChange3={(state) =>
              setState((prev) => ({
                ...prev,
                saturday3: state,
              }))
            }
            selectedValue4={state.saturday4}
            onValueChange4={(state) =>
              setState((prev) => ({
                ...prev,
                saturday4: state,
              }))
            }
          />

          <SELECT
            label1="دوم از"
            label2="دوم تا"
            selectedValue1={state.saturday5}
            onValueChange1={(state) =>
              setState((prev) => ({
                ...prev,
                saturday5: state,
              }))
            }
            selectedValue2={state.saturday6}
            onValueChange2={(state) =>
              setState((prev) => ({
                ...prev,
                saturday6: state,
              }))
            }
            selectedValue3={state.saturday7}
            onValueChange3={(state) =>
              setState((prev) => ({
                ...prev,
                saturday7: state,
              }))
            }
            selectedValue4={state.saturday8}
            onValueChange4={(state) =>
              setState((prev) => ({
                ...prev,
                saturday8: state,
              }))
            }
          />

          <View style={{ width: "80%", height: 30, left: 55, marginTop: 20 }}>
            <Text
              style={{
                fontFamily: "MontserratBold",
                fontSize: 15,
                color: Colors.black,
              }}
            >
              یکشنبه
            </Text>
          </View>

          <SELECT
            label1="اول از"
            label2="اول تا"
            selectedValue1={state.sunday1}
            onValueChange1={(state) =>
              setState((prev) => ({
                ...prev,
                sunday1: state,
              }))
            }
            selectedValue2={state.sunday2}
            onValueChange2={(state) =>
              setState((prev) => ({
                ...prev,
                sunday2: state,
              }))
            }
            selectedValue3={state.sunday3}
            onValueChange3={(state) =>
              setState((prev) => ({
                ...prev,
                sunday3: state,
              }))
            }
            selectedValue4={state.sunday4}
            onValueChange4={(state) =>
              setState((prev) => ({
                ...prev,
                sunday4: state,
              }))
            }
          />

          <SELECT
            label1="دوم از"
            label2="دوم تا"
            selectedValue1={state.sunday5}
            onValueChange1={(state) =>
              setState((prev) => ({
                ...prev,
                sunday5: state,
              }))
            }
            selectedValue2={state.sunday6}
            onValueChange2={(state) =>
              setState((prev) => ({
                ...prev,
                sunday6: state,
              }))
            }
            selectedValue3={state.sunday7}
            onValueChange3={(state) =>
              setState((prev) => ({
                ...prev,
                sunday7: state,
              }))
            }
            selectedValue4={state.sunday8}
            onValueChange4={(state) =>
              setState((prev) => ({
                ...prev,
                sunday8: state,
              }))
            }
          />

          <View style={{ width: "80%", height: 30, left: 55, marginTop: 20 }}>
            <Text
              style={{
                fontFamily: "MontserratBold",
                fontSize: 15,
                color: Colors.black,
              }}
            >
              دوشنبه
            </Text>
          </View>

          <SELECT
            label1="اول از"
            label2="اول تا"
            selectedValue1={state.monday1}
            onValueChange1={(state) =>
              setState((prev) => ({
                ...prev,
                monday1: state,
              }))
            }
            selectedValue2={state.monday2}
            onValueChange2={(state) =>
              setState((prev) => ({
                ...prev,
                monday2: state,
              }))
            }
            selectedValue3={state.monday3}
            onValueChange3={(state) =>
              setState((prev) => ({
                ...prev,
                monday3: state,
              }))
            }
            selectedValue4={state.monday4}
            onValueChange4={(state) =>
              setState((prev) => ({
                ...prev,
                monday4: state,
              }))
            }
          />

          <SELECT
            label1="دوم از"
            label2="دوم تا"
            selectedValue1={state.monday5}
            onValueChange1={(state) =>
              setState((prev) => ({
                ...prev,
                monday5: state,
              }))
            }
            selectedValue2={state.monday6}
            onValueChange2={(state) =>
              setState((prev) => ({
                ...prev,
                monday6: state,
              }))
            }
            selectedValue3={state.monday7}
            onValueChange3={(state) =>
              setState((prev) => ({
                ...prev,
                monday7: state,
              }))
            }
            selectedValue4={state.monday8}
            onValueChange4={(state) =>
              setState((prev) => ({
                ...prev,
                monday8: state,
              }))
            }
          />

          <View style={{ width: "80%", height: 30, left: 55, marginTop: 20 }}>
            <Text
              style={{
                fontFamily: "MontserratBold",
                fontSize: 15,
                color: Colors.black,
              }}
            >
              سه شنبه
            </Text>
          </View>

          <SELECT
            label1="اول از"
            label2="اول تا"
            selectedValue1={state.tuesday1}
            onValueChange1={(state) =>
              setState((prev) => ({
                ...prev,
                tuesday1: state,
              }))
            }
            selectedValue2={state.tuesday2}
            onValueChange2={(state) =>
              setState((prev) => ({
                ...prev,
                tuesday2: state,
              }))
            }
            selectedValue3={state.tuesday3}
            onValueChange3={(state) =>
              setState((prev) => ({
                ...prev,
                tuesday3: state,
              }))
            }
            selectedValue4={state.tuesday4}
            onValueChange4={(state) =>
              setState((prev) => ({
                ...prev,
                tuesday4: state,
              }))
            }
          />

          <SELECT
            label1="دوم از"
            label2="دوم تا"
            selectedValue1={state.tuesday5}
            onValueChange1={(state) =>
              setState((prev) => ({
                ...prev,
                tuesday5: state,
              }))
            }
            selectedValue2={state.tuesday6}
            onValueChange2={(state) =>
              setState((prev) => ({
                ...prev,
                tuesday6: state,
              }))
            }
            selectedValue3={state.tuesday7}
            onValueChange3={(state) =>
              setState((prev) => ({
                ...prev,
                tuesday7: state,
              }))
            }
            selectedValue4={state.tuesday8}
            onValueChange4={(state) =>
              setState((prev) => ({
                ...prev,
                tuesday8: state,
              }))
            }
          />

          <View style={{ width: "80%", height: 30, left: 55, marginTop: 20 }}>
            <Text
              style={{
                fontFamily: "MontserratBold",
                fontSize: 15,
                color: Colors.black,
              }}
            >
              چهارشنبه
            </Text>
          </View>

          <SELECT
            label1="اول از"
            label2="اول تا"
            selectedValue1={state.wednesday1}
            onValueChange1={(state) =>
              setState((prev) => ({
                ...prev,
                wednesday1: state,
              }))
            }
            selectedValue2={state.wednesday2}
            onValueChange2={(state) =>
              setState((prev) => ({
                ...prev,
                wednesday2: state,
              }))
            }
            selectedValue3={state.wednesday3}
            onValueChange3={(state) =>
              setState((prev) => ({
                ...prev,
                wednesday3: state,
              }))
            }
            selectedValue4={state.wednesday4}
            onValueChange4={(state) =>
              setState((prev) => ({
                ...prev,
                wednesday4: state,
              }))
            }
          />

          <SELECT
            label1="دوم از"
            label2="دوم تا"
            selectedValue1={state.wednesday5}
            onValueChange1={(state) =>
              setState((prev) => ({
                ...prev,
                wednesday5: state,
              }))
            }
            selectedValue2={state.wednesday6}
            onValueChange2={(state) =>
              setState((prev) => ({
                ...prev,
                wednesday6: state,
              }))
            }
            selectedValue3={state.wednesday7}
            onValueChange3={(state) =>
              setState((prev) => ({
                ...prev,
                wednesday7: state,
              }))
            }
            selectedValue4={state.wednesday8}
            onValueChange4={(state) =>
              setState((prev) => ({
                ...prev,
                wednesday8: state,
              }))
            }
          />

          <View style={{ width: "80%", height: 30, left: 55, marginTop: 20 }}>
            <Text
              style={{
                fontFamily: "MontserratBold",
                fontSize: 15,
                color: Colors.black,
              }}
            >
              پنجشنبه
            </Text>
          </View>
          <SELECT
            label1="اول از"
            label2="اول تا"
            selectedValue1={state.thursday1}
            onValueChange1={(state) =>
              setState((prev) => ({
                ...prev,
                thursday1: state,
              }))
            }
            selectedValue2={state.thursday2}
            onValueChange2={(state) =>
              setState((prev) => ({
                ...prev,
                thursday2: state,
              }))
            }
            selectedValue3={state.thursday3}
            onValueChange3={(state) =>
              setState((prev) => ({
                ...prev,
                thursday3: state,
              }))
            }
            selectedValue4={state.thursday4}
            onValueChange4={(state) =>
              setState((prev) => ({
                ...prev,
                thursday4: state,
              }))
            }
          />

          <SELECT
            label1="دوم از"
            label2="دوم تا"
            selectedValue1={state.thursday5}
            onValueChange1={(state) =>
              setState((prev) => ({
                ...prev,
                thursday5: state,
              }))
            }
            selectedValue2={state.thursday6}
            onValueChange2={(state) =>
              setState((prev) => ({
                ...prev,
                thursday6: state,
              }))
            }
            selectedValue3={state.thursday7}
            onValueChange3={(state) =>
              setState((prev) => ({
                ...prev,
                thursday7: state,
              }))
            }
            selectedValue4={state.thursday8}
            onValueChange4={(state) =>
              setState((prev) => ({
                ...prev,
                thursday8: state,
              }))
            }
          />

          <View style={{ width: "80%", height: 30, left: 55, marginTop: 20 }}>
            <Text
              style={{
                fontFamily: "MontserratBold",
                fontSize: 15,
                color: Colors.black,
              }}
            >
              جمعه
            </Text>
          </View>

          <SELECT
            label1="اول از"
            label2="اول تا"
            selectedValue1={state.friday1}
            onValueChange1={(state) =>
              setState((prev) => ({
                ...prev,
                friday1: state,
              }))
            }
            selectedValue2={state.friday2}
            onValueChange2={(state) =>
              setState((prev) => ({
                ...prev,
                friday2: state,
              }))
            }
            selectedValue3={state.friday3}
            onValueChange3={(state) =>
              setState((prev) => ({
                ...prev,
                friday3: state,
              }))
            }
            selectedValue4={state.friday4}
            onValueChange4={(state) =>
              setState((prev) => ({
                ...prev,
                friday4: state,
              }))
            }
          />

          <SELECT
            label1="دوم از"
            label2="دوم تا"
            selectedValue1={state.friday5}
            onValueChange1={(state) =>
              setState((prev) => ({
                ...prev,
                friday5: state,
              }))
            }
            selectedValue2={state.friday6}
            onValueChange2={(state) =>
              setState((prev) => ({
                ...prev,
                friday6: state,
              }))
            }
            selectedValue3={state.friday7}
            onValueChange3={(state) =>
              setState((prev) => ({
                ...prev,
                friday7: state,
              }))
            }
            selectedValue4={state.friday8}
            onValueChange4={(state) =>
              setState((prev) => ({
                ...prev,
                friday8: state,
              }))
            }
          />

          <Btn
            label="ثبت ساعات کاری"
            touchableStyle={{ height: 55 }}
            style={{ marginLeft: "5%", marginBottom: 50, marginTop: "20%" }}
            textStyle={{ bottom: 8, fontSize: 16 }}
            onPress={() => {
              sendtimeHandler();
              // props.navigation.navigate("register3")
            }}
          />
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
};

export default Register3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
});

//   const [resultArray ,setresult]=useState([])
//    Object.entries(timing); Object.keys(timing).map(index => {
//         resultArray.push({
//             key: index,
//             value:timing[index]
//         });
//     });

// console.log(resultArray[0].value.part_1.open);

// var ts = new Date(1648529716);
// console.log(ts.getSeconds())
//var suffix = ts.getHours() >= 12 ? ts.getHours():"0"+ts.getHours();
