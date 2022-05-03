import styled from "styled-components";


export const ImageList = styled.div`
  display:inline-flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const ImageWrapper = styled.div<{ width?: string, height?: string }>`
  border:solid 0px transparent;
  border-radius:8px;
  clip-path: inset(0 0 0 0 round 8px);
  overflow:hidden;
  background-color:#ddd;
  width:${({ width }) => width ?? "100%"};
  height:${({ height }) => height ?? "100%"};
  &> img {
    border-radius:inherit;
    position:absolute;
  }
`;

export const ImageLoading = styled.div<{ width?: string, height?: string }>`
  width:${({ width }) => width ?? "100%"};
  height:${({ height }) => height ?? "100%"};
  background-color:#ddd;
  font-size:3rem;
  color:#d3d3d3;
  display:flex;
  align-items:center;
  justify-content:center;
`;
export const ImageError = styled.div<{ width?: string, height?: string }>`
  width:${({ width }) => width ?? "100%"};
  height:${({ height }) => height ?? "100%"};
  background-color:#fdd;
  font-size:3rem;
  color:#d78b8b;
  display:flex;
  align-items:center;
  justify-content:center;
`;

export default {};