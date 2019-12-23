import {
	get,
	post,
	imgUpload 
} from './mAjax.js'

function loading() {
	uni.showLoading({
		title: '请稍后',
		mask: true
	})
}

function request() {
	this.baseUrl = 'http://103.36.192.135:9001'
	// this.baseUrl = 'http://192.168.1.185:9001'
	buildRequest(this.baseUrl)
}

function buildRequest(baseUrl) {
	// 注册 获取验证码 || 忘记密码 获取验证码
	request.prototype.getRegisterCode = function(params, callBack) {
		get(baseUrl + '/users/send', params, callBack)
	}
	// 注册
	request.prototype.register = function(params, callBack) {
		post(baseUrl + '/users/reg', params, callBack)
	}
	// 登录
	request.prototype.login = function(params, callBack) {
		post(baseUrl + '/users/login', params, callBack)
	}
	// 忘记密码
	request.prototype.updatePwd = function(params, callBack) {
		get(baseUrl + '/users/forgetPassword', params, callBack)
	}
	// 搜索 - 搜索历史
	request.prototype.searchHis = function(params, callBack) {
		get(baseUrl + '/search_history/showHistory', params, callBack)
	}
	// 搜索 - 删除历史搜索记录
	request.prototype.delSearchHis = function(params, callBack) {
		get(baseUrl + '/search_history/deleteHistory', params, callBack)
	}
	// 搜索 - 搜索
	request.prototype.search = function(params, callBack) {
		get(baseUrl + '/exhibitions/search', params, callBack)
	}
	// 轮播图
	request.prototype.banner = function(params, callBack) {
		get(baseUrl + '/banner/', params, callBack)
	}
	// 首页信息
	request.prototype.indexInfo = function(params, callBack) {
		get(baseUrl + '/exhibitions/getIndexExh', params, callBack)
	}
	// 添加评论
	request.prototype.addComment = function(params, callBack) {
		post(baseUrl + '/comments/addComment', params, callBack)
	}
	// 帖子发布详情
	request.prototype.postDetails = function(params, callBack) {
		get(baseUrl + '/exhibitions/findExh', params, callBack)
	}
	// 发布展 Tab 导航
	request.prototype.releaseAllKinds = function(params, callBack) {
		get(baseUrl + '/exhibitions/getItem', params, callBack)
	}
	// 发布展各个分类信息
	request.prototype.releaseEachKindsInfo = function(params, callBack) {
		get(baseUrl + '/exhibitions/findByexhType', params, callBack)
	}
	// 发布帖子
	request.prototype.addPost = function(params, callBack) {
		post(baseUrl + '/exhibitions/addExhibition', params, callBack)
	}
	// 用户的所有评论
	request.prototype.getPersonalComments = function(params, callBack) {
		get(baseUrl + '/comments/listUid', params, callBack)
	}
	// 用户发布的所有信息
	request.prototype.getPersonalRelease = function(params, callBack) {
		get(baseUrl + '/exhibitions/getListByphone', params, callBack)
	}
	// 获取系统信息
	request.prototype.getPersonalSystem = function(params, callBack) {
		get(baseUrl + '/sysmsg/getAll', params, callBack)
	}
	// 软件信息
	request.prototype.getSoftInfo = function(params, callBack) {
		get(baseUrl + '/apps/getinfo', params, callBack)
	}
	// 获取用户信息
	request.prototype.getUserInfo = function(params, callBack) {
		get(baseUrl + '/users/get_contact', params, callBack)
	}
	// 修改信息
	request.prototype.updateUserInfo = function(params, callBack) {
		post(baseUrl + '/users/change_info', params, callBack)
	}
	// 分类 Tab 导航
	request.prototype.classTabs = function(params, callBack) {
		get(baseUrl + '/exhibitions/getListBytype', params, callBack)
	}
	// 删除
	request.prototype.delEachComment = function(params, callBack) {
		post(baseUrl + '/comments/delete', params, callBack)
	}
	// 隐私政策 & 服务协议
	request.prototype.policygreement = function(params, callBack) {
		get(baseUrl + '/policygreement/findList', params, callBack)
	}
}

export default {
	request
}
