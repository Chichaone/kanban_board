import "./Card.css";

import React, { useState, useCallback, useMemo } from "react";
import CardDetails from "./CardDetails/CardDetails";
import { Draggable } from "react-beautiful-dnd";
import { Modal } from '@consta/uikit/Modal';
import { Button } from '@consta/uikit/Button';
import { Checkbox } from '@consta/uikit/Checkbox';
import { IconOpenInNew } from '@consta/icons/IconOpenInNew';


const Card = ({ id, index, card, bid, title, toggleTaskCompletion, updateCard, removeCard }) =>
{
    const [modalShow, setModalShow] = useState(false);

    const handleCheckboxChange = useCallback(() => toggleTaskCompletion(bid, id), [toggleTaskCompletion, bid, id]);

    const truncateLabel = useMemo(() => (title.length > 10 ? `${title.substring(0, 10)}...` : title), [title]);

    const subtaskStatuses = useMemo(() =>
        `${card.task.filter(item => item.completed).length} / ${card.task.length || 0}`,
        [card.task]
    );

    return (
        <Draggable key={id.toString()} draggableId={id.toString()} index={index}>
            {(provided) => (
                <>
                    <Modal isOpen={modalShow} hasOverlay onClickOutside={() => setModalShow(false)} onEsc={() => setModalShow(false)}>
                        <CardDetails updateCard={updateCard} onClose={setModalShow} card={card} bid={bid} removeCard={removeCard} />
                    </Modal>

                    <div className="custom__card" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <div className="card__text">
                            <Checkbox className={card.completed ? "strike-through" : ""} label={truncateLabel} checked={card.completed} onChange={handleCheckboxChange} />
                            <Button form="round" iconRight={IconOpenInNew} onlyIcon view="clear" size="s" onClick={() => setModalShow(true)} />
                        </div>
                        <div className="card__footer">{subtaskStatuses}</div>
                        {provided.placeholder}
                    </div>
                </>
            )}
        </Draggable>
    );
};

export default Card;
