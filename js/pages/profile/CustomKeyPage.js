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
        this.state = {
            dataArray: [],
            isChecked:false,
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

        title: 'Custom Key',
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
        let leftText = data.name;
        return (
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={() => {
                    this.onClick(data)
                }}
                isChecked={data.checked}
                leftText={leftText}
                checkedImage={<Image style={{tintColor: '#694fad'}} source={require('./img/ic_check_box.png')}/>}
                unCheckedImage={<Image style={{tintColor: '#694fad'}}
                                       source={require('./img/ic_check_box_outline_blank.png')}/>}
            />
        )
    }

    onClick(data) {
        this.setState({
            isChecked: !this.state.isChecked
        });
        data.checked = !data.checked;
        ArrayUtils.updateArray(this.changeValues, data)
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.renderView()}
                </ScrollView>
            </View>
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
