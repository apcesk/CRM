import LoginTypes from '../components/loginTypes'

const _token = 'token';
const _loginType = 'loginType';
const _menus = "menus";

class User {
    // 获取token
    static getToken() {
        return localStorage.getItem(_token);
    }
    // 保存token
    static saveToken(value){
        sessionStorage.setItem(_token, value);
        return localStorage.setItem(_token, value);
    }
    // 删除token
    static deleteToken() {
        return localStorage.removeItem(_token);
    }
    // 删除登录类型
    static deleteLoginType() {
        return localStorage.removeItem(_loginType);
    }
    // 保存登录类型
    static saveLoginType(value) {
        return localStorage.setItem(_loginType, value);
    }
    // 获取登录类型
    static getLoginType() {
        return localStorage.getItem(_loginType);
    }
    // 保存id
    static saveLoginId(value) {
        sessionStorage.setItem('id', value);
        return localStorage.setItem('id', value);
    }
    // 获取id
    static getLoginId() {
        return localStorage.getItem('id');
    }
    // 
    static getPermittedMenus() {
        return JSON.parse(localStorage.getItem(_menus));
    }

    static deletePermittedMenus(){
        return localStorage.removeItem(_menus);
    }
}

export default User;