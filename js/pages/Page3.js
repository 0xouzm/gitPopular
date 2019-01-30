import React from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';

export default class Page3 extends React.Component {
    render() {
        const {navigation} = this.props;
        const {state, setParams} = navigation;
        const{params}=state;
        const showText=params.mode==='edit'?'editing':'done';
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Page3</Text>
                <Button
                    title='Go Back'
                    onPress={() => navigation.goBack()}/>
                    <Text>{showText}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => {
                        setParams({
                            title: text
                        })
                    }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        width:200,
        borderWidth: 1,
        marginTop: 20,
        borderColor: 'black',
    }
})