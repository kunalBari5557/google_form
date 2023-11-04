import { useEffect } from "react";
import { createByAdminForm } from "../redux/features/createByAdminList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFormDetailsById } from "../redux/features/formDetailsById";

function CreateByAdmin() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.createByAdminFormState?.data);
  const navigate = useNavigate(); // Initialize history

  useEffect(() => {
    dispatch(createByAdminForm());
  }, [dispatch]);

  const handleLinkClick = (formId) => {
    dispatch(fetchFormDetailsById(formId));
    navigate(`/userForm/${formId}`);
  };

  return (
    <div style={{ marginTop: '5rem' }}>
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Description</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {data?.forms?.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                <button
                  onClick={() => handleLinkClick(item._id)}
                  style={{
                    textDecoration: 'underline', // Add an underline
                    color: 'blue', // Set the text color to blue
                    background: 'none', // Remove the background color
                    border: 'none', // Remove the border
                    cursor: 'pointer', // Change the cursor to a pointer on hover
                  }}
                >
                  Link
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CreateByAdmin;
