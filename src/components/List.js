import React from 'react'

export default function List (props) {
    const {remove, items, toggle} = props
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>
                    <span
                        onClick={() => (toggle?toggle(item.id):'none')}
                        style={{textDecoration: item.complete?'line-through':'none'}}
                    >{item.name}</span>
                    <button
                        onClick={() => remove(item)}
                    >X</button>
                </li>
            ))}
        </ul>
    )
}