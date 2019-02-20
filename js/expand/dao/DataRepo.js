import {AsyncStorage} from 'react-native'
import GitHubTrending from 'GitHubTrending'

export var FLAG_STORAGE = {flag_popular: 'popular', flag_trending: 'trending'}
export default class DataRepo {
    constructor(flag) {
        this.flag = flag;
        if (flag == FLAG_STORAGE.flag_trending) this.trending = new GitHubTrending();
    }

    saveRepo(url, items, callBack) {
        if (!url || !items) return;
        let wrapData = {items: items, update_date: new Date().getTime()};
        AsyncStorage.setItem(url, JSON.stringify(wrapData), callBack)
    }

    fetchRepo(url) {
        return new Promise((resolve, reject) => {
            this.fetchLocalRepo(url)
                .then(result => {
                    if (result) {
                        resolve(result)
                    } else {
                        this.fetchNetRepo(url)
                            .then(result => {
                                resolve(result)
                            }).catch(e => reject(e))
                    }
                }).catch(e => {
                this.fetchNetRepo(url)
                    .then(result => {
                        resolve(result)
                    }).catch(e => reject(e))
            })
        })
    }

    fetchLocalRepo(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e)
                    }
                } else {
                    reject(error);
                }
            })
        })
    }

    fetchNetRepo(url) {
        return new Promise((resolve, reject) => {
            if (this.flag === FLAG_STORAGE.flag_trending) {
                this.trending.fetchTrending(url)
                    .then(res=>{
                        if(!res){
                            reject(new Error('response is null'));
                            return;
                        }
                        this.saveRepo(url,res);
                        resolve(res);
                    })
            } else {
                fetch(url)
                    .then(res => res.json())
                    .then(res => {
                        if (!res) {
                            reject(new Error('responseData is null'));
                            return;
                        }
                        resolve(res.items);
                        this.saveRepo(url, res.items)
                    })
                    .catch(error => {
                        reject(error)
                    })
            }

        })
    }


    checkDate(longTime) {
        let currentDate = new Date();
        let targetDate = new Date();
        targetDate.setTime(longTime);
        if (currentDate.getMonth() !== targetDate.getMonth()) return false;
        if (currentDate.getDate() !== targetDate.getDate()) return false;
        if (currentDate.getHours() - targetDate.getHours() > 4) return false;
        // if (currentDate.getMinutes() - targetDate.getMinutes() > 1) return false;
        return true;
    }
}
