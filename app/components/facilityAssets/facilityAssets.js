
import React,{Component} from 'react'
import {Row, Col, Input,Button,Table,message,
				Icon, Spin } from 'antd'
import {Request, localhost,Ajax} from 'config/requestRouter'
import {facilityAssetsSeek,
				Screenstatus,MapKey} from 'action/InteractionRequest'
import {assetsConfig} from 'action/configuration'

export default class FacilityAssets extends Component{
	
	constructor(props){
		super(props)
		
		this.state={
			selectedRowKeysd:[],
			selectedRowKeys:[],
			Data:null,
			serialNumber:"",
			Mac:"",
			failityType:"",
			pageIndex:10,
			PageSize:10,
			Page:1,
			total:0,
			loading:true,
		}
	}
	
	init(){
		
		const nData={d:"",m:"",f:"",
								 page:this.state.Page,
								 count:this.state.pageIndex};
		
		facilityAssetsSeek(nData).then((data)=>{
			this.setState({Data:MapKey(data.datalist),
										 total:data.total,
										 loading:false})
		})
	}
	
	seek(){
		
		this.setState({ loading:true })
		
		const {serialNumber,Mac,failityType,Page,pageIndex}=this.state;
		if(serialNumber || Mac || failityType !=""){
				const nData={d:serialNumber,m:Mac,f:failityType,
								 page:Page,count:pageIndex};
				facilityAssetsSeek(nData).then((data)=>{

					this.setState({Data:MapKey(data.datalist),
												 total:data.total,
												 loading:false	})
			})
		}else{
			this.init();
		}
	}
	
	Indicate(value){
		
		const {serialNumber,Mac,failityType,Page,pageIndex,
					 selectedRowKeysd}=this.state;
		const nData={d:serialNumber,m:Mac,f:failityType,
								 page:Page,count:pageIndex};

		if(selectedRowKeysd!=''){
			const Array={ state:value,
										property_number:selectedRowKeysd.map((now)=>{
											return now.screenNumber
										})}
			
			Screenstatus(nData,Array).then((data)=>{
				this.setState({Data:MapKey(data.datalist),
											 total:data.total,
											 selectedRowKeys:[],
											 selectedRowKeysd:[] })})
		}else{
			message.warning("请勾选要操作的选项！",5)
			
		}
	}
	
	start(){
		
		this.Indicate("正常")
		
	}
	
	stop(){
		
		this.Indicate("不可用")
		
	}
	componentWillMount(){
		this.init();
	} 
	
	render(){
		
		const {Page,pageIndex,total,PageSize,selectedRowKeys,
						selectedRowKeysd}=this.state;
		const rowSelection={
			selectedRowKeys,
      onChange: (selectedRowKey, selectedRows) => {

   			this.setState({
   			selectedRowKeysd:selectedRows,
   			selectedRowKeys:selectedRowKey,
   		}) }};
		
		return(
			<div>
			<Spin spinning={this.state.loading} tip="Loading..." size="large" >
				<header style={{marginBottom:15}}>
					<h3 className="header-title">
						媒体资源
					</h3>
					<div>
						<Row gutter={16}>
							<Col span={6}>
								<Input addonBefore="资产编号" value={this.state.serialNumber}
									onChange={(e)=>{
										this.setState({ serialNumber:e.target.value})
									}}/>
							</Col>
							<Col span={6}>
								<Button type="primary" type="primary" 
									onClick={this.seek.bind(this)}> 搜索</Button>
							</Col>
						</Row>
					</div>
				</header>
				<article>
					<Table dataSource={this.state.Data} columns={assetsConfig()}  
								 rowSelection={rowSelection}	pagination={{pageSize:PageSize,
								 total:total,current:Page,onChange:(page,pageSize)=>{
										
											this.setState({
												Page:page,
												pageIndex:PageSize
											},()=>{
												this.init();
											})
									}}} />
					<section className="Table-operation">
						<Button type="primary" style={{marginRight:15}} onClick={this.start.bind(this)}>启用</Button>
						<Button type="primary" onClick={this.stop.bind(this)}>停用</Button>

					</section>
				</article>
				</Spin>
			</div>
		)
	}
}
