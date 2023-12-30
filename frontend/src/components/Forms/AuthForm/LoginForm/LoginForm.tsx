'use client';

import { LoginSchemaType } from "@urbannerd/types";
import { useForm } from "react-hook-form";
import { onLoginSubmit } from "../onSubmit";
import InputText from "../../InputText";

const LoginForm = () => {
    const { register, handleSubmit, formState: {errors} } = useForm<LoginSchemaType>();
    return (
      <form className='authForm' onSubmit={handleSubmit(onLoginSubmit)}>
        <InputText inputName={"usernameOrEmail"} labelText={"Userrname or Email"} register={register("usernameOrEmail")} errors={errors.usernameOrEmail?.message} type={'text'}/>          
        <InputText inputName={"password"} labelText={"Password"} register={register("password")} errors={errors.password?.message} type={'text'}/>
        <button type="submit">Login</button>
        <span className='btn_ouline'>Forgot the Password ?</span>
      </form>
    )
}
export default LoginForm