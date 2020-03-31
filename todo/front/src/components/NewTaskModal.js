import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from "reactstrap";

export default class TaskModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: this.props.activeItem
		};
	}

	handleChange = e => {
		let { name, value } = e.target;
		if (e.target.type === "checkbox") {
			value = e.target.checked;
		}
		const activeItem = { ...this.state.activeItem, [name]: value };
		this.setState({ activeItem });
	};

	render() {
		const { toggle, onSave } = this.props;
		return (
				<Modal isOpen={true} toggle={toggle}>
					<ModalHeader toggle={toggle}> TODO </ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup>
								<Label for="Title">Title</Label>
								<Input
									type="text"
									name="Title"
									value={this.state.activeItem.title}
									onChange={this.handleChange}
									placeholder="Title"
								/>
							</FormGroup>
							<FormGroup>
								<Label for="Details">Details</Label>
								<Input
									type="text"
									name="Details"
									value={this.state.activeItem.Details}
									onChange={this.handleChange}
									placeholder="Description"
								/>
							</FormGroup>
							<FormGroup>
								<Label for="Create_date">Created date</Label>
								<Input
									type="date"
									name="Create_date"
									value={this.state.activeItem.Create_date}
									onChange={this.handleChange}
									placeholder="Created date"
								/>
							</FormGroup>
							<FormGroup>
								<Label for="Complete_date">TODO date</Label>
								<Input
									type="date"
									name="Complete_date"
									value={this.state.activeItem.Complete_date}
									onChange={this.handleChange}
									placeholder="TODO date"
								/>
							</FormGroup>
							<FormGroup check>
								<Label for="Task_complete">
									<Input
										type="checkbox"
										name="Task_complete"
										checked={this.state.activeItem.Task_complete}
										onChange={this.handleChange}
									/>
									Complete Task
								</Label>
							</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button color="success" onClick={() => onSave(this.state.activeItem)}>
							Save
						</Button>
					</ModalFooter>
				</Modal>
		);
	}
}