<template>
	<section>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>车险分期订单统计，共XX单</span>
			</div>
			<el-row :gutter="20">
			  <el-col class="b-col" :span="8">平安保险一次性支付：XX</el-col>
			  <el-col class="b-col" :span="8">安盛天平一次性支付：XX</el-col>
			  <el-col class="b-col" :span="8">太平洋一次性支付：XX</el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col class="b-col" :span="8">平安保险分期付：XX</el-col>
			  <el-col class="b-col" :span="8">安盛天平分期付：XX</el-col>
			  <el-col class="b-col" :span="8">太平洋分期付：XX</el-col>
			</el-row>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>逾期合同统计，共XX单</span>
			</div>
			<el-row :gutter="20">
			  <el-col class="b-col" :span="8">逾期三天以上：XX</el-col>
			  <el-col class="b-col" :span="8">逾期三天以上：XX </el-col>
			  <el-col class="b-col" :span="8">逾期三天以上：XX</el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col class="b-col" :span="8">逾期三十天以上：XX</el-col>
			  <el-col class="b-col" :span="8">逾期三十天以上：XX</el-col>
			  <el-col class="b-col" :span="8">逾期三十天以上：XX</el-col>
			</el-row>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>风险人员统计</span>
			</div>
			<el-row :gutter="20">
			  <el-col class="b-col" :span="8">退保咨询：100人</el-col>
			  <el-col class="b-col" :span="8">重新打印保单：2000</el-col>
			  <el-col class="b-col" :span="8">逾期理赔：2000</el-col>
			</el-row>
		</el-card>
	</section>
</template>

<script>
	export default {
	}

</script>

<style scoped>
	.box-card{margin-top:10px;margin-bottom:24px;}
	.box-card .b-col{margin: 15px 0;}
</style>