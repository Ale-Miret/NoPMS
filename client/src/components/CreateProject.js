// Imports
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../utils/mutations';

// Create Project Function
const CreateProject = () => {
    // Process new Project Data
    const [formState, setFormState] = useState({
        projectName: '',
        description: '',
        github: '',
    });
    const [createProject, {error, data}] = useMutation(CREATE_PROJECT);

    const handleChange = (event) => {
    const { name, value } = event.target;

        setFormState({
        ...formState,
        [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await createProject({
                variables: { ...formState },
            });
        } catch (e) {
            console.error(e);
        }
    };
    // return HTML
    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="card">
                    <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
                    <div className="card-body">
                        {data ? (
                            <p>
                                Success! You may now head{' '}
                                <Link to="/">back to the homepage.</Link>
                            </p>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <input
                                    className="form-input"
                                    placeholder="Project Title"
                                    name="projectName"
                                    type="text"
                                    value={formState.projectName}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder="Put a description about your project!"
                                    name="description"
                                    type="text"
                                    value={formState.description}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder="Github Link!"
                                    name="github"
                                    type="text"
                                    value={formState.github}
                                    onChange={handleChange}
                                />
                                <button
                                    className="btn btn-block btn-primary"
                                    style={{ cursor: 'pointer' }}
                                    type="submit"
                                >
                                Submit
                                </button>
                            </form>
                        )}

                        {error && (
                        <div className="my-3 p-3 bg-danger text-white">
                            {error.message}
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CreateProject;