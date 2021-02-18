import styled from 'styled-components';

export const TodoEditStyled = styled.div`
    display: block;
    padding: 15px;
    background-color: white;
    border-radius: 5px;
    &:not(:last-child){
        margin-bottom: 20px;
    }
    .TodoEditStyled_form {
        padding-top: 15px;
    }
    .TodoEditStyled_header {
        h1{
            margin: 0;
            text-transform: capitalize;  
        }
    }
    .TodoEditStyled_form-group:not(:last-child) {
        margin-bottom: 15px;
        display: flex;
    }
    .TodoEditStyled_form-group_item:not(:last-child) { 
        margin-right: 10px;
    }
    footer{
        margin-top: 20px;
        text-align: right;
    }
`;