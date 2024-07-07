import "./Board.css";
import React from "react";
import Card from "../../organisms/Card/Card"
import AddCard from "../../molecules/AddCard/AddCard";
import { Droppable } from "react-beautiful-dnd";
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { IconTrash } from '@consta/icons/IconTrash';

export default function Board({
    id,
    name = "Name of Board",
    color,
    card = [],
    removeBoard,
    updateCard,
    removeCard,
    addCard,
    toggleTaskCompletion,
})
{

    const handleRemoveBoard = () => removeBoard(id);
    const handleAddCard = (title, description, status, endDate, selectedBoard) =>
    {
        addCard(title, description, status, endDate, selectedBoard, id);
    };

    return (
        <div className="board" style={{ border: `2px solid ${color}` }}>
            <div className="board__top">
                <Text className="text" truncate>
                    {name}
                </Text>
                <Button
                    label="Удалить стадию"
                    iconRight={IconTrash}
                    onlyIcon
                    view="clear"
                    size="s"
                    onClick={handleRemoveBoard}
                />
            </div>
            <div className="board__footer">
                <AddCard
                    name="Добавить задачу"
                    btnName="AddCardIn"
                    placeholder="Введите название задачи"
                    id={id}
                    nameBoard={name}
                    onSubmit={handleAddCard}
                />
            </div>
            <Droppable droppableId={id.toString()} type="card">
                {(provided) => (
                    <div className="board__cards" ref={provided.innerRef} {...provided.droppableProps}>
                        {card.map((items, index) => (
                            <Card
                                bid={id}
                                id={items.id}
                                index={index}
                                key={items.id}
                                title={items.title}
                                tags={items.tags}
                                updateCard={updateCard}
                                removeCard={removeCard}
                                card={items}
                                toggleTaskCompletion={toggleTaskCompletion}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
