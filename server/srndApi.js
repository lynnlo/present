import { PrismicLink } from 'apollo-link-prismic';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import superagent from 'superagent';
import gql from 'graphql-tag';
import { apiFetch } from '@codeday/topo/utils';
import { DateTime } from 'luxon';
import config from './config';

function clearTimezone(timezone) {
  return timezone.split('Z')[0];
}

export default class EventInfoApi {
  static async getEventInfo(eventId) {
    return this.getClear(eventId);
  }

  static async getPastProjects() {
    const res = await apiFetch(`query {
      showcase {
        projects (where: { program: "codeday", featured: true, type: GAME, media: IMAGES }, take: 40) {
          id
          name
          eventGroup {
            title
          }
          media(topics:[TEAM,DEMO,PRESENTATION]) {
            image(width: 1920, height: 1080)
            type
          }
        }
      }
    }`);

  return res.showcase?.projects;

  }

  static async getGlobalSponsors() {
    const res = await apiFetch(`query {
      cms {
        globalSponsors {
          items {
            name
              logo {
                url(transform:{width:700})
              }
              audio {
                url
              }
          }
        }
      }
    }`);

    return res.cms.globalSponsors.items.map((sponsor) => ({
      name: sponsor.name,
      logo: sponsor.logo?.url,
      audio: sponsor.audio?.url,
    }));
  }

  static async getCommunityPartners(event) {
    const res = await apiFetch(`query {
    cms {
      communityPartners {
        items {
          logo {
            url
          }
          displayUrl
          blurb
        }
      }
    }
    }`);

    return res.cms.communityPartners.items.map((communityPartner) => ({
      display_url: communityPartner.displayUrl,
      blurb: communityPartner.blurb,
      logo: communityPartner.logo?.url
    }))
  }

  static async getHackathons(event) {
    return []; // TODO(@tylermenezes)
  }

  static async getAllEvents() {
    const events = await apiFetch(`
      query AllEvents($now: ClearDateTime!){
        clear {
          events(where:{endDate:{gte:$now}}) {
            id
            name
          }
        }
      }
    `, { now: DateTime.now().minus({ days: 1 }).toISO() });
    return events.clear.events;
  }

  static async getClear(eventId) {
    const res = await apiFetch(`
      query GetEventQuery ($eventId: String!, $now: CmsDateTime!){
        clear {
          event(where:{id: $eventId}) {
            id
            regionName: name
            webname: contentfulWebname
            startDate
            endDate
            venue {
              name
            }
            sponsors {
              name
              logo: logoImageUri
            }
            schedule(orderBy:{start:asc}, where:{finalized: { equals: true }, internal: { equals: false }}) {
              name
              start
            }
          }
        }

        cms {
          events (limit: 1, where: { program:{ webname:"codeday" }, endsAt_gte: $now }) {
            items {
              title
              startsAt
              kickoffVideo {
                url
              }
              kickoffVideoCaptions {
                url
              }
              theme
              themeBackgrounds {
                items {
                  url(transform:{width:1920, height:1080, resizeStrategy:FIT})
                }
              }
            }
          }
        }
      }
    `, { eventId, now: DateTime.now().minus({ days: 1 }).toISO()  });

    const event = res.clear?.event;
    const eventGroup = res.cms?.events?.items[0];
    if (!eventGroup || !event) return null;

    const region = await apiFetch(`
      query GetRegion ($webname: String!) {
        cms {
          regions (where:{webname: $webname}, limit: 1) {
            items {
              timezone
            }
          }
        }
      }
    `, { webname: event.webname })
    const timezone = region?.cms?.regions.items[0]?.timezone || 'America/Los_Angeles';


    const eventStart = DateTime.fromISO(clearTimezone(event.startDate), { zone: timezone }).set({ hour: 12 });
    const eventEnd = DateTime.fromISO(clearTimezone(event.endDate), { zone: timezone }).set({ hour: 12 });

    return {
      id: eventId,
      name: `CodeDay ${event.regionName} ${eventGroup.title.replace('CodeDay ', '')}`,
      webname: event.webname,
      regionName: event.regionName,
      batchName: eventGroup.title.replace('CodeDay ', ''),
      venueName: event.venue?.name,
      startsAt: eventStart.toISO(),
      endsAt: eventEnd.toISO(),
      tz: timezone,
      schedule: {X: event.schedule?.map((se) => ({
        title: se.name,
        time: Math.round(DateTime.fromISO(se.start).setZone(timezone).diff(eventStart, 'hours').hours*100)/100,
        hour: DateTime.fromISO(se.start).setZone(timezone).toFormat('h:mm a'),
        timestamp: {
          date: DateTime.fromISO(se.start).setZone(timezone).toISO(),
          timezone,
        },
      }))},
      sponsors: event.sponsors,
      kickoffVideo: eventGroup.kickoffVideo?.url,
      kickoffVideoCaptions: eventGroup.kickoffVideoCaptions?.url,
      theme: eventGroup.theme,
      themeImages: eventGroup.themeBackgrounds?.items?.map((b) => b.url),
    };
  }
}
