import PopularPage from "./PopularPage";
import Trending from "./Trending";
import Favorite from "./Favorite";
import Profile from "./Profile";
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
                }
            }
        }),
        navigationOptions: {
            tabBarLabel: 'Popular',
            tabBarIcon: ({tintColor}) => (
                <Ionicons name='logo-github' color={tintColor} size={24}/>
            ),
        }
    },
    Trending: {
        screen: Trending,
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
        screen: Profile,
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
    shifting: true, // 缩放效果，默认在大于3个路由时为true, 如果显式的设置为true了则少于3个时也会显示效果
    barStyle: {
        backgroundColor: '#694fad',
    }
});
