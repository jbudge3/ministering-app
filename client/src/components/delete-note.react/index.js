import React from 'react';
import {
	Button,
	Icon,
	Modal,
} from 'antd';

export function DeleteNote(props) {
	return (
		<Button onClick={() => showDeleteConfirm(props.onDeleteClick)} type="danger">
			<Icon type="delete" />
		</Button>
	);
}

function showDeleteConfirm(callback) {
	Modal.confirm({
		title: 'Are you sure you want to delete this note?',
		content: 'You cannot undo this action.',
		okText: 'Delete',
		okType: 'danger',
		cancelText: 'No',
		onOk() {
			callback();
		}
	})
}
