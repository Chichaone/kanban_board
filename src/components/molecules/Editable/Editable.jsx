import "./Editable.css";

import React, { useState } from "react";
import { Button } from '@consta/uikit/Button';
import { Modal } from '@consta/uikit/Modal';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';

const Editable = (props) =>
{
    const [show, setShow] = useState(props?.handler || false);
    const [text, setText] = useState("");
    const [color, setColor] = useState("#000000"); // Default color

    const handleOnSubmit = (e) =>
    {
        e.preventDefault();
        if (text && color && props.onSubmit)
        {
            setText("");
            setColor("#000000"); // Reset to default color
            props.onSubmit({ text, color });
        }
        setShow(false);
    };

    return (
        <>
            <Modal
                isOpen={show}
                hasOverlay
                onClickOutside={() => setShow(false)}
                onEsc={() => setShow(false)}
            >
                <div className="modal">
                    <Text as="p" size="l" view="secondary" lineHeight="m">
                        Заполните все поля
                    </Text>
                    <TextField
                        label={props.placeholder}
                        placeholder="Введите текст"
                        autoFocus
                        form="round"
                        type="text"
                        value={text || ""}
                        onChange={( value ) => setText(value)}
                    />
                    <div className="color__group">
                        <TextField
                            label="Выберите цвет"
                            form="clearClear"
                            type="color"
                            value={color}
                            onChange={(value) => setColor(value)}
                        />
                    </div>
                    <div className="but__group">
                        <Button
                            className="but__add"
                            label="Добавить"
                            form="round"
                            view="ghost"
                            size="s"
                            onClick={handleOnSubmit}
                        />
                    </div>
                </div>
            </Modal>
            <Button
                className="but__add"
                form="round"
                view="ghost"
                size="s"
                label={props?.name || "Add"}
                onClick={() => setShow(true)}
            />
        </>
    );
};

export default Editable;
