import * as React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

interface Current {
  current: boolean;
}
const Header = styled.header`
  color: #2ecc71;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.2);
`;

const List = styled.ul`
  display: flex;
`;

const LoginForm = styled.ul`
  display: flex;
`;

const LoginItem = styled.li`
  width: 100px;
  height: 50px;
  text-align: center;
  margin-right: 10px;
  font-size: 12px;
  &:hover {
    font-size: 14px;
  }
  transition: font-size.2s ease-in-out;
`;

const Item = styled.li<Current>`
  width: 100px;
  height: 50px;
  text-align: center;
  font-size: ${(props) => (props.current ? "18px" : "14px")};
  &:hover {
    font-size: 16px;
  }
  transition: font-size.2s ease-in-out;
`;

const Slink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loglink = styled(Link)`
  margin-top: 5px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2ecc71;
  border: 1px solid white;
  border-radius: 6px;
  color: white;
`;

export default withRouter(({ location: { pathname } }) => (
  <Header>
    <List>
      <Item current={pathname === "/"}>
        <Slink to="/">Home</Slink>
      </Item>
      <Item current={pathname === "/Info"}>
        <Slink to="/Info">Info</Slink>
      </Item>
      <Item current={pathname === "/Board"}>
        <Slink to="/Board">Board</Slink>
      </Item>
    </List>
    <LoginForm>
      <LoginItem>
        <Loglink to="/Login">로그인</Loglink>
      </LoginItem>
      <LoginItem>
        <Loglink to="/Signup">회원가입</Loglink>
      </LoginItem>
    </LoginForm>
  </Header>
));
