import styled from 'styled-components';


export const AppStyled = styled.div`
    font-family: 'Saira', sans-serif;
    padding: 10px;
    position: relative;
    min-height: calc(100vh - 20px);
    max-width: 570px;
    margin: 0 auto 55px auto;
    box-sizing: border-box;
    *, *:after, *:before {
        box-sizing: border-box;
    }
    hr{
        border: none;
        margin: 3px;
    }
    .hide {
        display: none;
    }
    .done {
      position: relative;
      > span {
        position: relative;
      }
    }
    
    .done > span:after {
      content: ' ';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 1px;
      background: black;
      animation-name: strike;
      animation-duration: 0.4s;
      animation-timing-function: linear;
      animation-iteration-count: 1;
      animation-fill-mode: forwards; 
    }
    .AppStyled_add-button {
        position: fixed;
        bottom: 16px;
        right: 16px;
        color: rgba(0, 0, 0, 0.87);
        width: 56px;
        height: 56px;
        padding: 0;
        min-width: 0;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
        box-sizing: border-box;
        min-height: 36px;
        border-radius: 50%;
        background-color: #e0e0e0;
        border: none;
        font-size: 30px;
        font-weight: 900;
        outline: none;
        transition: all 0.3s ease-in;
        &:active {
            box-shadow: 0px 3px 0px -1px rgb(0 0 0 / 20%), 0px 6px 3px 0px rgb(0 0 0 / 14%), 0px 1px 0px 0px rgb(0 0 0 / 12%);
            transform: scale(0.9);
        }
    }
    .GlobalStyled-input{
        padding: 10px 5px;
        font-size: 16px;
        background: transparent;
        border: 1px solid rgb(0 0 0 / 37%);
        border-radius: 3px;
        outline: none;
        width: 100%;
    }
    .GlobalStyled-button{
        padding: 15px 20px;
        font-size: 14px;
        border: 1px solid rgb(0 0 0 / 37%);
        border-radius: 3px;
        outline: none;
        background: black;
        color: white;
        font-weight: 700;
        text-transform: uppercase;
        cursor: pointer;
        &.danger{
            background: red;
        }
    }
    .GlobalStyled_form-group {
        display: flex;
        &:not(:last-child) {
            margin-bottom: 15px;
        }
    }
    .GlobalStyled_form-group_item:not(:last-child) { 
        margin-right: 10px;
    }
    .GlobalStyled_link { 
        text-transform: uppercase;
        font-weight: 700;
        color: black;
        font-size: 14px;
        border-bottom: 4px solid black;
        text-decoration: none;
    }
    .GlobalStyled_checkbox {
          position: relative;
          &:before,
          &:after {
            content: '';
            width: 20px;
            height: 20px;
            display: block;
            position: absolute;
            top: -4px;
            border-radius: 4px;
            background-color: #8d8d8d;
            transition: background-color 0.2s ease-out;
          }
          &:checked { 
            &:before {
              background-color: black;
            }
            &:after {
              display: inline-block;
                height: 14px;
                width: 7px;
                border-bottom: 3px solid #ffffff;
                border-right: 3px solid #ffffff;
                background-color: transparent;
                position: absolute;
                left: 6px;
                border-radius: 0;
                top: -3px;
              animation-duration: 0.3s;
              animation-name: spin;
              transform: rotate(45deg);
            }
          }
    }
    .GlobalStyled_modal {
        visibility: hidden;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgb(0 0 0 / 0%);
        transition: background 0.5s ease-out;
        &.show{
            visibility: visible;
            background: rgb(0 0 0 / 20%);
            > div {
                top: 50%;
            }
        }
        > div {
            position: absolute;
            top: 0;
            transform: translate(-50%, -50%);
            max-width: calc(100% - 60px);
            width: 100%;
            left: 50%;
            box-shadow: 0px 4px 20px 5px rgb(0 0 0 / 29%), 0 19px 43px 0px rgb(0 0 0 / 15%);
            transition: top 0.3s ease-out;
            max-width: 290px;
        }
    }
    .GlobalStyled_collapse {
          display: block;
          max-height: 0px;
          overflow: hidden;
          transition: max-height .5s cubic-bezier(0, 1, 0, 1);; 
          &.show {
            max-height: 99em;
            transition: max-height .5s ease-in-out;
          }
    }
    @keyframes spin { 
      from {
        clip-path: inset(78% 100% 0% 0%);
      } 
      
      20%{
        clip-path: inset(78% 0% 0% 0%);
            
      }
      to {
        clip-path: inset(0% 0% 0% 0%);
      } 
    }
    @keyframes strike{
      0%   { width : 0; }
      100% { width: 100%; }
    }
`;