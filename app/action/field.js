
import React,{Component} from 'react'
import {Row, Col, 
	Input, Table, Button, Modal,
	InputNumber,Select,message} from 'antd'
import {
	dictionariesAddVlue,
	dictionariesModifyVlue,
	dictionariesKey } from 'action/InteractionRequest'
	
const Option = Select.Option;
	
export class Model extends Component{
	
	constructor(props){
		super(props)
		this.state={
			visible:props.visible,
			create_person:"",
			department:"",
			valueId:"",
			value_name:"",
			valueRemarks:"",
			method:props.Method,
			keyId:props.keyId
		}
	}
	
	componentWillReceiveProps(props){
		
		if(this.state.visible!=props.visible){
			this.setState({
				visible:props.visible,
				method:props.Method,
				keyId:props.keyId
			})
			if(props.inlineData!=null){
				this.setState({
					create_person:props.inlineData.create_person,
					department:props.inlineData.department,
					value_name:props.inlineData.value_name,
					valueId:props.inlineData.value_id
				})
			}else{
				this.setState({
					create_person:null,
					department:null,
					value_name:null,
					valueId:null
				})
			}
		}
	}
	
	handleOk(e){
		
		const {value_name,department,create_person,valueId,keyId,method,
					valueRemarks} = this.state;
		
		const Data={
			value_name:value_name,
			department:department,
			create_person:create_person,
			valueId:valueId,
			keyId: keyId,
			Method:method,
			valueRemarks: valueRemarks
		};
		
		if(value_name && department  && create_person !=""){
			dictionariesAddVlue(Data).then((response)=>{

					this.setState({ visible: false},()=>{
			    	this.props.valueHandle(this.state.visible,response)
			    })
					
		})}else{
			message.error("必填项不能为空！")
		}
		
    
  }
   handleCancel(e){
    this.setState({
	      visible: false
	    },()=>{
	    	this.props.valueCall(this.state.visible)
	    })
  }
	
	render(){
		return(
		<Modal className="Modal-show"
      title="增加Key类别值"
      visible={this.state.visible}
      onOk={this.handleOk.bind(this)}
      onCancel={this.handleCancel.bind(this)}
    >
      <Row>
    		<Col span={5}>
    			<span className="ant-input-group-addon inline-Title1">请输入值名称*</span>
    		</Col>
    		<Col span={19}>
    			<Input onChange={(e)=>{
    				this.setState({
    					value_name:e.target.value
    				})
    			}}  value={this.state.value_name}/>
    		</Col>	
      </Row>
       <Row>
       	<Col span={5}>
	  			<span className="ant-input-group-addon inline-Title1">所属部门*</span>
	  		</Col>
	  		<Col span={19}>
	  			<Input  onChange={(e)=>{
	  				this.setState({
	  					department:e.target.value
	  				})
	  			}} value={ this.state.department } />
	  		</Col>	
	    </Row>
      <Row>
    		<Col span={5}>
  			<span className="ant-input-group-addon inline-Title1">创建人*</span>
  		</Col>
  		<Col span={19}>
  			<Input  onChange={(e)=>{
	  				this.setState({
	  					create_person:e.target.value
	  				})
	  			}} value={ this.state.create_person } />
	  		</Col>	
      </Row>
      <Row>
	      <Col span={5}>
	  			<span className="ant-input-group-addon inline-Title1">备注(非必填)</span>
	  		</Col>
	  		<Col span={19}>
	  			<Input  value={this.state.valueRemarks} onChange={(e)=>{
	  				this.setState({valueRemarks:e.target.value })
	  			}}/>
	  		</Col>	
      </Row>
    </Modal>
    )
	}
}

export class Modeli extends Component{
	
	constructor(props){
		super(props)
		this.state={
			visible:props.Showl,
			keyName:"",
			keyUse:0,
			department:"",
			createPersom:"",
			keyRemarks:"",
		}
	}
	
	componentWillReceiveProps(props){

		if(this.state.visible != props.Showl)
			this.setState({
				visible:props.Showl,
				keyName:"",
				keyUse:0,
				department:"",
				createPersom:"",
				keyRemarks:"",
			})
	}
	
	handleOk(e){
		
		const Data={
			keyName:this.state.keyName,
			keyUse:this.state.keyUse,
			create_person:this.state.department,
			department:this.state.department,
			createPersom: this.state.createPersom,
			keyRemarks:this.state.keyRemarks
		};
		
			dictionariesModifyVlue(Data).then((response)=>{
			this.setState({
	      visible: false
	    },()=>{
	    	this.props.keyHandle(this.state.visible,response)
	    })
		}) 
  }
	
  handleCancel(e){
     this.setState({
	      visible: false
	    },()=>{
	    	this.props.keyCall(this.state.visible)
	    })
  }
	
	render(){
		return(
		<Modal className="Modal-show"
      title="增加Key类"
      visible={this.state.visible}
      onOk={this.handleOk.bind(this)}
      onCancel={this.handleCancel.bind(this)}
    >
			<Row>
    		<Col span={5}>
    			<span className="ant-input-group-addon inline-Title1">请输入key名称*</span>
    		</Col>
    		<Col span={19}>
    			<Input onChange={(e)=>{
    				this.setState({
    					keyName:e.target.value
    				})
    			}}  value={this.state.keyName}/>
    		</Col>	
      </Row>
      
      <Row>
    		<Col span={5}>
    			<span className="ant-input-group-addon inline-Title1">所属部门*</span>
    		</Col>
    		<Col span={19}>
    			<Input onChange={(e)=>{
    				this.setState({
    					department:e.target.value
    				})
    			}}  value={this.state.department}/>
    		</Col>	
      </Row>
      <Row>
    		<Col span={5}>
    			<span className="ant-input-group-addon inline-Title1">创建人*</span>
    		</Col>
    		<Col span={19}>
    			<Input onChange={(e)=>{
    				this.setState({
    					createPersom:e.target.value
    				})
    			}}  value={this.state.createPersom}/>
    		</Col>	
      </Row>
      <Row>
    		<Col span={5}>
    			<span className="ant-input-group-addon inline-Title1">备注(非必填)</span>
    		</Col>
    		<Col span={19}>
    			<Input onChange={(e)=>{
    				this.setState({
    					keyRemarks:e.target.value
    				})
    			}}  value={this.state.keyRemarks}/>
    		</Col>	
      </Row>
			
		 </Modal>
		)
	}
}
