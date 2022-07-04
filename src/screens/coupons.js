import React, { useEffect, useState } from 'react';
import { View, Text, Keyboard, TouchableWithoutFeedback, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from "../constants/Colors"
import INPU from "../components/input"
import Btn from "../components/btn";
import { Ionicons } from "@expo/vector-icons";
import { addcoupon, getcoupen } from '../stor/actions/productuser';
import { useDispatch, useSelector } from 'react-redux';

const Coupons = (props) => {
    const dispatch=useDispatch();
    const [load, setload] = useState(false);
    const [State, setState] = useState({
        coupon_1:"" ,
        coupon_2:"",
        coupon_3:"",
        min_spent:"",
    });
    
   // const token = "c6e51a7a85f6de25e8724dca9cddd4b14da8d358fc31592a74bd98986b04a7a11d181bd80dcb5d787fd8e21f7adcc66f981f7cba7bbc1fc7eb9b238d99d5de60"
    const token = useSelector((store) => store.userLogin.datatoken);

    const getcoupenHandler = async () => {
        try {
    
          const res = await dispatch(getcoupen(token));
           console.log(res.data);
          setState(res.data);
        
        } catch (err) {
          console.log(err);
        }
      };


      useEffect(()=>{
        getcoupenHandler();
      },[])
    
      const setcouponHandler = async () => {
        try {
            setload(true)
             await  addcoupon(
                token,
                State.coupon_1,
                State.coupon_2,
                State.coupon_3,
                State.min_spent
             
            
            )
            setload(false)
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


                <Text style={{ fontFamily: "MontserratBold", fontSize: 20 }}>
                    کوپن ها
                </Text>




                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: Colors.secondText, borderRadius: 15, left: 130 }}>
                    <Ionicons name="chevron-back-outline" size={25} color={Colors.primary} />
                </TouchableOpacity>
            </View>


            <ScrollView>






                <INPU
                    label="کوپن اول"
                    styleview={{ marginTop: 60, }}
                    stylelabel={{ width: "16%" }}
                     value={State.coupon_1}
                     onChangeText={text => setState({...State,coupon_1:text})}
                    
                    keyboardType="default"
                    
                />

                <INPU
                    label="کوپن دوم"
                    styleview={{ marginTop: 50, }}
                    stylelabel={{ width: "16%" }}
                     value={State.coupon_2}
                     onChangeText={text => setState({...State,coupon_2:text})}
                   
                    

                />
                <INPU
                    label="کوپن سوم"
                    styleview={{ marginTop: 50, }}
                    stylelabel={{ width: "17%" }}
                     value={State.coupon_3}
                     onChangeText={text => setState({...State,coupon_3:text})}
                    
                    keyboardType="default"

                />


                <INPU
                    label="حداقل مبلغ"
                    styleview={{ marginTop: 50, }}
                    stylelabel={{ width: "18%" }}
                     value={State.min_spent}
                     onChangeText={text => setState({...State,min_spent:text})}
                    maxLength={10}
                    keyboardType="numeric"

                />
                <Text style={styles.textminiup} >حداقل مبلغ سفارش که کوپن ها بعداز آن فعال می شوند.</Text>
                <Text style={styles.textminidown} >قیمت ها به تومان وارد شوند</Text>


                <Btn
                    label="ثبت تغییرات"
                    touchableStyle={{ height: 55 }}
                    style={{ marginLeft: "5%", marginTop: 100, marginBottom: 50 }}
                    textStyle={{ bottom: 10, fontSize: 16 }}
                    loading={load}
                    colorspin={Colors.background}
                    sizespin={25}
                    onPress={setcouponHandler}
                />

            </ScrollView>
        </View>

    )
}

export default Coupons;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: Colors.background
    },
    viewlogo: {
        flexDirection: "row-reverse",
        width: "100%",
        height: 80,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    textminiup: {
        fontFamily: "Montserrat",
        fontSize: 10,
        color: Colors.secondText3,
        right: 25,
        marginTop: 15
    },
    textminidown: {
        fontFamily: "Montserrat",
        fontSize: 10,
        color: Colors.secondText3,
        right: 25,
        marginTop: 5
    }
})