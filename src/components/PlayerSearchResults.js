import React from 'react';

import styled from 'styled-components';

const PlayerInnerContainer = styled.div`
    border: 1px solid black;
    display: flex;
    flex: 0 1 20%;
    justify-content: center;
    list-style: none;
    margin: 3px;
    padding: 20px 10px;
`

const PlayerFirstName = styled.div`
`

const PlayerLastName = styled.div`
    margin-left: 5px;
`

function PlayerSearchResults(props) {
    return (
        <PlayerInnerContainer onClick={props.onClick} style={{flex: '0 1 20%'}}>
            <PlayerFirstName>{props.players.first_name}</PlayerFirstName>
             <PlayerLastName>{props.players.last_name}</PlayerLastName>
        </PlayerInnerContainer>
    );
}

export default PlayerSearchResults;