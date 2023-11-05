import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchFormDetailsById } from '../redux/features/formDetailsById';
import { userAddFormData, setFormData } from '../redux/features/userFillFormDetails';

const UserForm = () => {
  const dispatch = useDispatch();
  const { formId } = useParams();
  const formDetails = useSelector((state) => state.formDetailsByIdState.form);
  const specificResponse = useSelector((state) => state.formDetailsByIdState.form?._id === formId);

  const handleChange = (fieldId, value) => {
    // Dispatch the setFormData action to update the Redux state with user responses
    dispatch(setFormData({ formId, value, responseId: fieldId }));
  };

  const handleOptionChange = (responseId, optionValue) => {
    // Dispatch the setFormData action to update the Redux state with user responses
    dispatch(setFormData({ formId, responseId, optionValue }));
  };

  const handleSubmit = () => {
    // Dispatch the userAddFormData action with the user's responses
    dispatch(userAddFormData({ formId, body: formDetails }));
  };

  useEffect(() => {
    // Fetch form details when the component mounts
    dispatch(fetchFormDetailsById(formId));
  }, [dispatch, formId]);

  return (
    <div style={{ marginTop: '5rem' }}>
      <h1>{formDetails?.title}</h1>
      <bold>{formDetails?.description}</bold>
      {specificResponse && (
        <div>
          <Form>
            {formDetails?.response?.map((response) => (
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
                    onChange={(e) => {
                      handleChange(response._id, e.target.value);
                    }}
                  />
                )}
                {response.fieldType === 'checkbox' && (
                  <div>
                    {response.options.map((option) => (
                      <Form.Check type="checkbox" label={option} />
                    ))}
                  </div>
                )}
                {response.fieldType === 'select' && (
                  <Form.Select
                    value={formDetails[formId]?.[response._id] || ''}
                    onChange={(e) => {
                      handleOptionChange(response._id, e.target.value);
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
          </Form>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default UserForm;
