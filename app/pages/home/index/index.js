const app = getApp();
let http = require('../../../utils/request')
Page({
	data: {
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		hidden: true,
		current: 0, lines: 0,
		swiperlist: [{
			id: 0,
			url: 'https://dimg04.c-ctrip.com/images/0104z120008oupno07351_C_880_350.jpg',
			type: 1
		}, {
			id: 1,
			url: 'https://dimg02.c-ctrip.com/images/01047120008h3t6wx8E57_C_880_350.jpg',
			type: 2

		}, {
			id: 2,
			url: 'https://dimg05.c-ctrip.com/images/01034120008g4ic24A096_C_880_350.jpg',
			type: 3
		}, {
			id: 3,
			url: 'https://dimg01.c-ctrip.com/images/0100m120009b1ztzb8452_C_880_350.jpg',
			type: 4
		}],
		iconList: [{
			id: 1,
			icon: 'questionfill',
			color: 'red',
			name: '景点',
			type: 1
		}, {
			id: 2,
			icon: 'shopfill',
			color: 'orange',
			name: '住宿',
			type: 2
		}, {
			id: 3,
			icon: 'group_fill',
			color: 'yellow',
			name: '论坛',
			type: 3
		}, {
			id: 4,
			icon: 'discoverfill',
			color: 'olive',
			name: '公告',
			type: 4
		}],
		Headlines: [{
			id: 1,
			title: "青龙湖旅游购票",
			type: 1
		}, {
			id: 2,
			title: "小帅哥，快来玩呀",
			type: 2
		}],
		hotelInfo: [],
		scenicInfo: [],
		postInfo: [],
		videosrc: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",

	},
	onLoad: function () {
		/*console.log(app.globalData.StatusBar);
		console.log(app.globalData.CustomBar);*/
		// wx.getSetting({
		//     success: res => {
		//         if (!res.authSetting['scope.userInfo']) {
		//             wx.redirectTo({
		//               	url: '/pages/auth/auth'
		//             })
		//         }
		//     }
		// });
		this.home()
		this.getPostInfo()
	},
	getPostInfo() {
		http.get('getPostList').then((r) => {
			r.data.forEach(item => {
				if (item.images != null) {
					item.image = item.images.split(',')[0]
				}
				item.days = this.timeFormat(item.createDate)
			});
			if (r.data !== null) {
				this.setData({ postInfo: r.data })
			}
		})
	},
	timeFormat(time) {
		var nowTime = new Date();
		var day = nowTime.getDate();
		var hours = parseInt(nowTime.getHours());
		var minutes = nowTime.getMinutes();
		// 开始分解付入的时间
		var timeday = time.substring(8, 10);
		var timehours = parseInt(time.substring(11, 13));
		var timeminutes = time.substring(14, 16);
		var d_day = Math.abs(day - timeday);
		var d_hours = hours - timehours;
		var d_minutes = Math.abs(minutes - timeminutes);
		if (d_day <= 1) {
			switch (d_day) {
				case 0:
					if (d_hours == 0 && d_minutes > 0) {
						return d_minutes + '分钟前';
					} else if (d_hours == 0 && d_minutes == 0) {
						return '1分钟前';
					} else {
						return d_hours + '小时前';
					}
					break;
				case 1:
					if (d_hours < 0) {
						return (24 + d_hours) + '小时前';
					} else {
						return d_day + '天前';
					}
					break;
			}
		} else if (d_day > 1 && d_day < 10) {
			return d_day + '天前';
		} else {
			return time;
		}
	},
	postDetail(event) {
		wx.navigateTo({
			url: '/pages/coupon/detail/index?postId=' + event.currentTarget.dataset.postid + ''
		});
	},
	home() {
		http.get('home').then((r) => {
			r.hotelInfo.forEach(item => {
				item.image = item.images.split(',')[0]
			});
			r.scenicInfo.forEach(item => {
				item.image = item.images.split(',')[0]
			});
			this.setData({
				hotelInfo: r.hotelInfo,
				scenicInfo: r.scenicInfo
			})
		})
	},
	swiperchange: function (e) {
		this.setData({
			current: e.detail.current
		});
	},
	swipclick: function (e) {
		let that = this;
		var swip = that.data.swiperlist[that.data.current];
		console.log(swip);
		if (swip.type === 1) {
			wx.navigateTo({
				url: '/pages/home/doc/index?id=' + swip.id
			});
		}
	},
	lineschange: function (e) {
		this.setData({
			lines: e.detail.current
		});
	},
	linesclick: function (e) {
		let that = this;
		var swip = that.data.Headlines[that.data.current];
		console.log(swip);
		if (swip.type === 1) {
			wx.navigateTo({
				url: '/pages/home/doc/index?id=' + swip.id
			});
		}
	},
	itemckcred: function (e) {
		let that = this;
		var item = e.currentTarget.dataset;
		console.log(item.index, item.itemtype)
		if (item.itemtype === 1) {
			wx.navigateTo({
				url: '/pages/home/gscenic/index'
			});
		}
		if (item.itemtype === 2) {
			wx.switchTab({
				url: '/pages/home/groom/index'
			});
		}
		if (item.itemtype === 3) {
			wx.navigateTo({
				url: '/pages/coupon/index/index'
			});
		}
		if (item.itemtype === 4) {
			wx.navigateTo({
				url: '/pages/home/bulletin/index'
			});
		}
	},
	search: function () {
		wx.navigateTo({
			url: '/pages/home/search/index'
		});
	}
});
