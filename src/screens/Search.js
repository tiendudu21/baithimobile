import React from "react";
import { useState, useEffect } from "react";
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    FlatList,
    TextInput
} from "react-native";
import ProductItemHorizontal from "../components/ProductItemHorizontal";
import products from "../config/products";

import { Ionicons } from "@expo/vector-icons";
const SPACING = 10;

export default function Search({ navigation, route }) {
    const { text } = route.params;

    const [textSearch, settextSearch] = useState("");
    const [data, setData] = useState([]);
    const categories = [
        "Trà sữa",
        "Nước ép",
        "Trà",
        "Nước giải khát",
    ];
    const renderResult = (textInput) => {
        const arr = products.filter((value) =>
            value.name.toLocaleLowerCase().includes(textInput.toLocaleLowerCase())
        );
        setData(arr)
    };
    const renderItem = ({ item, index }) => (
        <ProductItemHorizontal item={item} navigation={navigation} />
    );
    useEffect(() => {
        if (text) {
            renderResult(text);
        }
    }, []);

    return (
        <View
            style={{
                backgroundColor: "#fff",
                flex: 1,
                paddingTop: StatusBar.currentHeight + 20,
                paddingHorizontal: 12,
            }}
        >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', marginBottom: 20 }}>
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
                <Text style={{ fontSize: 20 }}>Cart</Text>
            </View>

            {data.length > 0 ?
                <>
                    <View style={{ flex: 1, flexDirection: "column" }}>
                        <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 10 }}>
                            KẾT QUẢ
                        </Text>
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => item + index}
                            renderItem={renderItem}
                        />
                    </View>
                </>
                :
                <>
                    <View>
                        <Text style={{ color: "#2FDBBC", fontWeight: "bold", marginLeft: 20 }}>
                            Tìm kiếm
                        </Text>
                        <TextInput
                            style={{
                                backgroundColor: "#f4f4f4",
                                paddingVertical: 6,
                                borderRadius: 20,
                                paddingHorizontal: 20,
                                marginBottom: 14,
                            }}
                            placeholder="Nhập để tìm kiếm..."
                            value={textSearch}
                            onChangeText={settextSearch}
                            onBlur={renderResult(textSearch)}
                        />
                    </View>
                    <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 10 }}>
                        GỢI Ý CHO BẠN
                    </Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {categories.map((value, item) => (
                            <TouchableOpacity
                                onPress={() => {
                                    settextSearch(value);
                                }}
                                style={{
                                    backgroundColor: "#f4f4f4",
                                    paddingHorizontal: 12,
                                    paddingVertical: 8,
                                    marginRight: 12,
                                    marginBottom: 12,
                                    borderRadius: 100,
                                }}
                                key={item}
                            >
                                <Text>{value}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            }
        </View>
    );
}
