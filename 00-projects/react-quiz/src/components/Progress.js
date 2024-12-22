import React from 'react'

export default function Progress({ index, numQuestions, points, maxPoints }) {
    return (
        <header className='progress'>
            <p>Question <strong>{index + 1}</strong> / {numQuestions}</p>
            <p><strong>{points}</strong> / {maxPoints}</p>
        </header>
    )
}
