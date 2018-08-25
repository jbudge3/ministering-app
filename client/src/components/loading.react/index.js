import React from 'react';
import {Icon} from 'antd';
import './loading.css';

export function LoadingState() {
	return (
		<div className="LoadingState">
			<Icon type="loading" style={{fontSize: 100}} />
		</div>
	);
}
