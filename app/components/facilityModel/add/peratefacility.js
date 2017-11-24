
import React,{Component} from 'react'
import {Row,Col,Button,Input,Select ,Table,Upload,Icon,message,
				InputNumber} from 'antd'
import {Peratefacility,Change} from 'action/field'
import {Request, localhost,Ajax} from 'config/requestRouter'
import {addData,modelScreen} from 'action/deal'
import {UnitType,Screen,iUpload} from 'action/InteractionRequest'

const Option = Select.Option;

export default class PerateFacility extends Component{
	
	constructor(props,context){
		super(props)
		this.state={
			Title:[props.params.handle],
			serialNumber:"",
			Mac:"",
			facilityModel:"",
			manufacturer:"",
			outlineSize:"",
			Number:"1",
			collaborate:"",
			System:"",
			argument:props.params.handle,
			Idr:props.params.name,
			UnitType:[],
			factory:[],
			iSystem:[],
			Url:'',
			Size:[],
			ratio:[],
			selectedRowKeys:[],
			newData:"",
		}
		
	}
	
	Submit(current){

		const {serialNumber,Mac,facilityModel,manufacturer,
					outlineSize,Number,collaborate,System,Url,Idr}=this.state;
					
		if(serialNumber && facilityModel && manufacturer && Number && 
			 collaborate && System !=""){
			
			const List={
				department:"dftc",
				equName:serialNumber,
				equVersion:parseInt(facilityModel),
				equManufacturer:parseInt(manufacturer),
				equUse:"0",
				specifications:Mac,
				cooperate:parseInt(collaborate),
				systemType:parseInt(System),
				screenNum:parseInt(Number),
				equSize:outlineSize,
				equDrawing:Url,
			};
			var tatus=0;
			
			current.forEach((item,index)=>{
				Object.keys(item).map((now)=>{
					if(current[index][now] !==""){
						tatus=1;
					}else{
						tatus=0;
						}
				})
			})
			
			if(tatus===1){
				modelScreen(List,this.state.argument,current,Idr);
			}else{
				message.error("屏信息不能为空！",5)
			}
		}else{
			message.error("所填项不能为空！",5)
			
	}}
	
	componentWillMount(){
		
		["Add","compile","examine"].forEach((item,index)=>{
			if(this.state.Title==item)
				this.setState({Title:["增加","编辑","查看"][index] }) 
		})
			
		UnitType(10).then((data)=>{
			this.setState({UnitType:data })});
		
		UnitType(7).then((data)=>{ 
			this.setState({factory:data}) });
		
		UnitType(1).then((data)=>{
			this.setState({ iSystem:data })});
		
		UnitType(6).then((data)=>{
			this.setState({ Size:data })});
		
		UnitType(2).then((data)=>{
			this.setState({ ratio:data })});
		
		if(this.state.argument!='Add'){
		
			Screen(this.state.Idr).then((data)=>{
		
				this.setState({
					serialNumber:data.name,
					manufacturer:String(data.manufacturer),
					outlineSize: data.size,
					facilityModel:String(data.version),
					Number: String(data.screens),
					System: String(data.systemType),
					collaborate: String(data.cooperate),
					Mac: data.specifications,
					newData:data.screen_list,
					Url:data.drawing
				})
			})
		}else{
			this.setState({
				newData:addData(this.state.Number)
			})
		}
	}
	
	Uploadd(){

		const uploadImg=document.querySelector("#Upload-Img").files[0];
		const iData= new FormData();
		const Type=uploadImg.type.split("/")[1];
		
		if( Type =="png" || Type=="jpeg" ){
			iData.append("file",uploadImg)
			iUpload(iData).then((data)=>{
	
				this.setState({ Url: `${Request}${data.url}`})
			})
		}else{
			message.warning("只能上传图片文件！",5)
		}
			
	}
	
	setData(value,index,field){
		
		const newData = this.state.newData;
		newData[index][field]=value;
	console.log(newData)
		this.setState({
			newData: newData
		})
	}
	
