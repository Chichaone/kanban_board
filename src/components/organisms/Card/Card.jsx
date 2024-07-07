import "./Card.css";

import React, { useState } from "react";
import CardDetails from "./CardDetails/CardDetails";
import { Draggable } from "react-beautiful-dnd";
import { Modal } from '@consta/uikit/Modal';
import { Button } from '@consta/uikit/Button';
import { Checkbox } from '@consta/uikit/Checkbox';
import { IconOpenInNew } from '@consta/icons/IconOpenInNew';


const Card = (props) =>
{
    const [modalShow, setModalShow] = useState(false);

    const handleCheckboxChange = () => props.toggleTaskCompletion(props.bid, props.id);

    const truncateLabel = props.title.length > 10 ? props.title.substring(0, 10) + '...' : props.title;

    const subtaskStatuses = props.card.task.length !== 0 ?
        `${(props.card.task?.filter((item) => item.completed === true)).length} / ${props.card.task.length}`
        : "0/0"
    return (
        <Draggable
            key={props.id.toString()}
            draggableId={props.id.toString()}
            index={props.index}
        >
            {(provided) => (
                <>
                    <Modal
                        isOpen={modalShow}
                        hasOverlay
                        onClickOutside={() => setModalShow(false)}
                        onEsc={() => setModalShow(false)}
                    >
                        <CardDetails
                            updateCard={props.updateCard}
                            onClose={setModalShow}
                            card={props.card}
                            bid={props.bid}
                            removeCard={props.removeCard}
                        />
                    </Modal>

                    <div
                        className="custom__card"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div className="card__text">
                            <Checkbox
                                className={`${props.card.completed ? "strike-through" : ""}`}
                                label={truncateLabel}
                                checked={props.card.completed}
                                onChange={handleCheckboxChange}
                            />
                            <Button
                                form="round"
                                iconRight={IconOpenInNew}
                                onlyIcon
                                view="clear"
                                size="s"
                                onClick={() => setModalShow(true)}
                            />
                        </div>
                        <div className="card__footer">
                            {subtaskStatuses}
                        </div>
                        {provided.placeholder}
                    </div>
                </>
            )}
        </Draggable>
    );
};

export default Card;