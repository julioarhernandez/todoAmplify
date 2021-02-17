import styled from 'styled-components';

export const ItemNewStyled = styled.div`
    display: flex;
    align-items: center;
    .ItemNewStyled_checkbox{
        margin-right: 10px;
        > input {
            visibility: hidden;
        }
    }   
    .ItemNewStyled_item{
        > input {
            width: calc(100% - 20px);
            padding: 10px 5px;
            font-size: 16px;
            background: transparent;
            border: 1px solid rgb(0 0 0 / 37%);
            border-radius: 3px;
            outline: none;
        }
    }
`;