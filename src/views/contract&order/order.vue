<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="订单号:">
					<el-input v-model="filters.orderNo" placeholder="订单号"></el-input>
				</el-form-item>
				<el-form-item label="订单状态:">
					<el-select class="sm-select" v-model="filters.status" placeholder="请选择">
					    <el-option label="全部" value="全部"></el-option>
					    <el-option label="已支付" value="已支付"></el-option>
					    <el-option label="已承保" value="已承保"></el-option>
					    <el-option label="已取消" value="已取消"></el-option>
					    <el-option label="已退保" value="已退保"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">导入电子保单</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<!-- <el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column> -->
			<el-table-column prop="orderNo" label="订单号"></el-table-column>
			<el-table-column prop="insuType" label="保险类型"></el-table-column>
			<el-table-column prop="name" label="客户姓名"></el-table-column>
			<el-table-column prop="IDNum" label="身份证号码"></el-table-column>
			<el-table-column prop="carNo" label="车牌号"></el-table-column>
			<el-table-column prop="province" label="投保省份"></el-table-column>
			<el-table-column prop="city" label="投保城市"></el-table-column>
			<el-table-column prop="isInstallment" label="是否分期"></el-table-column>
			<el-table-column prop="status" label="订单状态"></el-table-column>
			<el-table-column label="订单详情" width="240">
				<template scope="scope">
					<el-button size="small" @click="detailsAndElectPolicy(scope.$index, scope.row,0)">查看详情</el-button>
					<el-button size="small" @click="detailsAndElectPolicy(scope.$index, scope.row,1)">查看电子保单</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--查看查看详情、电子保单界面-->
		<el-dialog title="查看详情&电子保单" v-model="detailsAndElectPolicyVisible" :close-on-click-modal="false" class="dialog-box">
			<el-tabs v-model="activeName">
			    <el-tab-pane label="查看详情" name="details">
				    <el-card class="box-card">
					    <div slot="header" class="clearfix">
							<span>订单信息</span>
						</div>
						<el-row :gutter="20">
							<el-col class="b-col" :span="8">订单号：XX</el-col>
							<el-col class="b-col" :span="8">订单状态：xx</el-col>
							<el-col class="b-col" :span="8">下单时间：XX</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col class="b-col" :span="8">是否分期：XX</el-col>
							<el-col class="b-col" :span="8">支付方式：XX</el-col>
							<el-col class="b-col" :span="8">支付金额：XX</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col class="b-col" :span="8">支付时间：XX</el-col>
							<el-col class="b-col" :span="8">保险类型：XX</el-col>
							<el-col class="b-col" :span="8"></el-col>
						</el-row>
					</el-card>
					<el-card class="box-card">
					    <div slot="header" class="clearfix">
							<span>个人及车产信息</span>
						</div>
						<el-row :gutter="20">
							<el-col class="b-col" :span="8">车主姓名：XX</el-col>
							<el-col class="b-col" :span="8">车主身份证号：xx</el-col>
							<el-col class="b-col" :span="8">电话号码：XX</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col class="b-col" :span="8">邮箱：XX</el-col>
							<el-col class="b-col" :span="8">车牌号码：XX</el-col>
							<el-col class="b-col" :span="8">车辆识别代号/车架号：XX</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col class="b-col" :span="8">发动机号码：XX</el-col>
							<el-col class="b-col" :span="8">注册日期：XX</el-col>
							<el-col class="b-col" :span="8">是否过户车：xx</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col class="b-col" :span="24">查看影像：
								<el-button type="text">新车购置发票照片</el-button>
								<el-button type="text">车主照片</el-button>
								<el-button type="text">行驶证照片</el-button>
								<el-button type="text">身份证正面照片</el-button>
								<el-button type="text">身份证反面照片</el-button>
							</el-col>
						</el-row>
					</el-card>
					<el-card class="box-card">
					    <div slot="header" class="clearfix">
							<span>基本信息</span>
						</div>
						<el-row :gutter="20">
							<el-col class="b-col" :span="24">保险公司：XX</el-col>
							<el-col class="b-col" :span="24">交强险起保日期：xx</el-col>
							<el-col class="b-col" :span="24">投保省市：xx</el-col>
						</el-row>
					</el-card>
					<el-card class="box-card">
					    <div slot="header" class="clearfix">
							<span>交强险信息</span>
						</div>
						<el-row :gutter="20">
							<el-col class="b-col" :span="24">交强险：XX</el-col>
							<el-col class="b-col" :span="24">车船税代缴：xx</el-col>
							<el-col class="b-col" :span="24">合计：xx</el-col>
						</el-row>
					</el-card>
				</el-tab-pane>
			    <el-tab-pane label="电子保单" name="electPolicy">
				    <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
					    <i class="el-icon-plus"></i>
					</el-upload>
			    </el-tab-pane>
			</el-tabs>
		</el-dialog>
		<el-dialog v-model="dialogVisible" size="tiny">
		    <img width="100%" :src="dialogImageUrl" alt="">
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
					orderNo: '',
					status:'',
				},
				users: [{
					orderNo:'wer',
					insuType:'wer',
					name:'wer',
					IDNum:'wer',
					carNo:'wer',
					province:'wer',
					city:'wer',
					isInstallment:'wer',
					status:'wer',
				},{
					orderNo:'wer',
					insuType:'wer',
					name:'wer',
					IDNum:'wer',
					carNo:'wer',
					province:'wer',
					city:'wer',
					isInstallment:'wer',
					status:'wer',
				}],
				total: 1,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				detailsAndElectPolicyVisible: false,//查看查看详情、电子保单界面
				addLoading: false,
				activeName:'',

				dialogImageUrl: '',
        		dialogVisible: false
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
			//显示查看银行卡、收件地址界面
			detailsAndElectPolicy: function (index, row,type) {
				if(type==0){
					this.activeName = 'details'
				}else if(type==1){
					this.activeName = 'electPolicy'
				}
				this.detailsAndElectPolicyVisible = true;
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
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
	.dialog-box .el-card{margin-bottom: 15px;}
	.box-card{margin-top:10px;margin-bottom:24px;}
	.box-card .b-col{margin: 6px 0;}
	.box-card .el-card__header{padding-top: 6px;padding-bottom: 6px;}
</style>