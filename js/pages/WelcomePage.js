import React, {Component} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import HomePage from './HomePage'

export default class WelcomePage extends Component{
    componentDidMount(){
        setTimeout(()=>{
            this.props.navigation.navigate('HomePage')
        },2000)
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Welcome to GitPopular</Text>
            </View>
        );
    }
}