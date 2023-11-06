import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFormDetailsById } from "../redux/features/formDetailsById";

const UserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { formId } = useParams();
  const formDetails = useSelector((state) => state.formDetailsByIdState.form);
  const specificResponse = useSelector(
    (state) => state.formDetailsByIdState.form?._id === formId
  );

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  const handleChange = (fieldId, value) => {
    setFormData({
      ...formData,
      [fieldId]: value,
    });
    setErrorMessage("");
  };

  const [selectedRadio, setSelectedRadio] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(null);

  const handleOptionChange = (responseId, optionValue) => {
    console.log("responseId, optionValue",responseId, optionValue)
    const existingResponseId = formData[responseId] || [];

    setFormData({
      ...formData,
      [responseId]: [...existingResponseId, optionValue],
    });

    setSelectedRadio(optionValue);
    setSelectedOptions(optionValue);
    setErrorMessage("");
  };

  console.log("formData",formData)

  useEffect(() => {
    if (selectedRadio !== null || selectedOptions !== null) {
      console.log("Selected radio value:", selectedRadio);
    }
  }, [selectedRadio, selectedOptions]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    const requestBody = {
      formId: formId,
      title: formDetails.title,
      description: formDetails.description,
      response: formDetails.response.map((response) => ({
        fieldType: response.fieldType,
        question: response.question,
        options: [formData[response._id]],
      })),
    };

    const isAnyRequiredFieldEmpty = formDetails.response.some((response) => {
      if (response.fieldType === "radio") {
        return !formData[response._id];
      } else if (response.fieldType === "select") {
        return !formData[response._id];
      } else if (response.fieldType === "checkbox") {
        return !formData[response._id];
      }
    });

    if (isAnyRequiredFieldEmpty) {
      setErrorMessage("Please select any one option.");
      return;
    }

    const isAnyRequiredTextFieldEmpty = formDetails.response.some(
      (response) => {
        if (response.fieldType === "text") {
          return !formData[response._id];
        }
      }
    );

    if (isAnyRequiredTextFieldEmpty) {
      setErrorMessage("Please add something.");
      return;
    }

    fetch("https://form-app-server.onrender.com/test/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        navigate("/SuccessfullyCreate");
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    dispatch(fetchFormDetailsById(formId));
  }, [dispatch, formId]);

  return (
    <div style={{ marginTop: "5rem" }}>
      <h1>{formDetails?.title}</h1>
      <p>{formDetails?.description}</p>
      {specificResponse && (
        <div>
          <Form>
            {formDetails?.response?.map((response) => (
              <div key={response._id}>
                <Form.Label
                  className="form-label"
                  htmlFor={`question-${response._id}`}
                >
                  {response.question}
                </Form.Label>
                {response.fieldType === "radio" && (
                  <div>
                    {response.options.map((option, index) => (
                      <Form.Check
                        type="radio"
                        label={option}
                        name={`radioGroup_${response._id}`}
                        id={`radio_${response._id}_${index}`}
                        value={option}
                        onChange={(e) => {
                          handleOptionChange(response._id, e.target.value);
                        }}
                      />
                    ))}
                    {errorMessage && (
                      <p style={{ color: "red" }}>{errorMessage}</p>
                    )}
                  </div>
                )}

                {response.fieldType === "text" && (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="Type here.."
                      onChange={(e) => {
                        handleChange(response._id, e.target.value);
                      }}
                    />
                    {errorMessage && (
                      <p style={{ color: "red" }}>{errorMessage}</p>
                    )}
                  </>
                )}
                {response.fieldType === "checkbox" && (
                  <div>
                    {response.options.map((option, index) => (
                      <Form.Check
                        type="checkbox"
                        label={option}
                        // id={`checkbox_${response._id}_${index}`}
                        value={option}
                        onChange={(e) => {
                          handleOptionChange(response._id, e.target.value);
                        }}
                      />
                    ))}
                    {errorMessage && (
                      <p style={{ color: "red" }}>{errorMessage}</p>
                    )}
                  </div>
                )}
                {response.fieldType === "select" && (
                  <div>
                    <Form.Select
                      value={formData[response._id] || ""}
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
                    {errorMessage && (
                      <p style={{ color: "red" }}>{errorMessage}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </Form>
        </div>
      )}
      <br></br>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UserForm;
