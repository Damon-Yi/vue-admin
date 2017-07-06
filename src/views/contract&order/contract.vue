<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="订单号:">
					<el-input v-model="filters.contractNo" placeholder="合同流水号"></el-input>
				</el-form-item>
				<el-form-item label="订单状态:">
					<el-select class="sm-select" v-model="filters.status" placeholder="请选择">
					    <el-option label="全部" value="全部"></el-option>
					    <el-option label="已注册" value="已注册"></el-option>
					    <el-option label="已签署" value="已签署"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @:click="getUsers">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<!-- <el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column> -->
			<el-table-column prop="contracNo" label="合同流水号"></el-table-column>
			<el-table-column prop="name" label="客户姓名"></el-table-column>
			<el-table-column prop="prodType" label="产品类型"></el-table-column>
			<el-table-column prop="prodCode" label="产品代码"></el-table-column>
			<el-table-column prop="loanPrice" label="贷款本金"></el-table-column>
			<el-table-column prop="periods" label="期数"></el-table-column>
			<el-table-column prop="status" label="合同状态"></el-table-column>
			<el-table-column label="合同详情" width="240">
				<template scope="scope">
					<el-button size="small" @click="contractAndPayment(scope.$index, scope.row,0)">合同详情</el-button>
					<el-button size="small" @click="contractAndPayment(scope.$index, scope.row,1)">还款详情</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--查看合同详情、还款详情界面-->
		<el-dialog title="合同详情&还款详情" v-model="contractAndPaymentVisible" :close-on-click-modal="false" class="dialog-box">
			<el-tabs v-model="activeName">
			    <el-tab-pane label="合同详情" name="details">
				    <el-card class="box-card">
						<el-row :gutter="20">
							<el-col class="b-col" :span="8">合同流水号：27095137009</el-col>
							<el-col class="b-col" :span="8">客户姓名：王强</el-col>
							<el-col class="b-col" :span="8">产品类型：BX001</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col class="b-col" :span="8">产品代码：iPhone</el-col>
							<el-col class="b-col" :span="8">型号：6sPlus</el-col>
							<el-col class="b-col" :span="8">价格：6099</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col class="b-col" :span="8">金额：6099</el-col>
							<el-col class="b-col" :span="8">期数：18</el-col>
							<el-col class="b-col" :span="8">每月还款金额：500.8987</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col class="b-col" :span="8">还款账号：6222069812341234123</el-col>
							<el-col class="b-col" :span="8">所属银行：招商银行</el-col>
							<el-col class="b-col" :span="8">银行卡户名：王强</el-col>
						</el-row>
					</el-card>
				</el-tab-pane>
			    <el-tab-pane label="还款详情" name="electPolicy">
				    <el-table :data="paymentList" highlight-current-row v-loading="listLoading" style="width: 100%;">
						<el-table-column prop="periods" label="期数"></el-table-column>
						<el-table-column prop="paymentDate" label="还款日期"></el-table-column>
						<el-table-column prop="amount" label="应还金额"></el-table-column>
						<el-table-column prop="lateFees" label="应还滞纳金"></el-table-column>
						<el-table-column prop="exactAmount" label="实还金额"></el-table-column>
						<el-table-column prop="status" label="还款状态"></el-table-column>
						<el-table-column prop="payWay" label="还款方式"></el-table-column>
						<el-table-column prop="card" label="银行卡"></el-table-column>
					</el-table>
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
					contractNo: '',
					status:'',
				},
				users: [{
					contracNo:'wer',
					name:'wer',
					prodType:'wer',
					prodCode:'wer',
					loanPrice:'wer',
					periods:'wer',
					status:'wer',
				},{
					contracNo:'wer',
					name:'wer',
					prodType:'wer',
					prodCode:'wer',
					loanPrice:'wer',
					periods:'wer',
					status:'wer',
				}],
				total: 1,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				contractAndPaymentVisible: false,//查看合同详情、还款详情界面
				addLoading: false,
				activeName:'',

				paymentList:[{
					periods:'wer',
					paymentDate:'wer',
					amount:'wer',
					lateFees:'wer',
					exactAmount:'wer',
					status:'wer',
					payWay:'wer',
					card:'wer',
				}]
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
			//显示查看合同详情、还款详情界面
			contractAndPayment: function (index, row,type) {
				if(type==0){
					this.activeName = 'details'
				}else if(type==1){
					this.activeName = 'electPolicy'
				}
				this.contractAndPaymentVisible = true;
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
	.dialog-box .el-card{margin-bottom: 15px;}
	.box-card{margin-top:10px;margin-bottom:24px;}
	.box-card .b-col{margin: 6px 0;}
	.box-card .el-card__header{padding-top: 6px;padding-bottom: 6px;}
</style>