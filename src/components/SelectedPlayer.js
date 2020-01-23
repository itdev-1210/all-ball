import React from 'react';

import styled from 'styled-components'

const NameContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-size: 25px;
`

const TeamNameContainer = styled.div`
    display: flex;
    justify-content: center;
`

const FirstName = styled.h1`
    margin-bottom: 0px;
    margin-top: 0px;
    text-align: center;
`

const LastName = styled.h1`
    margin-bottom: 0px;
    margin-left: 13px;
    margin-top: 0px;
    text-align: center;
`

const ProportionContainer = styled.div`
    display: flex;
    justify-content: center;
`

const VerticalLine = styled.div`
    border-right: 2px solid black;
    height: 30px;
    margin-left: 20px;
    margin-right: 19px;
    margin-top: 15px;
`

function SelectedPlayer(props) {
    const heightAndWeight = props.player.height_feet ? 
    <ProportionContainer>
        <h3>{props.player.height_feet}'{props.player.height_inches}</h3>
        <VerticalLine/>
        <h3>{props.player.weight_pounds}</h3>
    </ProportionContainer>
    : null
    
    return (
        <div>
            <NameContainer>
                <FirstName>{props.player.first_name} </FirstName>
                <LastName>{props.player.last_name}</LastName>
            </NameContainer>
            <TeamNameContainer>
                <h2>{props.player.team.full_name}</h2>
            </TeamNameContainer>
            {heightAndWeight}
        </div>
    );
}

export default SelectedPlayer;
