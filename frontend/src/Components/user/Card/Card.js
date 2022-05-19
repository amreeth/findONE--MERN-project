import React from 'react'
import './Card.css'

const Card = () => {
    return (
        <div>
            <div class="background"></div>
            <div id="curve" class="card">
            <img height={300} width={"120%"} src='/images/arunab.jpeg'></img>
                <div class="footer">
                    <div class="connections">
                        <div class="connection facebook"><div class="icon"></div></div>
                        <div class="connection twitter"><div class="icon"></div></div>
                        <div class="connection behance"><div class="icon"></div></div>
                    </div>
                    <div class="info">
                        <div class="name">Filan Fisteku</div>
                        <div class="job">Architect Manager</div>
                    </div>
                </div>
                <div class="card-blur"></div>
            </div>
        </div>
    )
}

export default Card