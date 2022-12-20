import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authActions";
import { AuthForm } from "../Components/Styles/AuthForm.styled";
import { AuthFormContainer } from "../Components/Styles/AuthFormContainer.styled";
import { AuthFormContent } from "../Components/Styles/AuthFormContent.styled";
import { AuthFormTitle } from "../Components/Styles/AuthFormTitle.styled";
import { Button } from "../Components/Styles/Button.styled";
import { FormField } from "../Components/Styles/FormField.styled";
import { FormInput } from "../Components/Styles/FormInput.styled";
import { TextLink } from "../Components/Styles/TextLink.styled";
import { TextRed } from "../Components/Styles/TextRed.styled";
import { ForgetPass } from "../Components/Styles/ForgetPassword";
import { DontHaveAc } from "../Components/Styles/DontHaveAccount";
import { TitleContainer } from "../Components/Styles/TitleContainer";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(login(data));
  };
  return (
    <AuthFormContainer>
      <AuthForm>
        <AuthFormContent>
          <TitleContainer>
          <AuthFormTitle>Log In</AuthFormTitle>
          </TitleContainer>
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
            <label>Password</label>
            <br />
            <FormInput
              type="password"
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password?.type === "required" && (
              <TextRed>Password is required</TextRed>
            )}
            {errors.password?.type === "minLength" && (
              <TextRed>Atleast 6 characters</TextRed>
            )}
          </FormField>
          <ForgetPass>Forget Password?</ForgetPass>
          <FormField align="center">
           <Button
              type="submit"
              color="black"
              onClick={handleSubmit(onSubmit)}
            >
              Login
            </Button>
          </FormField>
          <DontHaveAc>
            <span>Don't have an account? </span>
            <TextLink
              onClick={() => {
                navigate("/signup");
              }}
            >
              Register
            </TextLink>
          </DontHaveAc>
        </AuthFormContent>
      </AuthForm>
    </AuthFormContainer>
  );
}

export default Login;
