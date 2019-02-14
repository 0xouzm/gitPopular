import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            waiting: false
        }
    }

    _repeatClick(navigation, target, isRemove = false) {
        this.setState({waiting: true});
        navigation.navigate(target, {'isRemove': isRemove});
        setTimeout(() => {
            this.setState({waiting: false})
        }, 1000);
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={[styles.container, {alignItems: 'center', justifyContent: 'center'}]}>
                <View style={{marginBottom: 10}}>
                    <Button
                        title='Custom Key'
                        disabled={this.state.waiting}
                        onPress={() => this._repeatClick(navigation, 'CustomKey')}/>

                </View>
                <View style={{marginBottom: 10}}>
                    <Button
                        title='Sort Key'
                        disabled={this.state.waiting}
                        onPress={() => this._repeatClick(navigation, 'SortKeyPage')}/>
                </View>
                <View style={{marginBottom: 10}}>
                    <Button
                        title='Remove Key'
                        disabled={this.state.waiting}
                        onPress={() => this._repeatClick(navigation, 'CustomKey', true)}/>
                </View>

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
