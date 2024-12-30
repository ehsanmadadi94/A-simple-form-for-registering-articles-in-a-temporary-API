import { useState } from "react";

export default function useFormInput(initValue){

  const [value , setValue ] = useState(initValue);
  const onChangeHandler = (event)=>{
    setValue(event.target.value)
  }
  const resetValue=()=>{
    setValue('')
  }
  return{
    value,
    resetValue,
    onChange:onChangeHandler
  }

}
