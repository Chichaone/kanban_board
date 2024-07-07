import "./AddTask.css";

import React, { useState } from "react";
import { Button } from '@consta/uikit/Button';
import { Modal } from '@consta/uikit/Modal';
import { TextField } from '@consta/uikit/TextField';


const AddTask = (props) =>
{
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");

    const onChangeSetShow = (val) => setShow(val)

    const handleOnSubmit = (e) =>
    {
        e.preventDefault();

        if (title && props.onSubmit)
        {
            props.onSubmit(title);
            setTitle("");
        }
        onChangeSetShow(false);
    };


    return (
        <>
            <Modal
                isOpen={show}
                hasOverlay
                onClickOutside={() => onChangeSetShow(false)}
                onEsc={() => onChangeSetShow(false)}
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
                        onChange={(value) => setTitle(value)}
                        maxLength={255}
                    />
                    <Button
                        className="but__add"
                        label={"Добавить"}
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
                onClick={() => onChangeSetShow(true)}
            />
        </>
    );
};

export default AddTask;

