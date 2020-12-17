const R = require('../service/response')

class Kit {
    static getPage(ctx) {
        const pager = {
            page: parseInt(ctx.query.page, 10) || 0,
            pagesize: parseInt(ctx.query.pagesize, 10) || 15,
        };
        return pager;
    }

    static getDefaultPager() {
        return {
            page: 0,
            pageSize: 15
        }
    }

    static checkLoginTypeOk (ctx, type) {
        if (ctx.session && ctx.session.login_type == type) {
            return true;
        } else {
            R.error(10, '', ctx);
            return false;
        }
    }
}

module.exports = Kit;