import {Counter,Trend,Rate,Gauge} from 'k6/metrics';
import http from 'k6/http';
import { check, sleep } from 'k6';
const { htmlReport } = require("https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js");

const failedRequestCounter= new Counter('failed_requests');
const responseTimeTrend = new Trend('response_time');
const successfulRate = new Rate('successful_requests');
const totalRequests= new Counter('total_requests')
const activeUsers = new Gauge('active_users');
export let options={
    stages:[
        {duration:'15s', target:50},
        {duration:'60s', target:60},
        {duration:'15s', target:0},
    ],
    thresholds:{
        http_req_duration:["p(95)<300"],
        // http_req_duration:["p(99)<200"],
        http_req_failed:["rate<0.01"],
        'http_reqs{expected_response:true}':['rate>10']
    }
}
export function handlingFailedRequests(){
    console.log(`Failed requests:`, failedRequestCounter.name)
}
export default function(){
    let authenticateDuration, retrieveBookingDuration, createBookingDuration
    
    const startTimeAuthenticate= new Date().getTime();
    authenticate()
    const endTimeAuthenticate= new Date().getTime();
    authenticateDuration=(endTimeAuthenticate-startTimeAuthenticate)/1000;

    const startTimeRetrive= new Date().getTime()
    retrieveBookings()
    const endTimeRetrive= new Date().getTime()
    retrieveBookingDuration= (endTimeRetrive-startTimeRetrive)/1000

    const startTimeCreate= new Date().getTime()
    createBooking()
    const endTimeCreate= new Date().getTime()
    createBookingDuration=(endTimeCreate-startTimeCreate)/1000

    const startTimeTotal= new Date.getTime();
    const endTimeTotal = new Date.getTime();
    const testDuration= (endTimeTotal-startTimeTotal)/1000

    responseTimeTrend.add(authenticateDuration,{type:'authenticate'});
    responseTimeTrend.add(retrieveBookingDuration,{type:'retrieveBookings'});
    responseTimeTrend.add(createBookingDuration,{type:'createBooking'});

    responseTimeTrend.add(testDuration,{type:'test'});
    successfulRate.add(true,{type:'test'});
    totalRequests.add(1,{type:'test'});
    activeUsers.add(__VU, { type: 'test' });
}
function authenticate(){
    const url='https://restful-booker.herokuapp.com/auth'
    const payload=JSON.stringify({
        "userName":"shirisha",
        "password":"pass"
    })
    const param={
        headers:{
            'Content-Type':'application/json',
        },
    }
    const response= http.post(url,payload,param);
    const statusCheck = check(response, {
        'status is 200': (r) => r.status === 200
    }, { type: 'authentication' });

    if (!statusCheck) {
        failedRequestCounter.add(1);
    }
    sleep(1);
}
function retrieveBookings(){
    const response=http.get('https://restful-booker.herokuapp.com/booking');
    const statusCheck = check(response, {
        'status is 200': (r) => r.status === 200
    }, { type: 'retrieve_booking' });

    if (!statusCheck) {
        failedRequestCounter.add(1);
    }
    sleep(1)
}
function createBooking(){
    const url='https://restful-booker.herokuapp.com/booking';   

    const payload=JSON.stringify({
        "firstname":"Jim",
        "lastname":"brown",
        "totalprice":111,
        "depositpaid":true,
        "bookingdates":{
            "checkin":"2018-01-01",
            "checkout":"2019-01-01"
        },
        "additionalneeds":"Breakfast"
    });
    const params={
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
    };
    const response= http.post(url,payload,params);
    const statusCheck = check(response, {
        'status is 200': (r) => r.status === 200,
        'response time is less than 250ms': (r) => r.timings.duration < 250
    }, { type: 'create_booking' });

    if (!statusCheck) {
        failedRequestCounter.add(1);
    }
}
export function handleSummary(data){
    return{
        "reports/index/performance.html":htmlReport(data)
    }
}