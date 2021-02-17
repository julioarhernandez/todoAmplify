import styled from 'styled-components';

export const AppStyled = styled.div`
    padding: 10px;
    position: relative;
    min-height: calc(100vh - 20px);
    hr{
        border: none;
    }
    .AppStyled_add-button {
        position: absolute;
        bottom: 16px;
        right: 16px;
        color: rgba(0, 0, 0, 0.87);
        width: 56px;
        height: 56px;
        padding: 0;
        min-width: 0;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
        box-sizing: border-box;
        min-height: 36px;
        border-radius: 50%;
        background-color: #e0e0e0;
        border: none;
        font-size: 30px;
        outline: none;
        transition: all 0.3s ease-in;
        &:active {
            box-shadow: 0px 3px 0px -1px rgb(0 0 0 / 20%), 0px 6px 3px 0px rgb(0 0 0 / 14%), 0px 1px 0px 0px rgb(0 0 0 / 12%);
            transform: scale(0.9);
        }
    }
    .GlobalStyled-input{
        padding: 10px 5px;
        font-size: 16px;
        background: transparent;
        border: 1px solid rgb(0 0 0 / 37%);
        border-radius: 3px;
        outline: none;
    }
    .GlobalStyled-button{
        padding: 15px 20px;
        font-size: 14px;
        border: 1px solid rgb(0 0 0 / 37%);
        border-radius: 3px;
        outline: none;
        background: black;
        color: white;
        font-weight: 700;
        text-transform: uppercase;
    }
`;