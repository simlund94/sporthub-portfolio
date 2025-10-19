import {api} from '../../lib/fetcher';

export const SportsApi = {
    sports: () => api('/sports'), // [ {id, name} ]
    leaguesBySport: (sportId, query) => api(`/leagues?sport=${sportId}${query}`),
    teamsByLeague: (leagueId) => api(`/leagues/${leagueId}/teams`),
    events: (date, gender) => api(`/events?fromDate=${date}&teamClass=${gender}&toDate=${date}`),
    eventsById: (id) => api(`/events/${id}?fields=all`),
    leagueWithTeamsById: (leagueId) => api(`/leagues/${leagueId}`),
    leagueAllSeasonsById: (leagueId) => api(`/leagues/${leagueId}/seasons`),
    leagueStandingsById: (leagueId) => api(`/leagues/${leagueId}/standings`)
};
