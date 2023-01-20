import React, { useEffect, useState } from 'react'
import { trpc } from "./trpc";

export default function FrontPage() {
    const [userInput, setUserInput] = useState("");
    const [selectedItem, setSelectedItem] = useState(-1)
    const [items, setItems] = useState<IResource[]>([]);

    const searchItem = trpc.getItems.useMutation({
        onSuccess: (data) => {
            setItems(data);
        }
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

            <div className="overflow-x-auto w-full py-8">
                <table className="table w-full overflow-x-auto">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((el) => {
                                return (
                                    <tr>
                                        <td>{el.id}</td>
                                        <td>{el.name}</td>
                                        <td>{el.year}</td>
                                    </tr>
                                )
                            })
                        }
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