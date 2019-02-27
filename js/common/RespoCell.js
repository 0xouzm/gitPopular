import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, TouchableHighlight} from 'react-native';

export default class RepoCell extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isFavorite: this.props.data.isFavorite,
            favoriteIcon: this.props.data.isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png')
        }
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        this.setFavoriteState(nextProps.data.isFavorite)
    }

    setFavoriteState(isFavorite) {
        // this.props.projectModel.isFavorite = isFavorite;
        this.setState({
            isFavorite: isFavorite,
            favoriteIcon: isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png')
        })
    }

    onPressFavorite() {
        this.setFavoriteState(!this.state.isFavorite)
        this.props.onFavorite(this.props.data.item, !this.state.isFavorite)
    }

    render() {
        let favoriteButton = <TouchableHighlight
            style={{padding: 6}}
            onPress={() => this.onPressFavorite()} underlayColor='transparent'>
            <Image
                // ref='favoriteIcon'
                style={[{height: 22, width: 22}, {tintColor: '#694fad'}]}
                source={this.state.favoriteIcon}/>
        </TouchableHighlight>
        return <TouchableOpacity style={styles.container} onPress={this.props.onPressItem}>
            <View style={styles.cell_container}>
                <Text style={styles.title}>{this.props.data.item.full_name}</Text>
                <Text style={styles.description}>{this.props.data.item.description}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{marginRight: 2}}>Author:</Text>
                        <Image style={{height: 22, width: 22}}
                               source={{uri: this.props.data.item.owner.avatar_url}}
                        />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Stars:</Text>
                        <Text>{this.props.data.item.stargazers_count}</Text>
                    </View>
                    {favoriteButton}
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
