import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setData, setError } from "../redux/features/adminFormSlice";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  question: Yup.string().required("Question is required"),
  response: Yup.array().of(
    Yup.object().shape({
      fieldType: Yup.string().required("Field type is required"),
      question: Yup.string().required("Question is required"),
      options: Yup.array().when("fieldType", {
        is: (fieldType) =>
          ["text", "radio", "select", "checkbox"].includes(fieldType),
        then: Yup.array().required("Options are required"),
      }),
    })
  ),
});

const AdminForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showTextField, setShowTextField] = useState(false);
  const [additionalFields, setAdditionalFields] = useState([]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      navigate("/FormList");
      const requestBody = {
        title: values.title,
        description: values.description,
        response: [
          {
            fieldType: values.fieldType,
            question: values.question,
            options: values.additionalFields,
          },
        ],
      };

      const response = await fetch("https://form-app-server.onrender.com/test/form/add", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setData(data));
      } else {
        const error = await response.json();
        dispatch(setError(error));
      }
    } catch (error) {
      dispatch(setError("Network error"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddField = () => {
    setAdditionalFields([...additionalFields, ""]); // Add an empty field
  };

  const handleRemoveField = (index) => {
    const newFields = [...additionalFields];
    newFields.splice(index, 1); // Remove the field at the specified index
    setAdditionalFields(newFields);
  };

  return (
    <div style={{ marginTop: "5rem" }} className="container">
      <Formik
        initialValues={{
          title: "",
          description: "",
          question: "",
          fieldType: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Enter Title
              </label>
              <Field
                type="text"
                name="title"
                className="form-control"
                placeholder="Form Title"
              />
              <ErrorMessage name="title" component="div" className="error" />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                className="form-control"
                style={{ height: "100px" }}
                placeholder="Leave a comment here"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="error"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="question" className="form-label">
                Add your question *
              </label>
              <Field
                type="text"
                name="question"
                className="form-control"
                placeholder="Add question"
                required
              />
              <ErrorMessage name="question" component="div" className="error" />
            </div>

            <div className="mb-3">
              <label htmlFor="fieldType" className="form-label">
                Select field type *
              </label>
              <Field
                as="select"
                name="fieldType"
                className="form-select"
                onChange={(e) => {
                  setFieldValue("fieldType", e.target.value);
                  setShowTextField(
                    e.target.value === "text" ||
                      "radio" ||
                      "select" ||
                      "checkbox"
                  );
                }}
                required
              >
                <option value="">Select Field Type</option>
                <option value="text">Text</option>
                <option value="radio">Radio</option>
                <option value="select">Select</option>
                <option value="checkbox">Checkbox</option>
              </Field>
              <ErrorMessage
                name="fieldType"
                component="div"
                className="error"
              />
            </div>

            {showTextField && (
              <div className="mb-3">
                {additionalFields.map((field, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <Field
                      type="text"
                      name={`additionalFields.${index}`}
                      className="form-control"
                      placeholder="Additional Text Field"
                    />
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleRemoveField(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                  className="btn btn-primary"
                  onClick={handleAddField}
                >
                  Add Field
                </button>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdminForm;
