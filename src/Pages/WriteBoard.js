import React, { useState } from "react";
import styled from "styled-components";
import EditorComponent from "../Components/Editor";
import Axios from "axios";

const Container = styled.div`
  width: 80vw;
  margin: 30px;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form``;

const InputTitle = styled.input`
  width: 800px;
  margin-bottom: 10px;
  height: 2vw;
`;

const Input = styled.input``;

const NoticeWriteComponent = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  function onEditorChange(value) {
    setDesc(value);
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    Axios.post(process.env.REACT_APP_POSTING_URL, {
      title: title,
      article: desc,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <InputTitle
          placeholder="제목을 입력해주세요"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
        <EditorComponent value={desc} onChange={onEditorChange} />
        <Input type="submit" value={"게시물 작성"} />
      </Form>
    </Container>
  );
};

export default NoticeWriteComponent;
