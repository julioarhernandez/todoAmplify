import styled from 'styled-components';

export const ItemStyled = styled.div`
    display: flex;
    align-items: center;
    min-height: 40px;
    .ItemStyled_item {
        position: relative;
        margin-right: 10px;
        display: flex;
        width: 100%;
        > div {
            width: calc(100% - 20px);
        }
        input {
           width: calc(100% - 20px);
            padding: 10px 5px;
            font-size: 16px;
            background: transparent;
            border: 1px solid rgb(0 0 0 / 37%);
            border-radius: 3px;
            outline: none;
        }
         > small {
            padding: 0 10px;
        }
    }
    .ItemStyled_checkbox{
        margin-right: 10px;
    }
    .ItemStyled_checkbox_icon {
        width: 20px;
    }
    .ItemStyled_delete {
        display: block;
        width: 22px;
        height: 20px;
        background: #d8d7d7b3;
        border-radius: 50%;
        color: #8d8d8d;
        text-align: center;
        font-family: sans-serif;
        cursor: pointer;
    }
    .ItemStyled_label {
        // padding: 11px 0;
    }
`;