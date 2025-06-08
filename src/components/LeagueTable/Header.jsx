import { SPORTS_WITH_DRAWS } from '../../utils/constants';

const LeagueTableHeader = ({ sport }) => (
  <thead className="bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 uppercase">
    <tr>
      <th className="p-3 font-semibold">Pos</th>
      <th className="p-3 font-semibold">Player</th>
      <th className="p-3 font-semibold text-center">P</th>
      <th className="p-3 font-semibold text-center">W</th>
      {SPORTS_WITH_DRAWS.includes(sport) && <th className="p-3 font-semibold text-center">D</th>}
      <th className="p-3 font-semibold text-center">L</th>
      <th className="p-3 font-semibold text-center hidden sm:table-cell">PF</th>
      <th className="p-3 font-semibold text-center hidden sm:table-cell">PA</th>
      <th className="p-3 font-semibold text-center">PD</th>
      <th className="p-3 font-semibold text-center normal-case">Last 3</th>
      <th className="p-3 font-bold text-center">Pts</th>
    </tr>
  </thead>
);

export default LeagueTableHeader;
