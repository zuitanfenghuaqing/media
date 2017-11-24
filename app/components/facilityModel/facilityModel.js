
import React,{Component} from 'react'
import {Row, Col, Input,Button,Table,
				Popconfirm,message,Select,Spin} from 'antd'
import {Link} from 'react-router'
import {addNull} from 'action/deal'

import {facilityModelShow,ModelSelect,MakerSelect,
				mediaFacilityStatus,PutModel} from 'action/InteractionRequest'

const Option = Select.Option;

export default class FacilityModel extends Component{
	
	constructor(props){
		super(props)
		
		this.state={
			iData:null,
			facilityName:'',
			facilityType:'',
			FactoryName:'',
			UnitType:[],
			factory:[],
			loading:true,
		}
	}
	
	init(){
		
		const {facilityName,facilityType,FactoryName}=this.state,
		 			nData={d:facilityName,m:facilityType,f:FactoryName};
		 			
		facilityModelShow(nData).then((response)=>{
			this.setState({
				iData: response,
				loading:false
			})
		})
	}
	
	componentWillMount(){
		
		this.init();
		
		ModelSelect("dftc").then((data)=>{
			this.setState({
				UnitType:addNull(data)
			})
		});
		
		MakerSelect("dftc").then((data)=>{
			this.setState({
				factory:addNull(data)
			})
		});
		
	}
	
	seek(nData){
		
		this.setState({ loading:true })
		
		if(facilityName || facilityType || FactoryName != "")
			facilityModelShow(nData).then((data)=>{
				this.setState({
					iData:data,
					loading:false
				})
			})
		else
			this.init();
		
	}
	
	handle(nData,nrecord,status){
		
		PutModel(nData,nrecord,status).then((data)=>{
			this.setState({
						iData:data
					})
		})
		
	}
	
	render(){
		const {facilityName,facilityType,FactoryName}=this.state,
				  nData={d:facilityName,m:facilityType,f:FactoryName};
		
		const facilityConfig = [{
					title:'设备名称',
					dataIndex:'name',
					key:"name",
					className:"text-center"
				},{
					title: "规格参数",
					dataIndex:'specifications',
					key:'specifications',
					className:"text-center"
				},{
					title: "厂商名称",
					dataIndex:"manufacturer",
					key: "manufacturer",
					className:"text-center"
				},{
					title: "设备型号",
					dataIndex: "version",
					key: "version",
					className:"text-center"
				},{
					title:"屏数量",
					dataIndex: "screens",
					key: "screens",
					className:"text-center"
				},{
					title:"最后修改时间",
					dataIndex: "time",
					key: "time",
					className:"text-center"
				},{
					title:"状态",
					dataIndex: "equUse",
					key: "equUse",
					className:"text-center",
					render:(text)=>{
						return text == 1 ?
							<span>停用</span> : <span> 启用</span>
					}
				},{
					title: "操作",
					dataIndex: "value",
					key: "value",
					className:"text-center",
					render: (text,record,index)=>{

						return(
							<Row>
								<Col span={8}>
									<Link to={`/facilityModel/add/${record.equId}/examine`}>
										查看</Link></Col>
								<Col span={8}>
									<Link to={`/facilityModel/add/${record.equId}/compile`}>
										编辑</Link></Col>
								<Col span={8}>
									<a onClick={()=>{
										record.equUse == 1 ? 
										this.handle(nData,record.equId,0):this.handle(
											nData,record.equId,1)
									}}>{record.equUse == 1 ? "启用":"停用"}</a>
								</Col>
							</Row>
							)
					}
				}];
		
		return(
			<div>
				<Spin spinning={this.state.loading} tip="Loading..." size="large" >
					<header style={{marginBottom:15}}>
						<h3 className="header-title">
							<Row>
								<Col span={12}>
									<h3>设备型号</h3>	
								</Col>
								<Col span={12} className="text-align-right">
									<Link to={`/facilityModel/add/Add/Add`}>
									<Button type="primary" style={{marginRight: 15}}
												>增加设备型号</Button>
									</Link>
								</Col>
							</Row>
						</h3>
						<div>
							<Row gutter={16}>
								<Col span={6}>
									<Input addonBefore="设备名称" onChange={(e)=>{
										this.setState({
											facilityName:e.target.value
										})
									}}  value={this.state.facilityName}/>
								</Col>
								<Col span={6}>
									<Row>
										<span className="ant-input-group-addon inline-Title">
											设备型号</span>
										<Select value={facilityType}
											className="radius AllModel"	onChange={(e)=>{
															this.setState({facilityType:e}) }}>
												{this.state.UnitType!=null ? (this.state.UnitType.map(
													(now,index)=>{
													return<Option value={String(now.value_id)} 
																	key={now.value_id}>
																{now.value_name}</Option>
												})): null}
										</Select>
									</Row>
								</Col>
								<Col span={6}>
									<span className="ant-input-group-addon inline-Title">
										厂商名字</span>
									<Select  value={FactoryName}
										 className="radius AllModel" onChange={(e)=>{
													this.setState({FactoryName:e}) }}>
											{this.state.factory !=null ? (this.state.factory.map(
												(now,index)=>{
												return <Option value={String(now.value_id)} 
																key={index}>
															{now.value_name}</Option>
											})) : null }
									</Select>
								</Col>
								<Col span={6}>
									<Button type="primary" type="primary" 
											onClick={this.seek.bind(this,nData)} > 搜索</Button>
								</Col>
							</Row>
						</div>
					</header>
					<article>
						<Table dataSource={this.state.iData} 
							 columns={facilityConfig}
							 pagination={{pageSize:10}} />
						
					</article>
				</Spin>
			</div>
		)
	}
}
