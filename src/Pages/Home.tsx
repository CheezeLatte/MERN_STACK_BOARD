import * as React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Quotes = styled.div`
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Quote = styled.span`
  font-size: 40px;
  color: rgba(0, 0, 0, 0.9);
  margin-bottom: 20px;
  text-align: center;
`;
const Author = styled.span`
  font-size: 28px;
  color: rgba(0, 0, 0, 0.9);
`;
const BgImage = styled.img`
  position: absolute;
  width: 100vw;
  height: calc(100vh - 50px);
  opacity: 0.4;
`;
const quotes = [
  {
    quote:
      "삶을 사는 데는 단 두가지 방법이 있다. 하나는 기적이 전혀 없다고 여기는 것이고 또 다른 하나는 모든 것이 기적이라고 여기는방식이다.",
    author: "알베르트 아인슈타인",
  },
  {
    quote:
      "물고기를 주어라. 한 끼를 먹을 것이다. 물고기 잡는 법을 가르쳐 주어라. 평생을 먹을 것이다. ",
    author: "탈무드",
  },
  {
    quote: "왕은 배, 민중은 물이다. 물은 큰 배를 띄우기도 하고	뒤엎기도 한다.",
    author: "순자",
  },
  {
    quote: "지도자란 희망을 파는 상인이다.",
    author: "나플레옹",
  },
  {
    quote: "위대함에는 신비성이 필요하다. 너무 알면 사람들은 존경하지 않는다.",
    author: "드골",
  },
  {
    quote: "많이 팔려면 먼저 많이 사 보라.",
    author: "문용은",
  },
  {
    quote: "끝까지 하면 프로다.",
    author: "김창완",
  },
  {
    quote: "넓게 배우고, 의문이 있으면 곧 묻고, 삼가 이를 깊이 생각하라.",
    author: "중용",
  },
  {
    quote: "사업이란 양쪽 모두에게 이익을	주는 것이 아니면 오래 가지 못한다.",
    author: "오쿠라 기하치로",
  },
  {
    quote: "위험을 감수하지 않으면 더한 위험이 찾아온다.",
    author: "에리카 종",
  },
];

const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg"];

const Home = () => {
  const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const chosenImage = images[Math.floor(Math.random() * images.length)];
  const imgUrl = `/img/${chosenImage}`;
  return (
    <>
      <Container>
        <BgImage src={imgUrl} />
        <Quotes>
          <Quote>{todaysQuote.quote}</Quote>
          <Author>{todaysQuote.author}</Author>
        </Quotes>
      </Container>
    </>
  );
};

export default Home;
