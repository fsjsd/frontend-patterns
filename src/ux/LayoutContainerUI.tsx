import styled from "styled-components";

export const appLogoStyle = {
  height: "24px",
  width: "100px",
}

export const appLogoLink = {
  display: "block"
};

export const SiteContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  font-family: Roboto, Arial, Helvetica;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const SectionDrawer = styled.section`
  flex: 0 0 auto;
  width: 240px;
  border-left: solid 1px rgb(218, 231, 241);
  background-color: rgb(246, 250, 253);
`;

export const SectionMain = styled.section`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
`

export const HeaderBrand = styled.header`
  padding: 1rem;
  background-color: #0091ff;
  color: #fff;
  background-color: #007fe0;
  font-size: 1px;
`

