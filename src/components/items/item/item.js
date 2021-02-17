import React, {useState} from 'react';
import {ItemStyled} from "./item_style";

const Item = () => {

    return (
        <ItemStyled>
            <div className="ItemStyled_item">
                <small>&#9679;</small>
                <input type="text" value="Item number one to be checked" />
            </div>
            <div className="ItemStyled_checkbox">
                checkbox
            </div>
        </ItemStyled>
    );
};

export default Item;