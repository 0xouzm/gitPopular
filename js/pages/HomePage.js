import PopularPage from "./PopularPage";
import Trending from "./Trending";
import Favorite from "./Favorite";
import Profile from "./profile/Profile";
import CustomKeyPage from './profile/CustomKeyPage'
import SortKeyPage from "./profile/SortKeyPage";


import React, {Component} from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from 'react-navigation'
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";

export default HomePage = createMaterialBottomTabNavigator({
    PopularPage: {
        screen: createStackNavigator({
            PopularPage: {
                screen: PopularPage,
                navigationOptions: {
                    title: 'Popular',
                    headerStyle: {
                        backgroundColor: '#694fad',
                        elevation: 0
                    },

                    headerTitleStyle: {
                        color: 'white',
                        flex: 1,
                        textAlign: 'center'
                    },
                }
            },

        }),
        navigationOptions: {
            tabBarLabel: 'Popular',
            tabBarIcon: ({tintColor}) => (
                <Ionicons name='logo-github' color={tintColor} size={24}/>
            ),
        }
    },
    Trending: {
        screen: createStackNavigator({
            Trending: {
                screen: Trending,
                navigationOptions: {
                    title: 'Trending',
                    headerStyle: {
                        backgroundColor: '#694fad',
                        elevation: 0
                    },

                    headerTitleStyle: {
                        color: 'white',
                        flex: 1,
                        textAlign: 'center'
                    },
                }
            },
        }),
        navigationOptions: {
            tabBarLabel: 'Trending',
            tabBarIcon: ({tintColor}) => (
                <Ionicons name='md-rocket' color={tintColor} size={24}/>
            ),
        }
    },
    Favorite: {
        screen: Favorite,
        navigationOptions: {
            tabBarLabel: 'Favorite',
            tabBarIcon: ({tintColor}) => (
                <Ionicons name='ios-heart' color={tintColor} size={24}/>
            ),
        }
    },
    Profile: {
        screen: createStackNavigator({
            ProfilePage: {
                screen: Profile,
                navigationOptions: {
                    title: 'Profile',
                    headerStyle: {
                        backgroundColor: '#694fad',
                        elevation: 0
                    },

                    headerTitleStyle: {
                        color: 'white',
                        flex: 1,
                        textAlign: 'center'
                    },
                }
            },
            CustomKey: {
                screen: CustomKeyPage,
            },
            SortKeyPage: {
                screen: SortKeyPage,
            },
        }),
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({tintColor}) => (
                <Ionicons name='md-person' color={tintColor} size={24}/>
            ),
        }
    }
}, {
    initialRouteName: 'PopularPage',
    activeTintColor: '#f0edf6',
    inactiveTintColor: '#3e2465',
    // shifting: true, // 缩放效果，默认在大于3个路由时为true, 如果显式的设置为true了则少于3个时也会显示效果
    labeled: true,
    barStyle: {
        backgroundColor: '#694fad',
    }
});
