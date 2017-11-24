
import axios from 'axios'
import {Request, localhost,Ajax,HttpUpload,Httpfile} from 'config/requestRouter'
import {encrypt, signs} from './deal'
import {message} from 'antd'


export 	const MapKey =(data)=>{
	
		if(data!=null)
			data.map((now,index)=>{
				now.key=index;
		})
			
		return data;
	}

export const Logins=(userName,Password)=>{
	
	if(userName && Password !=''){
		axios.post(`${Request}/session`,{
			username:userName,
			password:encrypt(Password),
		},{timeout:5000}).then((response)=>{
			
			if(response.data.code=="200"){
				location.hash="#/home";
				sessionStorage.admin_token=response.data.data;
				message.success("登录成功")
			}else{
				message.error(response.data.message)
			}
		}).catch((Error)=>{
			message.error(Error.message)
		})
	}else{
		message.error('账号或密码不能为空！');
	}
}

export const User=(Token)=>{
	
  return	axios.get(`${Request}/system/4/session?
					access_token=${Token}&sigin=${signs()}`).then((data)=>{

							return data;

					}).catch((error)=>{
						return error
						
					})
}

export const exit=()=>{
	
	axios({
		method: "delete",
		url:`${Request}/system/4/session`,
		data:{
			access_token:sessionStorage.admin_token,
			sign:signs(),
		}}).then((data)=>{
			message.success("退出成功")
			sessionStorage.removeItem("MenuKey");
			location.hash="#/login";
		}).catch((error)=>{
			message.success("退出成功")
			location.hash="#/login";
		})
}

//获取数据字典类别
export const dictionariesKey =()=>{
	
	return		axios.get(`${Ajax}/media/v2/key/dftc`).
						then((response)=>{
							if(response.data.code=="0")
								return response.data.data;
							else	
								message.error(response.data.msg)
						})
}

//获取数据字典类别值
export const dictionariesVlue=(Values)=>{
		
	return		axios.get(`${Ajax}/media/v2/value/${Values}`).
						then((Data)=>{
							
							if(Data.data.data!=null)
								Data.data.data.map((now,index)=>{
									now.key=index;
								})

							return Data.data.data;
						})
}
//数据字典搜索
export const dictionariesSeek=(Idr,value)=>{
	
	return		axios.get(`${Ajax}/media/v2/tag?department=dftc&keyName=${value}`).
						then((response)=>{
							return response.data.data;
						})
}
export const Alter =(Idr,data)=>{
	
	if(data.value_use=="1")
			data.value_use="0";
	else
		data.value_use="1";
	
	return		axios.put(`${Ajax}/media/v2/value?valueName=${data.value_name}&valueUse=${data.value_use}&valueRemarks=${data.value_remarks}&valueId=${data.value_id}`).
						then((response)=>{
							if(response.data.code =="0"){
								
								message.success(response.data.msg,4)
								return dictionariesVlue(Idr);
							}else{
								message.success(response.data.msg)
							}
						})
}

//增加类别值 
export const dictionariesAddVlue=(Data)=>{
	
	const Method=Data.Method=="put" ? axios.put:axios.post,
				iData={
					valueName:Data.value_name,
					valueUse:"0",
					department:Data.department,
					createPerson:Data.create_person,
					valueRemarks:Data.valueRemarks,
				};
	
	if(Data.Method == "post")
		iData.keyValue=Data.keyId;
	else
		iData.valueId=Data.valueId;

return	Method(`${Ajax}/media/v2/value`,iData,{timeout:5000}).
				then((response)=>{

					if(response.data.code===0){
						message.success(response.data.msg,5);
						return dictionariesVlue(Data.keyId)
					}else{
						message.error(response.data.msg,5)
					}
			}).catch((error)=>{
				message.warning("请求超时！")
			})
}

//增加字典KEY
export const dictionariesModifyVlue=(Data)=>{
	
return	axios.post(`${Ajax}/media/v2/key`,{
				keyName:Data.keyName,
				keyUse:Data.keyUse,
				department:Data.department,
				createPerson: Data.createPersom,
				keyRemarks:Data.keyRemarks
			},{timeout:5000}).then((response)=>{
				
					if(response.data.code=="0"){
						message.success(response.data.msg,5)
						return dictionariesKey();
					}else{
						message.error(response.data.msg,5)
					}
			}).catch((error)=>{
				message.warning("请求超时！")
			})
}



//媒体设备
export const mediaFacilityShow=(nData)=>{

	return axios.get(`${Ajax}/media/v2/equ/dftc?propertyNumber=${nData.d}&mac=${nData.m}&devVersion=${nData.f}&page=${nData.page}&count=${nData.count}`,
					{timeout:5000}). then((response)=>{
						if(response.data.code=="0")
				 	 		return response.data.data;
				 	 	else
				 	 		message.error( response.data.msg)
				 }).catch((error)=>{
				message.warning("请求超时！")
			})
}
export const mediaFacilityStatus=(iData,nData)=>{
	
	return axios.put(`${Ajax}/media/v2/equ`,{
					status:nData.state,
					property_number:nData.property_number
			}).then((response)=>{
				 	 	return mediaFacilityShow(iData);
				 })
}

//设备型号
export const facilityModelShow=(nData)=>{
	return axios.get(`${Ajax}/media/v2/equinfo/dftc?devName=${nData.d}&devVersion=${nData.m}&manufacturer=${nData.f}`,
						{timeout:5000}).then((Data)=>{
							if(Data.data.code=="0"){
								if(Data.data.data!=null)
									Data.data.data.map((now,index)=>{
										now.key=index;
									})
									Data.data.data.sort((a,b)=>{return a.equUse-b.equUse})
								return Data.data.data;
							}else{
								message.error(Data.data.msg)
							}
							}).catch((error)=>{
				message.warning("请求超时！")
			})
}
//获取设备型号屏信息
export const GetModel=(value)=>{
	
	return axios.get(`${Ajax}/media/v2/equinfo/dftc/${value}`).
				 then((response)=>{

				 	return response.data.data;
				 })
}

