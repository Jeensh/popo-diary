import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
`

const Input = styled.input`
    width: calc(100% - 32px);
    height: 2em;
    border: 2px solid black;
    border-radius: 5px;
`;

const Title = styled.span`
    font-size: 1em;
    font-weight: bold;
    white-space: nowrap;
`;

function BasicInput(props) {
    const {name, value, setFunction} = props;

    const onChange = () => {
        setFunction(value)
    }

    return (
        <Wrapper>
            <Input
                type={ name === "password" ? "password" : "text"}
                name={name}
                value={value}
                onChange={(event) => {
                    setFunction(event.target.value);
                }}>
            </Input>
        </Wrapper>
    );
}

export default BasicInput;