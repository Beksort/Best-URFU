class YaDisk {
    constructor(){
        this.findToken();
        //this.pathInfo('disk:/').then(items => console.log(items));
    }

    get idApp () {return 'ef023d3f657545078ed2d196f7023839'}

    findToken(){
        if (!this.token){
            var token = Cookie.get('YAtoken');

            if (!token){
                token = YaDisk.getTokenFromURL();

                if (!token) return false;

                this.token = token;
                Cookie.set('YAtoken', token);
            } else this.token = token;
        }
    }

    OAuth () {
        window.location.href = 'https://oauth.yandex.ru/authorize?response_type=token&client_id=' + this.idApp;
    }

    async pathInfo (path) {
        let url = `https://cloud-api.yandex.net:443/v1/disk/resources?path=${encodeURIComponent(path)}`,
            headers = {Authorization: this.token},
            items;

        await fetch(url, {type: 'GET', headers: headers}).then((response) => {
            if (response.status === 200) return response.json();
            else throw new Error(`Код ${response.status}`)
        })
            .then((data) => {items = data._embedded.items})
            .catch((err) => {throw err});
        return items;
    }
    static getTokenFromURL () {
        let url = window.location.href,
            match = url.match(/access_token=([^&]*)&/),
            token = match != null ? match[1] : false;
        return token;
    }
}

class Cookie{
    static get cookie () {
        let c = document.cookie.replace(" ", ""),
            pairs = c.split(';'),
            parsed = {};
        pairs.forEach((p) => {
            let [name, val] = p.split('=');
            parsed[name] = val;
        });
        return parsed;
    }

    static get (name) {
        return Cookie.cookie[name];
    }

    static set (name, val) {
        document.cookie = `${name}=${val}`;
    }

}


export default YaDisk