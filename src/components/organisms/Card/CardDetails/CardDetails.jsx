import "./CardDetails.css";

import React, { useState, useEffect, useCallback } from "react";
import AddTask from "../../../molecules/AddTask/AddTask";
import { v4 as uuidv4 } from "uuid";
import { TextField } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';
import { Checkbox } from '@consta/uikit/Checkbox';
import { Text } from '@consta/uikit/Text';
import { IconTrash } from '@consta/icons/IconTrash';
import { IconEdit } from '@consta/icons/IconEdit';
import { Select } from '@consta/uikit/Select';
import { useLocalStorage } from 'usehooks-ts';


const statusOptions = [
    { id: "новое", label: "новое" },
    { id: "в работе", label: "в работе" },
    { id: "на проверке", label: "на проверке" },
    { id: "завершен", label: "завершен" },
];

export default function CardDetails(props)
{
    const [data, setData] = useLocalStorage("kanban-board", []);
    const [values, setValues] = useState({ ...props.card });
    const [input, setInput] = useState(false);
    const [text, setText] = useState(values.title);

    const updateData = useCallback((newValues) =>
    {
        setValues(newValues);
        const updatedData = data.map(board =>
        {
            const updatedCards = board.card.map(card =>
                card.id === newValues.id ? newValues : card
            );
            return { ...board, card: updatedCards };
        });
        setData(updatedData);
    }, [data, setData]);

    const addTask = (value) =>
    {
        const updatedTasks = [...values.task, { id: uuidv4(), task: value, completed: false }];
        updateData({ ...values, task: updatedTasks });
    };

    const removeTask = (id) =>
    {
        const remainingTasks = values.task.filter(item => item.id !== id);
        updateData({ ...values, task: remainingTasks });
    };

    const deleteAllTask = () => updateData({ ...values, task: [] });

    const updateTask = (id) =>
    {
        const updatedTasks = values.task.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        );
        updateData({ ...values, task: updatedTasks });
    };

    const updateTitle = (value) => updateData({ ...values, title: value });

    const updateStatus = (value) => updateData({ ...values, status_task: value.label });

    const calculatePercent = () =>
    {
        const totalTask = values.task.length;
        const completedTask = values.task.filter(item => item.completed).length;
        return Math.floor((completedTask * 100) / totalTask) || 0;
    };

    const handleKeyPress = (e) =>
    {
        if (e.code === "Enter")
        {
            setInput(false);
            updateTitle(text || values.title);
        }
    };

    useEffect(() =>
    {
        document.addEventListener("keypress", handleKeyPress);
        return () => document.removeEventListener("keypress", handleKeyPress);
    }, [text]);

    const truncateLabel = (label) => (label.length > 40 ? label.substring(0, 40) + '...' : label);

    return (
        <div className="container">
            <div className="card__top">
                {input ? (
                    <div className="title__edit">
                        <TextField
                            className="text"
                            placeholder={props.placeholder}
                            autoFocus
                            truncate
                            type="text"
                            value={text}
                            onChange={(value) => setText(value)}
                        />
                        <Button label="Save" onClick={() =>
                        {
                            setInput(false);
                            updateTitle(text);
                        }} />
                    </div>
                ) : (
                    <div className="title__edit">
                        <Text
                            truncate
                            className="text__title"
                            style={{ cursor: "pointer", width: "430px" }}
                            onClick={() => setInput(true)}
                        >
                            {values.title}
                        </Text>
                        <Button
                            label="Изменить название"
                            iconRight={IconEdit}
                            onlyIcon
                            form="round"
                            view="clear"
                            size="s"
                            onClick={() => setInput(true)}
                        />
                        <Button
                            label="Удалить задачу"
                            iconRight={IconTrash}
                            onlyIcon
                            form="round"
                            view="clear"
                            size="s"
                            onClick={() => props.removeCard(props.bid, values.id)}
                        />
                    </div>
                )}
            </div>
            <div className="text__date">
                <Select
                    label="Статус"
                    items={statusOptions}
                    value={statusOptions.find(option => option.label === values.status_task)}
                    onChange={updateStatus}
                />
            </div>
            <div className="text__date">Описание: {values.description}</div>
            <div className="text__date">Дата завершения: {values.endDate}</div>
            <div className="check__list">
                <div className="text__check">Чек-лист</div>
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${calculatePercent()}%`, backgroundColor: "#61bd4f" }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    {calculatePercent()}%
                </div>
                <div className="but__group">
                    <AddTask
                        parentClass="task__editable"
                        name="Добавить подзадачу"
                        btnName="AddTask"
                        onSubmit={addTask}
                    />
                    <Button
                        label="Удалить все подзадачи"
                        form="round"
                        view="ghost"
                        size="s"
                        onClick={deleteAllTask}
                    />
                </div>
                {values.task.length !== 0 && values.task.map((item, index) => (
                    <div className="task__list" key={item.id + index}>
                        <Checkbox
                            className={item.completed ? "strike-through" : ""}
                            style={{ width: "490px" }}
                            label={truncateLabel(item.task)}
                            checked={item.completed}
                            onChange={() => updateTask(item.id)}
                        />
                        <Button
                            label="Удалить подзадачу"
                            iconRight={IconTrash}
                            onlyIcon
                            form="round"
                            view="clear"
                            size="s"
                            onClick={() => removeTask(item.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
