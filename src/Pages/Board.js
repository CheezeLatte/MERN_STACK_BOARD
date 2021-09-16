import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
`;
const Notice = styled.div``;

const SpanNotice = styled.span``;

const Table = styled.table`
  width: 80%;
`;
const Thead = styled.thead``;

const Tr = styled.tr`
  padding: 10px;
  border: 1px solid #ddd;
`;
const Th = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
`;
const Td = styled.td``;

const WriteLink = styled(Link)`
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2ecc71;
  border: 1px solid white;
  border-radius: 6px;
  color: white;
`;

const Board = ({ location: { pathname } }) => (
  <Container>
    <Notice>
      <SpanNotice>공지사항</SpanNotice>
    </Notice>
    <Table>
      <Thead>
        <Tr>
          <Th>구분</Th>
          <Td colspan="1">number</Td>
          <Td colspan="1">title</Td>
          <Td colSpan="3">content</Td>
        </Tr>
      </Thead>
    </Table>

    <WriteLink current={pathname === "/WriteBoard"} to="/WriteBoard">
      게시물 작성
    </WriteLink>
  </Container>
);

export default withRouter(Board);
