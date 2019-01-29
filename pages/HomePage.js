import React from 'react';
import {View, Text, Button} from 'react-native';

export default class HomePage extends React.Component {
    static navigationOptions = {
        title: 'home1',
        headerBackTitle: 'backback',
    }

    render() {
        const {navigation} = this.props
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{padding: 10}}>Home </Text>
                <Button
                    title='Go to Page1'
                    onPress={() => {
                        navigation.navigate('Page1', {name: 'dynamic'})
                    }}/>
                <Button
                    title='Go to Page2'
                    onPress={() => navigation.navigate('Page2', {title: '222'})}/>
                <Button
                    title='Go to Page3'
                    onPress={() => navigation.navigate('Page3', {title: '333'})}/>
                <Button
                    title='Go to TabNav'
                    onPress={() => navigation.navigate('TabNav', {title: 'tab'})}/>
            </View>
        );
    }
}
