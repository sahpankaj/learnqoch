import dayjs from "dayjs";
import React, { createContext, useState } from "react";

const FormContextProvider = createContext();

function FormContext({ children }) {
    const [formInput, setFormInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: dayjs("2023-08-31"),
    });
    const [formData, setFormData] = useState([]);
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });
    const [editIndex, setEditIndex] = useState(-1);

    const handleEdit = (index) => {
        setEditIndex(index);
        const itemToEdit = formData[index];
        setFormInput(itemToEdit);
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormInput((prevState) => ({ ...prevState, [name]: value }));
        validateField(name, value);
    };

    const handleDateInput = (date) => {
        const formattedDate = date.format("ddd MMM DD YYYY");
        setFormInput((prevState) => ({ ...prevState, dob: formattedDate }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editIndex !== -1) {
            formData[editIndex] = formInput;
            setEditIndex(-1);
        } else if (isFormValid()) {
            setFormData([...formData, formInput]);
        }
        setFormInput({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            dob: dayjs("2023-08-31"),
        });
    };

    const validateField = (fieldName, value) => {
        let errorMessage = "";
        switch (fieldName) {
            case "firstName":
                errorMessage = value.trim() === "" ? "First Name is required." : "";
                break;
            case "lastName":
                errorMessage = value.trim() === "" ? "Last Name is required." : "";
                break;
            case "email":
                errorMessage = !isValidEmail(value) ? "Invalid email address." : "";
                break;
            case "phone":
                errorMessage = !isValidPhone(value) ? "Invalid phone number." : "";
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: errorMessage }));
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidPhone = (phone) => {
        return /^\d{10}$/.test(phone);
    };

    const isFormValid = () => {
        let isValid = true;
        for (const field in formInput) {
            validateField(field, formInput[field]);
            if (errors[field]) {
                isValid = false;
            }
        }
        return isValid;
    };

    const deleteItem = (id) => {
        const filtered = formData.filter((data, index) => index !== id);
        setFormData(filtered);
    };
    return (
        <FormContextProvider.Provider
            value={{
                formInput,
                formData,
                handleInput,
                handleDateInput,
                handleSubmit,
                errors,
                deleteItem,
                handleEdit,
            }}
        >
            {children}
        </FormContextProvider.Provider>
    );
}

export default FormContext;
export { FormContextProvider };
