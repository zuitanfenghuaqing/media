
import React,{Component} from 'react'
import 'assets/css/global.css'
import No from 'assets/images/no.jpg'

export default ()=>
	<div className="noAssets">
		<img src={No} />
		<div className="noAssetsA">
				<h1>404,No Resource!</h1>
		</div>
	</div>
