import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../Components/Styles/AuthForm.styled";
import { AuthFormContainer } from "../Components/Styles/AuthFormContainer.styled";
import { AuthFormContent } from "../Components/Styles/AuthFormContent.styled";
import { AuthFormTitle } from "../Components/Styles/AuthFormTitle.styled";
import { Button } from "../Components/Styles/Button.styled";
import { DontHaveAc } from "../Components/Styles/DontHaveAccount";
import { FormField } from "../Components/Styles/FormField.styled";
import { FormInput } from "../Components/Styles/FormInput.styled";
import { TextLink } from "../Components/Styles/TextLink.styled";
import { TextRed } from "../Components/Styles/TextRed.styled";
import { TitleContainer } from "../Components/Styles/TitleContainer";
import { signup } from "../redux/auth/authActions";

function SignUp() {
  const [passerror, setPasserror] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      setPasserror("Password not match");
      return;
    }
    setPasserror("");
    console.log(data);
    dispatch(signup(data));
  };
  return (
    <AuthFormContainer>
      <AuthForm>
        <AuthFormContent>
        <TitleContainer>
          <AuthFormTitle>Registration</AuthFormTitle>
        </TitleContainer>
          <FormField>
            <label>Full Name</label>
            <br />
            <FormInput
              placeholder="Full Name"
              type="text"
              {...register("fullName", {
                required: true,
                pattern: /^[A-Za-z]+$/,
              })}
            />
            {errors.fullName?.type === "required" && (
              <TextRed> Name is required</TextRed>
            )}
            {errors.fullName?.type === "pattern" && (
              <TextRed>Alpahbet chararcters only</TextRed>
            )}
          </FormField>

          <FormField>
            <label>Email</label>
            <br />
            <FormInput
            placeholder="Email Address"
              type="text"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email?.type === "required" && (
              <TextRed>Email is required</TextRed>
            )}
            {errors.email?.type === "pattern" && (
              <TextRed>Invaid Email</TextRed>
            )}
          </FormField>
          <FormField>
            <label>Password (6 digits require)</label>
            <br />
            <FormInput
              placeholder="Password"
              type="password"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password?.type === "required" && (
              <TextRed>Password is required</TextRed>
            )}
            {errors.password?.type === "minLength" && (
              <TextRed>Atleast 6 characters</TextRed>
            )}
          </FormField>
          <FormField>
            <label>Confirm Password</label>
            <br />
            <FormInput
              placeholder="Confirm Password"
              type="password"
              {...register("confirmPassword", {
                required: true,
                minLength: 6,
              })}
            />
            {errors.confirmPassword?.type === "required" && (
              <TextRed> Confirm Password is required</TextRed>
            )}

            {passerror && <TextRed> {passerror}</TextRed>}
            {errors.confirmPassword?.type === "minLength" && (
              <TextRed>Atleast 6 characters</TextRed>
            )}
          </FormField>
          <FormField align="center">
            <Button type="submit" onClick={handleSubmit(onSubmit)}>
              Sign Up
            </Button>
          </FormField>
          <DontHaveAc>
            <span>Already have an account? </span>
            <TextLink
              onClick={() => {
                navigate("/signin");
              }}
            >
              {" "}
              Login
            </TextLink>
          </DontHaveAc>
        </AuthFormContent>
      </AuthForm>
    </AuthFormContainer>
  );
}

export default SignUp;
