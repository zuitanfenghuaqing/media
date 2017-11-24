import React from 'react'
import ReactDOM from "react-dom";
import {message} from 'antd'
import {AddModel,PutScreen,alterModel} from 'action/InteractionRequest'
import axios from 'axios'

export const encrypt = (Password) => 
		new Hashes.SHA1().hex(
	 		  Password + 'yGRHAdTbsVxKO4hQSIkfceMF76liLmJ5'
		);
		
export const signs=()=>
   new Hashes.SHA1().hex('yGRHAdTbsVxKO4hQSIkfceMF76liLmJ5')
   

export const activeIndex=(Array)=>{
	
	if(Array.length>0){
			for(let i=0;i<Array.length;i++){
				Array[i].setAttribute("class","cursor")
			}
		}
}

export const confirm=()=>{
		message.warning("暂未开通！",5)
	}

export const addNull=(data)=>{
	
	 data.unshift({
		value_id:"",
		value_name:"(请选择)"
	})

	return data
}


export const UserName=()=>{
	
	return sessionStorage.UserName;
}


export const addData=(Number)=>{
	
	const newData=[];
	
	for(let i=0;i<Number;i++){
		newData.push({
				key: i,
				id: i,
				name: "",
				installModel: "",
				size: "",
				resolution: "",
				time: "",
				showType: "",
				mark: ""
		})}
		
	return newData;
}

export const modelScreen=(list,msg,screenData,Idr)=>{
	
	const ScreenData=screenData,
				List=list,
				Array=[];
	
	if(msg == "Add"){
		ScreenData.map((now)=>{
			Array.push({
				screen_name:now.name,
				screen_install_model:parseInt(now.installModel),
				screen_resolution:parseInt(now.resolution),
				screen_size:parseInt(now.size),
				screen_sale_time:parseInt(now.time),
				is_sale:parseInt(now.mark),
				show_type:now.showType,
			})
		})
	
		AddModel(List,Array,msg)
	}else{
		ScreenData.map((now)=>{
			Array.push({
				id:parseInt(now.id),
				name:now.name,
				installModel:parseInt(now.installModel),
				resolution:parseInt(now.resolution),
				size:parseInt(now.size),
				time:parseInt(now.time),
				mark:parseInt(now.mark),
				show_type:now.showType,
			})
		})
		
		axios.all([PutScreen(Array), alterModel(List,Idr)])
		  .then(axios.spread(function (data1, data2) {
		    if(data1.data.code=="0" && data2.data.code == "0"){
		    	message.success("修改成功！",5);
					location.hash="#/facilityModel"
		    }else{
		    	message.success(`设备型号屏信息${data1.data.msg}`,5);
		    	message.success(`设备型号基本信息${data2.data.msg}`,5);
		    }
		  }));
		
	}
}