import styled, {css} from 'styled-components';

export const TodoStyled = styled.div`
    display: block;
    ${props => !(props.open) && css`
        .TodoStyled_content {
            display: none;
        }
    `}
`;