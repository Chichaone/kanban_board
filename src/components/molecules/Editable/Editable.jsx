import "./Editable.css";

import React, { useState, useCallback } from "react";
import { Button } from '@consta/uikit/Button';
import { Modal } from '@consta/uikit/Modal';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';

const Editable = ({ handler = false, placeholder, name = "Add", onSubmit }) =>
{
    const [show, setShow] = useState(handler);
    const [text, setText] = useState("");
    const [color, setColor] = useState("#000000");

    const handleOnSubmit = useCallback((e) =>
    {
        e.preventDefault();
        if (text && color && onSubmit)
        {
            onSubmit({ text, color });
            setText("");
            setColor("#000000");
        }
        setShow(false);
    }, [text, color, onSubmit]);

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
                        label={placeholder}
                        placeholder="Введите текст"
                        autoFocus
                        form="round"
                        type="text"
                        value={text}
                        onChange={(value) => setText(value)}
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
                label={name}
                onClick={() => setShow(true)}
            />
        </>
    );
};

export default Editable;
