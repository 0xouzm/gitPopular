import {createStackNavigator, createBottomTabNavigator, createDrawerNavigator} from 'react-navigation'
import HomePage from "../pages/HomePage";
import Page1 from "../pages/Page1";
import Page2 from "../pages/Page2";
import Page3 from "../pages/Page3";
import Page4 from "../pages/Page4";
import Page5 from "../pages/Page5";
import React from "react";
import {Button} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


export const DrawerNav = createDrawerNavigator({
    Page4: {
        screen: Page4,
        navigationOptions: {
            drawerLabel: 'Page4',
            drawerIcon: ({tintColor}) => (
                <MaterialIcons
                    name={"drafts"}
                    size={24}
                    style={{color: tintColor}}
                />

            )
        }
    },
    Page5: {
        screen: Page5,
        navigationOptions: {
            drawerLabel: 'Page5',
            drawerIcon: ({tintColor}) => (
                <MaterialIcons
                    name={"drafts"}
                    size={24}
                    style={{color: tintColor}}
                />

            )
        }
    }


})
export const AppTabNavigator = createBottomTabNavigator({
    Page1: {
        screen: Page1,
        navigationOptions: {
            tabBarLabel: 'Page1',
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name='ios-home'
                    size={26}
                    style={focused ? {color: tintColor} : ''}
                />
            )
        }
    },
    Page2: {
        screen: Page2,
        navigationOptions: {
            tabBarLabel: 'Page2',
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name='ios-people'
                    size={26}
                    style={focused ? {color: tintColor} : ''}
                />
            )
        }
    },
    Page3: {
        screen: Page3,
        navigationOptions: {
            tabBarLabel: 'Page3',
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name='ios-chatboxes'
                    size={26}
                    style={focused ? {color: tintColor} : ''}
                />
            )
        }
    }
})

export const AppStackNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            title: 'Home',
            headerBackTitle: 'backback',
        }
    },
    Page1: {
        screen: Page1,
        navigationOptions: ({navigation}) => ({  //注意加() 代表一个对象
            title: `${navigation.getParam('name', '404 not found')} page1`
        })
    },
    Page2: {
        screen: Page2,
        navigationOptions: {
            title: 'Page2',
        }
    },
    Page3: {
        screen: Page3,
        navigationOptions: (props) => {
            const {navigation} = props;
            const {state, setParams} = navigation;
            const {params} = state;
            return {
                title: 'page3',
                headerRight: (
                    <Button
                        title={params.mode === 'edit' ? 'save' : 'edit'}
                        onPress={() => {
                            setParams({mode: params.mode === 'edit' ? '' : 'edit'})
                        }}
                    />
                )
            }
        }

    },
    TabNav: {
        screen: AppTabNavigator,
        navigationOptions: {
            title: 'This is TabNavigator'
        }
    },
    DrawerNav: {
        screen: DrawerNav,
        navigationOptions: {
            title: 'This is DrawerNavigator'
        }
    },
})