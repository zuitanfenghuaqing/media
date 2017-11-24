
import React,{Component} from 'react'
import {Row, Col, Input, Button, Select, message,Spin } from 'antd'
import {Ajax,Request,Downs} from 'config/requestRouter'
import {PutApi,ajaxConnect} from "action/InteractionRequest"
import {UserName} from 'action/deal'
import axios from 'axios'

const Option=Select.Option;

export default class Addapi extends Component{
	
	constructor(props){
		super(props)
		this.state={
			Url:"",
			loading:false,
			Down:null,
			plan:null,
			status:"",
			total:'',
		}
	}
	
	WebSocket(data){
		
		const socket = io.connect(`http://192.168.3.6:9592/data/v2/message`);

		socket.addEventListener('connect',()=>{
			socket.emit("open",{"data":data})
			this.setState({ loading: true})
		})
		
		socket.addEventListener('message',function(msg){
			console.log("消息",msg)

			this.setState({
			})
		})
		
		socket.addEventListener("close",()=>{
		})
	}
	
	Ajaxi(idata){
		
		const iData=idata;
		const {Down,plan,status,total}=this.state
		
		if(status=="0"){
			this.setState({
				loading:false,
				plan:"",
				Down:Down!=null ? `${Downs}${Down}`:null
			})
			message.success("数据导入完成！",5)
		}else if(status=="1"){
			this.setState({
				loading:false})
			message.error("导入失败！",5)
		}else if(status=="2" || status==""){
			this.setState({
				loading:true
			})
			this.Connect(iData)
		}
	}

	Connect(ndata){
		
		const iData=ndata;
		 axios.get(`${Ajax}/data_v2/ImpDataSelect?id=${iData}&department=dftc`).
					then((data)=>{
						this.setState({
							Down:data.data.url!=null ? data.data.url:null,
							plan:data.data.count !=null ? (
							Math.round((data.data.count / data.data.total)*100,2)):null,
							status:data.data.code,
							total:data.data.total
						},()=>{
								this.Ajaxi(iData)
						})
					}).catch((Error)=>{
						message.error(Error.response.data.message,5)
								})
	}
	
	Submit(){
		const name=UserName();
		PutApi(this.state.Url,name).then((data)=>{
			if(data.code=="0"){
//				this.WebSocket(data.data);
				this.Ajaxi(data.data)
			}else{
				message.error(data.msg);
			}
		})
	}
	
	render(){
		const {plan,Down}=this.state;

		return(
			<div>
				<Spin spinning={this.state.loading} tip={plan!=null ? `当前进度: ${plan}%`:"Loading..."}
					wrapperClassName="setAPI-loading" >
					<header style={{marginBottom:15}}>
						<h3 className="header-title">
							API设置
						</h3>
					</header>
					<article>
						<Row>
							<span>请求方式:  </span>
							<Select defaultValue="get" style={{ width: 120 }} >
							 	<Option value="">请选择</Option>
					      <Option value="get">GET</Option>
					      <Option value="post">POST</Option>
					    </Select>
					  </Row>
					  <Row style={{marginTop:20}}>
					  	<Col span={14}>
					  	<span className="inline-block" style={{marginRight:5}}>
					  		URL地 址:</span>
					  	<Input className="API-URL" value={this.state.Url} onChange={(e)=>{
					  		this.setState({
					  			Url:e.target.value
					  		})
					  	}}/>
					  	</Col>
					  	<Col span={10}></Col>
					  </Row>
					  <Row style={{marginTop:100}}>
					  	<Button type="primary" onClick={this.Submit.bind(this)}>保存</Button>
					  	<a style={{display: Down!=null ? "inline-block":"none",marginLeft:100}} href={Down} 
					  		target="_blank">下载</a>
					  </Row>
					</article>
				</Spin>
			</div>
		)
	}
}
