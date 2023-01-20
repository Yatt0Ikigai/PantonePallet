import React, { useEffect, useRef, useState } from 'react'
import { trpc } from "./trpc";
import { AiFillCaretLeft, AiFillCaretRight, AiOutlineCloseCircle } from "react-icons/ai";
import { CSSTransition } from "react-transition-group";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FrontPage() {
    const [userInput, setUserInput] = useState("");
    const [selectedItem, setSelectedItem] = useState(-1)
    const [page, setPage] = useState(0)
    const [items, setItems] = useState<IResource[]>([]);

    const searchItem = trpc.getItems.useMutation({
        onSuccess: (data) => {
            setItems(data);
            setPage(0);
        },
        onError: (data) => {
            toast.error('❌Something failed')
        },
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
        <div className="w-screen h-screen flex flex-col items-center py-8 px-4 sm:px-10 md:px-20 relative text-white">
            <input type="text" placeholder="Search for product" className="w-full sm:w-3/4 md:w-1/2 input input-bordered text-center sm:my-5 md:my-10 lg:my-20" value={userInput} onChange={validate} pattern='[0-9]' />

            <div className="w-full py-8 relative">
                <table className="table sm:table-fixed  w-full overflow-x-auto ">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody className='relative text-black'>
                        {
                            items.map((el, index) => {
                                if (page * 5 <= index && index < page * 5 + 5)
                                    return (
                                        <tr className={`h-20 hover:cursor-pointer`} onClick={() => setSelectedItem(index)} style={{ background: el.color }}>
                                            <td style={{ background: el.color }} >{el.id}</td>
                                            <td style={{ background: el.color }}>{el.name}</td>
                                            <td style={{ background: el.color }}>{el.year}</td>
                                        </tr>
                                    )
                            })
                        }
                    </tbody>
                </table>
                <button className={`absolute left-0 top-64 -translate-x-full ${page <= 0 ? 'hidden' : ''}`} onClick={() => {
                    if (page <= 0) return;
                    setPage(page - 1)
                }}><AiFillCaretLeft className='w-5 h-5 md:w-10 md:h-10' /></button>
                <button className={`absolute right-0 top-64 translate-x-full ${page >= items.length / 5 - 1 ? 'hidden' : ''}`} onClick={() => {
                    if (page >= items.length / 5 - 1) return;
                    setPage(page + 1)
                }}><AiFillCaretRight className='w-5 h-5 md:w-10 md:h-10' /></button>
            </div>
            {
                selectedItem !== -1
                &&
                <div className={`z-20 absolute inset-0 flex bg-black bg-opacity-60 justify-center items-center`} >
                    <div className='modal-box  h-96 w-96 flex flex-col justify-center items-center px-10 py-6'>
                        <ul style={{ color: items[selectedItem].color }}>
                            <li className='flex items-center justify-center p-3'>
                                <span className='text-white font-medium'>
                                    ID:
                                </span>
                                <span className='text-2xl font-bold'>
                                    {items[selectedItem].id}
                                </span>
                            </li>
                            <li className='flex items-center justify-center p-3'>
                                <span className='text-white font-medium'>
                                    Name:
                                </span>
                                <span className='text-2xl font-bold'>
                                    {items[selectedItem].name}
                                </span>
                            </li>
                            <li className='flex items-center justify-center p-3'>
                                <span className='text-white font-medium'>
                                    Color:
                                </span>
                                <span className='text-2xl font-bold'>
                                    {items[selectedItem].color}
                                </span>
                            </li>
                            <li className='flex items-center justify-center p-3'>
                                <span className='text-white font-medium'>
                                    Pantone_value:
                                </span>
                                <span className='text-2xl font-bold'>
                                    {items[selectedItem].pantone_value}
                                </span>
                            </li>
                            <li className='flex items-center justify-center p-3'>
                                <span className='text-white font-medium'>
                                    Year:
                                </span>
                                <span className='text-2xl font-bold'>
                                    {items[selectedItem].year}
                                </span>
                            </li>

                        </ul>
                        <button onClick={() => setSelectedItem(-1)} className={'absolute bottom-0 right-0 -translate-x-full -translate-y-full'}><AiOutlineCloseCircle className='w-8 h-8' /></button>

                    </div>
                </div>
            }
            <ToastContainer position="bottom-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
        </div>
    )
}


interface IResource {
    id: number,
    name: string,
    year: number,
    color: string,
    pantone_value: string
}