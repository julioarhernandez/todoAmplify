import React, {useEffect} from 'react';
import EditableLabel from 'react-editable-label';
import classNames from 'classnames';

import {ItemStyled} from "./item_style";

const Item = ({item, updateItem, updatedStatus, deleteItem}) => {

    useEffect(() => {
        console.log('item here', item);
    }, []);

    const updateItemValue = (value, item) => {
        if (value) {
            updateItem({name: value, id: item.id});
        }
    };

    const updateItemStatus = (e) => {
        e.preventDefault();
        updatedStatus({id: e.target.value});
    };

    return (
        <ItemStyled>
            <div className="ItemStyled_checkbox">
                <input type="checkbox" name="check" className="GlobalStyled_checkbox" value={item.id} checked={item.status === 'done'} onClick={(e) => updateItemStatus(e)}/>
            </div>
            <div className={classNames('ItemStyled_item', {done: item.status === 'done'})}>
                <EditableLabel
                    initialValue={item.name}
                    labelClass="ItemStyled_label"
                    save={value => {
                        updateItemValue(value, item);
                    }}
                />
            </div>
            <div className="ItemStyled_delete" onClick={() => deleteItem(item.id)}>
                <span>x</span>
            </div>

        </ItemStyled>
    );
};

export default Item;