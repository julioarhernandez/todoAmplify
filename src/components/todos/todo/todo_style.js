import styled, {css} from 'styled-components';

export const TodoStyled = styled.div`
    display: block;
    padding: 15px;
    background-color: rgb(128 128 128 / 20%);
    border-radius: 5px;
    border: 1px solid transparent;
    &:not(:last-child){
        margin-bottom: 20px;
    }
    ${props => props.done && css`
        border: 1px solid rgba(0,0,0,0.3);
        opacity: 0.4;
    `}
    ${props => props.overdue && css`
        background-color: rgba(255,0,0, 0.25);
    `}
    .TodoStyled_content {
        padding-top: 15px;
    }
    .TodoStyled_header {
        h1{
            margin: 0;
            text-transform: capitalize;  
            line-height: 1.3;
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