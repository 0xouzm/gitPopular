import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import DataRepo from '../expand/DataRepo'
import RepoCell from '../common/RespoCell'
// import {createMaterialTopTabNavigator} from 'react-navigation'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
export default class PopularPage extends React.Component {

    render() {
        return <View style={styles.container}>
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
            res: [],
            loaded: false
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
                    res: this.state.res.concat(res.items)
                })
            })
            .catch(error => {
                this.setState({
                    res: JSON.stringify(error)
                })
            })
    }

    _renderItem({item}) {
        return <RepoCell data={item}/>
    }

    render() {
        return <FlatList
            data={this.state.res}
            renderItem={this._renderItem}
            style={styles.list}
            keyExtractor={(item, id) => id.toString()}
        />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        marginTop: 10,
    }
})
