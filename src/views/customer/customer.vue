<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="客户姓名:">
					<el-input v-model="filters.name" placeholder="客户姓名"></el-input>
				</el-form-item>
				<el-form-item label="性别:">
					<el-select class="sm-select" v-model="filters.sex" placeholder="请选择">
					    <el-option label="男" value="男"></el-option>
					    <el-option label="女" value="女"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="客户状态:">
					<el-select class="sm-select" v-model="filters.status" placeholder="请选择">
					    <el-option label="全部" value="全部"></el-option>
					    <el-option label="已关注" value="已关注"></el-option>
					    <el-option label="已注册" value="已注册"></el-option>
					    <el-option label="已下单" value="已下单"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="地区:">
					<el-select class="sm-select" v-model="filters.province" placeholder="请选择">
					    <el-option label="全部" value="全部"></el-option>
					    <el-option label="广东省" value="广东省"></el-option>
					    <el-option label="广西壮族自治区" value="广西壮族自治区"></el-option>
					</el-select>
					<el-select class="sm-select" v-model="filters.city" placeholder="请选择">
					    <el-option label="全部" value="全部"></el-option>
					    <el-option label="深圳" value="深圳"></el-option>
					    <el-option label="韶关" value="韶关"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<!-- <el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item> -->
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<!-- <el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column> -->
			<el-table-column fixed prop="id" label="客户ID" width="120"></el-table-column>
			<el-table-column fixed prop="name" label="客户姓名" width="120"></el-table-column>
			<el-table-column prop="IDNum" label="身份证号码" width="120"></el-table-column>
			<el-table-column prop="phone" label="手机号" width="120"></el-table-column>
			<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex"></el-table-column>
			<el-table-column prop="province" label="省份" width="100"></el-table-column>
			<el-table-column prop="city" label="城市" width="100"></el-table-column>
			<el-table-column prop="openid" label="微信openid" width="120"></el-table-column>
			<el-table-column prop="status" label="客户状态" width="120"></el-table-column>
			<el-table-column prop="email" label="邮箱" width="120"></el-table-column>
			<el-table-column prop="registerTime" label="注册时间" width="120"></el-table-column>
			<el-table-column prop="registerChannel" label="注册渠道" width="120"></el-table-column>
			<el-table-column prop="bindTime" label="绑定推荐人时间" width="140"></el-table-column>
			<el-table-column prop="superior" label="上级" width="120"></el-table-column>
			<el-table-column prop="subordinate" label="下级" width="120">
				<template scope="scope">
					<el-button size="small" @click="checkSubordinates(scope.$index, scope.row)">查看下级</el-button>
				</template>
			</el-table-column>
			<el-table-column label="其他信息" width="200">
				<template scope="scope">
					<el-button size="small" @click="checkCardsAndAddr(scope.$index, scope.row,0)">银行卡信息</el-button>
					<el-button size="small" @click="checkCardsAndAddr(scope.$index, scope.row,1)">收件地址</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--查看下级界面-->
		<el-dialog title="下级列表" v-model="subordinatesVisible" :close-on-click-modal="false">
			<el-table :data="subordinatesData.list" highlight-current-row v-loading="listLoading" style="width: 100%;">
				<el-table-column prop="id" label="客户ID"></el-table-column>
				<el-table-column prop="name" label="客户姓名"></el-table-column>
				<el-table-column prop="status" label="客户状态"></el-table-column>
				<el-table-column prop="bindTime" label="绑定时间"></el-table-column>
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="subordinatesData.total" style="float:right;">
				</el-pagination>
			</el-col>
		</el-dialog>

		<!--查看银行卡、收件地址界面-->
		<el-dialog title="银行卡&收件地址" v-model="cardsAndAddrVisible" :close-on-click-modal="false" class="dialog-box">
			<el-tabs v-model="activeName">
			    <el-tab-pane label="银行卡信息" name="card">
				    <el-card class="box-card" v-for="o in 4" :key="o">
					    <div class="text item">
					    	<p>银行卡号：6222188600000000000</p>
							<p>开户行：招行银行深圳分公司</p>
							<p>户名：李达康</p>
					    </div>
					</el-card>
				</el-tab-pane>
			    <el-tab-pane label="收件地址" name="addr">
			    	<el-card class="box-card" v-for="o in 4" :key="o">
					    <div class="text item">
					    	<p><span class="dialog-span">李达康</span><span class="dialog-span">13657576767</span></p>
							<p>广东省深圳市福田区新浩e都A栋9楼901</p>
					    </div>
					</el-card>
			    </el-tab-pane>
			</el-tabs>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: '',
					sex:'',
					status:'',
					province:'',
					city:'',
				},
				users: [{
					id:'wer',
					name:'wer',
					IDNum:'wer',
					phone:'wer',
					sex:1,
					province:'wer',
					city:'wer',
					openid:'wer',
					status:'wer',
					email:'wer',
					registerTime:'wer',
					registerChannel:'wer',
					bindTime:'wer',
					superior:'wer',
					subordinate:'wer',
				},{
					id:'wer',
					name:'wer',
					IDNum:'wer',
					phone:'wer',
					sex:1,
					province:'wer',
					city:'wer',
					openid:'wer',
					status:'wer',
					email:'wer',
					registerTime:'wer',
					registerChannel:'wer',
					bindTime:'wer',
					superior:'wer',
					subordinate:'wer',
				}],
				total: 1,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				subordinatesVisible: false,//查看下级界面
				editLoading: false,
				subordinatesData:{
					list:[{
						id:'wer1',
						name:'wer2',
						status:'wer3',
						bindTime:'wer4',
					}],
					total:2
				},//下级列表

				cardsAndAddrVisible: false,//查看银行卡、收件地址界面
				addLoading: false,
				activeName:''
			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				/*let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					console.log('res',res);
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});*/
			},
			//显示查看下级界面
			checkSubordinates: function (index, row) {
				this.subordinatesVisible = true;
				//this.editForm = Object.assign({}, row);
			},
			//显示查看银行卡、收件地址界面
			checkCardsAndAddr: function (index, row,type) {
				if(type==0){
					this.activeName = 'card'
				}else if(type==1){
					this.activeName = 'addr'
				}
				this.cardsAndAddrVisible = true;
			},
			selsChange: function (sels) {
				this.sels = sels;
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>
	.sm-select{width: 100px;}
	.toolbar{padding: 5px;}
	.dialog-box .dialog-span{margin-right:30px;}
</style>
<style>
	.dialog-box .el-card__body{padding:0 10px;}
	.dialog-box .el-card{margin-bottom: 10px;}
</style>