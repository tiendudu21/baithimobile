import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "../screens/Login";
import Register from "../screens/Register";
import BottomTabNavigator from "./BottomTabNavigator";
import ProductDetail from "../screens/ProductDetail";
import CartScreen from "../screens/Cart";
import Search from "../screens/Search";

const Stack = createNativeStackNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="HomeTab" component={BottomTabNavigator} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} />
                <Stack.Screen name="Cart" component={CartScreen} />
                <Stack.Screen name="Search" component={Search} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigation;
