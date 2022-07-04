import React, { useEffect, useState } from "react"
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Colors from "../constants/Colors"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux";
import { getavg, getstatic } from "../stor/actions/commandreport";
import { getsellerinfo } from "../stor/actions/userLogin";



const Factor = (props) => {



    const separate = (num) => {
        let number = num.replace(/\D/g, "");
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <View style={styles.viewcard}>
            <View style={styles.viewcardhead}>
                <Text style={styles.datecard}>{props.date}</Text>
                <Text style={{ fontFamily: "MontserratBold", fontSize: 12, left: "40%", color: props.pay === "تسویه شده" ? Colors.success : Colors.secondary }}>{props.pay}</Text>
            </View>


            <View style={styles.viewcardhead2}>
                <Text style={styles.textcardonline}>آنلاین</Text>
                <Text style={styles.textcardnaghd}>نقدی</Text>
            </View>


            <View style={styles.viewcenter}>

                <View style={styles.viewonline}>
                    <Text style={styles.textonline}>کل فروش</Text>
                    <View style={styles.viewpriceonline}>
                        <Text style={styles.textpriceonline}>{separate("25000000")}</Text>
                    </View>

                    <Text style={styles.textonline}>تخفیف چیوانه</Text>
                    <View style={styles.viewpriceonline}>
                        <Text style={styles.textpriceonline}>{separate("25000000")}</Text>
                    </View>

                    <Text style={styles.textonline}>تخفیف شما</Text>
                    <View style={styles.viewpriceonline}>
                        <Text style={styles.textpriceonline}>{separate("25000000")}</Text>
                    </View>

                    <Text style={styles.textonline}>کمیسیون</Text>
                    <View style={styles.viewpriceonline}>
                        <Text style={styles.textpriceonline}>{separate("25000000")}</Text>
                    </View>

                    <Text style={styles.textonline}>پیک</Text>
                    <View style={styles.viewpriceonline}>
                        <Text style={styles.textpriceonline}>{separate("25000000")}</Text>
                    </View>
                </View>



                <View style={styles.viewnaghd}>
                    <Text style={styles.textnaghd}>کل فروش</Text>
                    <View style={styles.viewpricenaghd}>
                        <Text style={styles.textpricenaghd}>{separate("25000000")}</Text>
                    </View>

                    <Text style={styles.textnaghd}>تخفیف چیوانه</Text>
                    <View style={styles.viewpricenaghd}>
                        <Text style={styles.textpricenaghd}>{separate("25000000")}</Text>
                    </View>

                    <Text style={styles.textnaghd}>تخفیف شما</Text>
                    <View style={styles.viewpricenaghd}>
                        <Text style={styles.textpricenaghd}>{separate("25000000")}</Text>
                    </View>

                    <Text style={styles.textnaghd}>کمیسیون</Text>
                    <View style={styles.viewpricenaghd}>
                        <Text style={styles.textpricenaghd}>{separate("25000000")}</Text>
                    </View>

                    <Text style={styles.textnaghd}>پیک</Text>
                    <View style={styles.viewpricenaghd}>
                        <Text style={styles.textpricenaghd}>{separate("25000000")}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.viewfooterbox}>
                <View style={{ width: "40%", height: 20, borderRadius: 7, alignItems: "center", backgroundColor: props.pay1 === "تسویه شده" ? Colors.success : Colors.secondary }}>
                    <Text style={styles.textpricenaghd}>{separate("25000000")}</Text>
                </View>
                <Text style={styles.textfooterbox}>{props.pay1}</Text>
            </View>


        </View>
    )
}


















