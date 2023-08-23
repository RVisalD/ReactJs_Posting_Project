import React, {useContext, useEffect} from "react";
import * as Yup from "yup";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../helpers/AuthContext";

function Create() {
  const initialValues={
    username: "",
    password: ""
  }
  
  // const { authState } = useContext(AuthContext);
  
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("You must input a Name"),
    password: Yup.string()
      .min(8)
      .max(20)
      .required("You must input what they said"),
  });

  const navigate = useNavigate()

  const handleSubmit = (data) => {
    axios.post("http://localhost:4000/auth", data).then((response) => {
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
              <label>Username: </label>
              <ErrorMessage
                name="username"
                component="span"
                className="text-red-600"
              ></ErrorMessage>
              <br />
              <Field
                id="inputcreatepost"
                name="username"
                placeholder="(Ex... Visal)"
                className="border border-black border-solid rounded-md w-18 h-10 pl-2"
              />
              <br />
              <label className="">Password: </label>
              <ErrorMessage
                name="password"
                component="span"
                className="text-red-600"
              ></ErrorMessage>
              <br />
              <Field
                id="inputcreatepost"
                name="password"
                placeholder="(Ex... 12345678)"
                className="border border-black border-solid rounded-md w-18 h-10 pl-2 mt-2"
                type="password"
              />
              <br />
              <button
                className="border border-sky-500/100 border-solid bg-sky-500/100 w-20 h-8 rounded-md mt-4"
                type="submit"
              >
                Create
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Create;
