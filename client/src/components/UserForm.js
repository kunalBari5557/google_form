// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Button from 'react-bootstrap/Button';
// import { useDispatch, useSelector } from 'react-redux';
// import { setFormData, resetForm, addFormData } from '../redux/features/adminFormSlice';
// import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import { fetchFormDetailsById } from '../redux/features/formDetailsById';

// const UserForm = () => {
//     const dispatch = useDispatch();
//     const { formId } = useParams();
//     const navigate = useNavigate();
//     const formData = useSelector((state) => state.addFormDataState.formData);
//     const [validationErrors, setValidationErrors] = useState({});
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [responses, setResponses] = useState([
//         {
//             fieldType: '',
//             question: '',
//             options: [''],
//             isRequired: false,
//         },
//     ]);
//     const formDetails = useSelector((state) => state.formDetailsByIdState.form);
//     const specificResponse = useSelector((state) => state.formDetailsByIdState.form?._id === formId);

//     const handleChange = (fieldId, value) => {
//         dispatch(setFormData({ fieldId, value }));
//     };

//     useEffect(() => {
//         dispatch(fetchFormDetailsById(formId));
//     }, [dispatch, formId]);

//     return (
//         <div style={{ marginTop: '5rem' }}>
//             {formDetails?.title && (
//                 <>
//                     <Form.Label className="form-label" htmlFor="basic-url">
//                         Enter Title *
//                     </Form.Label>
//                     <InputGroup className="mb-3">
//                         <Form.Control
//                             placeholder="Form Title"
//                             aria-label="Username"
//                             name="title"
//                             aria-describedby="basic-addon1"
//                             value={title}
//                             onChange={(e) => {
//                                 setTitle(e.target.value);
//                                 if (validationErrors.title) {
//                                     setValidationErrors({ ...validationErrors, title: '' });
//                                 }
//                             }}
//                             required
//                         />
//                     </InputGroup>
//                     {validationErrors.title && <p style={{ color: 'red' }}>{validationErrors.title}</p>}
//                 </>
//             )}
//             {formDetails?.description && (
//                 <>
//                     <Form.Label className="form-label" htmlFor="basic-url">
//                         Description *
//                     </Form.Label>
//                     <FloatingLabel controlId="floatingTextarea2">
//                         <Form.Control
//                             as="textarea"
//                             placeholder="Leave a comment here"
//                             style={{ height: '100px' }}
//                             value={description}
//                             onChange={(e) => {
//                                 setDescription(e.target.value);
//                                 if (validationErrors.description) {
//                                     setValidationErrors({ ...validationErrors, description: '' });
//                                 }
//                             }}
//                             required
//                         />
//                     </FloatingLabel>
//                 </>
//             )}
//             {specificResponse && (
//                 <div>
//                     {formDetails.response.map((response) => (
//                         <div key={response._id}>
//                             <Form.Label className="form-label" htmlFor={`question-${response._id}`}>
//                                 {response.question}
//                             </Form.Label>
//                             {response.fieldType === 'radio' && (
//                                 <div>
//                                     {response.options.map((option) => (
//                                         <Form.Check
//                                             type="radio"
//                                             label={option}
//                                             name={`question-${response._id}`}
//                                             id={`radio-${option}`}
//                                         />
//                                     ))}
//                                 </div>
//                             )}
//                             {response.fieldType === 'text' && (
//                                 <Form.Control
//                                     type="text"
//                                     placeholder={response.placeHolder}
//                                     value={formData[response._id] || ''}
//                                     onChange={(e) => {
//                                         handleChange(response._id, e.target.value);
//                                     }}
//                                 />
//                             )}
//                             {response.fieldType === 'checkbox' && (
//                                 <div>
//                                     {response.options.map((option) => (
//                                         <Form.Check
//                                             type="checkbox"
//                                             label={option}
//                                             name={`question-${response._id}`}
//                                             id={`checkbox-${option}`}
//                                         />
//                                     ))}
//                                 </div>
//                             )}
//                             {response.fieldType === 'select' && (
//                                 <Form.Select
//                                     value={formData[response._id] || ''}
//                                     onChange={(e) => {
//                                         handleChange(response._id, e.target.value);
//                                     }}
//                                 >
//                                     <option value="">Select an option</option>
//                                     {response.options.map((option) => (
//                                         <option key={option} value={option}>
//                                             {option}
//                                         </option>
//                                     ))}
//                                 </Form.Select>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserForm;


import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, resetForm, addFormData } from '../redux/features/adminFormSlice';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { fetchFormDetailsById } from '../redux/features/formDetailsById';

const UserForm = () => {
    const dispatch = useDispatch();
    const { formId } = useParams();
    const navigate = useNavigate();
    const formData = useSelector((state) => state.addFormDataState.formData);
    const [validationErrors, setValidationErrors] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [responses, setResponses] = useState([
        {
            fieldType: '',
            question: '',
            options: [''],
            isRequired: false,
        },
    ]);
    const formDetails = useSelector((state) => state.formDetailsByIdState.form);
    const specificResponse = useSelector((state) => state.formDetailsByIdState.form?._id === formId);

    const handleChange = (fieldId, value) => {
        dispatch(setFormData({ fieldId, value }));
    };

    const handleOptionChange = (responseId, optionValue) => {
        dispatch(addFormData({ responseId, optionValue }));
    };

    useEffect(() => {
        dispatch(fetchFormDetailsById(formId));
    }, [dispatch, formId]);

    return (
        <div style={{ marginTop: '5rem' }}>
            <h1>{formDetails?.title}</h1>
            <bold>{formDetails?.description}</bold>
            {specificResponse && (
                <div>
                    {formDetails.response.map((response) => (
                        <div key={response._id}>
                            <Form.Label className="form-label" htmlFor={`question-${response._id}`}>
                                {response.question}
                            </Form.Label>
                            {response.fieldType === 'radio' && (
                                <div>
                                    {response.options.map((option) => (
                                        <Form.Check
                                            type="radio"
                                            label={option}
                                            name={`question-${response._id}`}
                                            id={`radio-${option}`}
                                            onChange={(e) => {
                                                handleOptionChange(response._id, e.target.value);
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                            {response.fieldType === 'text' && (
                                <Form.Control
                                    type="text"
                                    placeholder={response.placeHolder}
                                    value={formData[response._id] || ''}
                                    onChange={(e) => {
                                        handleChange(response._id, e.target.value);
                                    }}
                                />
                            )}
                            {response.fieldType === 'checkbox' && (
                                <div>
                                    {response.options.map((option) => (
                                        <Form.Check
                                            type="checkbox"
                                            label={option}
                                            name={`question-${response._id}`}
                                            id={`checkbox-${option}`}
                                        />
                                    ))}
                                </div>
                            )}
                            {response.fieldType === 'select' && (
                                <Form.Select
                                    value={formData[response._id] || ''}
                                    onChange={(e) => {
                                        handleChange(response._id, e.target.value);
                                    }}
                                >
                                    <option value="">Select an option</option>
                                    {response.options.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </Form.Select>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserForm;
