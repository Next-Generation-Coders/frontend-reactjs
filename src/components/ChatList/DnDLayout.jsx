// components
import {
    DndContext,
    closestCenter,
    TouchSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';

// hooks
import {useDispatch, useSelector} from 'react-redux';
import useMobileDetect from 'use-mobile-detect-hook';

// utils
import propTypes from 'prop-types';
import {updateOrder} from '@features/chats/chatSlice';
import Chat from "@components/ChatList/Chat";
import {useEffect} from "react";

const DnDLayout = ({variant, data,selected}) => {
    const device = useMobileDetect();

    const dispatch = useDispatch();
    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 15,
        }
    }), useSensor(TouchSensor, {
        activationConstraint: {
            delay: 2000,
            tolerance: 5,
        },
    }));

    const SortableItem = (props) => {
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
            isOver,
            isDragging,
        } = useSortable({id: props.id});

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
            zIndex: isOver || isDragging ? 10 : 0,
            position: 'relative',
            touchAction: 'none',
        };

        return (
            <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
                {props.children}
            </div>
        );
    }
    let chats = useSelector(state => state['chats'].chats);

    const onDragEnd = e => {
        const {active, over} = e;

        if (active._id !== over._id) {
            const oldIndex = chats.findIndex(({_id}) => _id === active._id);
            const newIndex = chats.findIndex(({_id}) => _id === over._id);
            dispatch(updateOrder(arrayMove(chats, oldIndex, newIndex)));
        }
    }

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}
                    modifiers={[restrictToVerticalAxis]} autoScroll={true}>
            <SortableContext items={data} strategy={verticalListSortingStrategy} disabled={!device.isDesktop()}>
                {data.map((chat,index) => (
                    <SortableItem key={index} id={index}>
                        <Chat data={chat} variant={variant} selected={selected}/>
                    </SortableItem>
                ))}
            </SortableContext>
        </DndContext>
    )
}

DnDLayout.propTypes = {
    variant: propTypes.oneOf(['planner', 'list']).isRequired
}

export default DnDLayout