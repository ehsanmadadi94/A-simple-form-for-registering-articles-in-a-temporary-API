import { useState } from 'react'
import useFormInput from './../hooks/useFormInput'
import Alert from './Alert'
export default function CreatePostForm(){

    const titleInputHandler=useFormInput('')
    const categoryInputHandler = useFormInput('')
    const bodyInputHandler = useFormInput('')
    const [showMessageSuccessfully , setShowMessageSuccessfully] = useState(false)
    const SubmitHandler=async(event)=>{
        event.preventDefault()
        let data={
            title:titleInputHandler?.value,
            category:categoryInputHandler?.value,
            body:bodyInputHandler?.value
        }
        try {
            let res = await fetch ('https://67715df42ffbd37a63cee29e.mockapi.io/Posts' , {
                method:'post',
                headers: {'content-type':'application/json'},
                body: JSON.stringify(data)
            })
            res = await res.json();
            titleInputHandler?.resetValue();
            categoryInputHandler?.resetValue();
            bodyInputHandler?.resetValue();
            setShowMessageSuccessfully(true);
            setTimeout(() => {
                setShowMessageSuccessfully(false)
            }, 5000);
        } catch (error) {
            console.log(error)
        }

    }


    return(
        <>
            {showMessageSuccessfully &&<Alert message="post created successfully"  closeHandler={()=>{setShowMessageSuccessfully(false)}} />}
            <form action="" onSubmit={SubmitHandler}  className="w-full  p-14 ">
                <div className="flex flex-col items-start my-4">
                    <label htmlFor="title" className="font-medium mb-2">Title</label>
                    <input {...titleInputHandler} id="title" name="title" type="text" autoComplete="title" placeholder="Title" className="border border-gray-300 block rounded-md w-3/6 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                <div className="flex flex-col items-start my-4">
                    <label htmlFor="Category" className="font-medium mb-2">Category</label>
                    <input {...categoryInputHandler} id="Category" name="Category" type="text" autoComplete="Category" placeholder="Category" className="w-3/6 border shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 border-gray-300 block rounded-md p-1.5"/>
                </div>
                <div className="flex flex-col items-start my-4">
                    <label htmlFor="Body" className="font-medium">Body</label>
                    <textarea {...bodyInputHandler} rows={3} id="Body" name="Body"  autoComplete="Body" placeholder="Body" className="border border-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1 w-5/6 block rounded-md mt-2 "></textarea>
                </div>
                <div className="my-4 flex items-center justify-end mt-16">
                    <button type="submit" className="rounded-md  bg-indigo-600 border-0 text-white px-3 py-2 font-bold shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ">
                        Create
                    </button>
                </div>
            </form>
        </>
    )
}
