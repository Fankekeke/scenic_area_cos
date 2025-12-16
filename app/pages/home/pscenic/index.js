const app = getApp();
let http = require('../../../utils/request')
Page({
	data: {
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		hidden: true,
		scenicInfo: null,
		shopList: [],
		weatherList: [],
		quantity: 1,
		isPlaying: false,
		content: ''
	},
	onLoad: function (option) {
		this.queryScenicDetail()
		this.queryWeather()
	},
	queryWeather() {
		http.get('queryWeather').then((r) => {
			this.setData({
				weatherList: r.data.data.forecast.slice(0, 5)
			})
			this.queryScenicContent()
		})
	},
	queryScenicContent() {
		let weatherText = '天气预测：\n'
		if (this.data.weatherList) {
			for (let i = 0; i < 3; i++) {
				weatherText += this.data.weatherList[i].ymd + '，' + this.data.weatherList[i].type + '，' + this.data.weatherList[i].high + '，' + this.data.weatherList[i].low + '\n'
			}
		}
		let params = '请介绍景点四川青龙湖，并规划附近的可玩景点，300字内' + weatherText
		http.post('aliTyqw', {content: params}).then((r) => {
			this.setData({
				content: r.msg
			})
		})
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
	},
	// 语音播报控制
	toggleVoicePlayback: function() {
		const backgroundAudioManager = wx.getBackgroundAudioManager();

		if (this.data.isPlaying) {
			// 停止播放
			backgroundAudioManager.stop();
			this.setData({
				isPlaying: false
			});
		} else {
			// 开始播放
			const text = this.data.scenicInfo.history;
			this.synthesizeSpeech(text);
		}
	},

// 文字转语音
	synthesizeSpeech: function(text) {
		const that = this;
		const backgroundAudioManager = wx.getBackgroundAudioManager();
		let audioUrl = 'http://127.0.0.1:9527/imagesWeb/content.mp3';
		backgroundAudioManager.title = that.data.scenicInfo.scenicName + '介绍';
		backgroundAudioManager.epname = '景区介绍';
		backgroundAudioManager.singer = '智能语音';
		backgroundAudioManager.coverImgUrl = that.data.scenicInfo.images ?
			that.data.scenicInfo.images.split(',')[0] : '';
		backgroundAudioManager.src = audioUrl;

		that.setData({
			isPlaying: true
		});

		// 监听播放结束
		backgroundAudioManager.onEnded(() => {
			that.setData({
				isPlaying: false
			});
		});

		// 监听播放错误
		backgroundAudioManager.onError(() => {
			that.setData({
				isPlaying: false
			});
			wx.showToast({
				title: '播放失败',
				icon: 'none'
			});
		});
	}
});