const Stats = (props) => {
    const [loading, setloading] = useState(true);
    const dispatch = useDispatch();
    const [Ordercompelet, setOrderOrdercompelet] = useState([]);
    const [state, setstate] = useState("");
    //const token = "a5624f17bd0f4279c1939cf87d71e897b05df479ff8db23decc4f40828e03d2cb41dc108062b7f90704ef1d1eca083f265b1e10f7755175e2cb7055646e187bd"
    const token = useSelector((store) => store.userLogin.datatoken);
    const Seller = useSelector((store) => store.userLogin.dataseller);
    const [resultcom, setresultcom] = useState("");




    const getavgtHandler = async () => {
        try {


            const respon = await dispatch(getstatic(token))

           
            if (state == "") {
                setloading(false);
            }
            if (Ordercompelet == "") {
                setloading(false);
            }
            console.log(respon.data);
            setstate(respon.data.avg)
             setOrderOrdercompelet(respon.data.data)
            if (respon.data.data==[]) {
                setresultcom("اطلاعاتی موجود نمی باشد")
            }
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

    useEffect(() => {
        getavgtHandler();
        getgetsellerHandler();
    }, [])



    const separate = (num) => {
        let number = num.replace(/\D/g, "");
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (

        <View style={styles.container}>

            <View style={styles.viewheader}>

                <View style={styles.viewimage}>
                    <Image source={{ uri: Seller.image_avatar }} style={styles.imageheader} />
                </View>

                <View style={styles.viewtexthead}>
                    <Text style={styles.textshop}>{Seller.first_name + " " + Seller.last_name}</Text>
                    <Text style={styles.textshah}>{Seller.shop_name}</Text>
                </View>


            </View>


            <ScrollView >








                <View style={styles.viewbox}>
                    <View style={styles.viewboxleft}>
                        <View style={styles.viewiconleft}>
                            <MaterialCommunityIcons name="currency-usd" size={30} color={Colors.background} />
                        </View>
                        <Text style={styles.textmonth}>میانگین فروش ماهانه </Text>


                        {(loading ?
                            <View style={{ width: "100%", height: 50, alignItems: "center", marginTop: 8 }} >
                                <ActivityIndicator
                                    animating={loading} size={30} color={Colors.background} />
                            </View>
                            :
                            <Text style={styles.textprice}>{separate(state.month ? state.month : "")} تومان</Text>

                        )}
                    </View>

                    <View style={styles.viewboxright}>
                        <View style={styles.viewiconright}>
                            <MaterialCommunityIcons name="progress-clock" size={30} color={Colors.background} />
                        </View>
                        <Text style={styles.textday}>میانگین فروش روزانه</Text>

                        {(loading ?
                            <View style={{ width: "100%", height: 50, alignItems: "center", marginTop: 8 }} >
                                <ActivityIndicator
                                    animating={loading} size={30} color={Colors.background} />
                            </View>
                            :

                            <Text style={styles.textprice}>{separate(JSON.stringify(state.day ? state.day : ""))} تومان</Text>
                        )}
                    </View>

                </View>



                <View style={styles.viewtitle}>
                    <Text style={styles.texttitle} >آمار تسویه</Text>
                </View>
                 <Text style={{ fontFamily: "MontserratBold", fontSize: 15, color: "red", right: 140 }}>
                        {resultcom}
                    </Text>
                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false} >


                   


                    {(loading ?
                        <View style={styles.viewcards} >
                            <ActivityIndicator
                                animating={loading} size={30} color={Colors.primary} />
                        </View>
                        :

                        Ordercompelet.map((item, i) => {
                            return (
                                <View key={i} style={styles.viewcard}>
                                    <View style={styles.viewcardhead}>
                                        <Text style={styles.datecard}>{item.fa_date}</Text>
                                        <Text style={{ fontFamily: "MontserratBold", fontSize: 12, left: "40%", color: props.pay === "تسویه شده" ? Colors.success : Colors.secondary }}>{item.is_accept}</Text>
                                    </View>


                                    <View style={styles.viewcardhead2}>
                                        <Text style={styles.textcardonline}>آنلاین</Text>
                                        <Text style={styles.textcardnaghd}>نقدی</Text>
                                    </View>


                                    <View style={styles.viewcenter}>

                                        <View style={styles.viewonline}>
                                            <Text style={styles.textonline}>کل فروش</Text>
                                            <View style={styles.viewpriceonline}>
                                                <Text style={styles.textpriceonline}>{separate(JSON.stringify(item.t_online))}</Text>
                                            </View>

                                            <Text style={styles.textonline}>تخفیف چیوانه</Text>
                                            <View style={styles.viewpriceonline}>
                                                <Text style={styles.textpriceonline}>{separate(JSON.stringify(item.x_online))}</Text>
                                            </View>

                                            <Text style={styles.textonline}>تخفیف شما</Text>
                                            <View style={styles.viewpriceonline}>
                                                <Text style={styles.textpriceonline}>{separate(JSON.stringify(item.y_online))}</Text>
                                            </View>

                                            <Text style={styles.textonline}>کمیسیون</Text>
                                            <View style={styles.viewpriceonline}>
                                                <Text style={styles.textpriceonline}>{separate(JSON.stringify(item.c_online))}</Text>
                                            </View>

                                            <Text style={styles.textonline}>پیک</Text>
                                            <View style={styles.viewpriceonline}>
                                                <Text style={styles.textpriceonline}>{separate(JSON.stringify(item.p_online))}</Text>
                                            </View>
                                        </View>



                                        <View style={styles.viewnaghd}>
                                            <Text style={styles.textnaghd}>کل فروش</Text>
                                            <View style={styles.viewpricenaghd}>
                                                <Text style={styles.textpricenaghd}>{separate(JSON.stringify(item.t_onHome))}</Text>
                                            </View>

                                            <Text style={styles.textnaghd}>تخفیف چیوانه</Text>
                                            <View style={styles.viewpricenaghd}>
                                                <Text style={styles.textpricenaghd}>{separate(JSON.stringify(item.x_onHome))}</Text>
                                            </View>

                                            <Text style={styles.textnaghd}>تخفیف شما</Text>
                                            <View style={styles.viewpricenaghd}>
                                                <Text style={styles.textpricenaghd}>{separate(JSON.stringify(item.y_onHome))}</Text>
                                            </View>

                                            <Text style={styles.textnaghd}>کمیسیون</Text>
                                            <View style={styles.viewpricenaghd}>
                                                <Text style={styles.textpricenaghd}>{separate(JSON.stringify(item.c_onHome))}</Text>
                                            </View>

                                            <Text style={styles.textnaghd}>پیک</Text>
                                            <View style={styles.viewpricenaghd}>
                                                <Text style={styles.textpricenaghd}>{separate(JSON.stringify(item.p_onHome))}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.viewfooterbox}>
                                        <View style={{ width: "40%", height: 20, borderRadius: 7, alignItems: "center", backgroundColor: props.pay1 === "تسویه شده" ? Colors.success : Colors.secondary }}>
                                            <Text style={styles.textpricenaghdtotal}>{separate(JSON.stringify(item.total))}</Text>
                                        </View>
                                        <Text style={styles.textfooterbox}>{item.is_accept}</Text>
                                    </View>


                                </View>
                            )
                        }))}



                </ScrollView>







            </ScrollView>

            <View style={styles.viewboxfooter}>


                <TouchableOpacity style={styles.touch}>
                    <MaterialCommunityIcons name="poll-box" size={25} color={Colors.background} />
                    <Text style={{ fontFamily: "Montserrat", fontSize: 11, color: Colors.background }}>گزارشات</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => props.navigation.navigate("comments")} style={styles.touch}>
                    <MaterialCommunityIcons name="forum" size={25} color={Colors.RGB} />

                    <Text style={styles.texttouch}>نظرات</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.navigation.navigate("dashboard")} style={styles.touch} >
                    <MaterialCommunityIcons name="view-dashboard" size={25} color={Colors.RGB} />
                    <Text style={styles.texttouch}>داشبورد</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.navigation.navigate("products")} style={styles.touch}>
                    <MaterialCommunityIcons name="cart" size={25} color={Colors.RGB} />
                    <Text style={styles.texttouch}>محصولات</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.navigation.navigate("orders")} style={styles.touch}>
                    <MaterialCommunityIcons name="clipboard-text" size={25} color={Colors.RGB} />
                    <Text style={styles.texttouch}>سفارشات</Text>
                </TouchableOpacity>


            </View>







        </View>
    )
}

