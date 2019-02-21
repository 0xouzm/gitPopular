import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    DeviceEventEmitter,
    ToastAndroid,
    TouchableOpacity, Image
} from 'react-native';
import DataRepo, {FLAG_STORAGE} from '../expand/dao/DataRepo'
import TrendingCell from '../common/TrendingCell'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import LanguageDao, {FLAG_LANG} from '../expand/dao/LanguageDao'

const API_URL = 'https://github.com/trending/';
export default class Trending extends React.Component {
    constructor(props) {
        super(props);
        this.langDao = new LanguageDao(FLAG_LANG.flat_lang);
        this.state = {
            languages: []
        }
    }

    componentDidMount(): void {
        this.listener = DeviceEventEmitter.addListener('showToast', (text) => {
            ToastAndroid.show(text, ToastAndroid.SHORT);
        });
        this.loadData();
    }

    componentWillUnmount(): void {
        this.listener && this.listener.remove();
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
                renderTabBar={() => <ScrollableTabBar tabStyle={{elevation: 0}}/>}>
                {this.state.languages.map((result, i, arr) => {
                    let lang = arr[i];
                    return lang.checked ? <TrendingTab key={i} tabLabel={lang.name}
                                                       navigation={this.props.navigation}></TrendingTab> : null;
                })}

            </ScrollableTabView> : null;

        return <View style={styles.container}>
            {content}
        </View>
    }
}

class TrendingTab extends Component {
    constructor(props) {
        super(props);
        this.dataRepo = new DataRepo(FLAG_STORAGE.flag_trending);
        this.state = {
            res: [],
            loaded: false
        }
    }

    componentDidMount() {
        this.loadData();
    }

    genUrl(timeSpan, category) {
        return API_URL + category + timeSpan
    }

    loadData() {
        this.setState({
            loaded: true
        });
        let url = this.genUrl('?since=daily', this.props.tabLabel);
        this.dataRepo.fetchRepo(url)
            .then(res => {
                let items = res && res.items ? res.items : res ? res : [];
                this.setState({
                    res: items,
                    loaded: false
                })

                if (res && res.update_date && !this.dataRepo.checkDate(res.update_date)) {
                    DeviceEventEmitter.emit('showToast', 'out date');
                    return this.dataRepo.fetchNetRepo(url);
                } else {
                    DeviceEventEmitter.emit('showToast', 'show cache');
                }
            }).then(items => {
            if (!items || items.length === 0) return;
            this.setState({
                res: items,
                loaded: false
            })
            DeviceEventEmitter.emit('showToast', 'show net');
        })
            .catch(error => {
                this.setState({
                    res: JSON.stringify(error)
                })
            })
    }


    _onPressItem = (item) => {
        const {navigation} = this.props;
        navigation.navigate('RepoDetail', {'item': item})
    }

    _renderItem = ({item}) => (<TrendingCell data={item} onPressItem={() => this._onPressItem({item})}/>)


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
