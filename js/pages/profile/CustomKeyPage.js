import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert} from 'react-native';
import ViewUtils from "../../utils/ViewUtils";
import LanguageDao, {FLAG_LANG} from '../../expand/dao/LanguageDao'
import CheckBox from 'react-native-check-box'
import ArrayUtils from '../../utils/ArrayUtils'

export default class CustomKeyPage extends React.Component {
    constructor(props) {
        super(props);
        this.langDao = new LanguageDao(FLAG_LANG.flag_key);
        this.changeValues = [];
        this.isRemoveKey = this.props.navigation.getParam('isRemove');
        this.state = {
            dataArray: [],
            isChecked: false,
            waiting: false,
        }
    }

    loadData() {
        this.langDao.fetch()
            .then(result => {
                this.setState({
                    dataArray: result
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('isRemove') ? 'Remove Key' : 'Custom Key',
        headerLeft: ViewUtils.getLeftButton(() => navigation.state.params.onBack()),
        headerStyle: {
            backgroundColor: '#694fad',
            elevation: 0
        },
        headerRight: <TouchableOpacity
            onPress={() => navigation.state.params.onSave()}
        >
            <View style={{margin: 6}}>
                <Text style={styles.title}>{navigation.getParam('isRemove') ? 'Remove' : 'Save'}</Text>
            </View>
        </TouchableOpacity>,
        headerTitleStyle: {
            color: 'white',
            flex: 1,
            textAlign: 'center'
        },
    })

    componentDidMount() {
        const {setParams} = this.props.navigation;
        setParams({
            onSave: () => this.onSave(),
            onBack: () => this.onBack(),
        });
        this.loadData();
    }

    onBack() {
        if (this.changeValues.length > 0) {
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
                        this.onSave();
                    }
                }
                ]
            )
        } else {
            this.props.navigation.pop();
        }
    }

    onSave() {
        if (this.changeValues.length === 0) {
            this.props.navigation.pop();
            return;
        }
        if (this.isRemoveKey) {
            for (let i = 0, l = this.changeValues.length; i < l; i++) {
                ArrayUtils.remove(this.state.dataArray, this.changeValues[i])
            }
        }
        this.langDao.save(this.state.dataArray);
        this.props.navigation.pop();
    }

    renderView() {
        if (!this.state.dataArray || this.state.dataArray.length === 0) return null;
        let len = this.state.dataArray.length;
        let views = [];
        for (let i = 0, l = len - 2; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i + 1])}
                    </View>
                    <View style={styles.line}></View>
                </View>
            )
        }
        views.push(
            <View key={len - 1}>
                <View style={styles.item}>
                    {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) : null}
                    {this.renderCheckBox(this.state.dataArray[len - 1])}
                </View>
                <View style={styles.line}></View>
            </View>
        )
        return views;
    }

    renderCheckBox(data) {
        return <CustomCheckbox data={data} isRemoveKey={this.isRemoveKey} changeValues={this.changeValues}/>
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{flex: 1}}>
                    {this.renderView()}
                </ScrollView>
            </View>
        );
    }

}

class CustomCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.isRemoveKey = this.props.isRemoveKey;
        this.data = this.props.data;
        this.state = {
            isChecked: this.isRemoveKey ? false : this.data.checked
        };
    }

    onClick(data) {
        data.checked = !data.checked;
        ArrayUtils.updateArray(this.props.changeValues, data)
    }

    render() {
        const {data} = this.props;
        const {isChecked} = this.state;

        return (
            <CheckBox
                style={{flex: 1, padding: 10}}
                isChecked={isChecked}
                onClick={() => {
                    this.setState({isChecked: !isChecked});
                    this.onClick(data)
                }
                }
                leftText={data.name}
                checkedImage={<Image style={{tintColor: '#694fad'}} source={require('./img/ic_check_box.png')}/>}
                unCheckedImage={<Image style={{tintColor: '#694fad'}}
                                       source={require('./img/ic_check_box_outline_blank.png')}/>}
            />
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'row', justifyContent: 'center'
    },
    item:
        {
            flexDirection: 'row',
            alignItems:
                'center'
        }
    ,
    title: {
        color: 'white',
    }
    ,
    line: {
        height: 0.3,
        backgroundColor:
            'darkgray',
    }
})
