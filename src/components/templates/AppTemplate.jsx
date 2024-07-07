import './AppTemplate.css';

import React, { useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Board from '../organisms/Board/Board';
import Editable from '../molecules/Editable/Editable';
import AddCard from '../molecules/AddCard/AddCard';

const AppTemplate = ({
    data,
    setName,
    addCard,
    removeCard,
    addBoard,
    removeBoard,
    onDragEnd,
    updateCard,
    toggleTaskCompletion
}) =>
{
    const handleAddBoard = useCallback((name) => addBoard(name), [addBoard]);
    const handleAddCard = useCallback((title, description, status, endDate, selectedBoard) =>
    {
        addCard(title, description, status, endDate, selectedBoard);
    }, [addCard]);

    return (
        <div className="app">
            <div className="app__header">
                <h2 className="app__navbar">Kanban Board</h2>
                <div className='but__group'>
                    <Editable
                        className="add__board"
                        name="Добавить стадию"
                        btnName="Add Board"
                        onSubmit={handleAddBoard}
                        placeholder="Введите название стадии"
                    />
                    <AddCard
                        name="Добавить задачу"
                        btnName="AddCard"
                        placeholder="Введите название задачи"
                        value={data}
                        onSubmit={handleAddCard}
                    />
                </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="board" type="board" direction="horizontal">
                    {(provided) => (
                        <div className="app_outer" ref={provided.innerRef} {...provided.droppableProps}>
                            {data.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Board
                                                id={item.id}
                                                name={item.boardName}
                                                color={item.color}
                                                card={item.card}
                                                setName={setName}
                                                addCard={addCard}
                                                removeCard={removeCard}
                                                removeBoard={removeBoard}
                                                updateCard={updateCard}
                                                toggleTaskCompletion={toggleTaskCompletion}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default AppTemplate;
