import React, { FC } from 'react';
import { useDrop } from 'react-dnd';
import FormElement from '@/components/FormElement';
import { ItemProps } from '@/types/ItemTypes';

type DropAreaProps = {
    formElements: ItemProps[];
    addElement: (element: ItemProps) => void;
};

const ItemType = 'FORM_ELEMENT';

// Área donde se depositan los campos
const DroppableArea: FC<DropAreaProps> = ({ formElements, addElement }) => {
    const [{ isOver }, drop] = useDrop({
        accept: ItemType,
        drop: (item: ItemProps) => {
            const userLabel = prompt(
                `Asigna el nombre al campo: "${item.label}":`
            );
            item.label = userLabel ? userLabel : item.label.split(': ')[1].trim();

            if (item.type === 'select' || item.type === 'radio' || item.type === 'checkbox') {
                const userOptions = prompt(
                    `Define las opciones separadas por comas para "${item.label}":`
                );
                item.options = userOptions ? userOptions.split(',').map((opt) => opt.trim()) : [];
            }
            addElement(item);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return (
        <div ref={drop} className={`border p-2 m-2 radius bg-gray-100 min-h-12 ${isOver ? 'border-blue-500' : 'border-gray-300'} grid grid-cols-1 gap-2 md:grid-cols-2 lg:gap-4 lg:grid-cols-4 `} >
            {formElements.map((element) => (
                <FormElement key={element.id} id={element.id} type={element.type} label={element.label} options={element.options} />
            ))}
            {formElements.length === 0 && (
                <p className="text-gray-500 text-sm mx-auto col-span-4">Arrastra elementos aquí para construir tu formulario.</p>
            )}
        </div>
    );
};

export default DroppableArea;