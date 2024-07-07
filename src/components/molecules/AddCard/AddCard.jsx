import "./AddCard.css";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from '@consta/uikit/Button';
import { Modal } from '@consta/uikit/Modal';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { DatePicker } from '@consta/uikit/DatePicker';
import { Select } from '@consta/uikit/Select';
import { format } from 'date-fns';


const statusOptions = [
    { id: "новое", label: "новое" },
    { id: "в работе", label: "в работе" },
    { id: "на проверке", label: "на проверке" },
    { id: "завершен", label: "завершен" },
];

const AddCard = (props) =>
{
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [statusTask, setStatusTask] = useState("");
    const [endDate, setEndDate] = useState(null);
    const [selectedBoard, setSelectedBoard] = useState("");
    const [bId, setBId] = useState("");

    useEffect(() =>
    {
        if (props.btnName !== 'AddCard')
        {
            setBId(props.id);
        }
    }, [props.btnName, props.id]);

    const handleOnSubmit = useCallback((e) =>
    {
        e.preventDefault();
        if (title && description && statusTask && endDate && props.onSubmit)
        {
            const formattedDate = format(endDate, 'dd/MM/yyyy');
            props.onSubmit(title, description, statusTask.label, formattedDate, selectedBoard, bId);
            setTitle("");
            setDescription("");
            setStatusTask("");
            setEndDate(null);
            setSelectedBoard("");
        }
        setShow(false);
    }, [title, description, statusTask, endDate, selectedBoard, bId, props]);

    return (
        <>
            <Modal
                isOpen={show}
                hasOverlay
                onClickOutside={() => setShow(false)}
                onEsc={() => setShow(false)}
            >
                <div className="modal__task">
                    <Text as="p" size="l" view="secondary" lineHeight="m">
                        Заполните все поля
                    </Text>
                    {props.btnName === 'AddCard' ? (
                        <Select
                            className="input"
                            label="Выберите стадию"
                            form="round"
                            items={props.value.map(board => ({
                                label: board.boardName,
                                id: board.id
                            }))}
                            value={selectedBoard}
                            onChange={setSelectedBoard}
                        />
                    ) : (
                        <TextField
                            label="Стадия"
                            className="input"
                            placeholder={props.nameBoard}
                            form="round"
                            disabled
                        />
                    )}
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
                    <TextField
                        className="input"
                        label="Введите описание"
                        placeholder="Введите текст"
                        form="round"
                        type="textarea"
                        rows={2}
                        value={description}
                        onChange={(value) => setDescription(value)}
                        maxLength={1024}
                    />
                    <Select
                        className="input"
                        label="Выберите статус"
                        form="round"
                        items={statusOptions}
                        value={statusTask}
                        onChange={setStatusTask}
                    />
                    <DatePicker
                        className="input"
                        label="Выберите дату завершения"
                        form="round"
                        value={endDate}
                        onChange={setEndDate}
                    />
                    <Button
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
                onClick={() => setShow(true)}
            />
        </>
    );
};

export default AddCard;
