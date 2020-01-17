import React from 'react';

function PlayerGameLogs(props) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Team</th>
                        <th>Opp</th>
                        <th>MP</th>
                        <th>PTS</th>
                        <th>FGA</th>
                        <th>FGM</th>
                        <th>FG%</th>
                        <th>FG3A</th>
                        <th>FG3M</th>
                        <th>FG3%</th>
                        <th>FTA</th>
                        <th>FTM</th>
                        <th>FT%</th>
                        <th>REB</th>
                        <th>OREB</th>
                        <th>DREB</th>
                        <th>AST</th>
                        <th>STL</th>
                        <th>BLK</th>
                        <th>TOV</th>
                        <th>PF</th>
                    </tr>
                </thead>
                <tbody>
                    {props.logs.map((stats, index) => {
                        return (
                            <tr key={index}>
                                <td>{stats.game.date.split('T')[0]}</td>
                                <td>{stats.team.abbreviation}</td>
                                <td>{stats.game.home_team_id}</td>
                                <td>{stats.min}</td>
                                <td>{stats.pts}</td>
                                <td>{stats.fga}</td>
                                <td>{stats.fgm}</td>
                                <td>{stats.fg_pct}</td>
                                <td>{stats.fg3a}</td>
                                <td>{stats.fg3m}</td>
                                <td>{stats.fg3_pct}</td>
                                <td>{stats.fta}</td>
                                <td>{stats.ftm}</td>
                                <td>{stats.ft_pct}</td>
                                <td>{stats.reb}</td>
                                <td>{stats.oreb}</td>
                                <td>{stats.dreb}</td>
                                <td>{stats.ast}</td>
                                <td>{stats.stl}</td>
                                <td>{stats.blk}</td>
                                <td>{stats.turnover}</td>
                                <td>{stats.pf}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default PlayerGameLogs;
