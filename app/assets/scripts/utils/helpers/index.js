export function partitionElementsIntoGroups (num, parts) {
  const base = Math.floor(num / parts); // find biggest int whose (int * parts) is <= total 
  const retVal = [...new Array(parts)].map(() => base); // fills each index (parts) with int (basically == Array.fill(base))
  
  let remainder = num % (base * parts);

  while (remainder) {
    retVal[(retVal.length-remainder)] += 1; // add 1 to each bucket (from the back) until remainder == 0
    remainder--;
  }

  for (let i = 0; i < parts; i+=2) {
    const range = [-(retVal[i]), (retVal[i])];
    const rand = getRandomBoundedInt.call(null, ...range);
    retVal[i] = retVal[i] + rand;
    retVal[i+1] = retVal[i+1] + (1-rand);
  }
  return retVal.sort((a, b) => (a - b));
}

export function getRandomBoundedInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}