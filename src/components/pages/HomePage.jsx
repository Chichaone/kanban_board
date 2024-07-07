import './HomePage.css';

import React from 'react';
import useLocalStorage from 'use-local-storage';
import AppTemplate from '../templates/AppTemplate';
import { v4 as uuidv4 } from "uuid";


const HomePage = () =>
{
    const [data, setData] = useLocalStorage("kanban-board", []);

    const setName = (title, bid) =>
    {
        setData(prevData =>
        {
            const index = prevData.findIndex((item) => item.id === bid);
            const tempData = [...prevData];
            tempData[index].boardName = title;
            return tempData;
        });
    };

    const dragCardInBoard = (source, destination) =>
    {
        setData(prevData =>
        {
            const tempData = [...prevData];
            const destinationBoardIdx = tempData.findIndex(
                (item) => item.id.toString() === destination.droppableId
            );
            const sourceBoardIdx = tempData.findIndex(
                (item) => item.id.toString() === source.droppableId
            );

            const [movedCard] = tempData[sourceBoardIdx].card.splice(source.index, 1);
            tempData[destinationBoardIdx].card.splice(destination.index, 0, movedCard);

            return tempData;
        });
    };

    const addCard = (title, description, status_task, endDate, boardId, bid) =>
    {
        setData(prevData =>
        {
            let index;
            if (boardId.id)
            {
                index = prevData.findIndex((item) => item.id == boardId.id);
            } else
            {
                index = prevData.findIndex((item) => item.id == bid);
            }

            if (index === -1)
            {
                console.error(`Board with id ${boardId?.id || bid} not found`);
                return prevData;
            }

            const tempData = [...prevData];
            if (!tempData[index].card)
            {
                tempData[index].card = [];
            }
            tempData[index].card.push({
                id: uuidv4(),
                title: title,
                description: description,
                status_task: status_task,
                endDate: endDate,
                tags: [],
                task: [],
            });
            return tempData;
        });
    };

    const removeCard = (boardId, cardId) =>
    {
        setData(prevData =>
        {
            const index = prevData.findIndex((item) => item.id === boardId);
            const tempData = [...prevData];
            const cardIndex = prevData[index].card.findIndex((item) => item.id === cardId);
            tempData[index].card.splice(cardIndex, 1);
            return tempData;
        });
    };

    const dragBoard = (source, destination) =>
    {
        setData(prevData =>
        {
            const tempData = [...prevData];
            const [movedBoard] = tempData.splice(source.index, 1);
            tempData.splice(destination.index, 0, movedBoard);
            return tempData;
        });
    };

    const addBoard = ({ text, color }) =>
    {
        setData(prevData => [...prevData, {
            id: uuidv4(),
            boardName: text,
            color: color,
            card: [],
        }]);
    };

    const removeBoard = (bid) =>
    {
        setData(prevData => prevData.filter(item => item.id !== bid));
    };

    const onDragEnd = (result) =>
    {
        const { source, destination, type } = result;
        if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index)
        {
            return;
        }

        if (type === "board")
        {
            dragBoard(source, destination);
        } else
        {
            dragCardInBoard(source, destination);
        }
    };

    const updateCard = (bid, cid, updatedCard) =>
    {
        setData(prevData =>
        {
            const index = prevData.findIndex((item) => item.id === bid);
            if (index < 0) return prevData;

            const tempBoards = [...prevData];
            const cards = tempBoards[index].card;
            const cardIndex = cards.findIndex((item) => item.id === cid);
            if (cardIndex < 0) return prevData;

            tempBoards[index].card[cardIndex] = updatedCard;
            return tempBoards;
        });
    };

    const statusOptions = [
        { label: "новое", value: "новое" },
        { label: "в работе", value: "в работе" },
        { label: "на проверке", value: "на проверке" },
        { label: "завершен", value: "завершен" },
    ];

    const toggleTaskCompletion = (bid, cid) =>
    {
        setData(prevData =>
        {
            const tempData = [...prevData];
            const boardIndex = tempData.findIndex(board => board.id === bid);
            const cardIndex = tempData[boardIndex].card.findIndex(card => card.id === cid);

            if (cardIndex >= 0)
            {
                tempData[boardIndex].card[cardIndex].completed = !tempData[boardIndex].card[cardIndex].completed;
                if (tempData[boardIndex].card[cardIndex].completed)
                {
                    tempData[boardIndex].card[cardIndex].status_task = statusOptions.find(option => option.value === "завершен").value;
                } else
                {
                    tempData[boardIndex].card[cardIndex].status_task = statusOptions.find(option => option.value === "в работе").value; // Укажите статус для незавершенных задач, если необходимо
                }
            }

            return tempData;
        });
    };

    return (
        <AppTemplate
            data={data}
            setName={setName}
            addCard={addCard}
            removeCard={removeCard}
            addBoard={addBoard}
            removeBoard={removeBoard}
            onDragEnd={onDragEnd}
            updateCard={updateCard}
            toggleTaskCompletion={toggleTaskCompletion}
        />
    );
};

export default HomePage;
