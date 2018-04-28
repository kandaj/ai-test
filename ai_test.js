#! /usr/bin/env node
var _ = require('underscore');

class Travel {
    constructor() {
        this.peopleInSectionA = [{name:'Edwin',walkTime:10},
            {name:'Neil',walkTime:1},
            {name:'Michael',walkTime:2},
            {name:'Valentina',walkTime:3},
            {name:'Yuri',walkTime:5}]

         this.peopleInSectionB = [];
         this.timeRemaining = 21;
    }

    start() {
        let i = 0;
        let travelRound = (this.peopleInSectionA.length - 1);
        let travelingPeople;

        while (i < travelRound) {
            this.peopleInSectionA = _.sortBy(this.peopleInSectionA, 'walkTime');
            if (_.isEmpty(this.peopleInSectionB)) {
                travelingPeople = this.peopleInSectionA.splice(0,2);
                this.peopleInSectionA = this.peopleInSectionA.concat(this.destination(travelingPeople))
            } else {
                if(this.peopleInSectionA.length >= travelRound  ) {
                    this.peopleInSectionA = this.peopleInSectionA.reverse();
                    travelingPeople = this.peopleInSectionA.splice(0,2);
                    this.peopleInSectionA = this.peopleInSectionA.concat(this.destination(travelingPeople))
                } else if (this.peopleInSectionA.length > 2 )  {
                    travelingPeople = travelingPeople.concat(this.peopleInSectionA.splice(0,1),this.peopleInSectionA.splice(-1));
                    this.peopleInSectionA =  this.peopleInSectionA.concat(this.destination(travelingPeople))
                } else {
                    this.peopleInSectionA =  this.peopleInSectionA.splice(0,2);
                    this.destination(this.peopleInSectionA)
                }
            }
            travelingPeople = [];
            i++;
        }
    }

    destination(inComingPeople) {
        this.peopleInSectionB = this.peopleInSectionB.concat(inComingPeople)
        this.getTravelTime(inComingPeople)
        this.peopleInSectionB = _.sortBy(this.peopleInSectionB, 'walkTime');
        if (this.peopleInSectionB.length < 5) {
            return this.peopleInSectionB.splice(0,1);
        }
    }

    getTravelTime(inComingPeople) {
        this.peopleInSectionB = _.sortBy(this.peopleInSectionB, 'walkTime');
        inComingPeople =  _.sortBy(inComingPeople, 'walkTime')
        let peopleTraveled = [];
        _.each(inComingPeople, function(index) {
            peopleTraveled.push(index.name+'('+index.walkTime+')')
        });
        let returningGuy = _.first(this.peopleInSectionB);
        let timeTaken = (_.last(inComingPeople).walkTime + returningGuy.walkTime);
        this.log(peopleTraveled,returningGuy,timeTaken)
        return timeTaken;
    }
    log(incomig, outgoing, timeTaken) {
        let inState = incomig.join(',')+' are moving from Section A to Section B'
        let outState = 'with'+outgoing.name+'('+outgoing.walkTime+') going back.'
        this.timeRemaining = (this.timeRemaining - timeTaken);
        let timeRemaing = '\nTime remaining is '+this.timeRemaining+'\n'
        if(this.peopleInSectionB.length == 5) {
            timeRemaing = '\nMission Accomplished'
            outState = '';
        }
        console.log(inState+outState+timeRemaing)
    }
}

let travel = new Travel()
travel.start();