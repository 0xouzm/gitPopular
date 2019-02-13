import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export default class Profile extends React.Component {

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Button
                    title='Custom'
                    onPress={() => navigation.push('CustomKey')}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        marginTop: 10,
    }
})
