import React, {Component} from 'react'
import {View, Text} from 'react-native'
import HomePage from './HomePage'
import {NavigationActions, StackActions} from "react-navigation";

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'HomePage'})],
});

export default class WelcomePage extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('HomePage')
            this.props.navigation.dispatch(resetAction);
        }, 2000)
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Welcome to GitPopular</Text>
            </View>
        );
    }
}