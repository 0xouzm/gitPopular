import React from 'react';
import {View, Text, Button} from 'react-native';

export default class Profile extends React.Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Profile</Text>
            </View>
        );
    }
}
