import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import useLogin from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import styled from "styled-components";

const StyledText = styled.p`
  text-align: center;
`;

const StyledSpan = styled.span`
  color: #efed74;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #c2c20a;
  }
`;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isPending: isLogin } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setPassword("");
        },
      }
    );
  }

  function getTestingAccount() {
    setEmail("tester@gmail.com");
    setPassword("password");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label='Email address'>
        <Input
          type='email'
          id='email'
          autoComplete='username'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLogin}
        />
      </FormRowVertical>
      <FormRowVertical label='Password'>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLogin}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size='large' disabled={isLogin}>
          {isLogin ? <SpinnerMini /> : "Login"}
        </Button>
      </FormRowVertical>
      <StyledText>
        For testing purpose, please{" "}
        <StyledSpan onClick={getTestingAccount}>click here</StyledSpan> to get
        account!
      </StyledText>
    </Form>
  );
}

export default LoginForm;
