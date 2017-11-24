
import React,{Component} from 'react'
import close from     'assets/images/close.png';
import logo from      'assets/images/user.png'
import Menu from       'components/menu/menu'
import {Popconfirm,message} from 'antd'
import {exit,User} from 'action/InteractionRequest'


export default class Home extends Component{
	
	constructor(props){
		
		super(props)
		this.state={
			userName:'',
			collapsed:false,
		}
	}
	
	componentWillMount(){
		
		User(sessionStorage.admin_token).then((data)=>{
			if(data.response !=null){

				message.error(data.response.data.error_description,5)
				location.hash="#/login";
			}else{
				this.setState({
					userName:data.data.data.fullName
				})
				
				sessionStorage.UserName=data.data.data.fullName;
			}
		})
	}
	
	Exit(){
 		exit();
  }
	
	toggleCollapsed(){
		this.setState({
			collapsed: !this.state.collapsed
		})
	}
	
	render(){
	
		return(
			<div className="main">
				<header className="main-header">
          <div className="top-left ad-fl">
            <h3>
          		<span>媒</span>
          		<span>体</span>
          		<span>数</span>
          		<span>据</span>
          		<span>平</span>
          		<span>台</span>
            </h3>
            <div className="topDiv">
            	<span className="topSpan">Smedia data terrace</span>
            </div>
          </div>
          <div className="top-right">
            <div className="topSpan ad-fl top-User">
            </div>
            <div className="top-Exit text-align-right">
	            <img className="top-right-user" src={logo} />
	            	<span className="top-rightSpan">{this.state.userName}</span>
	            <Popconfirm title="是否退出?" placement="bottomLeft"
	            	onConfirm={ this.Exit.bind(this)}
								 okText="Yes" cancelText="No">
								<img className="handle-ico cursor" src={close} />
								<span className="ad-fr top-Exit-span cursor">退出</span>
							</Popconfirm>
						</div>
          </div>
        </header>
        <div>
	        <article className="article1 ad-fl">
	         	<Menu />
	        </article>
					<article className="article2 ad-fl">
						{this.props.children}
					</article>
				</div>
      	
			</div>
		)
	}
}
