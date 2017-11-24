
import React,{Component} from 'react'
import {Row, Col, Input,Button,Table,message,Select,Spin} from 'antd'
import {Link} from 'react-router'
import {mediaFacilityShow,mediaFacilityStatus,Issue,
				MapKey,ModelSelect,fileUpload} from 'action/InteractionRequest'
import {mediaConfig} from 'action/configuration'
import {addNull,UserName} from 'action/deal'
import {Request,Downs} from 'config/requestRouter'

const Option=Select.Option;

export default class MediaFacility extends Component{
	
	constructor(props){
		super(props)
		
		this.state={
			selectedRowKeysd:[],
			selectedRowKeys:[],
			iData:null,
			serialNumber:"",
			Mac:"",
			failityType:"",
			UnitType:[],
			pageIndex:10,
			PageSize:10,
			Page:1,
			total:0,
			loading:true,
			excle:"",
			fileType:"file"
		}
	}
	
	inint(){
		const nData={d:"",m:"",f:"",
									page:this.state.Page,
								 count:this.state.pageIndex};
								 
		mediaFacilityShow(nData).then((data)=>{
			this.setState({
				iData:MapKey(data.datalist),
				total:data.total,
				loading:false
			})
		});
	}
	
	componentWillMount(){
		
		this.inint();
		
		ModelSelect("dftc").then((data)=>{
			this.setState({ UnitType:addNull(data) })
		});
	}
	
	seek(){
		
		this.setState({ loading:true })
		
		const {serialNumber,Mac,failityType,Page,pageIndex}=this.state;
	
		if(serialNumber || Mac || failityType !=""){
			const nData={d:serialNumber,m:Mac,f:failityType,
								 page:Page,count:pageIndex};
			mediaFacilityShow(nData).then((data)=>{
				this.setState({iData:MapKey(data.datalist),
											total:data.total,
											loading:false })
			})
		}else{
			this.inint();
	}}
	
	Indicate(value){
		
		const {serialNumber,Mac,failityType,Page,pageIndex,
					 selectedRowKeysd}=this.state;
		const nData={d:serialNumber,m:Mac,f:failityType,
								 page:Page,count:pageIndex};
		
		if(selectedRowKeysd!=''){
			const Array={ state:value,
										property_number:selectedRowKeysd.map((now)=>{
											return now.propertyNumber
										})}
			
			mediaFacilityStatus(nData,Array).then((data)=>{
				this.setState({iData:MapKey(data.datalist),
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
		
		this.Indicate("不正常")
		
	}
	
	Uploadd(){

		const uploadFile=document.querySelector("#Upload-file").files[0],
		      iData= new FormData(),
				  userName=UserName();
				  
		iData.append("department","dftc")
		iData.append("person",userName)
		iData.append("file",uploadFile)
		
		if(uploadFile.type.indexOf("application/vnd") > -1){
		this.setState({ loading:true,fileType:"Hidden" })
		
		fileUpload(iData).then((data)=>{
			if(data !="" && data !==undefined){
				this.setState({ 
					loading: false,
					excle: data!=null ? `${Downs}${data}`:""},()=>{
						this.setState({fileType:"file" })
						this.inint()
					})

					message.success("导入成功！",5)
				}else{
					this.setState({ 
					loading: false})
				}
			
		})}else{
				message.warning("只能上传excle文件！",5)
		}
	}
	
	Issue(){
		Issue('dftc',UserName()).then((data)=>{
			
			if(data.data.code == "0"){
				
				this.setState({ selectedRowKeys:[] })
				
				message.success(`发布成功!`,5)
			}else{
				message.error(data.data.msg,5)
			}
		});
	}
	
	render(){
		
		const {selectedRowKeys,selectedRowKeysd,excle,fileType}=this.state;
		const rowSelection={
			selectedRowKeys,
      onChange: (selectedRowKey, selectedRows) => {
    	this.setState({
   			selectedRowKeysd:selectedRows,
   			selectedRowKeys:selectedRowKey,
   		})}},{Page,pageIndex,total,PageSize}=this.state;
		
		return(
			<div>
				<Spin spinning={this.state.loading} tip="Loading..." size="large">
				<header style={{marginBottom:15}}>
					<div className="header-title">
						<Row>
							<Col span={12}>
								<h3>媒体设备</h3>	
							</Col>
							<Col span={12} className="text-align-right">
								<Link to="/mediaFacility/add" style={{marginRight:15}}>
									<Button type="primary">API设置</Button></Link>
								<Button type="primary" style={{marginRight:15}}>
									导入excle</Button>
								<input id="Upload-file" type={fileType} className="Upload-image" 
									onChange={this.Uploadd.bind(this)} />
								<a href={excle} target="_blank"  style={{marginRight:30,fontSize:12,
										display:excle !="" ? "inline-block":"none"}}>下载excle</a>
								<Button type="primary" onClick={this.Issue.bind(this)}>
									发布</Button>
							</Col>
						</Row>
					</div>
					<div>
						<Row gutter={16}>
							<Row gutter={16}>
							<Col span={6}>
								<Input addonBefore="设备编号" value={this.state.serialNumber}
									onChange={(e)=>{
										this.setState({ serialNumber:e.target.value})
									}}/>
							</Col>
							<Col span={6}>
								<Input addonBefore="MAC地址" value={this.state.Mac}
									onChange={(e)=>{
										this.setState({ Mac:e.target.value})
									}} />
							</Col>
							<Col span={6}>
								<span className="ant-input-group-addon inline-Title">
										设备型号</span>
									<Select	 className="radius AllModel" onChange={(e)=>{
													this.setState({failityType:e}) }}>
										{this.state.UnitType!=null ? (this.state.UnitType.map(
											(now,index)=>{
											return <Option value={now.value_name =="(请选择)" ?
																"":now.value_name} key={index}>
															{now.value_name}
														</Option>
										})): null}
									</Select>
							</Col>
							<Col span={6}>
								<Button type="primary" type="primary" 
									onClick={this.seek.bind(this)}> 搜索</Button>
							</Col>
						</Row>
						</Row>
					</div>
				</header>
				<article>
					<Table dataSource={this.state.iData} columns={mediaConfig()}  
								 rowSelection={rowSelection}	pagination={{pageSize:PageSize,
								 total:total,current:Page, onChange:(page,pageSize)=>{
										
											this.setState({
												Page:page,
												pageIndex:PageSize
											},()=>{
												this.inint();
											})
									}}} />
					<section className="Table-operation">
						<Button type="primary"  style={{marginRight:15}} 
							onClick={this.start.bind(this)}>启用</Button>
						<Button type="primary" onClick={this.stop.bind(this)}>停用</Button>
					</section>
				</article>
				</Spin>
			</div>
		)
	}
}
