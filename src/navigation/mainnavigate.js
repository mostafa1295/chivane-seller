import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginRegister from '../screens/loginRegister';
import Login from '../screens/login';
import Register1 from '../screens/register1';
import Register2 from '../screens/register2';
import Register3 from '../screens/register3';
import Dashboard from '../screens/dashboard';
import Products from '../screens/products';
import Product from '../screens/product';
import Orders from '../screens/orders';
import Order from '../screens/order';
import Comments from '../screens/comments';
import Coupons from '../screens/coupons';
import Peyk from '../screens/peyk';
import Stats from '../screens/stats';
import Maps from '../screens/map';





const MainNavigate = (props) => {
  const Stack = createNativeStackNavigator();


  return (


    <Stack.Navigator initialRouteName="loginRegister">
      {/* <Stack.Screen name="splash" component={Splash} options={{ headerShown: false }} /> */}
      <Stack.Screen name="loginRegister" component={LoginRegister} options={{ headerShown: false }} />
      <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="register1" component={Register1} options={{ headerShown: false }} />
      <Stack.Screen name="register2" component={Register2} options={{ headerShown: false }} />
      <Stack.Screen name="register3" component={Register3} options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen name="products" component={Products} options={{ headerShown: false }} />
      <Stack.Screen name="product" component={Product} options={{ headerShown: false }} />
      <Stack.Screen name="orders" component={Orders} options={{ headerShown: false }} />
      <Stack.Screen name="order" component={Order} options={{ headerShown: false }} />
      <Stack.Screen name="comments" component={Comments} options={{ headerShown: false }} />
      <Stack.Screen name="coupons" component={Coupons} options={{ headerShown: false }} />
      <Stack.Screen name="peyk" component={Peyk} options={{ headerShown: false }} />
      <Stack.Screen name="stats" component={Stats} options={{ headerShown: false }} />
      <Stack.Screen name="map" component={Maps} options={{ headerShown: false }} />

    </Stack.Navigator>

  );

}
export default MainNavigate