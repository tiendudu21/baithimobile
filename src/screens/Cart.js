import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import {
    View,
    Text,
    StatusBar,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import CartItem from "../components/CartItem";

const SPACING = 10;
const { height } = Dimensions.get("window");

export default function CartScreen({ navigation }) {
    const isFocused = useIsFocused();
    const [cartList, setcartList] = useState([]);
    const onFinish = async () => {
        if (cartList.length > 0) {
            alert("Thanh Toán Thành Công!");
            let cartData = [];
            await AsyncStorage.setItem("cartData", JSON.stringify(cartData));
            setcartList([]);
        }
    };
    const getCartData = async () => {
        let cartData = await AsyncStorage.getItem("cartData");
        if (cartData) {
            cartData = JSON.parse(cartData);
        } else {
            cartData = [];
        }
        setcartList(cartData);
    };
    useEffect(() => {
        getCartData();
    }, [isFocused]);
    const renderItem = ({ item, index }) => {
        return <CartItem item={item} index={index} onChange={setcartList} />;
    };
    const getTotal = () => {
        let total = 0;
        cartList.map((value) => (total += value.price * value.amount));
        return total;
    };
    return (
        <View
            style={{
                paddingTop: StatusBar.currentHeight + 20,
                backgroundColor: "#fff",
                paddingHorizontal: 12,
                flex: 1,
            }}
        >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                <TouchableOpacity
                    style={{
                        height: SPACING * 4.5,
                        width: SPACING * 4.5,
                        backgroundColor: '#2FDBBC',
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: SPACING * 2.5,
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="arrow-back"
                        size={SPACING * 2.5}
                        color='#fff'
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 20 }}>Giỏ hàng</Text>
            </View>
            {cartList.length > 0 ? <>
                <FlatList
                    style={{ marginTop: 12 }}
                    data={cartList}
                    keyExtractor={(item, index) => item + index}
                    renderItem={renderItem}
                />
            </> : (
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <Ionicons name="cart-outline" size={130} color="gray" />
                    <Text style={{ color: "gray", fontSize: 20 }}>Giỏ hàng đang trống</Text>
                </View>
            )}

            <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#2FDBBC', justifyContent: 'center', padding: 15, borderRadius: 20, marginBottom: 20 }} onPress={onFinish}>
                <Text>Thanh toán</Text>
            </TouchableOpacity>
        </View>
    );
}
