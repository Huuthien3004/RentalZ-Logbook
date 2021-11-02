import styled, { css } from "styled-components";

const ButtonElements = styled.TouchableOpacity`
    flex-direction: row;
    border-radius: 5px;
    padding: 5px;
    justify-content: center;
    background: transparent;

    ${(props) =>
        props.primary &&
        css`
            background: #2986cc
        `
    }
    ${(props) =>
        props.secondary &&
        css`
            background: #2986cc
        `
    }
    ${(props) => 
        props.danger &&
        css`
            background: #f40105
        `
    }
    ${(props) => 
        props.large &&
        css`
            width: 180px
            border-radius: 50px
            height:32px
        `
    }
    ${(props) => 
        props.medium &&
        css`
            width: 100px
        `
    }
    ${(props) => 
        props.small &&
        css`
            width: 40px
        `
    }
`;

export default ButtonElements;