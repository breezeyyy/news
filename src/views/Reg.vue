<template>
	<div>
		<van-nav-bar
			title="注册"
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
			<van-field
				v-model="nikename"
				name="昵称"
				label="昵称"
				placeholder="昵称 (可选)"
			/>
			<van-field name="uploader" label="选择头像">
				<template #input>
					<van-uploader v-model="fileList" multiple :max-count="1"/>
				</template>
			</van-field>
			<div class="login">
				<van-button
					round
					block
					type="info"
					native-type="submit"
					color="#EE0A24"
				>注册并登录
				</van-button>
			</div>
			<router-link to="/login">已有账号？去登录 ></router-link>
		</van-form>
	</div>
</template>

<script>
	
	import Cookie from "js-cookie";
	import {Toast} from "vant";
	
	export default {
		name: "reg",
		data () {
			return {
				username: '',
				password: '',
				nikename: '',
				fileList: [],
			};
		},
		beforeRouteEnter (to, from, next) {
			const query = Object.keys(from.query).length ? Object.keys(from.query).reduce((query, key) => `${query}${key}=${from.query[key]}&`, '?').replace(/&$/, '') : '';
			from.path === '/' || from.path === '/reg' || from.path === '/login' || Cookie.set('prevPath', `${from.path}${query}`);
			next();
		},
		methods: {
			onSubmit () {
				const data = new FormData();
				data.append("username", this.username);
				data.append("password", this.password);
				this.nikename && data.append("nikename", this.nikename);
				this.fileList[0] && data.append("icon", this.fileList[0].file);
				this.$axios.post('/reg',
					data
				).then(res => {
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
				const path = Cookie.get('prevPath');
				this.$router.replace(path === '/user' ? '/home' : path);
				Cookie.remove('prevPath');
			},
			goPrev () {
				const path = Cookie.get('prevPath');
				Cookie.remove('prevPath');
				this.$router.push(path);
			},
		},
	};
</script>

<style scoped lang="scss">
	h1 {
		color: #EE0A24;
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
