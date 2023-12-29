import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';





function Admin() {
    const [base64Image, setBase64Image] = useState('');

    const validationSchema = Yup.object().shape({
        recipename: Yup.string().required('Text is required'),
        recipedescription: Yup.string().required('Text is required'),
        recipeduration: Yup.string().required('Text is required'),
        recipeingredients: Yup.string().required('Text is required'),
        imageInput: Yup.mixed()
            .test('fileSize', 'File too large', (value) => {
                return value && value.size <= 1024 * 1024 * 2; // Limit file size to 2MB
            })
            .test('fileType', 'Invalid image format', (value) => {
                return value && ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type);
            })
            .required('Image is required'),
    });

    const handleImageChange = async (event) => {
        const file = event.target.files[0];

        if (file) {
            formik.setFieldValue('imageInput', file); // Update formik state for imageInput
            const reader = new FileReader();

            reader.onloadend = () => {
                setBase64Image(reader.result); // Set base64Image state with the converted image
            };

            reader.readAsDataURL(file);
        }
    };


    const formik = useFormik({
        initialValues: {
            recipename: '',
            recipedescription: '',
            recipeduration: '',
            recipeingredients: '',
            imageInput: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {

                const response = await axios.post('http://localhost:8081/submit-form', {
                    recipename: values.recipename,
                    recipedescription: values.recipedescription,
                    recipeduration: values.recipeduration,
                    recipeingredients: values.recipeingredients,
                    imageInput: base64Image, // Send base64 image to backend
                });
                console.log('Response from server:', response.data);
                // Handle success (e.g., show success message)

            } catch (error) {
                console.error('Error:', error);
                // Handle error (e.g., show error message)
            }
        },
    });


    return (
        <div className='card mt-5 flex justify-content-center align-items-center'>
            <form onSubmit={formik.handleSubmit}>


                <div>
                    <label>Recipe Name</label>
                    <input type='text'

                        value={formik.values.recipename}
                        name="recipename"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {formik.touched.recipename && formik.errors.recipename ? (
                        <div>{formik.errors.recipename}</div>
                    ) : null}
                </div>


                <div>
                    <label>Recipe Description</label>
                    <textarea type='text'
                        style={{ height: "200px" }}
                        value={formik.values.recipedescription}
                        name="recipedescription"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {formik.touched.recipedescription && formik.errors.recipedescription ? (
                        <div>{formik.errors.recipedescription}</div>
                    ) : null}
                </div>

                <div>
                    <label>Recipe Duration</label>
                    <input type='text'
                        value={formik.values.recipeduration}
                        name="recipeduration"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {formik.touched.recipeduration && formik.errors.recipeduration ? (
                        <div>{formik.errors.recipeduration}</div>
                    ) : null}
                </div>

                <div>
                    <label>Recipe Ingredients</label>
                    <textarea type='text'
                        style={{ height: "200px" }}
                        value={formik.values.recipeingredients}
                        name="recipeingredients"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {formik.touched.recipeingredients && formik.errors.recipeingredients ? (
                        <div>{formik.errors.recipeingredients}</div>
                    ) : null}
                </div>


                <div className='mt-5'>
                    <label>Recipe Image</label>
                    <input type='file'
                        name="imageInput"
                        onChange={handleImageChange}
                        onBlur={formik.handleBlur} />
                    {formik.touched.imageInput && formik.errors.imageInput ? (
                        <div>{formik.errors.imageInput}</div>
                    ) : null}
                </div>


                <button className='mt-5' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Admin