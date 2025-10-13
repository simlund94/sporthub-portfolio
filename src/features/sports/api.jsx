import { api } from '../../lib/fetcher';

export const SportsApi = {
  sports: () => api('/sports'), // [ {id, name} ]
  leaguesBySport: (sportId,query) => api(`/leagues?sport=${sportId}${query}`),
  teamsByLeague: (leagueId) => api(`/leagues/${leagueId}/teams`),
};
