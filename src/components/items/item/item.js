import React, {useEffect} from 'react';
import EditableLabel from 'react-editable-label';

import {ItemStyled} from "./item_style";

const Item = ({item}) => {

    useEffect(() => {
        console.log('item here', item);
    }, []);


    return (
        <ItemStyled>
            <div className="ItemStyled_checkbox">
                <input type="checkbox" name="check" className="GlobalStyled_checkbox" value={item.id}/>
            </div>
            <div className="ItemStyled_item">
                <EditableLabel
                    initialValue={item.name}
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