	Footer(pageData){
		
		const {Url,argument} = this.state;
		
		return	<section style={{marginTop:30}}>
							<Row>
								<span className="inline-block" style={{marginRight:15}}>
									设备样图:</span>
								<Button  icon="to-top" disabled={argument =="examine" ? true:false}>
									上传图片</Button>
								<input id="Upload-Img" type="file" className="Upload-image" 
									disabled={argument =="examine" ? true:false}
									onChange={this.Uploadd.bind(this)} />

								<a  style={{display:Url =="" ? "none":"inline-block" }}> 
									<img src={Url} /></a>
							</Row>
						<Row style={{marginTop:100}} >
						<Button type="primary" style={{width:100}} 
							onClick={this.state.argument =="examine" ?
												()=>{
													location.hash="#/facilityModel"
												}:this.Submit.bind(this,pageData) }>
												{this.state.argument =="examine" ? "返回":"保存"}</Button>
					</Row>
						</section>
	}
	
	render(){
		
		const {Url,Size,ratio,newData,argument,Title}=this.state;
		const handleModel=()=>{		

		if(this.state.TNumber!=""){
		return[{
						title:'序号',
						dataIndex:"id",
						key:"id",
						className:"text-center",
						render:(text,record,index)=>{
							return <span id={record.id}>{index+1}</span>
						}
					},{
						title:"展位名称",
						dataIndex: "name",
						key: "name",
						className:"text-center",
						render:(text,record,index)=>{
							
							return <Input defaultValue={text} 
											disabled={argument =="examine" ? true:false} onChange={(e)=>{
								this.setData(e.target.value,index,"name") }} />
						}
					},{
						title:"安装方式",
						dataIndex: "installModel",
						key: "installModel",
						className:"text-center",
						render:(text,record,index)=>{
							
							
							return <Select defaultValue={String(text)}  className="gap"
											disabled={argument =="examine" ? true:false} 	onChange={(e)=>{
												this.setData(e,index,"installModel") 
											}}
										>
											<Option value="" key="">请选择</Option>
											<Option value="0">横</Option>
											<Option value="1">竖</Option>
										</Select>
						}
					},{
						title:"尺寸",
						dataIndex: "size",
						key: "size",
						className:"text-center",
						render:(text,record,index)=>{
							return <Select defaultValue={String(text)}  className="gap"
											disabled={argument =="examine" ? true:false} onChange={(e)=>{
												this.setData(e,index,"size") 
											}}	
										>
												<Option value="" key="">请选择</Option>
												{Size==null ? "":Size.map((now,_index)=>{
													return <Option value={String(now.value_id)} 
																	key={_index}>
																	{now.value_name}</Option>
												})}
												
											</Select>
						}
					},{
						title:"分辨率",
						dataIndex: "resolution",
						key: "resolution",
						className:"text-center",
						render:(text,record,index)=>{
							return <Select defaultValue={String(text)}  className="gap"
											disabled={argument =="examine" ? true:false} onChange={(e)=>{
												this.setData(e,index,"resolution") 
											}}>
												<Option value="" key="">请选择</Option>
												{ ratio==null ? "":ratio.map((now,_index)=>{
													return <Option value={String(now.value_id)} 
																	key={_index}>
																	{now.value_name}</Option>
												})}
												
											</Select>
						}
					},{
						title:"销售时长(秒)",
						dataIndex: "time",
						key: "time",
						className:"text-center",
						render:(text,record,index)=>{
							
							return <InputNumber defaultValue={text} 
											disabled={argument =="examine" ? true:false} onChange={(e)=>{
								this.setData(e,index,"time") }} />
						}
						
					},{
						title:"可展示",
						dataIndex: "showType",
						key: "showType",
						className:"text-center",
						render:(text,record,index)=>
								<Select defaultValue={String(text)}  className="gap" 
									disabled={argument =="examine" ? true:false} onChange={(e)=>{
											
												this.setData(e,index,"showType") 
											}}>
									<Option value="" key="">请选择</Option>
									<Option value="视频" key="视频">视频</Option>
									<Option value="视频+音频" key="视频+音频">视频+音频</Option>
									<Option value="图片" key="图片">图片</Option>
								</Select>
					},{
						title:"是否投广告",
						dataIndex: "mark",
						key: "mark",
						className:"text-center",
						render:(text,record,index)=>
								<Select defaultValue={String(text)}  className="gap" 
									disabled={argument =="examine" ? true:false} onChange={(e)=>{
												this.setData(e,index,"mark") 
											}}>
									<Option value="" key="">请选择</Option>
									<Option value="0" key="0" >是</Option>
									<Option value="1" key="1">否</Option>
								</Select>
					}]
		}}
		const rowSelection={
			selectedRowKeys:[0,1,2,3,4],
      onChange: (selectedRowKey, selectedRows) => {
    	this.setState({
   			selectedRowKeys:selectedRows,
   		})}}
		
		return(
			<div>
				<header style={{marginBottom:15}} className="facility">
					<h3 className="header-title">
						{Title}设备型号<span style={{fontSize:16}}>(*号为必填)</span>
					</h3>
					<div>
						<Row gutter={16} style={{marginBottom:15}}>
							<Col span={6}>
								<Input addonBefore="设备名称*" style={{width:263}} 
											disabled={argument !="Add" ? true:false}
											value={this.state.serialNumber} onChange={(e)=>{
												this.setState({serialNumber:e.target.value})
											}}/>
							</Col>
							<Col span={6} className="ColTitlt">
								<Input addonBefore="设备规格" style={{width:263}}
											disabled={argument =="examine" ? true:false}
											value={this.state.Mac} onChange={(e)=>{
												this.setState({Mac:e.target.value})
											}}/>
							</Col>
							<Col span={6}>
								<Row>
									<span className="ant-input-group-addon inline-Title">设备型号*</span>
									<Select	value={this.state.facilityModel} className="radius"
										disabled={argument !="Add" ? true:false}
										style={{width:200}}
												onChange={(e)=>{
													this.setState({
														facilityModel:e
													})
										}}>
										{this.state.UnitType !=null ? (this.state.UnitType.map(
											(now,index)=>{
												return <Option value={String(now.value_id)} key={index}>
																{now.value_name}</Option>
											})): null }
									</Select>
								</Row>
							</Col>
								<Col span={6}>
								<Row>
									<span className="ant-input-group-addon inline-Title">生产厂商*</span>
									<Select value={this.state.manufacturer} style={{width:200}}
										className="radius" disabled={argument !="Add" ? true:false}
												onChange={(e)=>{
													this.setState({
														manufacturer:e
													})}}>
									{this.state.factory !=null ? (this.state.factory.map(
										(now,index)=>{
												return <Option value={String(now.value_id)} key={index}>
																{now.value_name}</Option>
											})) :null }
									</Select>
								</Row>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={6}>
								<Input addonBefore='外形   尺寸' value={this.state.outlineSize} 
												disabled={argument =="examine" ? true:false}
												style={{width:263}} maxLength="50"  onChange={(e)=>{
												this.setState({outlineSize:e.target.value})
											}}/>
							</Col>
							<Col span={6}>
								<span className="ant-input-group-addon inline-Title">展位数量*</span>
								<Select style={{width:200}} value={this.state.Number} 
									className="radius" disabled={argument !="Add" ? true:false}
									onChange={(e)=>{
									this.setState({Number:e},()=>{
										this.setState({newData:addData(this.state.Number) })
									}) }}>
										<Option value="1">1</Option>
										<Option value="2">2</Option>
										<Option value="3">3</Option>
										<Option value="4">4</Option>
										<Option value="5">5</Option>
									</Select>
							</Col>
							<Col span={6}>
								<span className="ant-input-group-addon inline-Title">合作方式*</span>
								<Select style={{width:200}} disabled={argument !="Add" ? true:false}
									className="radius" value={this.state.collaborate} onChange={(e)=>{
									this.setState({collaborate:e})
								}}>
									<Option value="0">全接入</Option>
									<Option value="1">半接入</Option>
								</Select>
							</Col>
							<Col span={6}>
								<span className="ant-input-group-addon inline-Title">系统类型*</span>
								<Select style={{width:200}} value={this.state.System}  
									className="radius" disabled={argument !="Add" ? true:false}
									onChange={(e)=>{
									this.setState({System:e})
								}}>
									{this.state.iSystem!=null ?(this.state.iSystem.map(
										(now,index)=>{
												return <Option value={String(now.value_id)} key={index}>
																{now.value_name}</Option>
											})):null}
								</Select>
							</Col>
						</Row>
					</div>
				</header>
				<article>
					<Table dataSource={newData}
						pagination={false}  rowSelection={rowSelection}	
						columns={handleModel()} footer={(pageData)=>this.Footer(pageData)}
						/>
				</article>
			</div>	
		)
	}
}
