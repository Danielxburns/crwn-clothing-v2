import styled from 'styled-components';

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

  img {
    width: 100%;
    height: 95%;
    object-fit: cover;
    margin-bottom: 5px;
  }

  button {
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 255px;
    display: none;
  }

  &:hover {
    img {
      opacity: 0.8;
    }

    button {
      opacity: 0.85;
      display: flex;
    }
  }

  @media screen and (max-width: 800px) {
    width: 40vw;

    button {
      display: block;
      opacity: 0.9; // b/c no hover on mobile devices
      min-width: unset; // set in button.styles.tsx
      padding: 0 10px;

    }
    &:hover {
      img {
        opacity: unset;
      }

      button {
        opacity: unset;
      }
    }
  }

  @media screen and (max-width: 400px) {
    width: 80vw;
`;

export const Footer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

export const Name = styled.div`
  width: 90%;
  margin-bottom: 15px;
`;

export const Price = styled.div`
  width: 10%;
`;
