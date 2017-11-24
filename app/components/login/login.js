
import React,{Component} from 'react'
import {Logins} from 'action/InteractionRequest'
import Keys from 'assets/images/key.png'
import uncoil from 'assets/images/uncoil.png'

export default class Login extends Component{
	
	constructor(props) {
		
		super(props)

		this.state = {
			userName: '',
			Password: '',
			typePassword:'password',
			srcImage:Keys
		}
	}
	
	loginSubmit(e) {

		e.preventDefault();

		Logins(this.state.userName, this.state.Password);
	}
	
	userValue(e) {
		this.setState({userName: e.target.value});
	}
	
	cipherValue(e) {
		this.setState({Password: e.target.value});
	}
	
	componentDidMount(){
		
		sessionStorage.removeItem("MenuKey");
	}
	
	decode(){
		this.setState({
			typePassword:!this.state.typePassword,
			srcImage:!this.state.srcImage,
		})
	}
	
	render(){
		
		return(
			<div className="app-login">
				<header>
	          <h1>广告业务系统</h1>
	          <h2>ad management system</h2>
	      </header>
	      <form action="" method="" onSubmit={this.loginSubmit.bind(this)}
	        			style={{display:this.state.Display}}>
	          <input type="text" value={this.state.userName} 
	          	placeholder="User name"  onChange={this.userValue.bind(this)} />
	          <input type={this.state.typePassword ? 'password':'text'} 
	          	placeholder="User password" value={this.state.Password}
	          	maxLength='30' onChange={this.cipherValue.bind(this)} />
	          <img src={this.state.srcImage ? Keys:uncoil}  onClick={this.decode.bind(this)}/>
	          <button type="submit">Sign in</button>
	        </form>
	        <footer>
						东方天呈文化传媒有限公司 版权所有
	        </footer>
			</div>
		)
		
	}
}