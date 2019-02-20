import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import ViewUtils from "../utils/ViewUtils";

export default class RepoDetail extends Component {


    constructor(props) {
        super(props);
        const {navigation} = this.props;
        this.item = navigation.getParam('item');
        this.url = this.item.item.html_url;
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
        title: navigation.getParam('item').item.full_name,
        headerLeft: ViewUtils.getLeftButton(() => navigation.state.params.onBack()),
        headerStyle: {
            backgroundColor: '#694fad',
            elevation: 0
        },
        // headerRight: <TouchableOpacity
        //     onPress={() => navigation.state.params.onSave()}
        // >
        //     <View style={{margin: 6}}>
        //         <Text style={styles.title}>{navigation.getParam('isRemove') ? 'Remove' : 'Save'}</Text>
        //     </View>
        // </TouchableOpacity>,
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