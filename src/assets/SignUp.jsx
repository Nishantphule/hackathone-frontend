import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API } from "../global";
import LoginIcon from "@mui/icons-material/Login";
import { useFormik } from "formik";
import * as yup from "yup";

const userValidationSchema = yup.object({
  firstName: yup.string().required("Enter a firstName!"),
  lastName: yup.string().required("Enter a lastName!"),
  phoneNumber: yup.number().min(10).required("Enter a phoneNumber!"),
  email: yup.string().matches("@gmail.com").required("Enter Email!"),
  address: yup.string().required("Enter Address!"),
  sports: yup.string().required("Enter sports!"),
  password: yup
    .string()
    .min(8)
    .matches(
      /^(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[#!@%&]).{8,}$/g,
      "Password must include capital letter,small letter,number and special characters"
    )
    .required("Enter Password!"),
});

export default function SignUp() {
  const navigate = useNavigate();

  const { handleBlur, handleChange, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        address: "",
        sports: "",
        password: "",
      },
      validationSchema: userValidationSchema,
      onSubmit: (values) => {
        newUser(values);
      },
    });

  const newUser = (add) => {
    console.log(add);
    fetch(`${API}/users/register`, {
      method: "POST",
      body: JSON.stringify(add),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((res) => {
        console.log(res.message, res);
        if (res.message === "Successful Registeration") {
          alert("Registeration Successful");
          navigate("/login");
        } else {
          alert("server error");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit} className="add-User">
      <TextField
        className="input"
        id="filled-basic"
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        name="firstName"
        error={touched.firstName && errors.firstName}
        helperText={
          touched.firstName && errors.firstName ? errors.firstName : null
        }
        label="Enter your First Name"
        variant="filled"
      />

      <TextField
        className="input"
        id="filled-basic"
        value={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        name="lastName"
        error={touched.lastName && errors.lastName}
        helperText={
          touched.lastName && errors.lastName ? errors.lastName : null
        }
        label="Enter your Last Name"
        variant="filled"
      />

      <TextField
        className="input"
        id="filled-basic"
        value={values.phoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        name="phoneNumber"
        error={touched.phoneNumber && errors.phoneNumber}
        helperText={
          touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : null
        }
        label="Enter Phone Number"
        variant="filled"
      />

      <TextField
        className="input"
        id="filled-basic"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        name="email"
        error={touched.email && errors.email}
        helperText={touched.email && errors.email ? errors.email : null}
        label="Email"
        variant="filled"
      />

      <TextField
        className="input"
        id="filled-basic"
        value={values.address}
        onChange={handleChange}
        onBlur={handleBlur}
        name="address"
        error={touched.address && errors.address}
        helperText={touched.address && errors.address ? errors.address : null}
        label="Address"
        variant="filled"
      />

      <TextField
        className="input"
        id="filled-basic"
        value={values.sports}
        onChange={handleChange}
        onBlur={handleBlur}
        name="sports"
        error={touched.sports && errors.sports}
        helperText={touched.sports && errors.sports ? errors.sports : null}
        label="sports"
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
        label="Password"
        variant="filled"
      />

      <Button
        style={{ width: "80%" }}
        className="add"
        type="submit"
        variant="contained"
      >
        Signup
      </Button>

      <p>
        If you already have an account ?
        <Button>
          <LoginIcon onClick={() => navigate("/login")} />
        </Button>
      </p>
    </form>
  );
}
