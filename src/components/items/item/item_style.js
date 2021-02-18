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
            &:after {
                content: 'x';
                display: block;
                position: absolute;
                top: calc(50% - 14px);
                right: -10px;
                width: 20px;
                height: 20px;
                background: crimson;
                border-radius: 50%;
                padding: 3px;
                color: white;
                text-align: center;
                font-weight: 600;
                font-family: sans-serif;
            }
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
    }
    .ItemStyled_item {
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
    .ItemStyled_label {
        // padding: 11px 0;
    }
`;