// SIDEBAR TOGGLE


let username=document.getElementById("username");
const user = JSON.parse(localStorage.getItem('username')) || 'User';
username.innerText=user;


var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
  if(!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if(sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}



// ---------- CHARTS ----------

var options = {
  series: [{
  data: [44, 55, 41, 64, 22, 43, 21]
}, {
  data: [53, 32, 33, 52, 13, 44, 32]
}],
  chart: {
  type: 'bar',
  height: 430
},
plotOptions: {
  bar: {
    horizontal: false,
    dataLabels: {
      position: 'top',
    },
  }
},
dataLabels: {
  enabled: true,
  offsetX: -6,
  style: {
    fontSize: '12px',
    colors: ['#fff']
  }
},
stroke: {
  show: true,
  width: 1,
  colors: ['#fff']
},
tooltip: {
  shared: true,
  intersect: false
},
xaxis: {
  categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
},
};

var chart = new ApexCharts(document.querySelector("#bar-chart"), options);
chart.render();




// BAR CHART
// var barChartOptions = {
//   series: [{
//     data: [44, 55, 41, 64, 22, 43, 21]
//   }, {
//     data: [53, 32, 33, 52, 13, 44, 32]
//   }],
//   chart: {
//     type: 'bar',
//     height: 350,
//     toolbar: {
//       show: false
//     },
//   },
//   // colors: [
//   //   "#246dec",
//   //   "#cc3c43",
//   //   "#367952",
//   //   "#f5b74f",
//   //   "#4f35a1"
//   // ],
//   plotOptions: {
//     bar: {
//       distributed: true,
//       borderRadius: 4,
//       horizontal: false,
//       columnWidth: '40%',
//     }
//   },
//   dataLabels: {
//     enabled: false,
//     offsetX: -6,
//     style: {
//       fontSize: '12px',
//       colors: ['#fff']
//     }
//   },
//   stroke: {
//     show: true,
//     width: 1,
//     colors: ['#fff']
//   },
//   tooltip: {
//     shared: true,
//     intersect: false
//   },
//   legend: {
//     show: false
//   },
//   xaxis: {
//     categories: ["Jan", "Feb", "March", "April", "May"],
//   },
//   yaxis: {
//     title: {
      
//     }
//   }
// };

// var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
// barChart.render();


// AREA CHART
var areaChartOptions = {
  series: [{
    name: 'Purchase Orders',
    data: [31, 40, 28, 51, 42, 109, 100]
  }, {
    name: 'Sales Orders',
    data: [11, 32, 45, 32, 34, 52, 41]
  }],
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  colors: ["#4f35a1", "#246dec"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth'
  },
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  markers: {
    size: 0
  },
  yaxis: [
    {
      title: {
        text: 'Purchase Orders',
      },
    },
    {
      opposite: true,
      title: {
        text: 'Sales Orders',
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
  }
};

var areaChart = new ApexCharts(document.querySelector("#area-chart"), areaChartOptions);
areaChart.render();