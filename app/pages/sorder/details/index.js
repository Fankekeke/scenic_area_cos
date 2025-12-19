const http = require("../../../utils/request");
const app = getApp();
Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        TabbarBot: app.globalData.tabbar_bottom,
        orderInfo: null
    },
    onLoad: function (options) {
        let that = this;
        console.log(options.orderId)
        this.queryOrderDetail(options.orderId)
    },
    queryOrderDetail(orderId) {
        http.get('queryScenicOrderDetail', { orderId }).then((r) => {
            console.log(r)
            this.setData({
                orderInfo: r.data
            })
        })
    }

});
