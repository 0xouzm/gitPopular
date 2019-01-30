import React from 'react';
import {View, Text, Button} from 'react-native';

export default class Page4 extends React.Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex: 1, backgroundColor: 'gray'}}>
                <Text>Page4</Text>
                <Button
                    title='open drawer'
                    onPress={() => navigation.openDrawer()}/>
                <Button
                    title='toggle drawer'
                    onPress={() => navigation.toggleDrawer()}/>
                <Button
                    title='to page5'
                    onPress={() => navigation.navigate('Page5')}/>
            </View>
        );
    }
}
