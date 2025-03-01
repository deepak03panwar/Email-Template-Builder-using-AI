"use client"
import { useSelectedElement } from '@/app/provider'
import React, { useEffect, useState } from 'react'
import InputFeild from './Settings/InputFeild';
import ColorPickerFeild from './Settings/ColorPickerFeild';
import InputStyleFeild from './Settings/InputStyleFeild';
import SliderFeild from './Settings/SliderFeild';
import { Textarea } from '../ui/textarea';
import TextAreaFeild from './Settings/TextAreaFeild';
import ToggleGroupFeild from './Settings/ToggleGroupFeild';
import { AlignLeft, AlignCenter, AlignRight, AArrowUp, CaseLower, CaseUpper, Bold } from "lucide-react";
import DropDownFeild from './Settings/DropDownFeild';
import ImagePreview from './Settings/ImagePreview';


const TextAlignOptions = [
  {
    value:'left',
    icon:AlignLeft
  },
  {
    value:'center',
    icon:AlignCenter
  },
  {
    value:'right',
    icon:AlignRight
  }
]

const TextTransformOptions = [
  {
    value:'uppercase',
    icon: CaseUpper
  },
  {
    value:'lowercase',
    icon: CaseLower
  },
  {
    value:'capitalize',
    icon: AArrowUp
  }
]



