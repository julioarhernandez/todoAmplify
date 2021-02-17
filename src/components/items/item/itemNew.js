import React, {useState} from 'react';
import EditableLabel from 'react-editable-label';

import {ItemNewStyled} from "./item_new_style";

const ItemNew = () => {

    return (
        <ItemNewStyled>
            <div className="ItemNewStyled_checkbox">
                <input type="checkbox" name="check"/>
            </div>
            <div className="ItemNewStyled_item">
                <input type="text" name="newItem" />
            </div>

        </ItemNewStyled>
    );
};

export default ItemNew;