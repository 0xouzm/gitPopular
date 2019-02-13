import {AsyncStorage} from 'react-native'
import keys from '../../../res/data/keys'

export var FLAG_LANG = {flat_lang: 'flag_lang_lang)', flag_key: 'flag_lang_key'};
export default class LanguageDao {
    constructor(flag) {
        this.flag = flag;
    }

    fetch() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.flag, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if (result) {
                        try {
                            resolve(JSON.parse(result))
                        } catch (e) {
                            reject(e);
                        }
                    } else {
                        var data = this.flag === FLAG_LANG.flag_key ? keys : null;
                        this.save(data);
                        resolve(data)
                    }
                }
            })
        })
    }

    save(data) {
        AsyncStorage.setItem(this.flag, JSON.stringify(data), (error => {}))
    }

}