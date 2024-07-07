import "./AddTask.css";

import React, { useState } from "react";
import { Button } from '@consta/uikit/Button';
import { Modal } from '@consta/uikit/Modal';
import { TextField } from '@consta/uikit/TextField';

const AddTask = ({ onSubmit }) =>
{
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");

    const handleSetShow = (value) => setShow(value);
    const handleTitleChange = (value) => setTitle(value);

    const handleOnSubmit = (e) =>
    {
        e.preventDefault();
        if (title && onSubmit)
        {
            onSubmit(title);
            setTitle("");
        }
        handleSetShow(false);
    };

    return (
        <>
            <Modal
                isOpen={show}
                hasOverlay
                onClickOutside={() => handleSetShow(false)}
                onEsc={() => handleSetShow(false)}
            >
                <div className="modal__task">
                    <TextField
                        className="input"
                        label="Введите заголовок"
                        placeholder="Введите текст"
                        form="round"
                        autoFocus
                        type="textarea"
                        value={title}
                        onChange={handleTitleChange}
                        maxLength={255}
                    />
                    <Button
                        className="but__add"
                        label="Добавить"
                        form="round"
                        view="ghost"
                        size="s"
                        onClick={handleOnSubmit}
                    />
                </div>
            </Modal>
            <Button
                className="but__add"
                form="round"
                view="ghost"
                size="s"
                label="Добавить задачу"
                onClick={() => handleSetShow(true)}
            />
        </>
    );
};

export default AddTask;
