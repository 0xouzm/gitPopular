import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, RefreshControl, DeviceEventEmitter, ToastAndroid} from 'react-native';
import DataRepo from '../expand/dao/DataRepo'
import RepoCell from '../common/RespoCell'
// import {createMaterialTopTabNavigator} from 'react-navigation'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import LanguageDao, {FLAG_LANG} from '../expand/dao/LanguageDao'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
export default class PopularPage extends React.Component {
    constructor(props) {
        super(props);
        this.langDao = new LanguageDao(FLAG_LANG.flag_key);
        this.state = {
            languages: []
        }
    }

    componentDidMount(): void {
        this.listener=DeviceEventEmitter.addListener('showToast', (text) => {
            ToastAndroid.show(text, ToastAndroid.SHORT);
        });
        this.loadData();
    }
    componentWillUnmount(): void {
        this.listener&&this.listener.remove();
    }

    loadData() {
        this.langDao.fetch()
            .then(result => {
                this.setState({
                    languages: result
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        let content = this.state.languages.length > 0 ?
            <ScrollableTabView
                tabBarBackgroundColor='#694fad'
                tabBarActiveTextColor='mintcream'
                tabBarInactiveTextColor='white'
                tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                renderTabBar={() => <ScrollableTabBar
                    tabStyle={{elevation: 0}}/>}
            >
                {this.state.languages.map((result, i, arr) => {
                    let lang = arr[i];
                    return lang.checked ? <PopularTab key={i} tabLabel={lang.name}></PopularTab> : null;
                })}

            </ScrollableTabView> : null;

        return <View style={styles.container}>
            {content}
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
        this.setState({
            loaded: true
        });
        let url = URL + this.props.tabLabel + QUERY_STR;
        this.dataRepo.fetchRepo(url)
            .then(res => {
                let items = res && res.items ? res.items : res ? res : [];
                this.setState({
                    res: items,
                    loaded: false
                })

                if (res && res.update_date && !this.dataRepo.checkDate(res.update_date)) {
                    DeviceEventEmitter.emit('showToast','out date');
                    return this.dataRepo.fetchNetRepo(url);
                }else{
                    DeviceEventEmitter.emit('showToast','show cache');
                }
            }).then(items => {
            if (!items || items.length === 0) return;
            this.setState({
                res: items,
                loaded: false
            })
            DeviceEventEmitter.emit('showToast','show net');
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
            refreshControl={<RefreshControl
                refreshing={this.state.loaded}
                onRefresh={() => this.loadData()}
                colors={['#694fad']}
            />}
        />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        marginTop: 10,
    }
});
