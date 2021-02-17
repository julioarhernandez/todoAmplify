import styled from 'styled-components';

export const ItemStyled = styled.div`
    display: flex;
    justify-content: space-between;
    .ItemStyled_item:not(last-child) {
        padding-right: 10px;
    }
`;