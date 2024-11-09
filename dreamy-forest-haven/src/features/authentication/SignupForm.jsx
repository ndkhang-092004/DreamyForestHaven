import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignup from "./useSignup";
import { useForm } from "react-hook-form";

function SignupForm() {
  const { mutate: signup, isPending: isSignUp } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: reset,
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Full name' error={errors?.fullName?.message}>
        <Input
          type='text'
          id='fullName'
          {...register("fullName", { required: "Full Name is required!" })}
          disabled={isSignUp}
        />
      </FormRow>

      <FormRow label='Email address' error={errors?.email?.message}>
        <Input
          type='email'
          id='email'
          disabled={isSignUp}
          {...register("email", {
            required: "Email is required!",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email, please provide a correct email address!",
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Password (min 8 characters)'
        error={errors?.password?.message}
      >
        <Input
          disabled={isSignUp}
          type='password'
          id='password'
          {...register("password", {
            required: "Password is required!",
            minLength: {
              value: 8,
              message: "Password require at least 8 characters!",
            },
          })}
        />
      </FormRow>

      <FormRow label='Repeat password' error={errors?.passwordConfirm?.message}>
        <Input
          disabled={isSignUp}
          type='password'
          id='passwordConfirm'
          {...register("passwordConfirm", {
            required: "Password confirm is required!",
            validate: (value) =>
              value === getValues().password ||
              "Confirm password is not match with your password!",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isSignUp}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
