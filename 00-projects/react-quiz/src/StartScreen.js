import React from 'react'

export default function StartScreen({ numQuestions }) {
    return (
        <div className='start'>
            <h2>Welcome to the React Quiz</h2>
            <h3>{numQuestions} Questions to test your React Mastery</h3>
            <button className='btn btn-ui'>Let's Start</button>
        </div>
    )
}
