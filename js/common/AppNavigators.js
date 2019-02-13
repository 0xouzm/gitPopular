import {
    createStackNavigator,
} from 'react-navigation'
import React from "react";
import WelcomePage from "../pages/WelcomePage"
import HomePage from "../pages/HomePage";


export default RootNav = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null
        }
    },
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null,
        }
    },
}, {
    initialRouteName: 'HomePage'
})
;

// export default createSwitchNavigator(
//     {
//         WelcomePage: WelcomePage,
//         RootNav: RootNav,
//     },
//     {
//         initialRouteName: 'WelcomePage',
//         resetOnBlur: false,
//     }
// );