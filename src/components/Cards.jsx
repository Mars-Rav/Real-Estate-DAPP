import React from 'react'

const Cards = ({ homes }) => {
    return (
        <div className="cards">
            {
                homes ? (

                    homes.map((home, id) => (
                        <div className="card" key={id}>
                            <div className="card__image">
                                <img src={home.image} alt="Home" />
                            </div>
                            <div className='card__info'>
                                <h4>{home.attributes[0].value}</h4>
                                <p>
                                    <strong>{home.attributes[2].value}</strong> bds |
                                    <strong>{home.attributes[3].value}</strong> ba |
                                    <strong>{home.attributes[4].value}</strong> sqft
                                </p>
                                <p>{home.address}</p>
                            </div>
                        </div>
                    )
                    )
                    
                ) : (
                        
                    <h3>
                        No homes were found.
                    </h3>

                )
            }
        </div>
    )
}

export default Cards
