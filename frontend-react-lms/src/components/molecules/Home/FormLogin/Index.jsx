import Input from "../../../atoms/Home/Input/Index";
// import Label from "../../../atoms/Home/Label/Index";
import Button from "../../../atoms/Home/Button/Index";

import { useFormik } from "formik"
import * as yup from "yup"
import Cookies from 'js-cookie';

import { useState } from 'react';
import { useLogin } from "../../../../features/Auth/useLogin.js";


const FormLogin = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backendErrors, setBackendErrors] = useState({});

  const { mutate: LoginUser } = useLogin({
    onSuccess: (loginResponse) => {
      const id = loginResponse.data.data.user.id;
      const token = loginResponse.data.data.token;
      const user_type = loginResponse.data.data.user.user_type;
      Cookies.set('id', id, { expires: 7, secure: true })
      Cookies.set('token', token, { expires: 7, secure: true });
      Cookies.set('user_type', user_type, { expires: 7, secure: true });
      setAlertMessage(loginResponse.data.message);
      setAlertType("success");
      setTimeout(() => {
        window.location.replace('/dashboard');
      }, 1000)
      setIsLoading(false);
    },
    onError: (error) => {
      setAlertMessage(error.response.data.message);
      setAlertType("danger");
      setIsLoading(false);
      if (error.response && error.response.data.errors) {
        const formattedErrors = error.response.data.errors.reduce((acc, err) => {
          acc[err.path] = err.msg
          return acc
        }, {})
        setBackendErrors(formattedErrors)
      }
    }
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: () => {
      const { email, password } = formik.values
      LoginUser({
        email,
        password
      })
    },
    validationSchema: yup.object().shape({
      email: yup.string().email().required("email wajib diisi"),
      password: yup.string().min(6).max(15).required()
    })
  })

  const handleForm = (event) => {
    const { target } = event
    formik.setFieldValue(target.name, target.value)
  }

  return (
    <>
      {alertMessage && (
        <div className={`alert alert-${alertType} alert-dismissible fade show text-white fs-kecil d-flex justify-content-between align-items-center`} role="alert">
          <div>
            {alertMessage}
          </div>
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <Input
            type="email"
            className={`form-control input-no-focus border-utama ${formik.errors.email ? 'border-red' : ''}`}
            placeholder="Email"
            name="email"
            onChange={handleForm}
          /> 
          {formik.errors.email ? (
            <span className="text-danger fs-kecil">{formik.errors.email}</span>
          ) : backendErrors.email ? (
            <span className="text-danger fs-kecil">{backendErrors.email}</span>
          ) : null}
        </div>
        <div className="mb-3">
          <Input
            type="password"
            className={`form-control input-no-focus border-utama ${formik.errors.password ? 'border-red' : ''}`}
            placeholder="Password"
            name="password"
            onChange={handleForm}
          /> 
            {formik.errors.password ? (
            <span className="text-danger fs-kecil">{formik.errors.password}</span>
          ) : backendErrors.password ? (
            <span className="text-danger fs-kecil">{backendErrors.password}</span>
          ) : null}
        </div>
        <div className="mb-3">
          <Button className="btn btn-warning text-white  w-100" type="submit" disabled={isLoading}>
            {isLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Login'}
          </Button>
        </div>
      </form>
    </>
  );
};


export default FormLogin;