//增加设备类型
export const AddModel=(list,Array)=>{
	
	return axios.post(`${Ajax}/media/v2/equinfo`,{
					department:"dftc",
					equName:list.equName,
					equVersion:list.equVersion,
					createPerson:sessionStorage.UserName,
					equManufacturer:list.equManufacturer,
					equUse:0,
					equSpecifications:list.specifications,
					cooperate:list.cooperate,
					systemType:list.systemType,
					screenNum:list.screenNum,
					screen:Array,
					equSize:list.equSize,
					equDrawing:list.equDrawing,
				}).then((response)=>{
					if(response.data.code==0){
				 	message.success("操作成功！",5)
				 	location.hash="#/facilityModel";
				 }else{
				 	message.success(response.data.msg,5)
				 }
				 }).catch((error)=>{
				 	message.success(error.response.data.message,5)
				 })
}

//修改设备型号状态
export const PutModel=(nData,Idr,status)=>{
	return axios.put(`${Ajax}/media/v2/equUse/${Idr}/${status}`).
							then((response)=>{
						
								if(response.data.code=="0")
									return facilityModelShow(nData);
								else
									message.error(response.data.msg)
							})
}

//修改设备型号信息
export const alterModel=(iData,Idr)=>{
	
	return axios.put(`${Ajax}/media/v2/equVersion`,{
						id:parseInt(Idr),
						specifications:iData.specifications,
						size:iData.equSize,
						drawing:iData.equDrawing
					})
}


//修改屏信息
export const PutScreen=(Array)=>{
	
	return	  axios.put(`${Ajax}/media/v2/equscreen`,{
								screen:Array
					})
//.then((response)=>{
//							message.success("修改成功！",5);
//							location.hash="#/facilityModel"
//							
//					})
}


//媒体查询
export const facilityAssetsSeek=(nData)=>{
	
	return axios.get(`${Ajax}/media/v2/screen/dftc?propertyNumber=${nData.d}&mac=${nData.m}&devType=${nData.f}&page=${nData.page}&count=${nData.count}`,{
					timeout:5000}).then((response)=>{
						
								if(response.data.code=="0")
									return response.data.data;
								else
									message.error(response.data.msg)
							}).catch((error)=>{
				message.warning("请求超时！")
			})
}


//媒体资源状态更改


export const Screenstatus =(iData,nData)=>{
	
	return axios.put(`${Ajax}/media/v2/screen`,{
					status:nData.state,
					property_number:nData.property_number
	}).then((response)=>{
				 	 	return facilityAssetsSeek(iData);
				 }).catch((Error)=>{
						message.error(Error)
					})
}


//获取设字典配置值
export const UnitType=(value)=>{
	
	return axios.get(`${Ajax}/media/v2/spinner/dftc/${value}`).
					then((response)=>{
						if(response.data.code=="0")
							return response.data.data
						else	
							message.error(response.data.msg)
					}).catch((error)=>{
						message.error(error)
					})
}



//获取屏信息

export const Screen=(value)=>{
	
	return axios.get(`${Ajax}/media/v2/equscreen/dftc/${value}`).
					then((response)=>{
						response.data.data.screen_list.map((now,index)=>{
										now.key=index;
									})

						return response.data.data
					}).catch((Error)=>{
						message.error(Error)
					})
}



//修改Api
export const PutApi=(value,name)=>{
	
	return	axios({
						url:`${Ajax}/data/v2/ImpDataApi?
								department=dftc&person=${name}&url=${value}`,
						method:"get", }).then((response)=>{
										return response.data;
								}).catch((data)=>{
									message.error("错误请求",5)
								})
}



//发布媒体设备

export const Issue=(d,v)=>{
	return	axios({
						url:`${Ajax}/data/v2/SplitScreen`,
						method: 'post',
						data:{
							department:d,
							person:v
						},
						headers:{
							'Content-Type':'application/json',
						}
			}).then((data)=>{
						return data;
				}).catch((Error)=>{
						message.error(Error)
					})
}


//上传图片
export const iUpload=(data)=>{
	
	return axios.post(`${HttpUpload}`,data,{
						headers:{
							"Content-Type":"multipart/form-data"
						}}).
					then((data)=>{
						return data.data.data;
					}).catch((Error)=>{
						message.error(`${Error}`)
					})
}

//上传文件
export const fileUpload=(data)=>{
	
	return axios.post(`${Httpfile}`,data,{
						headers:{
							"Content-Type":"multipart/form-data"
						}}).then((data)=>{

						if(data.data.code=="0" || data.data.code=="200")
							return data.data.data;
						else
							message.error(data.data.msg)
					}).catch((Error)=>{
						message.error(`${Error}`)
					})
}


//设备型号下拉选择
export const ModelSelect=(value)=>{
	
	return axios.get(`${Ajax}/media/v2/VSpinner/${value}`).
					then((response)=>{
						return response.data.data
					}).catch((Error)=>{
						message.error(`${Error}`)
					})
}

//生成厂商下拉选择
export const MakerSelect=(value)=>{
	
	return axios.get(`${Ajax}/media/v2/MSpinner/${value}`).
					then((response)=>{
						if(response.data.code=="0")
							return response.data.data
						else
							message.error(response.data.msg)
					}).catch((Error)=>{
						message.error(`${Error}`)
					})
}
