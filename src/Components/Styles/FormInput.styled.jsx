import styled from "styled-components";

export const FormInput = styled.input`
    border-radius:4px;
    width:${props=>props.size?'50%':'100%'};
    height:${props=>props.size?'1.5rem':'2.2rem'};
    border: 2px solid black;
    padding-left:5px;
    font-size:15px;
    font-weight: 100;
`