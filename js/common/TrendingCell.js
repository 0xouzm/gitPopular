import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default class TrendingCell extends Component {
    render() {
        let data = this.props.data;
        return <TouchableOpacity style={styles.container} onPress={this.props.onPressItem}>
            <View style={styles.cell_container}>
                <Text style={styles.title}>{data.fullName}</Text>
                <Text style={styles.description}>{data.description}</Text>
                <Text style={styles.description}>{data.meta}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{marginRight: 2}}>Built by:</Text>
                        {data.contributors.map((result, i, arr) => {
                            return <Image key={i} style={{height: 22, width: 22}}
                                          source={{uri: arr[i]}}
                            />
                        })}

                    </View>
                    <Image
                        style={{height: 22, width: 22}}
                        source={require('../../res/images/ic_star.png')}
                    />
                </View>
            </View>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121'
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575',

    },
    cell_container: {
        // flex: 1,
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderStyle: null,
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2
    }
})
