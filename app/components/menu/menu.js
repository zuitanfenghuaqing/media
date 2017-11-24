
import React,{Component} from "react"
import {Link} from 'react-router'
import {Menu, Icon, Button} from 'antd'

const {SubMenu} = Menu;

const Default=()=>{
	if(sessionStorage.MenuKey!=null)
		return 
	else
		return 'menu1'
}

export default ()=>
	<div style={{ width: 250,marginTop:20 }}>
 		<Menu mode="inline"
 			defaultSelectedKeys={sessionStorage.MenuKey==undefined ? 
 				["menu1"]:[`${sessionStorage.MenuKey}`]}
    	style={{ height: '100%', borderRight: 0 }}
    	onClick={(e)=>{
    		sessionStorage.MenuKey=e.key;
    	}}
  	>
    	<Menu.Item key="menu1" >
	    	<Link to='/facilityModel'>
	    		<Icon type="calculator" />
	    		设备型号
	    	</Link>
	    </Menu.Item>
    	<Menu.Item key="menu2" >
    		<Link to='/mediaFacility'>
    		<Icon type="hdd" />
      	媒体设备
      	</Link>
    	</Menu.Item>
      <Menu.Item key="menu3">
      	<Link to='/facilityAssets'>
        	<Icon type="global" />
        	媒体资源
        </Link>
      </Menu.Item>
      <Menu.Item key="menu4">
      	<Link to='/dictionaries'>
        	<Icon type="database" />
        	数据字典
      	</Link>
      </Menu.Item>
 	 </Menu>
	</div>
