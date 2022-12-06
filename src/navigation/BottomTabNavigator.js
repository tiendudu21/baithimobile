import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from '../screens/Cart';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import WishList from '../screens/WishList';
import Search from '../screens/Search';

import { FontAwesome5 } from '@expo/vector-icons'
import { View, Platform } from 'react-native';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'white',
                    position: 'absolute',
                    bottom: 40,
                    marginHorizontal: 20,
                    // Max Height...
                    height: 60,
                    borderRadius: 10,
                    // Shadow...
                    shadowColor: '#000',
                    shadowOpacity: 0.06,
                    shadowOffset: {
                        width: 10,
                        height: 10
                    },
                }
            }}>
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            // centring Tab Button...
                            position: 'absolute',
                            top: 20
                        }}>
                            <FontAwesome5
                                name="home"
                                size={20}
                                color={focused ? '#2FDBBC' : 'gray'}
                            ></FontAwesome5>
                        </View>
                    )
                }} />
            

            < Tab.Screen
                name='Cart'
                component={Cart}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            // centring Tab Button...
                            position: 'absolute',
                            top: 20
                        }}>
                            <FontAwesome5
                                name="shopping-cart"
                                size={20}
                                color={focused ? '#2FDBBC' : 'gray'}
                            ></FontAwesome5>
                        </View>
                    ),
                    tabBarStyle: { display: "none" },
                }}
            />
            < Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            // centring Tab Button...
                            position: 'absolute',
                            top: 20
                        }}>
                            <FontAwesome5
                                name="user"
                                size={20}
                                color={focused ? '#2FDBBC' : 'gray'}
                            ></FontAwesome5>
                        </View>
                    )
                }} />

        </ Tab.Navigator >
    );
}

export default BottomTabNavigator;
