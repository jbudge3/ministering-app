import React from 'react';
import {
	Button,
	Modal,
	Tooltip,
} from 'antd';

export function DeleteItem(props) {
	const {
		icon,
		onConfirm,
		buttonType,
		itemType,
	} = props;
	return (
		<Tooltip title={`Delete this ${itemType}`} placement="rightTop">
			<Button
				onClick={() => showDeleteConfirm(onConfirm, itemType)}
				type={buttonType}
				icon={icon}
			/>
		</Tooltip>
	);
}

function showDeleteConfirm(callback, itemType) {
	Modal.confirm({
		title: `Are you sure you want to delete this ${itemType}?`,
		content: 'You cannot undo this action.',
		okText: 'Delete',
		okType: 'danger',
		cancelText: 'Cancel',
		onOk() {
			callback();
		}
	});
}
