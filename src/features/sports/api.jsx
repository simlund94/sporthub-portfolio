import { api } from '../../lib/fetcher';

export const SportsApi = {
    sports: () => api('/sports'), // [ {id, name} ]
    events: (date, gender) => api(`/events?fromDate=${date}&teamClass=${gender}&toDate=${date}`),
    eventsById: (id) => api(`/events/${id}?fields=all`),
    eventsByTeam: (teamId, status) => api(`/events?limit=10&status=${status}&team=${teamId}&sort=startDate:desc`),
    allLeagues: () => api(`/leagues`),
    leagueById: (id) => api(`/leagues/${id}`),
    teamsByLeague: (leagueId) => api(`/leagues/${leagueId}/teams`),
    leaguesBySport: (sportId, query) => api(`/leagues?sport=${sportId}${query}`),
    leagueWithTeamsById: (leagueId) => api(`/leagues/${leagueId}`),
    leagueAllSeasonsById: (leagueId) => api(`/leagues/${leagueId}/seasons`),
    leagueStandingsById: (leagueId) => api(`/leagues/${leagueId}/standings`),
    teamById: (id) => api(`/teams/${id}`),
    teamStandings: (teamId) => api(`/teams/${teamId}/leagues`),
    allTeams: ()  => api(`/teams`),
};
