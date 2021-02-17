import styled from 'styled-components';

export const TodoNewStyled = styled.div`
    display: block;
    padding: 15px;
    background-color: rgb(128 128 128 / 20%);
    border-radius: 5px;
    &:not(:last-child){
        margin-bottom: 20px;
    }
    .TodoNewStyled_form {
        padding-top: 15px;
    }
    .TodoNewStyled_header {
        h1{
            margin: 0;
            text-transform: capitalize;  
        }
    }
    .TodoNewStyled_form-group:not(:last-child) {
        margin-bottom: 15px;
        display: flex;
    }
    .TodoNewStyled_form-group_item:not(:last-child) { 
        margin-right: 10px;
    }
    footer{
        margin-top: 20px;
        text-align: right;
    }
`;