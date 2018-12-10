import React, {Component} from 'react';
import {
	Button,
	Select,
	Form,
	message,
} from 'antd';
import {DeleteItem} from '../delete-item.react';
import {NewFamily} from '../new-family.react';
import {addNewFamily, deleteFamily} from '../../../../ajax';

export class FamilySettings extends Component {
	state = {
		addFamilyVisible: false,
		familyId: null,
		families: this.props.families,
		deletedFamilies: [],
	};

	render() {
		return (
			<Form>
				<Form.Item>
					<Button type="primary" icon="usergroup-add" onClick={this._handleAddButtonClick}>Add a New Family</Button>
					<NewFamily
						visible={this.state.addFamilyVisible}
						onAdd={this._handleAddNewFamily}
						onCancel={this._handleAddFamilyCancel}
					/>
				</Form.Item>

				<Form.Item>
					{this._renderFamilySelect()}
					{this.state.familyId && (
						<DeleteItem
							itemType="Family"
							buttonType="danger"
							icon="usergroup-delete"
							onConfirm={this._handleConfirmDelete}
						/>
					)}
				</Form.Item>

			</Form>
		);
	}

	_handleAddButtonClick = () => this.setState({
		addFamilyVisible: true
	});

	_handleAddFamilyCancel = (onCancel) => {
		if (typeof onCancel === 'function') {
			onCancel();
		}
		this.setState({
			addFamilyVisible: false
		});
	}

	_handleAddNewFamily = (name, head, onSuccess) => {
		addNewFamily(name, head)
			.then((response) => {
				if (typeof onSuccess === 'function') {
					onSuccess();
				}
				message.success('New Family added!');
				const families = this.state.families.slice();
				families.push(response);
				this.setState({
					addFamilyVisible: false,
					families,
				});
			})
			.catch((error) => {
				message.error('Adding new Family failed. Please try again.');
				console.log(error);
			});
	};

	_handleConfirmDelete = () => {
		const id = this.state.familyId;
		deleteFamily(id)
			.then((response) => {
				message.success('Family deleted successfully');
				const deletedFamilies = this.state.deletedFamilies.slice();
				deletedFamilies.push(id);
				this.setState({
					familyId: null,
					deletedFamilies
				});
			})
			.catch((error) => {
				message.error('Failed to delete family');
				console.log(error);
			})
	};

	_handleFamilySelectChange = (value) => this.setState({
		familyId: value ? value : null
	});

	_renderFamilySelect = () => {
		const options = [];
		this.state.families.forEach(option => {
			if (this.state.deletedFamilies.indexOf(option._id) === -1) {
				options.push(<Select.Option key={option._id} value={option._id}>{`${option.name}, ${option.head}`}</Select.Option>)
			}
		});

		return (
			<Select
				showSearch
				placeholder="Current Families"
				optionFilterProp="children"
				filterOption={this._filterSelect}
				style={{width: 250, marginRight: 20}}
				onChange={this._handleFamilySelectChange}
			>
				{options}
			</Select>
		);
	};

}
