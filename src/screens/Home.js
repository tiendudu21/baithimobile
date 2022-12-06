import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import categories from "../config/data";
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get("window");

const SPACING = 10;

const ITEM_WIDTH = width  - SPACING * 5;

const Home = ({ navigation }) => {
    const [user, setUser] = useState('');
    const [textSearch, settextSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState(0);

    const getUserData = async () => {
        let curUser = await AsyncStorage.getItem('curUser');
        curUser = JSON.parse(curUser);
        setUser(curUser);
    };
    const onSearch = () => {
        if (textSearch.trim() !== '') {
            navigation.navigate('Search', { text: textSearch })
        }
    }
    useEffect(() => {
        getUserData();
    }, []);
    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <ScrollView>
                    <View
                        style={{
                            flexDirection: "row",
                            backgroundColor: '#F4F1F9',
                            marginVertical: SPACING * 2,
                            paddingVertical: SPACING ,
                            paddingHorizontal: SPACING * 2.5,
                            borderRadius: SPACING * 4,
                            marginTop: 40,
                        }}
                    >
                        <TextInput
                            placeholder="Tìm kiếm"
                            placeholderTextColor='rgb(159, 164, 163)'
                            style={{
                                color: 'rgb(0,0,0)',
                                fontSize: SPACING * 1.5,
                                marginRight: SPACING,
                                
                                flex: 1
                            }}
                            onChangeText={settextSearch}
                            value={textSearch}
                            onBlur={onSearch}
                        />
                        <TouchableOpacity style={{ marginRight: 5 }} onPress={onSearch}>
                            <Ionicons name="search" color='#000' size={SPACING * 2.5} />
                        </TouchableOpacity>
                        
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {categories.map((category, index) => (
                            <TouchableOpacity
                                style={{ marginRight: SPACING }}
                                key={index}
                                onPress={() => setActiveCategory(index)}
                            >
                                <Text
                                    style={[
                                        {
                                            paddingVertical: 10,
                                            paddingHorizontal: 24,
                                            borderRadius: 30,
                                            borderWidth: 1,
                                            backgroundColor: '#03A184',
                                            fontSize: 13
                                        },
                                        activeCategory === index && {
                                            color: '#fff',
                                            fontWeight: "700",
                                            fontSize: SPACING * 1.8,
                                        },
                                    ]}
                                >
                                    {category.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <View style={{ paddingVertical: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 25,marginLeft: 120 }}>
                            <Text style={{ fontSize: 24 }}>ĐỒ UỐNG</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                                marginVertical: SPACING * 2,
                                marginLeft:25,
                            }}
                        >
                            {categories[activeCategory].recipes.map((item, i) => (
                                <TouchableOpacity
                                    style={[
                                        {
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            width: ITEM_WIDTH,
                                            paddingHorizontal: 15,
                                            borderRadius: SPACING,
                                            position: 'relative',
                                        },
                                        i!== 0 && {  //ô thứ 2 4 6 8
                                            marginTop: SPACING * 6,
                                            backgroundColor: '#F3F363'
                                        },
                                        i % 2 === 0 && { //ô thứ 1 3 5 7 9
                                            marginBottom: SPACING * 1,
                                            backgroundColor: '#39A0F0'
                                        },
                                    ]}
                                    key={item.id}
                                    onPress={() => navigation.navigate('ProductDetail', { item: item })}
                                >
                                    <Image
                                        style={{
                                            width: "90%",
                                            height: 120,
                                            borderRadius: SPACING * 2,
                                            resizeMode: 'contain',
                                            alignItems: 'center',
                                            position: 'relative',
                                            top: -30
                                        }}
                                        source={item.image}
                                    />
                                    <View style={{
                                        position: 'relative',
                                        top: -15
                                    }}>
                                        <Text
                                            style={{
                                                fontSize: SPACING * 2,
                                                fontWeight: "700",
                                            }}
                                        >
                                            {item.name}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: SPACING * 1.7,
                                                color: '#CC042C',
                                                marginVertical: SPACING ,
                                                marginLeft: 45,
                                            }}
                                        >
                                            {item.cate}
                                        </Text>
                                        <Text style={{ fontSize: SPACING * 2, fontWeight: "700", marginLeft:20,color: '#BA391F', }}>
                                             {item.price} VNĐ
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
               
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({});