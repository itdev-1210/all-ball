import React from 'react';

function PlayerStats(props) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(21, 1fr)',
            borderTop: '1px solid black', borderRight: '1px solid black', fontSize: 10
        }}>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>SEASON</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>GP</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>MIN</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>PTS</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>FGA</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>FGM</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>FGPCT</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>FG3M</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>FG3A</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>FG3PCT</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>FTM</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>FTA</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>AST</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>REB</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>DREB</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>OREB</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>AST</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>STL</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>BLK</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>TOV</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>PF</span>

            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>{props.seasonStats.season}</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>{props.seasonStats.games_played}</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>{props.seasonStats.min}</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>{props.seasonStats.pts}</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>{props.seasonStats.fga}</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>{props.seasonStats.fgm}</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>{props.seasonStats.fg_pct}</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>{props.seasonStats.fg3m}</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>{props.seasonStats.fg3a}</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>{props.seasonStats.fg3_pct}</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>{props.seasonStats.ftm}</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>{props.seasonStats.fta}</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>{props.seasonStats.ast}</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>{props.seasonStats.reb}</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>{props.seasonStats.dreb}</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>{props.seasonStats.oreb}</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>{props.seasonStats.ast}</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>{props.seasonStats.stl}</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>{props.seasonStats.blk}</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>{props.seasonStats.turnover}</span>
            <span style={{ padding: 1, borderLeft: '1px solid black', borderBottom: '1px solid black' }}>{props.seasonStats.pf}</span>
        </div>
    );
}

export default PlayerStats;