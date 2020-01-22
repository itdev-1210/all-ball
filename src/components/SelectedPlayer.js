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

function SelectedPlayer(props) {
    return (
        <div>
            <NameContainer>
                <FirstName>{props.player.first_name} </FirstName>
                <LastName>{props.player.last_name}</LastName>
            </NameContainer>
            <TeamNameContainer>
                <h2>{props.player.team.full_name}</h2>
            </TeamNameContainer>
            <ProportionContainer>
            <h3>Height: {props.player.height_feet}'{props.player.height_inches}</h3>
            <h3>Weight: {props.player.weight_pounds}</h3>
            </ProportionContainer>
        </div>
    );
}

export default SelectedPlayer;
