import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import DataRepo, {FLAG_STORAGE} from "../expand/dao/DataRepo";
import GitHubTrending from 'GitHubTrending'

export default class Trending extends React.Component {
    constructor(props) {
        super(props)
        this.dataRepo = new DataRepo(FLAG_STORAGE.flag_trending);
        this.trending = new GitHubTrending();
        this.state = {
            data: '',
            url: ''
        }
    }

    fetchNetRepo(url) {
        this.trending.fetchTrending(url)
            .then(res => {
                this.setState({
                    data: JSON.stringify(res)
                });
            }).catch((e) => {
            this.setState({data: e})
        })

    }

    loadData() {
        let url = 'https://github.com/trending/' + this.text;
        this.setState({url: url})
        this.dataRepo.fetchRepo(url)
            .then((data) => {
                this.setState({data: JSON.stringify(data)})
            }).catch((e) => this.setState({data: e,}))
        // this.fetchNetRepo(url)
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <TextInput style={{height: 60, width: 200, backgroundColor: 'pink'}}
                           onChangeText={text => this.text = text}/>
                <Button onPress={() => this.loadData()} title={'fetch'}></Button>
                <Text>url:{this.state.url}</Text>
                <Text>data:{this.state.data}</Text>
            </View>
        );
    }
}
