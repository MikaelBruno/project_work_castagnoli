// DropdownSwitch.jsx
import React, { useState, useEffect, useRef } from 'react';
import './DropdownSwitch.scss';

export default function DropdownSwitch(props: {
    arrayString: string[];
    callBack: (value: string) => void;
    Select : string;
}) {
    const { arrayString, callBack, Select } = props;
    const [selected, setSelected] = useState(Select);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


    const handleItemClick = (item: string) => {
        setSelected(item);
        callBack(item);
        setIsOpen(false);

    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="dropbtn" onClick={toggleDropdown}>{selected}</div>
            {isOpen && (
                <div className="dropdown-content">
                    {arrayString.map((item, index) => (
                        <div
                            key={index}
                            className="dropdown-item"
                            onClick={() => handleItemClick(item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
