import {
    createStackNavigator,
} from 'react-navigation'
import React from "react";
import WelcomePage from "../pages/WelcomePage"
import HomePage from "../pages/HomePage";
import RepoDetail from "../pages/RepoDetail";


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
    RepoDetail: {
        screen: RepoDetail,
        navigationOptions: {
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
    }
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