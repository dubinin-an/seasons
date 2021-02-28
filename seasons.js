module.exports =   {
  springEquinox,
  summerSolstice,
  autumnEquinox,
  winterSolstice
};

function springEquinox(year = new Date().getFullYear()){
  const march = (y) => {
    return 2451623.80984 + 365242.37404*y + 0.05169*y*y - 0.00411*y*y*y - 0.00057*y*y*y*y
  }
  return calculateEquinoxOrSolstice(year, march)
}
function summerSolstice(year = new Date().getFullYear()){
  const june = (y) => {
    return 2451716.56767 + 365241.62603*y + 0.00325*y*y + 0.00888*y*y*y - 0.00030*y*y*y*y
  }
  return calculateEquinoxOrSolstice(year, june)
}
function autumnEquinox(year = new Date().getFullYear()){
  const september = (y) => {
    return 2451810.21715 + 365242.01767*y - 0.11575*y*y + 0.00337*y*y*y + 0.00078*y*y*y*y
  }
  return calculateEquinoxOrSolstice(year, september)
}
function winterSolstice(year = new Date().getFullYear()){
  const december = (y) => {
    return 2451900.05952 + 365242.74049*y - 0.06223*y*y - 0.00823*y*y*y + 0.00032*y*y*y*y
  }
  return calculateEquinoxOrSolstice(year, december)
}

const degrees = Math.PI / 180.0;
function roundf(x) {
  return Math.floor(0.5 + x)
}
function tableFormula(x){
  // TODO: Replace with a table and a loop
  let result = 0;
  result += 485 * Math.cos(degrees*(324.96+x*1934.136))
  result += 203 * Math.cos(degrees*(337.23+x*32964.467))
  result += 199 * Math.cos(degrees*(342.08+x*20.186))
  result += 182 * Math.cos(degrees*(27.85+x*445267.112))
  result += 156 * Math.cos(degrees*(73.14+x*45036.886))
  result += 136 * Math.cos(degrees*(171.52+x*22518.443))
  result += 77 * Math.cos(degrees*(222.54+x*65928.934))
  result += 74 * Math.cos(degrees*(296.72+x*3034.906))
  result += 70 * Math.cos(degrees*(243.58+x*9037.513))
  result += 58 * Math.cos(degrees*(119.81+x*33718.147))
  result += 52 * Math.cos(degrees*(297.17+x*150.678))
  result += 50 * Math.cos(degrees*(21.02+x*2281.226))
  result += 45 * Math.cos(degrees*(247.54+x*29929.562))
  result += 44 * Math.cos(degrees*(325.15+x*31555.956))
  result += 29 * Math.cos(degrees*(60.93+x*4443.417))
  result += 18 * Math.cos(degrees*(155.12+x*67555.328))
  result += 17 * Math.cos(degrees*(288.79+x*4562.452))
  result += 16 * Math.cos(degrees*(198.04+x*62894.029))
  result += 14 * Math.cos(degrees*(199.76+x*31436.921))
  result += 12 * Math.cos(degrees*(95.39+x*14577.848))
  result += 12 * Math.cos(degrees*(287.11+x*31931.756))
  result += 12 * Math.cos(degrees*(320.81+x*34777.259))
  result += 9 * Math.cos(degrees*(227.73+x*1222.114))
  result += 8 * Math.cos(degrees*(15.45+x*16859.074))
  return result;
}
function calculateEquinoxOrSolstice(year, fn) {
  // TODO: Simplify with a symbolic calculator
  const a = fn(((year) - 2000.0) / 1000.0)
  const b = (a - 2451545.0) / 36525.0
  const c = (35999.373*b - 2.47) * degrees
  const d = a + (0.00001*tableFormula(b))/(1.0+0.0334*Math.cos(c)+0.0007*Math.cos(2*c)) - (66.0+(year-2000)*1.0)/86400.0
  const e = roundf(d)
  const f = Math.floor((e - 1867216.25) / 36524.25)
  const g = e + f - Math.floor(f/4) + 1525.0
  const h = Math.floor((g - 122.1) / 365.25)
  const i = 365.0*h + Math.floor(h/4)
  const k = Math.floor((g - i) / 30.6001)
  const l = 24.0 * (d + 0.5 - e)
  let day = Math.floor(roundf(g-i) - Math.floor(30.6001*k))
  let month = k - 1 - 12*Math.floor(k/14)
  let hour = Math.floor(l)
  let minute = Math.floor(roundf((Math.abs(l) - Math.floor(Math.abs(l))) * 60.0))
  if (minute === 60) {
    minute = 0
    hour = hour + 1
  }

  console.log('calculateEquinoxOrSolstice', year, month, day, hour, minute)
  return new Date(`${year}-${month}-${day} ${hour}:${minute} +0000`);
}
