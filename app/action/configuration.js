
import React,{Component} from 'react'
import {Row,Col,Input,Button,Popconfirm,message,Select} from 'antd'
import {Link} from 'react-router'
import {confirm} from 'action/deal'
import {UnitType,PutModel} from 'action/InteractionRequest'

const Option=Select.Option;

//设备型号表格配置
export const facilityConfig=(handle)=>{
	
	console.log("看看")
	
	return [{
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
										handle(record.equId,0):handle(record.equId,1)
									}}>{record.equUse == 1 ? "启用":"停用"}</a>
								</Col>
							</Row>
							)
					}
				}];
}

const start=(nData,nrecord,status)=>{
		
		PutModel(nData,nrecord,status)
		
	}
	
const stop=(nData,nrecord,status)=>{
		
		PutModel(nData,nrecord,status)
		
	}


//媒体设备表格配置

export const mediaConfig=()=>{
	return [{
					title:'设备编号',
					dataIndex:'propertyNumber',
					key:"propertyNumber",
					className:"text-center"
				},{
					title: "设备MAC",
					dataIndex:'mac',
					key:'mac',
					className:"text-center"
				},{
					title: "设备型号",
					dataIndex:"devVersion",
					key: "devVersion",
					className:"text-center",
				},{
					title: "设备地址",
					dataIndex: "address",
					key: "address",
					className:"text-center"
				},{
					title:"所属商圈",
					dataIndex: "businessArea",
					key: "businessArea",
					className:"text-center"
				},{
					title:"gps位置",
					dataIndex: "s_lant",
					key: "s_lant",
					className:"text-center"
				},{
					title:"最后更新时间",
					dataIndex: "modifiedTime",
					key: "modifiedTime",
					className:"text-center",
					render:(text)=>{
						return <span>
										{new Date(parseInt(text) * 1000).toLocaleString()}
									 </span>
					}
				},{
					title:"设备状态",
					dataIndex: "status",
					key: "status",
					className:"text-center"
				}];
}


//资源表格配置

export const assetsConfig=()=>{
	
	return [{
					title:'地址',
					dataIndex:'address',
					key:"address",
					className:"text-center"
				},{
					title: "商圈",
					dataIndex:'businessArea',
					key:'businessArea',
					className:"text-center"
				},{
					title: "屏资产编号",
					dataIndex:"screenNumber",
					key: "screenNumber",
					className:"text-center"
				},{
					title:"资产编号",
					dataIndex: "propertyNumber",
					key: "propertyNumber",
					className:"text-center"
				},{
					title:"修改时间",
					dataIndex: "modifiedTime",
					key: "modifiedTime",
					className:"text-center",
					render:(text)=>{
						return <span>
										{new Date(parseInt(text) * 1000).toLocaleString()}
									 </span>
					}
				},{
					title:"状态",
					dataIndex: "status",
					key: "status",
					className:"text-center"
				},{
					title:"安装方式",
					dataIndex: "installModel",
					key: "installModel",
					className:"text-center"
				}];
}


//增加型号

export const handleModel=(Time,Size,ratio,installModel,status)=>{		
	
	if(Time && Size && ratio && installModel !=""){

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
					render:(text)=>{
						return <Input defaultValue={text}  onChange={(e)=> text=e.target.value } />
					}
				},{
					title:"安装方式",
					dataIndex: "installModel",
					key: "installModel",
					className:"text-center",
					render:(text,record)=>{
						return <Select defaultValue={String(text)}  className="gap">
										<Option value="">请选择</Option>
										{installModel.map((now)=>{
											return <Option value={String(now.value_id)}>
															{now.value_name}</Option>
										})}
									</Select>
					}
				},{
					title:"尺寸",
					dataIndex: "size",
					key: "size",
					className:"text-center",
					render:(text,record)=>{
						return <Select defaultValue={String(text)}  className="gap">
											<Option value="">请选择</Option>
											{Size.map((now)=>{
												return <Option value={String(now.value_id)}>
																{now.value_name}</Option>
											})}
											
										</Select>
					}
				},{
					title:"分辨率",
					dataIndex: "resolution",
					key: "resolution",
					className:"text-center",
					render:(text,record)=>{
						return <Select defaultValue={String(text)}  className="gap">
											<Option value="">请选择</Option>
											{ratio.map((now)=>{
												return <Option value={String(now.value_id)}>
																{now.value_name}</Option>
											})}
											
										</Select>
					}
				},{
					title:"销售时长",
					dataIndex: "time",
					key: "time",
					className:"text-center",
					render:(text,record,index)=>{
						
						return <Select defaultValue={String(text)}  className="gap">
											<Option value="">请选择</Option>
											{Time.map((now)=>{
												return <Option value={String(now.value_id)}>
																{now.value_name}</Option>
											})}
											
										</Select>
					}
					
				},{
					title:"可展示",
					dataIndex: "show",
					key: "show",
					className:"text-center",
					render:(text)=>
							<Select defaultValue={String(text)}  className="gap">
								<Option value="" >请选择</Option>
								<Option value="视频">视频</Option>
								<Option value="视频+音频">视频+音频</Option>
								<Option value="图片">图片</Option>
							</Select>
				},{
					title:"是否投广告",
					dataIndex: "mark",
					key: "mark",
					className:"text-center",
					render:(text)=>
							<Select defaultValue={String(text)}  className="gap">
								<Option value="" >请选择</Option>
								<Option value="0">是</Option>
								<Option value="1">否</Option>
							</Select>
				}]
	}
}
