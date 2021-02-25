import React, {useState, useEffect} from 'react';

import {ItemNewStyled} from "./item_new_style";

const ItemNew = ({onChange}) => {

    const [localData, setLocalData] = useState('');

    const change = (e) => {
        e.preventDefault();
        if (e.target.value !== ''){
            setLocalData({...localData, [e.target.name]: e.target.value});
        }
    };

    useEffect(() => {
        onChange(localData);
    }, [localData]);


    return (
        <ItemNewStyled>
            <div className="ItemNewStyled_checkbox">
                <input type="checkbox" name="check" className="GlobalStyled_checkbox"/>
            </div>
            <div className="ItemNewStyled_item">
                <input type="text" name="newItem" onChange={(e) => change(e)}/>
            </div>

        </ItemNewStyled>
    );
};

export default ItemNew;