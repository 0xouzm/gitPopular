import React from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import DataRepo from '../expand/DataRepo'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars'
export default class PopularPage extends React.Component {
    constructor(props) {
        super(props)
        this.dataRepo = new DataRepo();
        this.state = {
            res: ''
        }
    }

    onLoad() {
        let url = this.genUrl(this.text);
        this.dataRepo.fetchNetRepo(url)
            .then(res => {
                this.setState({
                    res: JSON.stringify(res)
                })
            })
            .catch(error => {
                this.setState({
                    res: JSON.stringify(error)
                })
            })
    }

    genUrl(key) {
        return URL + key + QUERY_STR
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text>PopularPage</Text>

                <TextInput
                    style={{height: 40, marginBottom: 10}}
                    onChangeText={text => this.text = text}
                />
                <Button
                    title={'get data'}
                    onPress={() => {
                        this.onLoad()
                    }}
                />
                <Text style={{height: 500}}>{this.state.res}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
