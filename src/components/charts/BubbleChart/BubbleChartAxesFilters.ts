function keepIfStartsWithOne(value) {
  return (value * 100).toString()[0] === "1" ? value : null;
}

function keepIfStartsWithOneOrThree(value) {
  return (value * 100).toString()[0] === "1" || (value * 100).toString()[0] === "3"
    ? value
    : null;
}

export function bubbleChartYAxesFilter(value, _, values) {
  if (value === values[0]) {
    return value;
  }
  if (values[0] >= 300) {
    return keepIfStartsWithOne(value);
  }
  return keepIfStartsWithOneOrThree(value);
}

export function bubbleChartXAxesFilter(value, _, values) {
  if (value === values[values.length - 1]) {
    return value;
  }
  return keepIfStartsWithOneOrThree(value);
}
