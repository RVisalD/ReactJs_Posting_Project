import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const initialValues = {
    title: "",
    description: "",
  };

  // validation
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a caption"),
    description: Yup.string().required("Enter some description"),
  });

  const navigate = useNavigate();

  // handle posting data
  const handleSubmit = (data) => {
    axios
      .post("http://localhost:4000/post", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/");
      });
  };
   
  return (
    <div className="mt-20">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="w-96 h-52 border border-solid border-black rounded-md m-auto mt-4">
            <div className="mt-4">
              <label>Caption: </label>
              <ErrorMessage
                name="title"
                component="span"
                className="text-red-600"
              ></ErrorMessage>
              <br />
              <Field
                id="inputcreatepost"
                name="title"
                placeholder="(Ex... Visal)"
                className="border border-black border-solid rounded-md w-18 h-10 pl-2"
              />
              <br />
              <label className="">Description: </label>
              <ErrorMessage
                name="description"
                component="span"
                className="text-red-600"
              ></ErrorMessage>
              <br />
              <Field
                id="inputcreatepost"
                name="description"
                placeholder="(Ex... Hello World)"
                className="border border-black border-solid rounded-md w-18 h-10 pl-2 mt-2"
              />
              <br />
              <button
                className="border border-sky-500/100 border-solid bg-sky-500/100 w-20 h-8 rounded-md mt-4"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
