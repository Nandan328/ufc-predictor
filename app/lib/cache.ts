import { Events } from "./types";

let upcomingEvents: Events[] = [];
let previousEvents: Events[] = [];

const setUpcomingEvents = (events: Events[]) => {
  upcomingEvents = events;
};

const setPreviousEvents = (events: Events[]) => {
  previousEvents = events;
};

const getUpcomingEvents = () => {
  return upcomingEvents;
};

const getPreviousEvents = () => {
  return previousEvents;
};


export { setUpcomingEvents, setPreviousEvents, getUpcomingEvents, getPreviousEvents };