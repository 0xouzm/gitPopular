import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import ViewUtils from "../utils/ViewUtils";

const TRENDING_URL = 'https://github.com/'
export default class RepoDetail extends Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        this.projectModel = navigation.getParam('projectModel').item.item;
        this.url = this.projectModel.html_url ? this.projectModel.html_url : TRENDING_URL + this.projectModel.fullName;
        this.state = {
            canGoBack: false
        }
    }

    componentDidMount(): void {
        const {setParams} = this.props.navigation;
        setParams({
            onBack: () => this.onBack(),
        });
    }

    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('projectModel').item.item.full_name ? navigation.getParam('projectModel').item.item.full_name : navigation.getParam('projectModel').item.item.fullName,
        headerLeft: ViewUtils.getLeftButton(() => navigation.state.params.onBack()),
        headerStyle: {
            backgroundColor: '#694fad',
            elevation: 0
        },
        headerTitleStyle: {
            color: 'white',
            flex: 1,
            textAlign: 'center'
        },
    })

    onNavigationStateChange(e) {
        this.setState({
            canGoBack: e.canGoBack,
        })
    }

    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            this.props.navigation.pop()
        }
    }

    render() {
        return (
            <WebView
                ref={webView => this.webView = webView}
                source={{uri: this.url}}
                onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
                startInLoadingState={true}
            />
        );
    }
}
