const app = getApp();
let http = require('../../../utils/request')
Page({
	data: {
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		hidden: true,
		scenicInfo: null,
		shopList: [],
		quantity: 1
	},
	onLoad: function (option) {
		this.queryScenicDetail()
	},
	shopDeatil(e) {
		wx.navigateTo({
			url: '/pages/shop/goods/details?scenicId='+e.currentTarget.dataset.shopid+''
		});
	},
	queryScenicDetail() {
		http.get('queryScenicDetail', {scenicId: 1}).then((r) => {
			console.log(r.data)
			this.setData({
				scenicInfo: r.data
			})
		})
	},

	// 增加数量
	addQuantity: function() {
		this.setData({
			quantity: this.data.quantity + 1
		});
	},

	// 减少数量
	reduceQuantity: function() {
		if (this.data.quantity > 1) {
			this.setData({
				quantity: this.data.quantity - 1
			});
		}
	},

	// 购票方法
	buyTicket: function() {
		const quantity = this.data.quantity;
		const scenicInfo = this.data.scenicInfo;
		// 这里可以跳转到订单确认页面或调用购票接口
		console.log('购买数量:', quantity);
		wx.showToast({
			title: `已选择${quantity}张门票`,
			icon: 'success'
		});
	},

	getShopList() {
		http.get('scenicList').then((r) => {
			r.data.forEach(element => {
				element.image = element.images.split(',')[0]
			});
            this.setData({
                shopList: r.data
            })
        })
	}
});
