import React, { useState } from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  TextField,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Button } from "@mui/icons-material";
import { Formik } from "Formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../state/index";
import DropZone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
const registerSchema = yup.object().shape({
  firstName: yup.object().required(),
  lastName: yup.object().required(),
  email: yup.object().required(),
  password: yup.object().required(),
  location: yup.object().required(),
  occupation: yup.object().required(),
  picture: yup.object().required(),
});
const loginSchema = yup.object().shape({
  email: yup.object().email("invalid email").required(),
  password: yup.object().required(),
});

const initialRegistration = {
  firstName: "",
  lastName: " ",
  email: " ",
  password: " ",
  location: " ",
  occupation: " ",
  picture: " ",
};

const initialLogin = {
  email: " ",
  passsword: " ",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const handleFormSubmit = async (values, onsubmitProps) => {};
  return (
    <Formik
      initialValues={isLogin ? initialLogin : initialRegistration}
      validationSchema={isLogin ? loginSchema : registerSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        handleBlur,
        handleChange,
        values,
        errors,
        touched,
        setFieldValue,
        resetForm,
        handleSubmit,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4,minmax(0,1fr))"
            sx={{
              "& > div": { gridColumn: "span 4" },
            }}
          >
            <TextField
              label="FIrst Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={value.firstName}
              name={firstName}
              error={Boolean(touched.firstName) && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              sx={{ gridColumn: "span 2" }}
            ></TextField>
            <TextField
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={value.lastName}
              name={lastName}
              error={Boolean(touched.lastName) && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              sx={{ gridColumn: "span 2" }}
            ></TextField>
            <TextField
              label="Location"
              onBlur={handleBlur}
              onChange={handleChange}
              value={value.location}
              name={locatoin}
              error={Boolean(touched.location) && Boolean(errors.locatoin)}
              helperText={touched.location && errors.location}
              sx={{ gridColumn: "span 4" }}
            ></TextField>
            <TextField
              label="Occupation"
              onBlur={handleBlur}
              onChange={handleChange}
              value={value.occupation}
              name={firstName}
              error={Boolean(touched.occupation) && Boolean(errors.occupation)}
              helperText={touched.occupation && errors.occupation}
              sx={{ gridColumn: "span 4" }}
            ></TextField>
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={value.email}
              name={email}
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 2" }}
            ></TextField>
            <DropZone
              acceptedFiles=".jpg,.png,.jpeg"
              multiple={false}
              onDrop={(acceptedFiles) =>
                setFieldValue("picture", acceptedFiles[0])
              }
            >
              {({ getRootProps, getInputProps }) => (
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()}></input>
                  {!values.picture ? (
                    <p>add picture here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{values.picture.name}</Typography>
                      <EditOutlinedIcon></EditOutlinedIcon>
                    </FlexBetween>
                  )}
                </Box>
              )}
            </DropZone>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
export default Form