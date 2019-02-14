import React, {Component} from 'react';
import {WebView} from 'react-native-webview';

export default class RepoDetail extends Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        this.item = navigation.getParam('item');
        this.url = this.item.item.html_url;
    }

    render() {
        return (
            <WebView
                source={{uri: this.url}}
                style={{marginTop: 20}}
            />
        );
    }
}