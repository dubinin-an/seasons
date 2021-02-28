const moment = require('moment')
const { autumnEquinox } = require('./seasons')
const { summerSolstice } = require('./seasons')
const { springEquinox } = require('./seasons')
const { winterSolstice } = require('./seasons')

test.each([
  [
    1990,
    '1990-03-20 21:19:00',
    '1990-06-21 15:33:00',
    '1990-09-23 06:56:00',
    '1990-12-22 03:07:00'],
  [
    2021,
    '2021-03-20 09:37:00',
    '2021-06-21 03:32:00',
    '2021-09-22 19:21:00',
    '2021-12-21 15:59:00'],
  [
    2099,
    '2099-03-20 07:18:00',
    '2099-06-20 23:42:00',
    '2099-09-22 16:11:00',
    '2099-12-21 14:05:00'],
])
('My first test', (year, sE, sS, aE, wS) => {
  const getActual = function (actual) {
    return moment(actual).utc().format('YYYY-MM-DD HH:mm:ss')
  }

  expect(springEquinox()).not.toBeNull()
  expect(summerSolstice()).not.toBeNull()
  expect(autumnEquinox()).not.toBeNull()
  expect(winterSolstice()).not.toBeNull()
  expect(getActual(springEquinox(year))).toEqual(sE)
  expect(getActual(summerSolstice(year))).toEqual(sS)
  expect(getActual(autumnEquinox(year))).toEqual(aE)
  expect(getActual(winterSolstice(year))).toEqual(wS)
})




