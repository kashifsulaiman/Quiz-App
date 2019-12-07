import React from 'react'

const Stars = ({ difficulty }) => {
    const difficulties = {
        hard: 3,
        medium: 2,
        easy: 1,
    }
    const stars = [] 

    for (let i = 0; i < 3; i++) {
        if(i < difficulties[difficulty] ){
            stars.push(<i className={`fa fa-star `} key={i} />)
        }
        else {
            stars.push(<i style={{color: "lightgray"}} className={`fa fa-star `} key={i} />)

        }
    }
    return <div> {stars} </div>
}

export default Stars 