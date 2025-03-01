"use client"
import React, { useState } from 'react';
import { useEmailTemplate, useDragElementLayout, useSelectedElement } from '@/app/provider';
import ButtonComponent from '../custom/Element/ButtonComponent';
import TextComponent from '../custom/Element/TextComponent';
import ImageComponent from '../custom/Element/ImageComponent';
import LogoComponent from '../custom/Element/LogoComponent';
import DividerComponent from '../custom/Element/DividerComponent';
import SocialIconComponent from '../custom/Element/SocialIconComponent';
import { ArrowDown, ArrowUp, Trash } from 'lucide-react';

function ColumnLayout({ layout }) {
  const [dragOver, setDragOver] = useState(null);
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const { dragElementLayout, setDragElementLayout } = useDragElementLayout();
  const { selectedElement, setSelectedElement } = useSelectedElement();

  const onDragOverHandle = (event, index) => {
    event.preventDefault();
    setDragOver({ index, columnId: layout?.id });
  };

  // const onDropHandle = () => {
  //   if (!dragOver || !dragElementLayout?.dragElement) return;
    
  //   setEmailTemplate(prevItems =>
  //     prevItems.map(col =>
  //       col.id === layout?.id
  //         ? { ...col, [dragOver.index]: dragElementLayout.dragElement }
  //         : col
  //     )
  //   );
  //   setDragOver(null);
  // };

  const onDropHandle = () => {
    if (!dragOver || !dragElementLayout?.dragElement) return;
  
    setEmailTemplate((prevItems) =>
      prevItems.map((col) =>
        col.id === layout?.id
          ? {
              ...col,
              [dragOver.index]: { ...dragElementLayout.dragElement }, // Ensuring immutability
            }
          : col
      )
    );
    setDragOver(null);
  };
  

  const components = {
    Button: ButtonComponent,
    Text: TextComponent,
    Image: ImageComponent,
    Logo: LogoComponent,
    Divider: DividerComponent,
    SocialIcons: SocialIconComponent,
  };

  const GetElementComponent = (element) => {
    const Component = components[element?.type];
    return Component ? <Component {...element} /> : null;
  };

  const deleteLayout = (layoutId) => {
    setEmailTemplate(emailTemplate.filter(item => item.id !== layoutId));
    setSelectedElement(null);
  };

  const moveItemUp = (layoutId) => {
    const index = emailTemplate.findIndex(item => item.id === layoutId);
    if (index > 0) {
      setEmailTemplate(prevItems => {
        const updatedItems = [...prevItems];
        [updatedItems[index], updatedItems[index - 1]] = [updatedItems[index - 1], updatedItems[index]];
        return updatedItems;
      });
    }
  };

  const moveItemDown = (layoutId) => {
    const index = emailTemplate.findIndex(item => item.id === layoutId);
    if (index < emailTemplate.length - 1) {
      setEmailTemplate(prevItems => {
        const updatedItems = [...prevItems];
        [updatedItems[index], updatedItems[index + 1]] = [updatedItems[index + 1], updatedItems[index]];
        return updatedItems;
      });
    }
  };

  return (
    <div className='relative'>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${layout?.numOfCol}, 1fr)`,
          gap: '0px',
        }}
        className={`${selectedElement?.layout?.id === layout?.id && 'border border-dashed border-blue-500'}`}
      >
        {Array.from({ length: layout?.numOfCol }).map((_, index) => (
          <div
            key={index}
            className={`p-0 flex items-center h-full w-full bg-white cursor-pointer
              ${!layout?.[index]?.type && 'bg-gray-100 border border-dashed'} justify-center
              ${index === dragOver?.index && dragOver?.columnId ? 'bg-green-100' : ''}
              ${selectedElement?.layout?.id === layout?.id && selectedElement?.index === index && 'border-blue-500 border-4'}`}
            onDragOver={(event) => onDragOverHandle(event, index)}
            onDrop={onDropHandle}
            onClick={() => setSelectedElement({ layout, index })}
          >
            {layout?.[index] ? GetElementComponent(layout[index]) : 'Drag Element Here'}
          </div>
        ))}

        {selectedElement?.layout?.id === layout?.id && (
          <div className='absolute -right-10 flex gap-2 flex-col'>
            <div
              className='cursor-pointer bg-purple-100 p-2 rounded-full hover:scale-105 transition-all hover:shadow-md'
              onClick={() => deleteLayout(layout?.id)}
            >
              <Trash className='h-4 w-4 text-red-500' />
            </div>
            <div
              className='cursor-pointer bg-gray-100 p-2 rounded-full hover:scale-105 transition-all hover:shadow-md'
              onClick={() => moveItemUp(layout?.id)}
            >
              <ArrowUp className='h-4 w-4' />
            </div>
            <div
              className='cursor-pointer bg-gray-100 p-2 rounded-full hover:scale-105 transition-all hover:shadow-md'
              onClick={() => moveItemDown(layout?.id)}
            >
              <ArrowDown className='h-4 w-4' />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ColumnLayout;
