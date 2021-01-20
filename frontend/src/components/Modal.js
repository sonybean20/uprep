import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
    super(props);
    const { activePost, categoryList } = this.props;
    this.state = {
        activePost: activePost,
        categoryList: categoryList,
    };
    }
    handleChange = e => {
        let { name, value } = e.target;
        const activePost = { ...this.state.activePost, [name]: value };
        this.setState({ activePost });
    };
    render() {
    const { toggle, onSave } = this.props;
    const categoryOptions = this.state.categoryList.map(c => <option key={c.id} value={c.id}>{c.name}</option>)
    return (
        <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Post Editor</ModalHeader>
        <ModalBody>
            <Form>
            <FormGroup>
                <Label for="title">Title</Label>
                <Input
                type="text"
                name="title"
                value={this.state.activePost.title}
                onChange={this.handleChange}
                placeholder="Enter Title"
                />
            </FormGroup>
            <FormGroup>
                <Label for="category">Category</Label>
                <Input
                type="select"
                name="category"
                value={this.state.activePost.category}
                onChange={this.handleChange}>
                    <option value={undefined}>-- Select --</option>
                    {categoryOptions}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="content">Content</Label>
                <Input
                type="textarea"
                name="content"
                value={this.state.activePost.content}
                onChange={this.handleChange}
                placeholder="Enter content"
                />
            </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="success" onClick={() => onSave(this.state.activePost)}>
            Save
            </Button>
        </ModalFooter>
        </Modal>
    );
    }
}

CustomModal.propTypes = {
    activePost: PropTypes.object.isRequired,
    categoryList: PropTypes.array.isRequired,
    toggle: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};