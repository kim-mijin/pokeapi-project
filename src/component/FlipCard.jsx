import { useState } from "react"
import styled from "styled-components"

const CardWrapper = styled.div`
  width: 200px;
  height: 200px;
  perspective: 1000px; /* 부모에 3D 효과 적용 */
`

const FlipImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${props => props.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`

const FrontImage = styled.img`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
`

const BackImage = styled.img`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg); /* 문자열 ❌ 숫자 사용 */
  position: absolute;
  top: 0;
  left: 0;
`

export default function FlipCard({ front, back }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <>
      <CardWrapper>
        <FlipImageContainer flipped={flipped}>
          <FrontImage src={front} />
          <BackImage src={back} />
        </FlipImageContainer>
      </CardWrapper>
      <button onClick={() => setFlipped(prev => !prev)}>뒤집기</button>
    </>
  )
}
