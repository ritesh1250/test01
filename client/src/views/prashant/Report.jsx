import React, { Component } from 'react';
import SimpleChart2 from "../charts/SimpleChart2";
import http from "./services/httpServices";
import apiUrl from "./config.json";
import { paginate } from "./paginate";
import axios from "axios"
import Chart from 'react-apexcharts'
import {Spinner} from "react-bootstrap"
import auth from "./services/authServices";
import './Report.css';
// import queryString from "query-string";
import {
  CBadge,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabPane,
  CTabContent,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CTooltip,
  CCol,
  CCarousel,
  CCarouselIndicators,
  CCarouselInner,
  CCarouselItem,
  CCarouselCaption,
  CCarouselControl,
  CSwitch,
  CButton,
  CDataTable,
  CWidgetIcon
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import DateTime from './DateTime';
import { some } from 'lodash';
import slide1 from '../../assets/icons/slide1.svg'
import slide2 from '../../assets/icons/slide2.svg'
import slide3 from '../../assets/icons/slide3.svg'
import slide4 from '../../assets/icons/slide4.svg'

const slides = [
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2005%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1607923e7e2%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1607923e7e2%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.9296875%22%20y%3D%22217.75625%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2005%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2005%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
]

const moment = extendMoment(Moment);

class Report extends Component {
  state = {
    dateT:"",
    modalldata:['modapprovepostresult'],
    modalldatanum:['data'],
    sts: true,
    user: { firstName: "", lastName: "", username: "", email: "", password: "", role_name: "" },
    view: "",
    page: 0,
    userSummary:['username'],
    options: {

    },
    series: [

    ]
    ,
    options1: {

    },
    series1: [

    ],

    series2: [],
    options2: {
              colors:["#00E396","#FEB019","#FF4560","#775DD0"], 
              chart: {
                height: 350,
                type: 'radialBar',
              
              },
              plotOptions: {
                radialBar: {
                  dataLabels: {
                    name: {
                      fontSize: '22px',
                    },
                    value: {
                      fontSize: '16px',
                    },
                    total: {
                      show: true,
                      label: 'Total',
                      formatter: function (w) {
                        // console.log(w);
                        // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                        return '100%'
                      }
                    }
                  }
                }
              },
              labels: ['Approved', 'Hold', 'Rejected'],
            },
            series3: [],
            options3: {
              chart: {
                height: 350,
                type: 'radialBar',
                toolbar: {
                  show: false
                }
              },
              plotOptions: {
                radialBar: {
                  startAngle: -135,
                  endAngle: 225,
                   hollow: {
                    margin: 0,
                    size: '70%',
                    background: '#fff',
                    image: undefined,
                    imageOffsetX: 0,
                    imageOffsetY: 0,
                    position: 'front',
                    dropShadow: {
                      enabled: true,
                      top: 3,
                      left: 0,
                      blur: 4,
                      opacity: 0.24
                    }
                  },
                  track: {
                    background: '#fff',
                    strokeWidth: '67%',
                    margin: 0, // margin is in pixels
                    dropShadow: {
                      enabled: true,
                      top: -3,
                      left: 0,
                      blur: 4,
                      opacity: 0.35
                    }
                  },
              
                  dataLabels: {
                    show: true,
                    name: {
                      offsetY: -10,
                      show: true,
                      color: '#888',
                      fontSize: '17px'
                    },
                    value: {
                      formatter: function(val) {
                        return parseInt(val);
                      },
                      color: '#111',
                      fontSize: '36px',
                      show: true,
                    }
                  }
                }
              },
              fill: {
                type: 'gradient',
                gradient: {
                  shade: 'dark',
                  type: 'horizontal',
                  shadeIntensity: 0.5,
                  gradientToColors: ['#ABE5A1'],
                  inverseColors: true,
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [0, 100]
                }
              },
              stroke: {
                lineCap: 'round'
              },
              labels: ['Percent'],
            },
            sessionchart:[{data:[
          ]}],
            series4: [
              {
                data: [
                  {
                    x: 'Analysis',
                    y: [
                      new Date('2019-03-04 12:00').getTime(),
                      new Date('2019-03-04 16:00' ).getTime()
                    ],
                    fillColor: '#008FFB'
                  },
                  {
                    x: 'Analysis',
                    y: [
                      new Date('2019-03-04 17:00').getTime(),
                      new Date('2019-03-04 19:00' ).getTime()
                    ],
                    fillColor: '#008FFB'
                  },
                  {
                    x: 'Design',
                    y: [
                      new Date('2019-03-04 13:00').getTime(),
                      new Date('2019-03-04 15:00').getTime()
                    ],
                    fillColor: '#00E396'
                  },
                  {
                    x: 'Coding',
                    y: [
                      new Date('2019-03-04 08:10').getTime(),
                      new Date('2019-03-04 11:00').getTime()
                    ],
                    fillColor: '#775DD0'
                  },
                  {
                    x: 'Testing',
                    y: [
                      new Date('2019-03-04 11:00').getTime(),
                      new Date('2019-03-04 17:30').getTime()
                    ],
                    fillColor: '#FEB019'
                  }
                ]
              }
            ],
            options4: {
              chart: {
                height: 350,
                type: 'rangeBar'
              },
              plotOptions: {
                bar: {
                  horizontal: true,
                  distributed: true,
                  dataLabels: {
                    hideOverflowingLabels: false
                  }
                }
              },
              dataLabels: {
                enabled: true,
                formatter: function(val, opts) {
                  var label = opts.w.globals.labels[opts.dataPointIndex]
                  var a = moment(val[0])
                  var b = moment(val[1])
                  var diff = b.diff(a, 'minutes')
                  return diff + (diff > 1 ? ' minutes' : ' minute')
                },
                style: {
                  colors: ['#000000']
                }
              },
              xaxis: {
                type: 'datetime'
              },
              yaxis: {
                show: false
              },
              grid: {
                row: {
                  colors: ['#f3f4f5', '#fff'],
                  opacity: 1
                }
              }
            },

  }
  async componentDidMount() {
    const tokenStr = localStorage.getItem("token")
    const data1 = await http.get(apiUrl.apiEnd + "/getalluserdata", { headers: { "Authorization": `Bearer ${tokenStr}` } })
    this.setState({ usersData: data1.data.result,
      // usersData1: data1.data.result,  page: data1.data.result.length
     })
  }
  handleSummary = async (n1,key1) => {
    this.setState({ loading: true });
    if (key1=="MONTH"){
      this.setState({
        class2:'active',
        class1:'', 
        class3:'',
        class4:''
       })
    }
    
    const tokenStr = localStorage.getItem("token")
    const data = {
      chart: {
        id: 'apexchart-example'
      },
      xaxis: {
        categories: []
      },
      colors: ["#41B883", "#E46651", '#FB8833']
    };
    const sts = [
      {
        name: 'Total approve',
        data: []
      },
      {
        name: 'Total Reject',
        data: []
      },
      {
        name: 'Total Hold',
        data: []
      }
    ]
    const data2 = {
      chart: {
        id: 'apexchart-example'
      },
      xaxis: {
        categories: []
      },
      colors: ["#41B883", "#E46651", '#FB8833']
    };
    const sts1 = [
      {
        name: 'Total approve',
        data: []
      },
      {
        name: 'Total Reject',
        data: []
      },
      {
        name: 'Total Hold',
        data: []
      }
    ]
    // const user={...this.state.userSummary}
    // console.log(user)
    let data1 ;
    if (key1=="CUSTOM"){
     data1 = await axios.post(apiUrl.apiEnd + "/getagentdatabyid", { mod_id:n1.id,mod_username: n1.username, mod_roleid: n1.role_id ,key:key1,date:n1.date}, { headers: { "Authorization": `Bearer ${tokenStr}` } })
    }
    else{
      data1 = await axios.post(apiUrl.apiEnd + "/getagentdatabyid", { mod_id:n1.id,mod_username: n1.username, mod_roleid: n1.role_id ,key:key1}, { headers: { "Authorization": `Bearer ${tokenStr}` } })
    console.log(data1)

    }



    

    
    sts[0].data = data1.data[0].dailyDataresult.map(n1 => n1.Approved)
    sts[2].data = data1.data[0].dailyDataresult.map(n1 => n1.Hold)
    sts[1].data = data1.data[0].dailyDataresult.map(n1 => n1.Rejected)

    data.xaxis.categories = data1.data[0].dailyDataresult.map(n1 => new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(n1.Date)))
   
    if(data1.data[0].radialdataresult.length >0){
      const approved= ((data1.data[0].radialdataresult[0].Approved)/(data1.data[0].radialdataresult[0].Approved+data1.data[0].radialdataresult[0].Hold+data1.data[0].radialdataresult[0].Rejected)*100).toFixed(2);
      const Hold= ((data1.data[0].radialdataresult[0].Hold)/(data1.data[0].radialdataresult[0].Approved+data1.data[0].radialdataresult[0].Hold+data1.data[0].radialdataresult[0].Rejected)*100).toFixed(2);
      const rejected= ((data1.data[0].radialdataresult[0].Rejected)/(data1.data[0].radialdataresult[0].Approved+data1.data[0].radialdataresult[0].Hold+data1.data[0].radialdataresult[0].Rejected)*100).toFixed(2);
      const total= (data1.data[0].radialdataresult[0].Approved+data1.data[0].radialdataresult[0].Hold+data1.data[0].radialdataresult[0].Rejected)      
      this.setState({modalldatanum:[total,data1.data[0].radialdataresult[0].Approved,data1.data[0].radialdataresult[0].Hold,data1.data[0].radialdataresult[0].Rejected]})
      this.setState({ series2:[approved,Hold,rejected],series3:[approved]});

    }
    // this.setState({modalldatanum:[total,data1.data[0].radialdataresult[0].Approved,data1.data[0].radialdataresult[0].Hold,data1.data[0].radialdataresult[0].Rejected]})
    this.setState({ series: sts,modalldata:data1.data[0].modpostData, options: data});

   
   var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    sts1[0].data = data1.data[0].monthlyDataresult.map(n1 => n1.Approved)
    sts1[1].data = data1.data[0].monthlyDataresult.map(n1 => n1.Rejected)
    sts1[2].data = data1.data[0].monthlyDataresult.map(n1 => n1.Holded)
    data2.xaxis.categories = data1.data[0].monthlyDataresult.map(n1 => month[n1.month - 1])

     
    if(this.state.key=='TODAY'){
      for(let a=0;a<data1.data[0].sessiondataresult.length;a++){
          // console.log("db",data1.data[0].sessiondataresult[a].logindate)
          // console.log("after",moment(data1.data[0].sessiondataresult[a].logindate).utcOffset("+11:00").format())
        this.state.sessionchart[0].data.push({
          x: 'Online',
          y: [
            new Date(moment(data1.data[0].sessiondataresult[a].logindate).utcOffset("+11:00").format()).getTime(),
            new Date(moment(data1.data[0].sessiondataresult[a].logoutdate).utcOffset("+11:00").format()).getTime()
            // new Date("n1.logindate").getTime(),
            // new Date(n1.logoutdate).getTime()
          ],
          fillColor: '#00E396'
        })
       }
  
       let day = moment("00:00:00", "HH:mm:ss").range("day");
       let ranges = [];
       for(let a=0;a<data1.data[0].sessiondataresult.length;a++){
        ranges.push(moment(data1.data[0].sessiondataresult[a].logindate, "HH:mm:ss").range("minute"),moment(data1.data[0].sessiondataresult[a].logoutdate, "HH:mm:ss").range("minute"))
       }
  
      let offlinechart = subtractRanges(day, ranges);
      // console.log(this.state.sessionchart)
      console.log(offlinechart);
      // for(let a=0;a<offlinechart.length;a++){
      //   this.state.sessionchart[0].data.push({
      //     x: 'Offline',
      //     y: [
      //       new Date(offlinechart[a].start._d).getTime(),
      //       new Date(offlinechart[a].end._d).getTime()
      //       // new Date("n1.logindate").getTime(),
      //       // new Date(n1.logoutdate).getTime()
      //     ],
      //     fillColor: '#FF4560'
      //   })
      // }
  
  
       // let ranges = [moment("10:00:00", "HH:mm:ss").range("hour"), moment("16:00:00", "HH:mm:ss").range("hour")];
      // console.log(subtractRanges(day, ranges));
  
      function subtractRanges(longRanges, shortRanges)
    {
      // Always return an array
      if(shortRanges.length === 0)
        return longRanges.hasOwnProperty("length")
          ? longRanges
          : [longRanges];
  
      // Result is empty range
      if(longRanges.length === 0)
        return [];
  
      if(!longRanges.hasOwnProperty("length"))
        longRanges = [longRanges];
  
      for(let long in longRanges)
      {
        for(let short in shortRanges)
        {
          longRanges[long] = longRanges[long].subtract(shortRanges[short])
          if(longRanges[long].length === 0)
          {
            // Subtracted an entire range, remove it from list
            longRanges.splice(long, 1);
            shortRanges.splice(0, short);
            return subtractRanges(longRanges, shortRanges);
          }
          else if(longRanges[long].length === 1)
          {
            // No subtraction made, but .subtract always returns arrays
            longRanges[long] = longRanges[long][0];
          }
          else
          {
            // Successfully subtracted a subrange, flatten and recurse again
            const flat = [].concat(...longRanges);
            shortRanges.splice(0, short);
            return subtractRanges(flat, shortRanges);
          }
        }
      }
      return longRanges;
    }
  
  
  
    }

     
    this.setState({ series1: sts1, options1: data2, view: 1 })
    // const usersummary1 ={
    //   username:n1.username,
    //   role_id:n1.role_id
    // }
    this.setState({ userSummary:[n1.username,n1.role_id,n1.id],loading:false
      })
  }


  handleToUpdate = (someArg) => {
    
    //  console.log(someArg);
     this.setState({ dateT :someArg }, () =>{
      if(this.state.dateT.enddate2 != null){
        this.handletab('CUSTOM')
      }
     }
   );
     
  }

  
  handletab = (someArg) => {

    const usernewdata={
      username:this.state.userSummary[0],
      role_id:this.state.userSummary[1],
      id:this.state.userSummary[2],
      date:{'start':this.state.dateT.startdate1,'end':this.state.dateT.enddate2}
    }
    if (someArg=='TODAY'){
     this.handleSummary(usernewdata,'TODAY')
      this.setState({
        key :someArg,
        class1:'active',        
        class2:'',
        class3:'',
        class4:''
      });
    }
    else if(someArg=='MONTH'){
      
      this.handleSummary(usernewdata,'MONTH') 
      this.setState({
        key :someArg,
        class2:'active',
        class1:'', 
        class3:'',
        class4:'',
      });
    }
    else if(someArg=='YEAR'){
      this.handleSummary(usernewdata,'YEAR') 
      this.setState({
        key :someArg,
        class3:'active',
        class1:'',        
        class2:'',
        class4:''
      });
    }
    else{
      this.handleSummary(usernewdata,'CUSTOM') 
      this.setState({
        key :someArg,
        class4:'active',
        class1:'',        
        class2:'',
        class3:''
      });
    }
      
  }


  render() {
    // const { currentPage, pageSize, user, page, userSummary } = this.state;
    const toggle = ()=>{
      this.setState({view:!this.state.view});
    }
    //  this.state.usersData.length
    // console.log(userSummary)
    // let data = paginate(this.state.usersData, currentPage, pageSize)

    const fields = [
      { key: 'username' },
      {key:'email'},
      {key:'created_at'},
      { key: 'role_id',label:'Role'},
      { key: 'isOnline', label:'Status' },
      { key: 'lastlogin'},
      {key:'report'}
      // {
      //   key: 'show_details',
      //   label: '',
      //   _style: { width: '1%' },
      //   sorter: false,
      //   filter: false
      // }
    ]

    const Holdfields = [
      { key: 'post_id' },
      {key:'caption'},
      {key:'allocated_at'},
      { key: 'flag_name',label:'Flag Given'},
      { key: 'userId' },
      { key: 'comment'},
      {key:'moderated_at'}
      // {
      //   key: 'show_details',
      //   label: '',
      //   _style: { width: '1%' },
      //   sorter: false,
      //   filter: false
      // }
    ]

    const Approvefields = [
      { key: 'post_id' },
      { key: 'caption'},
      {key:'allocated_at'},
      { key: 'moderated_at'},
      { key: 'userId'},
      // {
      //   key: 'show_details',
      //   label: '',
      //   _style: { width: '1%' },
      //   sorter: false,
      //   filter: false
      // }
    ]

    const Rejectfields = [
      { key: 'post_id' },
      {key:'caption'},
      {key:'allocated_at'},
      { key: 'flag_name',label:'Flag Given'},
      { key: 'userId' },
      { key: 'comment'},
      {key:'moderated_at'}
      // {
      //   key: 'show_details',
      //   label: '',
      //   _style: { width: '1%' },
      //   sorter: false,
      //   filter: false
      // }
    ]

    


    const getBadge = isOnline => {
      switch (isOnline) {
        case 1: return 'success'
        case 0: return 'danger'
        case null: return 'danger'
        default: return 'primary'
      }
    }


    return (
      <>
      <CModal
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              overflow: 'hidden',

            }}
            show={this.state.view}
            onClose={toggle}
            size="xl"
            // centered={false}
            // style={{marginLeft:0,margin:0,marginBottom:0,marginTop:0,marginRight:0,padding:0, minHeight:"100%",minWidth:"100%"}}
      >
        <CModalHeader 
        closeButton><h1>Agent Report</h1></CModalHeader>
        <CModalBody
        style={{
          position: 'relative',
          overflow: 'auto'
        }}
        >
          
        <h5>Agent username : {this.state.userSummary[0]}</h5>
        
        <div className="row mt-3">
                                <div className="col-md-7">
                                  <ul className="buttonwrapper">
                                    <li onClick={() => { this.handletab('TODAY') }} id="today" className={this.state.class1}>
                                        <label id="l1">TODAY</label>
                                    </li>
                                    <li onClick={() => { this.handletab('MONTH') }} id="month" className={this.state.class2}>
                                        <label id="l2">MONTH</label>
                                    </li>                                    
                                    <li onClick={() => { this.handletab('YEAR') }} id="year" className={this.state.class3}>
                                        <label id="l3">YEAR</label>
                                    </li>
                                    <DateTime
                                    handleToUpdate = {this.handleToUpdate}
                                        customInput={<li id="custom" className={this.state.class4}>
                                        <label id="l2">CUSTOM </label></li>
                                    } />
                                   {
                                   this.state.dateT.startdate1 == null ?" "
                                   : <li width="110px" id="month"><label id="l2">{this.state.dateT.startdate1 ? moment(this.state.dateT.startdate1).format('DD/MM/YYYY')+'-' : ''} {this.state.dateT.enddate2 ? moment(this.state.dateT.enddate2).format('DD/MM/YYYY') : ''}</label></li>
                                   } 
                                   
                                </ul>
                                </div>
                                <div className="col-md-5 text-right date-indicator">
                                <ul className="buttonwrapper">
                                    <li id="EXPORT">
                                        <label id="l1">EXPORT</label>
                                    </li>
                                    <li id="date" className="active">
                                        <label id="l1" >{moment().format('MMMM YYYY',)}</label>
                                    </li>

                                    
                                    </ul>
                                </div>
                            </div>
                            <hr></hr>
                   
                            {this.state.loading ?  <div className="text-center col-12"><Spinner animation="border" variant="secondary" /></div>  : 
                            
                            <>
                            <div className="row mt-5">
                                        <div className="section col-md-3 element3">
                                        <h4>Post Data</h4>
                                        <Chart options={this.state.options2} series={this.state.series2} type="radialBar" height={350} />
                                      </div>
                                      <div className="section col-md-3 element3">
                                        {/* <h4>Approved Post</h4> */}
                                        <br></br>
                                        <CCol xs="12" sm="6" lg="12">
          <CWidgetIcon text="total" header={this.state.modalldatanum[0]} color="info" iconPadding={false}>
            <CIcon width={24} name="cil-check-circle"/>
          </CWidgetIcon>
            
        </CCol>
        <CCol xs="12" sm="6" lg="12">
          <CWidgetIcon text="approved" header={this.state.modalldatanum[1]} color="success" iconPadding={false}>
            <CIcon width={24} name="cil-check-circle"/>
          </CWidgetIcon>
            
        </CCol>
        <CCol xs="12" sm="6" lg="12">
          <CWidgetIcon text="holded" header={this.state.modalldatanum[2]} color="warning" iconPadding={false}>
            <CIcon width={24} name="cil-check-circle"/>
          </CWidgetIcon>
            
        </CCol>
        <CCol xs="12" sm="6" lg="12">
          <CWidgetIcon text="rejected" header={this.state.modalldatanum[3]} color="danger" iconPadding={false}>
            <CIcon width={24} name="cil-check-circle"/>
          </CWidgetIcon>
            
        </CCol>
        

                                        </div>
                                        <div className="section col-md-6 element3">
                                        <Chart options={this.state.options4} series={this.state.sessionchart} type="rangeBar" height={350} width={'100%'} />
                                        </div>
                            </div>  
                            <div className="row mt-10">
                                      <div className="section col-md-10 element3">
                                            <h5 className="section-title">Report</h5>
                                            <div className="section-content">
                                              <Chart options={this.state.options} series={this.state.series} type="bar" height={350} />
                                            </div>
                                      </div>
                    
                                {/* <div className="section col-md-5 element3">
                                  <h5 className="section-title">Monthly-wise Report</h5>
                                  <div className="section-content">
                                    <Chart options={this.state.options1} series={this.state.series1} type="bar" />
                                  </div>
                                </div> */}
                                     <div className="section col-md-2 text-center element3">
                                          <h4>Details</h4>
                                        <CTooltip content="Status">
                                        <CBadge shape={'pill'} style={{height:'30px',padding:"10px",margin:"10px"}} color="success"> Online </CBadge>
                    
                                        </CTooltip>
                                        <br></br>
                                        <CTooltip content="Last Login">
                                        <CBadge shape={'pill'} style={{height:'30px',padding:"10px",margin:"10px"}} color="info">{moment().format('MMMM YYYY',)} </CBadge>
                                        </CTooltip>
                                        <br></br>
                                        <CTooltip content="Last Login">
                                        <CBadge shape={'pill'} style={{height:'30px',padding:"10px",margin:"10px"}} color="danger">OnBreak </CBadge>
                                        </CTooltip>
                                        <br></br>
                                        <CTooltip content="Last Login">
                                        <CBadge shape={'pill'} style={{height:'30px',padding:"10px",margin:"10px"}} color="light">Working From</CBadge>
                                        </CTooltip>
                                      
                                </div>
                                
                            </div>
                    
                    
                                <div className="row mt-5">
                                <div className="section col-md-12 element3">
                                <h4>Moderation data</h4>
                                  <br></br>
                                <CTabs activeTab="home">
                                          <CNav variant="tabs">
                                            <CNavItem>
                                              <CNavLink data-tab="home">
                                                Approved
                                              </CNavLink>
                                            </CNavItem>
                                            <CNavItem>
                                              <CNavLink data-tab="profile">
                                                Holded
                                              </CNavLink>
                                            </CNavItem>
                                            <CNavItem>
                                              <CNavLink data-tab="messages">
                                                Rejected
                                              </CNavLink>
                                            </CNavItem>
                                          </CNav>
                    
                                          <CTabContent>
                                            <CTabPane data-tab="home">
                                            <CDataTable
                                            tableFilter
                                            footer
                                            itemsPerPageSelect
                                            itemsPerPage={10}
                                            hover
                                            sorter
                                            pagination
                                          items={this.state.modalldata[0].modapprovepostresult}
                                          fields={Approvefields}
                                          />
                                            </CTabPane>
                                            <CTabPane data-tab="profile">
                                            <CDataTable
                                          items={this.state.modalldata[0].modholdpostresult}
                                          fields={Holdfields}
                                          // columnFilter
                                          tableFilter
                                          // onRowClick={toggle}
                                          footer
                                          itemsPerPageSelect
                                          itemsPerPage={10}
                                          hover
                                          sorter
                                          pagination
                                       
                                        />
                                            </CTabPane>
                                            <CTabPane data-tab="messages">
                                            <CDataTable
                                              tableFilter
                                              footer
                                              itemsPerPageSelect
                                              itemsPerPage={10}
                                              hover
                                              sorter
                                              pagination
                                          items={this.state.modalldata[0].modrejectpostresult}
                                          fields={Rejectfields}
                                          />
                                            </CTabPane>
                                          </CTabContent>
                                   </CTabs>
                              </div>
                           </div>
                         </>

                            }
         
     
      </CModalBody>
               <CModalFooter>
                  {/* <CButton color="primary">Do Something</CButton>{' '} */}
                  <CButton
                    color="secondary"
                    onClick={toggle}
                  >Close</CButton>
                </CModalFooter>
      </CModal>



        <CDataTable
      items={this.state.usersData}
      fields={fields}
      // columnFilter
      tableFilter
      // onRowClick={toggle}
      footer
      itemsPerPageSelect
      itemsPerPage={10}
      hover
      sorter
      pagination
      scopedSlots = {{
        'status':
          (item)=>(
            <td>
              <CBadge color={getBadge(item.status)}>
                {item.status}
              </CBadge>
            </td>
          ),
          'role_id':
          (item, index)=>{
            return (
              <td className="py-2">
               {item.role_id == 1 ? "Medley" : item.role_id == 2 ? "Meest" : "Admin"}
              </td>
              )
          },
          'isOnline':
          (item, index)=>{
            return (
              <td className="py-2">
               <CBadge color={getBadge(item.isOnline)}>{item.isOnline === 0 || item.isOnline === null ? "Offline" : "online"} </CBadge>
           </td>
              )
          },
          'created_at':
          (item, index)=>{
            return (
              <td className="py-2">
               {item.id === 21 || item.id === 57 ? null : new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(item.created_at))}
              </td>
              )
          },
          'lastlogin':
          (item, index)=>{
            return (
              <td className="py-2">
               {item.id === 21 || item.id === 57 ? null : new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit',hour:'2-digit',minute:'2-digit' }).format(new Date(item.created_at))}
              </td>
              )
          },
          'report':
          (item, index)=>{
            return (
              <td className="py-2">
               <CButton active block color="warning" aria-pressed="true" 
               onClick={() => { this.handleSummary(item,'MONTH')
               }}>
        Get Report</CButton>
               </td>
              )
          }
           }}
    />
      </>
    )
  }
}

export default Report
