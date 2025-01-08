
import { ItemProps } from '@/types/ItemTypes';
import React, { FC } from 'react';
import { useDrag } from 'react-dnd';

const ItemType = 'FORM_ELEMENT';

// Paleta de campos DraggableItem
const FieldPalette: FC<ItemProps> = ({name_id, type, label, options}) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemType,
        item: { name_id, type, label, options },
        collect: (monitor) => ({ isDragging: monitor.isDragging() }),
      }));
    
      return (
        <div ref={drag} className={`p-2 m-2 bg-gray-300 cursor-grab ${isDragging ? 'opacity-50' : 'opacity-100'} `} >
          {label}
        </div>
      );
};

export default FieldPalette;