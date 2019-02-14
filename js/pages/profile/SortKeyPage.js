import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Image, TouchableOpacity, Alert} from 'react-native';
import LanguageDao, {FLAG_LANG} from "../../expand/dao/LanguageDao";
import ArrayUtils from '../../utils/ArrayUtils'
import SortableListView from 'react-native-sortable-listview'
import ViewUtils from "../../utils/ViewUtils";

export default class SortKeyPage extends React.Component {
    constructor(props) {
        super(props)
        this.dataArray = [];
        this.sortedArray = [];
        this.originalCheckedArray = [];
        this.state = {
            checkedArray: []
        }
    }

    static navigationOptions = ({navigation}) => ({

        title: 'Sort Key',
        headerLeft: ViewUtils.getLeftButton(() => navigation.state.params.onBack()),
        headerStyle: {
            backgroundColor: '#694fad',
            elevation: 0
        },
        headerRight: <TouchableOpacity
            onPress={() => navigation.state.params.onSave()}
        >
            <View style={{margin: 6}}>
                <Text style={styles.title}>Save</Text>
            </View>
        </TouchableOpacity>,
        headerTitleStyle: {
            color: 'white',
            flex: 1,
            textAlign: 'center'
        },
    });


    onBack() {
        if (!ArrayUtils.isEaual(this.originalCheckedArray, this.state.checkedArray)) {

            Alert.alert(
                'Confirm Exit',
                'Do you want to save your changes before exitting?',
                [
                    {
                        text: 'No', onPress: () => {
                            this.props.navigation.pop();
                        }
                    }, {
                    text: 'Yes', onPress: () => {
                        this.onSave(true);
                    }
                }
                ]
            )
        } else {
            this.props.navigation.pop();
        }
    }

    onSave(isChecked) {
        if (!isChecked && ArrayUtils.isEaual(this.originalCheckedArray, this.state.checkedArray)) {
            this.props.navigation.pop();
            return;
        }
        this.getSortResult();
        this.langDao.save(this.sortedArray);
        this.props.navigation.pop();
    }

    getSortResult() {
        this.sortedArray = ArrayUtils.clone(this.dataArray);
        for (let i = 0, l = this.originalCheckedArray.length; i < l; i++) {
            let item = this.originalCheckedArray[i];
            let index = this.dataArray.indexOf(item);
            this.sortedArray.splice(index, 1, this.state.checkedArray[i])
        }
    }

    componentDidMount(): void {
        const {setParams} = this.props.navigation;
        setParams({
            onSave: () => this.onSave(),
            onBack: () => this.onBack(),
        });
        this.langDao = new LanguageDao(FLAG_LANG.flag_key);
        this.loadData();
    }

    loadData() {
        this.langDao.fetch()
            .then(result => this.getCheckedItems(result))
            .catch(error => {
                console.log(error)
            })
    }

    getCheckedItems(res) {
        this.dataArray = res;
        let checkedArray = [];
        for (let i = 0, len = res.length; i < len; i++) {
            let data = res[i];
            if (data.checked) checkedArray.push(data);
        }
        this.setState({
            checkedArray: checkedArray
        })
        this.originalCheckedArray = ArrayUtils.clone(checkedArray);

    }

    render() {
        const {navigation} = this.props;
        return (
            <SortableListView
                style={{flex: 1}}
                data={this.state.checkedArray}
                order={Object.keys(this.state.checkedArray)}
                onRowMoved={e => {
                    this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
                    this.forceUpdate()
                }}
                renderRow={row => <SortCell data={row}/>}
            />
        )
    }
}

class SortCell extends React.Component {
    render() {
        return <TouchableHighlight
            underlayColor={'#eee'}
            style={styles.item}
            {...this.props.sortHandlers}
        >
            <View style={styles.row}>
                <Image style={styles.img} source={require('./img/ic_sort.png')}/>
                <Text>{this.props.data.name}</Text>
            </View>

        </TouchableHighlight>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 15,
        backgroundColor: '#F8F8F8',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    img: {
        tintColor: '#694fad',
        height: 16,
        width: 16,
        marginRight: 10,
    },
    title: {
        color: 'white',
    },

})
