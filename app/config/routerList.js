
import React,{Component} from 'react'
import {Router, Route,IndexRoute, hashHistory} from 'react-router'
import Login from 'components/login/login.js'
import NoAssets from 'components/No/NoAssets.js'
import Home from "components/home/Home.js"
import FacilityModel from "components/facilityModel/facilityModel"
import PerateFacility from "components/facilityModel/add/peratefacility"
import MediaFacility from "components/mediaFacility/mediaFacility"
import FacilityAssets from "components/facilityAssets/facilityAssets"
import Dictionaries from "components/dictionaries/dictionaries"
import Addapi from "components/mediaFacility/add/Addapi"

class App extends Component{
	render(){
		return(	
			<div className="app-content">
  			{ this.props.children }
			</div>
     )
	}
}

export default()=>
	<Router history={hashHistory}>
  	<Route path="/" component={App}>
			<IndexRoute component={Login}/>
			<Route path="/login" component={Login} />
			<Route path="/home" component={Home} >
				<IndexRoute component={FacilityModel} />
				<Route path="/facilityModel" component={FacilityModel} />
				<Route path="/facilityModel/add/:name/:handle" 
							 component={PerateFacility} />
				<Route path="/mediaFacility" component={MediaFacility} />
				<Route path="/mediaFacility/add" component={Addapi} />
				<Route path="/facilityAssets" component={FacilityAssets} />
				<Route path="/dictionaries" component={Dictionaries} />
			</Route>
			<Route path="*" component={NoAssets} />
		</Route>
  </Router>
	