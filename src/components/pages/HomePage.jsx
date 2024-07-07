import './HomePage.css';

import React, { useCallback } from 'react';
import AppTemplate from '../templates/AppTemplate';
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from 'usehooks-ts';


const HomePage = () =>
{
    const [data, setData] = useLocalStorage("kanban-board", []);

    const statusOptions = [
        { id: "новое", label: "новое" },
        { id: "в работе", label: "в работе" },
        { id: "на проверке", label: "на проверке" },
        { id: "завершен", label: "завершен" },
    ];

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

    const dragCardInBoard = useCallback((source, destination) =>
    {
        setData(prevData =>
        {
            const tempData = [...prevData];
            const sourceBoardIdx = tempData.findIndex(item => item.id.toString() === source.droppableId);
            const destinationBoardIdx = tempData.findIndex(item => item.id.toString() === destination.droppableId);

            const [movedCard] = tempData[sourceBoardIdx].card.splice(source.index, 1);
            tempData[destinationBoardIdx].card.splice(destination.index, 0, movedCard);

            return tempData;
        });
    }, [setData]);

    const addCard = useCallback((title, description, status_task, endDate, boardId, bid) =>
    {
        setData(prevData =>
        {
            const index = prevData.findIndex(item => item.id === (boardId.id || bid));
            if (index === -1)
            {
                console.error(`Board with id ${boardId?.id || bid} not found`);
                return prevData;
            }

            const tempData = [...prevData];
            tempData[index].card.push({
                id: uuidv4(),
                title,
                description,
                status_task,
                endDate,
                tags: [],
                task: [],
            });

            return tempData;
        });
    }, [setData]);

    const removeCard = useCallback((boardId, cardId) =>
    {
        setData(prevData =>
        {
            const tempData = [...prevData];
            const boardIndex = tempData.findIndex(item => item.id === boardId);
            tempData[boardIndex].card = tempData[boardIndex].card.filter(item => item.id !== cardId);

            return tempData;
        });
    }, [setData]);

    const dragBoard = useCallback((source, destination) =>
    {
        setData(prevData =>
        {
            const tempData = [...prevData];
            const [movedBoard] = tempData.splice(source.index, 1);
            tempData.splice(destination.index, 0, movedBoard);

            return tempData;
        });
    }, [setData]);

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

    const onDragEnd = useCallback((result) =>
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
    }, [dragBoard, dragCardInBoard]);

    const updateCard = useCallback((bid, cid, updatedCard) =>
    {
        setData(prevData =>
        {
            const boardIndex = prevData.findIndex(item => item.id === bid);
            const tempBoards = [...prevData];
            const cardIndex = tempBoards[boardIndex].card.findIndex(item => item.id === cid);
            tempBoards[boardIndex].card[cardIndex] = updatedCard;

            return tempBoards;
        });
    }, [setData]);

    const toggleTaskCompletion = useCallback((bid, cid) =>
    {
        setData(prevData =>
        {
            const tempData = [...prevData];
            const boardIndex = tempData.findIndex(board => board.id === bid);
            const cardIndex = tempData[boardIndex].card.findIndex(card => card.id === cid);

            if (cardIndex >= 0)
            {
                const card = tempData[boardIndex].card[cardIndex];
                card.completed = !card.completed;
                card.status_task = card.completed ? "завершен" : "в работе";
            }

            return tempData;
        });
    }, [setData, statusOptions]);

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
