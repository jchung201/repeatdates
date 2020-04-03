import React from "react";
import styled from "styled-components";

import GoogleButton from "react-google-button";

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  min-height: 100vh;
  flex-wrap: wrap;
  background-image: url(${require("../../public/background.png")});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;
const LeftContainer = styled.div`
  display: flex;
  flex-basis: 40%;
  flex-direction: column;
  align-items: center;
`;
const Logo = styled.img`
  text-align: center;
  width: 120px;
  margin-top: 170px;
`;
const Header = styled.div`
  text-align: center;
  font-family: Roboto Slab;
  width: 511px;
  font-size: 60px;
  color: #c3a7d8;
  margin-top: 6px;
`;
const Description = styled.div`
  width: 600px;
  margin-top: 16px;
  font-family: Roboto;
  font-size: 21px;
  text-align: center;
  line-height: 1.4;
  margin-bottom: 15px;
`;
const RightContainer = styled.div`
  flex-grow: 1;
`;

const Home = ({ logIn }) => (
  <Wrapper>
    <LeftContainer>
      <Logo src={require("../../public/logo.png")}></Logo>
      <Header>BIRTHDAY.WATCH</Header>
      <Description>
        INTEGRATE YOUR GOOGLE CALENDAR <br /> TO QUICKLY ADD/EDIT BIRTHDAY
        REMINDERS
      </Description>
      <GoogleButton onClick={logIn}>Sign In With Google</GoogleButton>
    </LeftContainer>
    <RightContainer>Why</RightContainer>
  </Wrapper>
);
export default Home;