import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API } from "../global";
import { useFormik } from "formik";
import * as yup from "yup";
import { useUserContext } from "../Contexts/UserContext";

const userValidationSchema = yup.object({
  email: yup.string().matches("@gmail.com").required("Enter Email!"),
  password: yup.string().min(8).required("Enter Password!"),
});

export default function Login() {
  const navigate = useNavigate();

  const { setUser } = useUserContext();

  const { handleBlur, handleChange, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: userValidationSchema,
      onSubmit: (values) => {
        loginUser(values);
      },
    });

  const loginUser = (add) => {
    console.log(add);
    fetch(`${API}/users/login`, {
      method: "POST",
      body: JSON.stringify(add),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Invalid Credentials") {
          alert("Invalid Credentials");
        } else {
          setUser(data.user, data.token);
          alert("Successfully Logged In");
          navigate("/");
        }
      });
  };
  const token = sessionStorage.getItem("token");
  return (
    <form onSubmit={handleSubmit} className="add-User">
      {!token ? <h2>Login First To Get Access</h2> : ""}

      <TextField
        className="input"
        id="filled-basic"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        name="email"
        error={touched.email && errors.email}
        helperText={touched.email && errors.email ? errors.email : null}
        label="Enter your email"
        variant="filled"
      />

      <TextField
        className="input"
        id="filled-basic"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        name="password"
        error={touched.password && errors.password}
        helperText={
          touched.password && errors.password ? errors.password : null
        }
        label="password"
        variant="filled"
      />

      <Button
        style={{ width: "80%" }}
        className="add"
        variant="contained"
        type="submit"
      >
        Login
      </Button>
      <Button onClick={() => navigate("/signup")}>Create an account</Button>
    </form>
  );
}
