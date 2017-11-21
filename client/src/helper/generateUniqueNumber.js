uniqueNumber.previous = 0
export function uniqueNumber () {
  var date = Date.now()
  if (date <= uniqueNumber.previous) {
    date = ++uniqueNumber.previous
  } else {
    uniqueNumber.previous = date
  }
  return date
}