export default Stats;
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: Colors.background
    },
    viewheader: {
        flexDirection: "row-reverse",
        width: "90%",
        height: 80,
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
        left: 73
    },
    viewimage: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
        borderRadius: 15,
    },
    imageheader: {
        width: 50,
        height: 50,
        borderRadius: 10
    },
    viewtexthead: {
        alignItems: "flex-end",
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
    textshah: {
        fontFamily: "MontserratBold",
        fontSize: 14,
        color: Colors.primary
    },
    viewbox: {
        width: "100%",
        height: 150,
        marginTop: 10,
        alignItems: 'center',
        flexDirection: "row"
    },
    viewboxleft: {
        width: "43%",
        height: 120,
        left: 20,
        borderRadius: 5,
        backgroundColor: Colors.success,
        alignItems: "center"
    },
    viewiconleft: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: Colors.RGB2,
        alignItems: "center",
        justifyContent: "center",
        top: 10
    },
    textmonth: {
        fontFamily: "MontserratLight",
        fontSize: 12,
        marginTop: 14,
        color: Colors.background
    },
    textprice: {
        fontFamily: "MontserratBold",
        fontSize: 12,
        marginTop: 4,
        color: Colors.background
    },
    viewboxright: {
        width: "43%",
        height: 120,
        left: 30,
        borderRadius: 5,
        backgroundColor: Colors.primary,
        alignItems: "center"
    },
    viewiconright: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: Colors.RGB2,
        alignItems: "center",
        justifyContent: "center",
        top: 10
    },
    textday: {
        fontFamily: "MontserratLight",
        fontSize: 12,
        marginTop: 14,
        color: Colors.background
    },
    viewtitle: {
        width: "100%",
        justifyContent: "center",
        marginBottom: 5,
    },
    texttitle: {
        fontFamily: "MontserratBold",
        fontSize: 16,
        color: Colors.black,
        marginRight: "7%",
    },
    viewcard: {
        width: 170,
        height: 350,
        borderWidth: 1,
        marginLeft: 5,
        marginRight: 5,
        borderColor: Colors.secondText,
        borderRadius: 5
    },
    viewcards: {
        width: 150,
        height: 300,
        marginLeft: 120,
        marginRight: 5,


    },

    viewcardhead: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        height: 40,
        borderColor: Colors.secondText,
        borderBottomWidth: 1
    },
    datecard: {
        fontFamily: "Montserrat",
        fontSize: 12,
        color: Colors.secondText3,
        right: "40%"
    },
    viewcardhead2: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        height: 40,
        borderColor: Colors.secondText,
        borderBottomWidth: 1
    },
    textcardonline: {
        fontFamily: "MontserratBold",
        fontSize: 12,
        color: Colors.secondText3,
        right: 30
    },
    textcardnaghd: {
        fontFamily: "MontserratBold",
        fontSize: 12,
        color: Colors.secondText3,
        left: 30
    },
    viewcenter: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        height: 230,
        borderColor: Colors.secondText,
        borderBottomWidth: 1
    },
    viewonline: {
        alignItems: "center",
        flexDirection: "column",
        width: "50%",
        height: "100%",
        borderRightWidth: 1,
        borderColor: Colors.secondText
    },
    textonline: {
        fontFamily: "MontserratLight",
        fontSize: 12,
        color: Colors.black
    },
    viewpriceonline: {
        width: "80%",
        height: 20,
        backgroundColor: Colors.secondText,
        borderRadius: 7,
        alignItems: "center"
    },
    textpriceonline: {
        fontFamily: "MontserratLight",
        fontSize: 12,
        color: Colors.black,
        bottom: 2
    },
    viewnaghd: {
        width: "50%",
        height: "100%",
        alignItems: "center",
        flexDirection: "column",
    },
    textnaghd: {
        fontFamily: "MontserratLight",
        fontSize: 12,
        color: Colors.black,
    },
    viewpricenaghd: {
        width: "80%",
        height: 20,
        backgroundColor: Colors.secondText,
        borderRadius: 7,
        alignItems: "center"
    },
    textpricenaghd: {
        fontFamily: "MontserratLight",
        fontSize: 12,
        color: Colors.black,
        bottom: 2
    },
    textpricenaghdtotal: {
        fontFamily: "MontserratLight",
        fontSize: 12,
        color: Colors.background,
        bottom: 2
    },
    viewfooterbox: {
        right: 15,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        height: 40,
        borderColor: Colors.secondText,
        borderBottomWidth: 1
    },
    textfooterbox: {
        fontFamily: "Montserrat",
        fontSize: 12,
        color: Colors.black,
        left: 20
    },
    viewboxfooter: {
        flexDirection: "row",
        width: "88%",
        height: 70,
        borderRadius: 20,
        marginTop: 30,
        marginLeft: 20,
        backgroundColor: Colors.primary,
        marginBottom: 30, elevation: 3
    },
    touch: {
        flexDirection: "column",
        marginTop: 10,
        alignItems: "center",
        width: "20%",
        height: 60
    },
    texttouch: {
        fontFamily: "Montserrat",
        fontSize: 11,
        color: Colors.RGB
    }

})