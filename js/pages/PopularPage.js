import React,{Component} from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import DataRepo from '../expand/DataRepo'
// import {createMaterialTopTabNavigator} from 'react-navigation'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
export default class PopularPage extends React.Component {
    constructor(props) {
        super(props);
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
        return <View style={styles.container}>
            {/*<TextInput*/}
            {/*style={{height: 40, marginBottom: 10}}*/}
            {/*onChangeText={text => this.text = text}*/}
            {/*/>*/}
            {/*<Button*/}
            {/*title={'get data'}*/}
            {/*onPress={() => {*/}
            {/*this.onLoad()*/}
            {/*}}*/}
            {/*/>*/}
            {/*<Text style={{height: 500}}>{this.state.res}</Text>*/}

            <ScrollableTabView
                renderTabBar={() => <ScrollableTabBar/>}
            >
                <PopularTab tabLabel={'Java'}>Java</PopularTab>
                <PopularTab tabLabel='IOS'>IOS</PopularTab>
                <PopularTab tabLabel='Android'>Android</PopularTab>
                <PopularTab tabLabel='JavaScript'>JavaScript</PopularTab>
            </ScrollableTabView>
        </View>
    }
}

class PopularTab extends Component {
    constructor(props) {
        super(props);
        this.dataRepo = new DataRepo();
        this.state = {
            res: ''
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        let url = URL + this.props.tabLabel + QUERY_STR;
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

    render() {
        return <View>
            <Text style={{height: 600}}>{this.state.res}</Text>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})
