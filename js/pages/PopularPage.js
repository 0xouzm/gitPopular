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
import RepoCell from '../common/RespoCell'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import LanguageDao, {FLAG_LANG} from '../expand/dao/LanguageDao'
import ProjectModel from '../model/ProjectModel'
import FavoriteDao from "../expand/dao/FavoriteDao";
import Utils from '../utils/Utils'

var favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular)
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
                    return lang.checked ? <PopularTab key={i} tabLabel={lang.name}
                                                      navigation={this.props.navigation}></PopularTab> : null;
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
        this.dataRepo = new DataRepo(FLAG_STORAGE.flag_popular);

        this.state = {
            res: [],
            loaded: false,
            favoriteKeys: [],
        }
    }

    componentDidMount() {
        this.loadData();
    }

    flushFavorite() {
        let projectModels = [];
        let items = this.items;
        for (var i = 0, len = items.length; i < len; i++) {
            projectModels.push(new ProjectModel(items[i], Utils.checkFavorite(items[i], this.state.favoriteKeys)));
        }
        this.updateState({
            loaded: false,
            // isLoadingFail: false,
            res: projectModels,
        });
        console.log(this.state.res)
    }

    updateState(dic) {
        if (!this) return;
        this.setState(dic);
    }

    loadData() {
        this.setState({
            loaded: true
        });
        let url = URL + this.props.tabLabel + QUERY_STR;
        this.dataRepo.fetchRepo(url)
            .then(res => {
                this.items = res && res.items ? res.items : res ? res : [];
                this.getFavoriteKeys();
                if (res && res.update_date && !this.dataRepo.checkDate(res.update_date)) {
                    DeviceEventEmitter.emit('showToast', 'out date');
                    return this.dataRepo.fetchNetRepo(url);
                } else {
                    DeviceEventEmitter.emit('showToast', 'show cache');
                }
            }).then(items => {
            if (!items || items.length === 0) return;
            this.items = items;
            this.getFavoriteKeys();
            DeviceEventEmitter.emit('showToast', 'show net');
        })
            .catch(error => {
                this.updateState({
                    res: JSON.stringify(error)
                })
            })
    }

    onFavorite(item, isFavorite) {//favoriteIcon单击回调函数
        if (isFavorite) {
            favoriteDao.saveFavoriteItem(item.id.toString(), JSON.stringify(item));
        } else {
            favoriteDao.removeFavoriteItem(item.id.toString());
        }
    }

    getFavoriteKeys() {//获取本地用户收藏的ProjectItem
        favoriteDao.getFavoriteKeys().then((keys) => {
            if (keys) {
                this.updateState({favoriteKeys: keys});
            }
            this.flushFavorite();
        }).catch((error) => {
            this.flushFavorite();
            console.log(error);
        });
    }

    _onPressItem = (projectModel) => {
        const {navigation} = this.props;
        // console.log(item)
        navigation.navigate('RepoDetail', {'projectModel': projectModel})
    }

    _renderItem = ({item}) => (
        <RepoCell data={item} onFavorite={(item, isFavorite) => this.onFavorite(item, isFavorite)}
                  onPressItem={() => this._onPressItem({item})}/>)


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
