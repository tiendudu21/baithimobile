import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, Image, TouchableOpacity } from "react-native";

export default function Profile({ navigation }) {
    const [user, setuser] = useState(null);
    const getUserData = async () => {
        let curUser = await AsyncStorage.getItem("curUser");
        curUser = JSON.parse(curUser);
        setuser(curUser);
    };
    const logOut = async () => {
        await AsyncStorage.removeItem("curUser");
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    };
    useEffect(() => {
        getUserData(user);
    }, []);
    return (
        <View
            style={{
                backgroundColor: "#fff",
                flex: 1,
                width: "100%",
                paddingTop: StatusBar.currentHeight + 30,
                paddingHorizontal: 12,
            }}
        >
            <View style={{ flexDirection: 'column', alignItems: "center" }}>
                <Image
                    style={{
                        height: 120,
                        width: 120,
                        borderRadius: 20,
                        marginRight: 270,
                    }}
                    source={{ uri: "https://i.pravatar.cc/30000" }}
                />
                <Text
                    style={{
                        marginRight: 270,
                        fontWeight: "bold",
                    }}
                >
                    {user && user.name}
                </Text>
                <Text
                    style={{
                        marginRight: 270,
                        fontSize: 18,
                    }}
                >
                    {user && user.email}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 20,
                        paddingBottom: 12,
                        borderBottomColor: "black",
                        borderBottomWidth: 3,
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            flex: 1,
                            textAlign: "center",
                        }}
                    >
                        {"Đang Giao"}
                    </Text>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            flex: 1,
                            textAlign: "center",
                        }}
                    >
                        {"Đã Giao"}
                    </Text>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            flex: 1,
                            textAlign: "center",
                        }}
                    >
                        {"Đã Hủy"}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                    }}
                >
                    <Text
                        style={{
                            color: "#2FDBBC",
                            fontSize: 25,
                            flex: 1,
                            textAlign: "center",
                        }}
                    >
                        {"01"}
                    </Text>
                    <Text
                        style={{
                            color: "#2FDBBC",
                            fontSize: 25,
                            flex: 1,
                            textAlign: "center",
                        }}
                    >
                        {"02"}
                    </Text>
                    <Text
                        style={{
                            color: "#2FDBBC",
                            fontSize: 25,
                            flex: 1,
                            textAlign: "center",
                        }}
                    >
                        {"00"}
                    </Text>
                </View>
            </View>

            <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#2FDBBC', justifyContent: 'center', padding: 15, borderRadius: 20, marginVertical: 50 }} onPress={logOut}>
                <Text>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
}
