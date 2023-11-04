import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, resetForm, addFormData } from '../redux/features/adminFormSlice';
import { useNavigate } from 'react-router-dom';

const AdminForm = () => {
  const dispatch = useDispatch();
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

  const validateForm = () => {
    const errors = {};
    if (!title) {
      errors.title = 'Title is required';
    } else {
      delete errors.title;
    }
    if (!description) {
      errors.description = 'Description is required';
    } else {
      delete errors.description;
    }
    if (responses.some((response) => !response.question)) {
      errors.responses = 'All questions are required';
    } else {
      delete errors.responses;
    }
    if (responses.some((response) => !response.fieldType)) {
      errors.fieldType = 'Field Type is required';
    } else {
      delete errors.fieldType;
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      const newFormData = {
        title: title,
        description: description,
        responses: responses,
      };
      dispatch(setFormData(newFormData));
      navigate('/FormList');
      try {
        await dispatch(addFormData(newFormData));
        dispatch(resetForm());
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  };

const handleQuestionChange = (responseIndex, question) => {
    const updatedResponses = [...responses];
    updatedResponses[responseIndex] = {
      ...updatedResponses[responseIndex],
      question: question,
    };
    setResponses(updatedResponses);
  
    if (validationErrors.responses && updatedResponses.every((response) => response.question)) {
      setValidationErrors({ ...validationErrors, responses: '' });
    }
  };
  

  const handleFieldTypeChange = (index, fieldType) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = {
      ...updatedResponses[index],
      fieldType: fieldType,
      options: fieldType === 'select' ? [''] : [], 
    };
    setResponses(updatedResponses);
  };

  const handleOptionChange = (responseIndex, optionIndex, option) => {
    const updatedResponses = [...responses];
    const updatedOptions = [...updatedResponses[responseIndex].options];
    updatedOptions[optionIndex] = option;
    updatedResponses[responseIndex] = {
      ...updatedResponses[responseIndex],
      options: updatedOptions,
    };
    setResponses(updatedResponses);
  };

  const addResponse = () => {
    const updatedResponses = [...responses, {
      fieldType: '',
      question: '',
      options: [''],
      isRequired: false,
    }];
    setResponses(updatedResponses);
  };

  const addOption = (responseIndex) => {
    const updatedResponses = [...responses];
    const updatedOptions = [...updatedResponses[responseIndex].options, ''];
    updatedResponses[responseIndex] = {
      ...updatedResponses[responseIndex],
      options: updatedOptions,
    };
    setResponses(updatedResponses);
  };

  const handleAddResponse = () => {
    setResponses([
      ...responses,
      {
        fieldType: '',
        question: '',
        options: [''],
        isRequired: false,
      },
    ]);
  };
  
  return (
    <div style={{ marginTop: '5rem' }} className="admin-form-container">
      <Form.Label className="form-label" htmlFor="basic-url">
        Enter Title *
      </Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Form Title"
          aria-label="Username"
          name="title"
          aria-describedby="basic-addon1"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (validationErrors.title) {
              setValidationErrors({ ...validationErrors, title: '' });
            }
          }}
          required
        />
      </InputGroup>
      {validationErrors.title && <p style={{ color: 'red' }}>{validationErrors.title}</p>}

      <Form.Label className="form-label" htmlFor="basic-url">
        Description *
      </Form.Label>
      <FloatingLabel controlId="floatingTextarea2">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (validationErrors.description) {
              setValidationErrors({ ...validationErrors, description: '' });
            }
          }}
          required
        />
      </FloatingLabel>
      {validationErrors.description && <p style={{ color: 'red' }}>{validationErrors.description}</p>}

      {responses.map((response, responseIndex) => (
        <div key={responseIndex}>
          <Form.Label className="form-label" htmlFor="basic-url">
            Add your question *
          </Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Form Title"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={response.question}
              onChange={(e) => handleQuestionChange(responseIndex, e.target.value)}
              required
            />
          </InputGroup>
          {validationErrors.responses && <p style={{ color: 'red' }}>{validationErrors.responses}</p>}

          <Form.Label className="form-label" htmlFor="basic-url">
            Select field type *
          </Form.Label>
          <Form.Select
            className="select-input"
            aria-label="Default select example"
            value={response.fieldType}
            onChange={(e) => handleFieldTypeChange(responseIndex, e.target.value)}
            required
          >
            <option>Select Field Type</option>
            <option value="text">Text</option>
            <option value="radio">Radio</option>
            <option value="select">Select</option>
            <option value="checkbox">Checkbox</option>
          </Form.Select>

          {(response.fieldType === 'select' || response.fieldType === 'text' || response.fieldType === 'radio' || response.fieldType === 'checkbox') && (
            <div>
              {response.options.map((option, optionIndex) => (
                <InputGroup className="mb-3" key={optionIndex}>
                  <Form.Control
                    placeholder="Option"
                    aria-label="Option"
                    aria-describedby="basic-addon1"
                    value={option}
                    onChange={(e) => handleOptionChange(responseIndex, optionIndex, e.target.value)}
                    required
                  />
                </InputGroup>
              ))}
              <Button variant="primary" onClick={() => addOption(responseIndex)}>
                Add Option
              </Button>
            </div>
          )}
        </div>
      ))}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default AdminForm;