
import React,{Component} from 'react'
import {Row, Col, Input, Table, Button, Modal} from 'antd'
import {dictionariesVlue,dictionariesKey, dictionariesAddVlue,dictionariesSeek,Alter} from 'action/InteractionRequest'
import {iData,Model,Modeli} from 'action/field'
import {activeIndex} from 'action/deal'

const Search = Input.Search;

export default class Dictionaries extends Component{
	
	constructor(props){
		super(props);
		this.state={
			Data:null,
			Key:[],
			keyId:'',
			keyIndex:0,
			visible2:false,
			visible1:false,
			inlinData:null,
			method:"",
			Seek:"",
		}
	}
	
	addKey(){
		
		this.setState({
			visible2:true
		})
	}
	
	addValue(){
		this.setState({
			visible1:true,
			inlinData:null,
			method:"post"
		})
	}
	
	seek(){
		
		dictionariesSeek(this.state.keyId,this.state.Seek).then((response)=>{
			this.setState({
				Key:response
			})
		})

	}
	
	
	alter(data){
		Alter(this.state.keyId,data).then((response)=>{

			this.setState({
				Data:response
			})
		})
	}
	
	GETvalue(e){
		
		const Idr=e.target.id;
		const Array=document.querySelectorAll(".activeIndex");

		activeIndex(Array);
		
		e.target.setAttribute("class","activeIndex cursor")
		
		dictionariesVlue(Idr).then((response)=>{
			this.setState({
				Data:response,
				keyId:Idr
			})
		})
	}
	
	valueHandle(visible1,response){
		
		const {Data}=this.state;
		this.setState({
			visible1:visible1,
			Data:response!=null ? response:Data
		})
	}
	valueCall(visible1){
		this.setState({
			visible1:visible1
		})
	}
	
	keyHandle(visible,response){
		this.setState({
			visible2:visible,
			Key: response
		})
	}
	
	keyCall(visible){
		this.setState({
			visible2:visible
		})
	}
	
	
	componentWillMount(){
		
		dictionariesKey().then((response)=>{
		
			this.setState({
				Key:response
			})
			
			dictionariesVlue(response[0].key_id).then((data)=>{
				
				this.setState({ Data:data,keyId:response[0].key_id})
			})
		});
		
		
	}
	
	render(){
		
		const {keyIndex,Key}=this.state;
		
		const dictionaries=[{
					title:'键',
					dataIndex:'key_name',
					key:"key_name",
					className:"text-center"
				},{
					title: "值",
					dataIndex:'value_name',
					key:'value_name',
					className:"text-center"
				},{
					title: "状态",
					dataIndex:"value_use",
					key: "value_use",
					className:"text-center",
					render:(text)=>{
						return text == 1 ?
							<span>停用</span> : <span> 启用</span>
					}
				},{
					title: "创建人",
					dataIndex: "create_person",
					key: "create_person",
					className:"text-center"
				},{
					title:"所属组织",
					dataIndex: "department",
					key: "department",
					className:"text-center"
				},{
					title: "操作",
					className:"text-center",
					render: (text,record)=>{
						return(
							<Row>
								<Col span={12}>
									<a className="SPAN-1 cursor" 
												onClick={()=>{
													this.setState({
														inlinData:record,
														visible1:true,
														method:"put"
													})
												}}>编辑</a>
								</Col>
								<Col  span={12}>
									<a className="SPAN-1 cursor"
												onClick={()=>{
													this.setState({
														inlinData:record
													},()=>this.alter(this.state.inlinData))
												}}>状态更改</a>
								</Col>
							</Row>)
					}
				}];
	
		return(
			<div className="dictionaries">
				<header style={{marginBottom:30}}>
					<h3 className="header-title">
						<Row>
							<Col span={12}>
								<h3>数据字典</h3>	
							</Col>
							<Col span={12} className="text-align-right">
								
							<Modeli Showl={this.state.visible2}  
								keyCall={this.keyCall.bind(this)}
								keyHandle={this.keyHandle.bind(this)} />
							
							<Model visible={this.state.visible1} keyId={this.state.keyId}
								Method={this.state.method}
								valueHandle={this.valueHandle.bind(this)} 
								valueCall={this.valueCall.bind(this)} 
								inlineData={this.state.inlinData} />
								
							</Col>
						</Row>
					</h3>
					<Row>
						<Col span={12}>
							<Search
								placeholder="请输入搜索内容"
								style={{width:200}}
								value={this.state.Seek}
								onChange={(e)=>{this.setState({
									Seek:e.target.value
								})}}
								onSearch={this.seek.bind(this)}
							/>
						</Col>
						<Col span={12} className="text-align-right">
							<Button type="primary" onClick={this.addValue.bind(this)}>
												新增标签值</Button>
						</Col>
					</Row>
				</header>
				<article>
					<Row>
						<nav className="inline-block dictionaries-nav">
							<Row style={{marginBottom:15}}>
								<Button type="primary"  className="all"
											onClick={this.addKey.bind(this)}>新增类别</Button>
							</Row>
							<ul>
								{Key==null ? "" : Key.map((now,index)=>{
										
									if(keyIndex==index)	
										return <li key={index} className="cursor activeIndex" 
														onClick={this.GETvalue.bind(this)} key={index}
														id={now.key_id}>{now.key_name}</li>
									else
										return <li key={index} className="cursor" 
													onClick={this.GETvalue.bind(this)} key={index}
													id={now.key_id}>{now.key_name}</li>
								})}
							</ul>
						</nav>
						<section className="inline-block dictionaries-section">
							<Table dataSource={this.state.Data} columns={dictionaries}  
										pagination={{pageSize:10}} />
						</section>
					</Row>
				</article>
			</div>
		)
	}
}
