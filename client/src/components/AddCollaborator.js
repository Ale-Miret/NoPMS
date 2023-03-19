import React, { useState } from 'react';

const CollaboratorForm = ({ onAddCollaborator }) => {
    const [collaborator, setCollaborator] = useState({
        positionName: '',
        userName: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCollaborator({
            ...collaborator,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddCollaborator(collaborator);
        setCollaborator({
            positionName: '',
            userName: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="form-input"
                placeholder="Position Name"
                name="positionName"
                type="text"
                value={collaborator.positionName}
                onChange={handleChange}
            />
            <input
                className="form-input"
                placeholder="User Name"
                name="userName"
                type="text"
                value={collaborator.userName}
                onChange={handleChange}
            />
            <button className="btn btn-primary" type="submit">
                Add Collaborator
            </button>
        </form>
    );
};

export default CollaboratorForm;