function Settings() {
  const {selectedElement,setSelectedElement} = useSelectedElement();
  const [element,setElement] = useState();

  const onHandleInputChange = (feildName,value) =>{
    // console.log(feildName,"value" + value)
    console.log(feildName, "value:", value);


    //Copy of current SelectedElement
    const updatedData = {...selectedElement}
    // update the specific feild
    updatedData.layout[selectedElement.index][feildName]=value
    // update the Original SelectedElement
    setSelectedElement(updatedData)
  }

  useEffect(()=>{
    // console.log(selectedElement?.layout?.[selectedElement?.index])
        // setElement(selectedElement?.layout?.[selectedElement?.index]);

        if (selectedElement?.index !== undefined && selectedElement?.layout) {
          setElement(selectedElement.layout[selectedElement.index]);
        }
        
  },[selectedElement])

//    const onHandleStyleChange=(feildName,feildValue)=>{

//       //Copy of current SelectedElement
//       /**
//        * selectedElement:
//        *  {
//        * index:0,
//        * layout:{
//        *      ...layout,
//        * style:{
//        *      ...style
//        *           }
//        *    }
//        *  }
//        */
//       // const updatedData = {...selectedElement}
//       // // update the specific feild
//       // updatedData.layout[selectedElement.index].style[feildName]=feildValue
//       // // update the Original SelectedElement


// //  Logic for style (for  change the color of Button and  any other)
//       let updateElement={
//         ...selectedElement,
//         layout:{
//           ...selectedElement?.layout,
//           [selectedElement?.index]:{
//             ...selectedElement?.layout[selectedElement?.index],
//             style:{
//               ...selectedElement?.layout[selectedElement?.index]?.style,
//                 [feildName]:feildValue
//             }
//           }
//         }
//       }
//       setSelectedElement(updateElement)

//    }


   const onHandleStyleChange = (feildName, feildValue) => {
    if (isNaN(feildValue)) return; // Prevent NaN updates
  
    let updateElement = {
      ...selectedElement,
      layout: {
        ...selectedElement?.layout,
        [selectedElement?.index]: {
          ...selectedElement?.layout[selectedElement?.index],
          style: {
            ...selectedElement?.layout[selectedElement?.index]?.style,
            [feildName]: feildValue
          }
        }
      }
    };
    setSelectedElement(updateElement);
  };
  


   const onHandleOuterStyleChange = (feildName,feildValue) =>{
    let updateElement={
      ...selectedElement,
      layout:{
        ...selectedElement?.layout,
        [selectedElement?.index]:{
          ...selectedElement?.layout[selectedElement?.index],
          outerStyle:{
            ...selectedElement?.layout[selectedElement?.index]?.outerStyle,
              [feildName]:feildValue
          }
        }
      }
    }
    setSelectedElement(updateElement)

   }

  return (
    <div className='p-5 flex flex-col gap-4'>
      <h2 className='font-bold text-xl'>Settings</h2>
             
            {element?.imageUrl && (
           <ImagePreview
             label={'Image Preview'}
             value={element?.imageUrl || ''
             } // If label is undefined, set it to empty string
             onHandleInputChange={(value) => onHandleInputChange('imageUrl', value)}
           />
           )}

          {element?.content && (
           <InputFeild
             label={'Content'}
             value={element?.content || ''} // If label is undefined, set it to empty string
             onHandleInputChange={(value) => onHandleInputChange('content', value)}
           />
           )}
      
           
          {element?.textarea && 
           <TextAreaFeild
            label={'Text'}
             value={element?.textarea || ''} // Fallback to an empty string if textarea is undefined or empty
             onHandleInputChange={(value) => onHandleInputChange('textarea', value)}
           />
           }


            {element?.url && 
           <InputFeild
            label={'url'}
             value={element?.url || ''}  // Fallback to an empty string if url is undefined or null
            onHandleInputChange={(value) => onHandleInputChange('url', value)}
          />
           }   

          
          {/* {element?.style?.width &&
           <SliderFeild label={'Width'} value={element?.style?.width}
           type='%'
              onHandleStyleChange={(value)=>onHandleStyleChange('width',value)}
              />
           } */}

             <SliderFeild
              label={'Width'}
             value={isNaN(element?.style?.width) ? 0 : element?.style?.width} // Ensure no NaN
             type='%'
              onHandleStyleChange={(value) => onHandleStyleChange('width', value)}
            />


           {element?.style?.textAlign &&
           <ToggleGroupFeild label={'Text Align'} value={element?.style?.textAlign}
             options = {TextAlignOptions}
             onHandleStyleChange={(value)=>onHandleStyleChange('textAlign',value)}
              />
           }



           {element?.style?.backgroundColor &&
              <ColorPickerFeild label={'Background Color'} value={element?.style?.backgroundColor}
              onHandleStyleChange={(value)=>onHandleStyleChange('backgroundColor',value)}
              />
           }

           
           {element?.style?.color &&
             <ColorPickerFeild label={' Text Color'}  value={element?.style?.color}
              onHandleStyleChange={(value)=>onHandleStyleChange('color',value)}
              />
            }


          {element?.style?.fontSize &&
           <InputStyleFeild label={'Font Size'} value={element?.style?.fontSize}
              onHandleStyleChange={(value)=>onHandleStyleChange('fontSize',value)}
              />
           }

          {element?.style.textTransform &&
           <ToggleGroupFeild label={'Text Transform'} value={element?.style.textTransform}
             options = {TextTransformOptions}
             onHandleStyleChange={(value)=>onHandleStyleChange('textTransform',value)}
              />
           }


          {element?.style?.padding &&
           <InputStyleFeild label={'Padding'} value={element?.style?.padding}
          //  type='%'
              onHandleStyleChange={(value)=>onHandleStyleChange('padding',value)}
              />
           }

          {element?.style?.margin &&
           <InputStyleFeild label={'Margin'} value={element?.style?.margin}
          //  type='%'
              onHandleStyleChange={(value)=>onHandleStyleChange('margin',value)}
              />
           }
 

          {element?.style?.borderRadius &&
           <SliderFeild label={'BorderRadius'} value={element?.style?.borderRadius}
              onHandleStyleChange={(value)=>onHandleStyleChange('borderRadius',value)}
              />
           }

          {element?.style?.fontWeight &&
           <DropDownFeild label={'Font Width'} value={element?.style?.fontWeight}
           options={['normal','bold']}
              onHandleStyleChange={(value)=>onHandleStyleChange('fontWeight',value)}
              />
           }
          

          <div>
           <h2 className='font-bold mb-2'>OuterStyle</h2>
          {element?.outerStyle?.backgroundColor &&
           <ColorPickerFeild label={'Background Color'} value={element?.outerStyle?.backgroundColor}
           onHandleStyleChange={(value)=>onHandleOuterStyleChange('backgroundColor',value)}
           />
          }

          {element?.outerStyle?.justifyContent &&
           <ToggleGroupFeild label={'Align'} value={element?.outerStyle?.justifyContent}
           options={TextAlignOptions}
           onHandleStyleChange={(value)=>onHandleOuterStyleChange('justifyContent',value)}
           />
          }

          </div>
           

          
         
          



       </div>
  )
}

export default Settings

