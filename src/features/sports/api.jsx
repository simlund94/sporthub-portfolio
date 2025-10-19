import { api } from '../../lib/fetcher';

export const SportsApi = {
    sports: () => api('/sports'), // [ {id, name} ]
    leaguesBySport: (sportId, query) => api(`/leagues?sport=${sportId}${query}`),
    teamsByLeague: (leagueId) => api(`/leagues/${leagueId}/teams`),
    events: (date, gender) => api(`/events?fromDate=${date}&teamClass=${gender}&toDate=${date}`),
    eventsById: (id) => api(`/events/${id}?fields=all`),
    eventsByTeam: (teamId, status) => api(`/events?limit=5&status=${status}&team=${teamId}&sort=startDate:desc`),
    teamById: (id) => api(`/teams/${id}`),
    teamStandings: (teamId) => api(`/teams/${teamId}/leagues`),
    allTeams: ()  => api(`/teams`),
    allLeagues: () => api(`/leagues`),
};
