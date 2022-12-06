import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState, useEffect } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const goToHome = () => {
        if (email.trim() == '' || !email) {
            alert('Không được để trống email !');
        } else if (password.trim() == '' || !password) {
            alert('Không được để trống mật khẩu !');
        } else {
            login();
        }
    };
    const login = async () => {
        let userData = await AsyncStorage.getItem('userData');
        if (userData) {
            userData = JSON.parse(userData);
            let arr = [...userData];
            arr = arr.filter(
                (value) =>
                    value.email.toLocaleLowerCase() == email.toLocaleLowerCase() &&
                    value.password == password
            );
            if (arr.length > 0) {
                let curUser = arr[0];
                AsyncStorage.setItem('curUser', JSON.stringify(curUser));
                navigation.navigate('HomeTab');
            } else alert('Email hoặc mật khẩu không chính xác!');
        } else {
            alert('Email hoặc mật khẩu không chính xác!');
        }
    };

    const checkLogin = async () => {
        let userData = await AsyncStorage.getItem('curUser');
        if (userData) navigation.navigate('HomeTab');
    };
    useEffect(() => {
        checkLogin();
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView
                contentContainerStyle={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>Đăng nhập</Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.icon}>
                            <Feather name="mail" size={22} color="#7C808D" />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Gmail"
                            placeholderTextColor="#7C808D"
                            selectionColor="#3662AA"
                            onChangeText={setEmail}
                            value={email}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.icon}>
                            <Feather name="lock" size={22} color="#7C808D" />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Mật khẩu"
                            secureTextEntry={!passwordIsVisible}
                            placeholderTextColor="#7C808D"
                            selectionColor="#3662AA"
                            onChangeText={setPassword}
                            value={password}
                        />
                        <TouchableOpacity
                            style={styles.passwordVisibleButton}
                            onPress={() => setPasswordIsVisible(!passwordIsVisible)}
                        >
                            <Feather
                                name={passwordIsVisible ? "eye" : "eye-off"}
                                size={20}
                                color="#7C808D"
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.forgotPasswordButton}>
                        <Text style={styles.forgotPasswordButtonText}>
                            Quên mật khẩu?
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton} onPress={goToHome}>
                        <Text style={styles.loginButtonText}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <View style={styles.orContainer}>
                        <View style={styles.orLine} />
                        <Text style={styles.orText}>HOẶC</Text>
                        <View style={styles.orLine} />
                    </View>
                    <TouchableOpacity style={styles.faceButton} onPress={() => alert('Comming soon')}>
                        <Image
                            style={styles.faceLogo}
                            source={require("../../assets/flogo.png")}
                        />
                        <Text style={styles.faceButtonText}>Đăng nhập bằng Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.googleButton} onPress={() => alert('Comming soon')}>
                        <Image
                            style={styles.googleLogo}
                            source={require("../../assets/google-logo.png")}
                        />
                        <Text style={styles.googleButtonText}>Đăng nhập bằng Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registerButton}>
                        <Text style={styles.registerButtonText}>
                            Chưa có tài khoản?{" "}
                            <Text style={styles.registerButtonTextHighlight} onPress={() => navigation.navigate('Register')}>
                                Đăng kí tại đây!
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        paddingHorizontal: 40,
    },
    title: {
        fontSize: 35,
        fontWeight: "bold",
        marginLeft: 55,
        marginBottom: 40,
    },
    inputContainer: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        position: "relative",
    },
    icon: {
        marginRight: 15,
    },
    input: {
        borderBottomWidth: 1.5,
        flex: 1,
        paddingBottom: 10,
        borderBottomColor: "#eee",
        fontSize: 16,
    },
    passwordVisibleButton: {
        position: "absolute",
        right: 0,
    },
    forgotPasswordButton: {
        alignSelf: "flex-end",
    },
    forgotPasswordButtonText: {
        color: "#3662AA",
        fontSize: 16,
        fontWeight: "500",
    },
    loginButton: {
        backgroundColor: "#03A184",
        padding: 14,
        borderRadius: 10,
        marginTop: 20,
    },
    loginButtonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    },
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    orLine: {
        height: 1,
        backgroundColor: "#000000",
        flex: 1,
    },
    orText: {
        color: "#000000",
        marginRight: 10,
        marginLeft: 10,
        fontSize: 14,
    },
    faceButton: {
        backgroundColor: "#3B5998",
        padding: 14,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginBottom: 20,
    },
    faceButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
    },
    faceLogo: {
        width: 20.03,
        height: 20.44,
        position: "absolute",
        left: 14,
    },
    googleButton: {
        backgroundColor: "#FBBC05",
        padding: 14,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    googleButtonText: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
    },
    googleLogo: {
        width: 20.03,
        height: 20.44,
        position: "absolute",
        left: 14,
    },
    registerButton: {
        alignSelf: "center",
        marginTop: 40,
    },
    registerButtonText: {
        fontSize: 17,
        color: "#000000",
    },
    registerButtonTextHighlight: {
        fontSize: 16,
        color: "#3662AA",
        fontWeight: "500",
    },
});