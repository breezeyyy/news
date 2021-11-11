<template>
	<div>
		<van-nav-bar
			title="登录"
			left-arrow
			fixed
			placeholder
			safe-area-inset-top
			@click-left="onClickLeft"
		/>
		<h1>Welcome</h1>
		<van-form @submit="onSubmit">
			<van-field
				v-model="username"
				name="用户名"
				label="用户名"
				placeholder="用户名"
				:rules="[{ required: true, message: '请填写用户名' }]"
			/>
			<van-field
				v-model="password"
				type="password"
				name="密码"
				label="密码"
				placeholder="密码"
				:rules="[{ required: true, message: '请填写密码' }]"
			/>
			<div class="login">
				<van-button
					round
					block
					type="info"
					native-type="submit"
				>登录
				</van-button>
			</div>
			<router-link to="/reg">还没有账号？去注册 ></router-link>
		</van-form>
	</div>
</template>

<script>
	// import Cookie from "@/utils/Cookie";
	import Cookie from "js-cookie";
	import {Toast} from "vant";
	
	export default {
		name: "login",
		data () {
			return {
				username: '',
				password: '',
			};
		},
		beforeRouteEnter (to, from, next) {
			from.path === '/' || from.path === '/reg' || Cookie.set('prevPath', from.path);
			next();
		},
		methods: {
			onSubmit () {
				this.$axios.post('/login', {
					username: this.username,
					password: this.password,
				}).then(res => {
					if (res.err) {
						Toast(res.msg);
					} else {
						Cookie.set('token', res.data.token, {
							expires: 7
						});
						this.goPrev();
					}
				}).catch(err => console.log(err));
			},
			onClickLeft () {
				this.$router.go(-1);
				Cookie.remove('prevPath');
			},
			goPrev () {
				const path = Cookie.get('prevPath');
				Cookie.remove('prevPath');
				this.$router.push(path);
			},
		},
	}
</script>

<style scoped lang="scss">
	h1 {
		margin-top: 0.3rem;
		text-align: center;
	}
	
	.van-form {
		margin-top: 0.4rem;
		
		.van-field {
			margin: 0.2rem 0;
		}
		
		.login {
			margin: 0.6rem 0.16rem 0.3rem;
		}
		
		a:last-child {
			display: block;
			margin-right: 0.2rem;
			text-align: right;
		}
	}
</style>
