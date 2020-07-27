import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px;

  a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }

  div {
    text-align: center;
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  place-content: center;
  max-width: 700px;
  align-items: center;
`;

export const TableContainer = styled.section`
  margin-top: 24px;
  table {
    width: 100%;
    border-spacing: 0 8px;
    th {
      color: #969cb3;
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }
    td {
      padding: 20px 32px;
      border: 0;
      background: #fff;
      font-size: 16px;
      font-weight: normal;
      color: #969cb3;

      &.title {
        color: #363f5f;
      }
      button {
        border: 0;
      }
      button img {
        cursor: pointer;
        border: 0;
      }
      svg {
        width: 30px;
        height: 30px;
      }
    }
    td:first-child {
      border-radius: 8px 0 0 8px;
    }
    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;
