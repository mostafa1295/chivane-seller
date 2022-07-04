import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Linking, ActivityIndicator, } from 'react-native';
import Btn from '../components/btn';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { accepttiming, getorder } from '../stor/actions/productuser';
import { getsellerinfo } from '../stor/actions/userLogin';



// const Ordering = (props) => {

//     // const separate = (num) => {
//     //     let number = num.replace(/\D/g, "");
//     //     return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     // };
//     return (
//         <View style={styles.viewscroll}>

//             <Image source={props.sourceimage} style={styles.imagescroll} />

//             <View style={styles.viewx2scroll}>
//                 <Text style={styles.textx2scroll}>x{props.Length}</Text>
//             </View>

//             <View style={{ flexDirection: "column", alignItems: "center", }}>
//                 <Text style={styles.texthotscroll}>{props.product}</Text>
//                 <Text style={styles.textpricescroll}>{separate(props.price)} تومان</Text>
//             </View>
//         </View>
//     )
// }
















function Order(props) {

  

    const [loading, setloading] = useState(true);
   // const [loaded, setloaded] = useState(false);
    const [accept, setaccept] = useState("تایید می کنم");
    
    const dispatch = useDispatch();
    const [Ordercompelet, setOrderOrdercompelet] = useState([]);
    const [state, setstate] = useState("");
    const [Product, setProduct] = useState("");
   // const token = "c6e51a7a85f6de25e8724dca9cddd4b14da8d358fc31592a74bd98986b04a7a11d181bd80dcb5d787fd8e21f7adcc66f981f7cba7bbc1fc7eb9b238d99d5de60"
    const token = useSelector((store) => store.userLogin.datatoken);
    const [time, settime] = useState("");
    const Seller=useSelector((store) => store.userLogin.dataseller);

    const sendOrderAcceptHandler = async () => {
        try {
            setloaded(true);
            setaccept(((accept == "تایید می کنم") ? "تحویل دادم" : "تایید می کنم"))
            setloaded(false);
        } catch (err) {
            console.log(err);
        }
    };




    const getorderdetailstHandler = async () => {
        try {
   
          const res = await dispatch(getorder(token,
            props.route.params.ids
            ));
    
          if (Ordercompelet == "") {
            setloading(false);
          }
           console.log(res.data);
         setstate(res.data.customer)
         setProduct(res.data)
          setOrderOrdercompelet(res.data.items)
          setloading(false);
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



useEffect(()=>{
    getorderdetailstHandler();
    getgetsellerHandler();
},[])





const setAcceptHandler = async () => {
    try {
         await  accepttiming(
            token,
           time,
            
        
        )
        

    } catch (err) {
        console.log(err);
    }
};




// console.log(Product.payment_status);




    const url = 'geo:37.484847,-122.148386';
    const handleOpenWithLinking = () => {
        Linking.openURL(url);
    };

    const handleOpencall = () => {
        Linking.openURL(`tel:09113043630`);
    };


    function separate(set) {
        let number = set.replace(/\D/g, "");
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    

    return (

        <View style={styles.container}>

            <View style={styles.viewlogo}>

                <View style={styles.viewimage}>
                    <Image source={{uri:Seller.image_avatar}} style={{ width: 50, height: 50, borderRadius: 10 }} />
                </View>

                <View style={styles.viewtextlogo}>
                    <Text style={styles.textshop}>{Seller.first_name+" "+Seller.last_name}</Text>
                    <Text style={styles.textkabab}>{Seller.shop_name}</Text>
                </View>

                <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.touchicon}>
                    <Ionicons name="chevron-back-outline" size={25} color={Colors.primary} />
                </TouchableOpacity>
            </View>




            <ScrollView>




                <View style={styles.viewcardaddress}>
                    <View style={{ width: "65%", }}>
                        <Text style={{ fontFamily: "MontserratBold", fontSize: 16, }}>{state.full_name} </Text>
                        <Text style={styles.textaddress} >{state.address}</Text>
                    </View>

                    <View style={{ width: "35%" }}>
                        <Btn style={styles.Btnnumber}
                            label={state.phone}
                            textStyle={styles.textBtn}
                            onPress={handleOpencall}

                        />
                        <Btn style={styles.Btnnumber}
                            touchableStyle={{ backgroundColor: Colors.secondary }}
                            label="لوکیشن"
                            textStyle={styles.textBtn}
                            onPress={handleOpenWithLinking}
                        />
                    </View>
                </View>

                <View style={styles.viewtitle}>
                    <Text style={styles.texttitle} >اقلام سفارش </Text>
                </View>



                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}  >

{(loading ?
          <View style={{ width: 200, height: 50, marginTop: 20 ,left:30}} >
            <ActivityIndicator
              animating={loading} size={30} color={Colors.primary} />
          </View>
          :

      Ordercompelet.map((item, i) => {
      return (
         <View key={i} style={styles.viewscroll}>

            <Image source={{uri:item.image ? item.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQREArxsdwlp4Z3LKPOiIlc7g0hddxhzuP6bw&usqp=CAU"}} style={styles.imagescroll} />

            <View style={styles.viewx2scroll}>
                <Text style={styles.textx2scroll}>x{item.qty}</Text>
            </View>

            <View style={{ flexDirection: "column", alignItems: "center", }}>
                <Text style={styles.texthotscroll}>{item.name}</Text>
                <Text style={styles.textpricescroll}>{separate(item.price)} تومان</Text>
            </View>
        </View>

)
}))}







                </ScrollView>




                <View style={styles.viewreciev}>

                    <Text style={styles.textreciev}>سفارش درانتظاردریافت توسط شماست </Text>
                    <Text style={styles.textbox}>زمان تحویل را انتخاب کنید</Text>

                    <Btn style={styles.m15}
                        touchableStyle={styles.touchbox}
                        label="15 دقیقه"
                        onPress={()=>settime(15)}
                        textStyle={{ color: Colors.background, position: "absolute", fontSize: 10 }}
                        
                    />


                    <Btn style={styles.m30}
                        touchableStyle={styles.touchbox}
                        label="30 دقیقه"
                        onPress={()=>settime(30)}
                        textStyle={{ color: Colors.background, position: "absolute", fontSize: 10 }}
                    />



                    <Btn style={styles.m45}
                        touchableStyle={styles.touchbox}
                        label="45 دقیقه"
                        onPress={()=>settime(45)}
                        textStyle={{ color: Colors.background, position: "absolute", fontSize: 10 }}
                    />


                    <Btn style={styles.S1}
                        touchableStyle={styles.touchbox}
                        label="1 ساعت"
                        onPress={()=>settime(1)}
                        textStyle={{ color: Colors.background, position: "absolute", fontSize: 10 }}
                    />


                    <Btn style={styles.S115}
                        touchableStyle={styles.touchbox}
                        label="1 ساعت وربع"
                        onPress={()=>settime(115)}
                        textStyle={{ color: Colors.background, position: "absolute", fontSize: 10 }}
                    />


                    <Btn style={styles.S130}
                        touchableStyle={styles.touchbox}
                        label="1 ساعت ونیم"
                        onPress={()=>settime(130)}
                        textStyle={{ color: Colors.background, position: "absolute", fontSize: 10 }}
                    />









                    <Btn style={styles.Btnreciev}
                        touchableStyle={{ backgroundColor: Colors.background }}
                        label={accept}
                        textStyle={{ color: Colors.primary, position: "absolute", fontSize: 12 }}
                        onPress={setAcceptHandler}

                    />



                </View>






                <View style={styles.viewtitle}>
                    <Text style={styles.texttitle} >مشخصات سفارش </Text>
                </View>




                <View style={styles.viewboxContainer}>

                    <View style={styles.viewBox1}>
                        <Text style={styles.textboxRight}>شماره سفارش</Text>
                        <Text style={styles.textboxLeft}>{Product.id}</Text>
                    </View>


                    <View style={styles.viewBox}>
                        <Text style={styles.textboxRight}>هزینه پیک </Text>
                        <Text style={styles.textboxLeft}>{separate(JSON.stringify(Product.pake)? JSON.stringify(Product.pake):"")} تومان</Text>
                    </View>



                    <View style={styles.viewBox1}>
                        <Text style={styles.textboxRight}>قیمت کل سفارش</Text>
                        <Text style={styles.textboxLeft}>{separate(Product.total?Product.total:"")} تومان</Text>
                    </View>


                    <View style={styles.viewBox}>
                        <Text style={styles.textboxRight}>نوع پرداخت</Text>
                        <Text style={styles.textboxLeft}>{Product.payment_way}</Text>
                    </View>

                    <View style={styles.viewBox1}>
                        <Text style={styles.textboxRight}>وضعیت پرداخت</Text>
                        <Text style={styles.textboxLeft}>{Product.payment_status}</Text>
                    </View>

                </View>







            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    textbox: {
        fontFamily: "Montserrat",
        fontSize: 12,
        position: "absolute",
        right: 35,
        top: 40,
        color: Colors.background
    },
    touchbox: {
        backgroundColor: Colors.primary,
        borderWidth: 1,
        borderColor: Colors.background,
        elevation: 0,
        borderRadius: 5

    },

    container: {
        width: "100%",
        height: "100%",
        backgroundColor: Colors.background
    },
    touchicon: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: Colors.secondText,
        borderRadius: 15,
        marginRight: "14%"
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
    viewtextlogo: {
        alignItems:"flex-end",
        width: "50%",
        height: 60,
        marginRight: 10,
    },
    textshop: {
        fontFamily: "MontserratLight",
        fontSize: 12,
        marginTop: 8,
        color: Colors.secondText3
    },
    textkabab: {
        fontFamily: "MontserratBold",
        fontSize: 14,
        color: Colors.primary
    },
    viewcardaddress: {
        flexDirection: "row-reverse",
        width: "90%",
        height: 120,
        marginRight: "5%",
        marginTop: 40
    },
    textaddress: {
        fontFamily: "MontserratLight",
        fontSize: 15,
        marginTop: 10
    },
    Btnnumber: {
        width: "100%",
        height: 40,
        marginBottom: 5
    },
    textBtn: {
        color: Colors.background,
        position: "absolute",
        fontSize: 13
    },
    viewtitle: {
        width: "100%",
        justifyContent: "center",
        marginBottom: 10,


    },
    texttitle: {
        fontFamily: "MontserratBold",
        fontSize: 16,
        color: "black",
        marginRight: "5%",
    },
    viewscroll: {
        width: 150,
        height: 190,
        flexDirection: "column",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 2,
        marginRight: 5,
        marginLeft: 5,
        overflow: "hidden",
        borderColor: Colors.secondText2


    },
    imagescroll: {
        width: 148,
        height: 120,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        left: 1,
        top: 1

    },
    viewx2scroll: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: Colors.primary, position: "absolute",
        right: 12,
        top: 8
    },
    textx2scroll: {
        fontFamily: "MontserratBold",
        fontSize: 12,
        color: Colors.background, position: "absolute",
        left: 10,
        top: 2
    },
    texthotscroll: {
        fontFamily: "MontserratLight",
        fontSize: 12,
        marginTop: 8,

    },
    textpricescroll: {
        fontFamily: "Montserrat",
        fontSize: 12,
        marginTop:"1%",
        color: Colors.secondary
    },
    viewreciev: {
        flexDirection: "row",
        width: "90%",
        height: 140,
        borderRadius: 5,
        position: "relative",
        left: 20,
        marginTop: 20,
        marginBottom: 30,
        backgroundColor: Colors.primary
    },
    textreciev: {
        fontFamily: "Montserrat",
        fontSize: 12,
        position: "absolute",
        right: 20,
        marginTop: 13,
        color: Colors.background
    },
    Btnreciev: {
        width: "30%",
        height: 30,
        marginTop: 55,
        position: "absolute",
        left: 18
    },
    viewboxContainer: {
        width: "90%",
        height: 290,
        left: 20
    },
    viewBox: {
        flexDirection: "row-reverse",
        width: "100%",
        height: 50,
        backgroundColor: Colors.secondText2,
    },
    viewBox1: {
        flexDirection: "row-reverse",
        width: "100%",
        height: 50,
        backgroundColor: Colors.secondText,
    },
    textboxRight: {
        fontFamily: "Montserrat",
        fontSize: 15,
        position: "absolute",
        top: 13,
        left: 25
    },
    textboxLeft: {
        fontFamily: "Montserrat",
        fontSize: 15,
        position: "absolute",
        right: 20,
        top: 13
    },
    viewpayment: {
        width: "90%",
        height: 100,
        borderRadius: 5,
        flexDirection: "row",
        marginTop: 20,
        position: "relative",
        left: 20,
        marginBottom: 20,
        backgroundColor: Colors.primary
    },
    Btnpayment: {
        width: "30%",
        height: 40,
        position: "absolute",
        top: 30,
        left: 20
    },
    textpayment: {
        fontFamily: "Montserrat",
        fontSize: 13,
        position: "absolute",
        right: 20,
        top: 23,
        color: Colors.background
    },
    textnaghd: {
        fontFamily: "Montserrat",
        position: "absolute",
        right: 40,
        bottom: 23,
        fontSize: 13,
        color: Colors.background,
    },
    textcart: {
        fontFamily: "Montserrat",
        fontSize: 13,
        position: 'absolute',
        right: 115,
        bottom: 23,
        color: Colors.background
    },
    switch: {
        position: "absolute",
        right: 70,
        bottom: 10
    },
    m15: {
        width: "18%",
        height: 20,
        position: "absolute",
        right: 10,
        top: 75
    },
    m30: {
        width: "18%",
        height: 20,
        position: "absolute",
        right: 80,
        top: 75
    },
    m45: {
        width: "18%",
        height: 20,
        position: "absolute",
        right: 150,
        top: 75
    },
    S1: {
        width: "18%",
        height: 20,
        position: "absolute",
        right: 10,
        top: 103
    },
    S115: {
        width: "18%",
        height: 20,
        position: "absolute",
        right: 80,
        top: 103
    },
    S130: {
        width: "18%",
        height: 20,
        position: "absolute",
        right: 150,
        top: 103
    }


})
export default Order