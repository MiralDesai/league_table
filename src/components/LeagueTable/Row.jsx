import FormGuide from './FormGuide';
import { SPORTS_WITH_DRAWS } from '../../utils/constants';

const LeagueTableRow = ({ player, index, isLeagueFinished, sport }) => (
  <tr className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/40 ${isLeagueFinished && index === 0 ? 'bg-yellow-200 dark:bg-yellow-800/40' : ''}`}>
    <td className="p-3 font-bold">{index + 1}</td>
    <td className="p-3 font-semibold">{player.name}</td>
    <td className="p-3 text-center">{player.played}</td>
    <td className="p-3 text-center">{player.won}</td>
    {SPORTS_WITH_DRAWS.includes(sport) && <td className="p-3 text-center">{player.drawn}</td>}
    <td className="p-3 text-center">{player.lost}</td>
    <td className="p-3 text-center hidden sm:table-cell">{player.pf}</td>
    <td className="p-3 text-center hidden sm:table-cell">{player.pa}</td>
    <td className="p-3 text-center font-medium">{player.pd}</td>
    <td className="p-3"><FormGuide form={player.form} /></td>
    <td className="p-3 font-bold text-indigo-700 dark:text-indigo-400 text-center">{player.points}</td>
  </tr>
);

export default LeagueTableRow;
