import React, { useEffect, useState } from 'react'
import { trpc } from "./trpc";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";


export default function FrontPage() {
    const [userInput, setUserInput] = useState("");
    const [selectedItem, setSelectedItem] = useState(-1)
    const [page,setPage] = useState(0)
    const [items, setItems] = useState<IResource[]>([]);

    const searchItem = trpc.getItems.useMutation({
        onSuccess: (data) => {
            setItems(data);
        },
        onError: (data) => { }
    });
    useEffect(() => {
        searchItem.mutate({ id: "" })
    }, [])
    const validate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.replace(/\D/g, '');
        setUserInput(value);
        searchItem.mutate({ id: value })
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center p-8">
            <input type="text" placeholder="Type here" className="w-full sm:w-3/4 md:w-1/2 input input-bordered text-center" value={userInput} onChange={validate} pattern='[0-9]' />

            <div className="w-full py-8">
                <table className="table md:table-fixed  w-full overflow-x-auto">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody className='relative h-96'>
                        {
                            items.map((el,index) => {
                                if(page*5 <= index && index < page*5 + 5) 
                                return (
                                    <tr className='self-start h-16'>
                                        <td>{el.id}</td>
                                        <td>{el.name}</td>
                                        <td>{el.year}</td>
                                    </tr>
                                )
                            })
                        }
                        <button className={`absolute left-0 top-1/2 -translate-x-5 ${page <= 0 ? 'hidden' : ''}`} onClick={() => {
                            if(page<= 0) return;
                            setPage(page-1)
                        }}><AiFillCaretLeft /></button>
                        <button className={`absolute right-0 top-1/2 translate-x-5 ${page >= items.length/5 - 1? 'hidden' : ''}`} onClick={() => {
                            if(page >= items.length/5 - 1) return;
                            setPage(page+1)
                        }}><AiFillCaretRight /></button>
                    </tbody>
                </table>
            </div>
        </div>
    )
}


interface IResource {
    id: number,
    name: string,
    year: number,
    colos: string,
    pantone_value: string
}