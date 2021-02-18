import React, {useState} from 'react';
import EditableLabel from 'react-editable-label';

import {ItemStyled} from "./item_style";

const Item = () => {

    return (
        <ItemStyled>
            <div className="ItemStyled_checkbox">
                <input type="checkbox" name="check" className="GlobalStyled_checkbox"/>
            </div>
            <div className="ItemStyled_item">
                <EditableLabel
                    initialValue={'Item number one to be checked'}
                    labelClass="ItemStyled_label"
                    save={value => {
                        console.log(`Saving '${value}'`);
                    }}
                />
            </div>

        </ItemStyled>
    );
};

export default Item;