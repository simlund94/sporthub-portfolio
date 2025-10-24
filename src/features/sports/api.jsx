import { api } from '../../lib/fetcher';

export const SportsApi = {
    sports: () => api('/sports'), // [ {id, name} ]
    events: (date, gender) => api(`/events?fromDate=${date}&teamClass=${gender}&toDate=${date}`),
    eventsById: (id) => api(`/events/${id}?fields=all`),
    eventsByTeam: (teamId, status) => api(`/events?limit=20&status=${status}&team=${teamId}&sort=startDate:desc`),
    eventsByLeagueIdAndStatus: (id,status,order) => api(`/events?league=${id}&status=${status}&sort=startDate:${order}`),
    allLeagues: () => api(`/leagues?limit=100`),
    leagueById: (id) => api(`/leagues/${id}`),
    leagueByIdWithEvents: (id, status, fromDate, toDate) => api(`/leagues/${id}/events?fields=all&status=${status}&fromDate=${fromDate}&toDate=${toDate}`),
    leagueByIdLastFiveGames: (id, status, teamId) => api(`/leagues/${id}/events?fields=all&status=${status}&team=${teamId}`),
    leaguesByTeamId: (teamId) => api(`/leagues?${teamId}`),
    teamsByLeagueId: (leagueId) => api(`/leagues/${leagueId}/teams`),
    leaguesBySport: (sportId, query) => api(`/leagues?sport=${sportId}${query}`),
    leagueWithTeamsById: (leagueId) => api(`/leagues/${leagueId}`),
    leagueAllSeasonsById: (leagueId) => api(`/leagues/${leagueId}/seasons`),
    leagueStandingsById: (leagueId) => api(`/leagues/${leagueId}/standings`),
    teamById: (id) => api(`/teams/${id}`),
    teamStandings: (teamId) => api(`/teams/${teamId}/leagues?limit=1`),
    allTeams: ()  => api(`/teams`),
leagueScoringLeadersById:(leagueId) => api(`/leagues/${leagueId}/scoring-leaders?limit=15`),
    leagueAssistLeadersById:(leagueId) => api(`/leagues/${leagueId}/assist-leaders?limit=15`),


};
