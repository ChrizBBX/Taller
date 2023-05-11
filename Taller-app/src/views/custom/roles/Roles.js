import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';


function Roles (){
    const options = [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'orange', label: 'Orange' },
        { value: 'grape', label: 'Grape' },
        { value: 'pear', label: 'Pear' },
      ];
      const selected = ['apple', 'orange'];
      

    return (
        <div className="card">
            <div className="card-body">
                <h1>Hola</h1>
                <DualListBox
  options={options}
  selected={selected}
  onChange={(selected) => console.log(selected)}
/>

            </div>
        </div>
    )
}

export default Roles