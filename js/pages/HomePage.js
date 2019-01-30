import PopularPage from "./PopularPage";
import Trending from "./Trending";
import Favorite from "./Favorite";
import React, {Component} from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from "./Profile";
import createMaterialBottomTabNavigator
    from "react-navigation-material-bottom-tabs";

export default HomePage = createMaterialBottomTabNavigator({
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: 'Popular',
            // tabBarIcon: ({tintColor, focused}) => (
            //     <Ionicons
            //         name='logo-github'
            //         size={23}
            // style={focused ? {color: tintColor} : ''}
            //     {/*/>*/}
            // {/*),*/}
            tabBarIcon: ({tintColor}) => (
                <Icon name='logo-github' color={tintColor} size={24}/>
            ),
        }
    },
    Trending: {
        screen: Trending,
        navigationOptions: {
            tabBarLabel: 'Trending',
            tabBarIcon: ({tintColor}) => (
                <Icon name='logo-github' color={tintColor} size={24}/>
            ),
        }
    },
    Favorite: {
        screen: Favorite,
        navigationOptions: {
            tabBarLabel: 'Favorite',
            tabBarIcon: ({tintColor}) => (
                <Icon name='logo-github' color={tintColor} size={24}/>
            ),
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({tintColor}) => (
                <Icon name='logo-github' color={tintColor} size={24}/>
            ),
        }
    }
}, {
    initialRouteName: 'PopularPage',
    activeTintColor: 'black',
    inactiveTintColor: '#333',
    // 缩放图标的效果
    shifting: true, // 默认在大于3个路由时为true, 如果显式的设置为true了则少于3个时也会显示效果
    barStyle: {
        backgroundColor: 'orange',
    }
});
