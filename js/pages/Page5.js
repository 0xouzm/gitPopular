import React from 'react';
import {View, Text, Button} from 'react-native';

export default class Page5 extends React.Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex: 1, backgroundColor: 'gray'}}>
                <Text>Page5</Text>
                <Button
                    title='open drawer'
                    onPress={() => navigation.openDrawer()}/>
                <Button
                    title='toggle drawer'
                    onPress={() => navigation.toggleDrawer()}/>
                <Button
                    title='to page4'
                    onPress={() => navigation.navigate('Page4')}/>
            </View>
        );
    }
}
