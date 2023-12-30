'use client';

import { SignupSchemaType } from "@urbannerd/types";
import { useForm } from "react-hook-form";
import InputText from "../../InputText";
import { onSignupSubmit } from "../onSubmit";

const SignUpForm = () => {

    const { register, handleSubmit, formState: {errors} } = useForm<SignupSchemaType>();

    return (
        <form className='authForm' onSubmit={handleSubmit(onSignupSubmit)}>

            <InputText inputName={"username"} labelText={"Userrname"} register={register("username")} errors={errors.username?.message} type={'text'}/>          
            <InputText inputName={"email"} labelText={"Email"} register={register("email")} errors={errors.email?.message} type={'text'} />
            <InputText inputName={"password"} labelText={"Password"} register={register("password")} errors={errors.password?.message} type={'text'} />
            <InputText inputName={"confirmPassword"} labelText={"Confirm Your Password"} register={register("confirmPassword")} errors={errors.confirmPassword?.message} type={'text'} />
            
            <button type="submit">Login</button>

        </form>
    )
}

export default SignUpForm