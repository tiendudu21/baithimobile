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
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConFirmPassword] = useState('');

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const [confirmPasswordIsVisible, setConfirmPasswordIsVisible] = useState(false);

    const onSignUp = () => {
        if (name.trim() == "" || !name) {
            alert("Không được để trống họ và tên !");
        } else if (email.trim() == "" || !email) {
            alert("Không được để trống email !");
        } else if (password.trim() == "" || !password) {
            alert("Không được để trống mật khẩu !");
        } else if (confirmPassword.trim() == "" || !confirmPassword) {
            alert("Không được để trống mật khẩu nhập lại !");
        } else {
            if (password.trim() === confirmPassword.trim()) {
                createAccount();
            }
            else {
                alert("Mật khẩu nhập lại không đúng !");
            }
        }
    };
    const createAccount = async () => {
        let userData = await AsyncStorage.getItem("userData");
        if (userData) {
            userData = JSON.parse(userData);
            let arr = [...userData];
            arr = arr.filter(
                (value) => value.email.toLocaleLowerCase() == email.toLocaleLowerCase()
            );
            if (arr.length > 0) {
                alert("Email already registered!");
                return;
            } else {
                userData.push({
                    name: name.trim(),
                    email: email.trim(),
                    password: password.trim(),
                });
            }
        } else {
            userData = [];
            userData.push({
                name: name.trim(),
                email: email.trim(),
                password: password.trim(),
            });
        }
        AsyncStorage.setItem("userData", JSON.stringify(userData));
        alert("Đăng ký thành công!");
        navigation.goBack();
    };

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
                    <Text style={styles.title}>Đăng kí</Text>
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
                            <Feather name="user" size={22} color="#7C808D" />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Họ và tên"
                            placeholderTextColor="#7C808D"
                            selectionColor="#3662AA"
                            onChangeText={setName}
                            value={name}
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
                    <View style={styles.inputContainer}>
                        <View style={styles.icon}>
                            <Feather name="lock" size={22} color="#7C808D" />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập lại mật khẩu"
                            secureTextEntry={!confirmPasswordIsVisible}
                            placeholderTextColor="#7C808D"
                            selectionColor="#3662AA"
                            onChangeText={setConFirmPassword}
                            value={confirmPassword}
                        />
                        <TouchableOpacity
                            style={styles.passwordVisibleButton}
                            onPress={() => setConfirmPasswordIsVisible(!confirmPasswordIsVisible)}
                        >
                            <Feather
                                name={confirmPasswordIsVisible ? "eye" : "eye-off"}
                                size={20}
                                color="#7C808D"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.loginButton} onPress={onSignUp}>
                        <Text style={styles.loginButtonText}>Đăng kí</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.registerButtonText}>
                            Đã có tài khoản?{" "}
                            <Text style={styles.registerButtonTextHighlight}>
                                Đăng nhập ngay!
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
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 35,
        fontWeight: "bold",
        marginLeft: 90,
        marginBottom: 30,
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
    registerButton: {
        alignSelf: "center",
        marginTop: 40,
    },
    registerButtonText: {
        fontSize: 16,
        color: "#7C808D",
    },
    registerButtonTextHighlight: {
        fontSize: 16,
        color: "#3662AA",
        fontWeight: "500",
    },
});