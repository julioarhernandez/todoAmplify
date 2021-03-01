import styled, {css} from 'styled-components';

export const TodoStyled = styled.div`
    display: block;
    padding: 15px;
    background-color: rgb(128 128 128 / 20%);
    border-radius: 5px;
    &:not(:last-child){
        margin-bottom: 20px;
    }
    ${props => !(props.open) && css`
        .TodoStyled_content {
            display: none;
        }
    `}
    .TodoStyled_content {
        padding-top: 15px;
    }
    .TodoStyled_header {
        h1{
            margin: 0;
            text-transform: capitalize;  
        }
        &-date {
            font-size: 14px;
            img {
                width: 12px;
            }
        }
    }
    footer{
        margin-top: 20px;
        text-align: right;
    }
`;