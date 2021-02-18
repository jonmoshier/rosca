// ROSCA, rotating savings and credit association.
// Run at https://tinyurl.com/ts-rosca-implementation

const verifyParticipants = (participants: [string, number][], amount: number) => {
  // user needs enough collateral to participate in all rounds.
  const rounds = participants.length;
  const collateral = amount * rounds;     
  for (let p of participants) {
      if (p[1] < collateral) throw Error(`User ${p[0]} does not have the funds, only has ${p[1]} but needs ${collateral}`);
  }
}

// returns the order in which parcipitants get the pot 
const getOrder = (length: number): number[] => {
  const getRandomInt = (max: number) =>  Math.floor(Math.random() * Math.floor(max));

  let order: number[] = [];
  while(order.length < length) {
      const int = getRandomInt(length)
      if (!order.includes(int)) {
          order = order.concat(int);
      }
  }
  return order;
}

// handle and log transactions
const transact = (participants: [string, number][], amount: number, winNumber: number) => {
  console.log(`Start: ${participants.map((p) =>  `${p[0]}: \$${p[1]}`)} `)
  let pool = 0;
  for (let p of participants) {
      // TRANSACTION FROM USERS TO POOL
      p[1] = p[1] - amount;
      pool = pool + amount;
      // TRANSACTION
  }
  const winner = participants[winNumber];
  const previousAmt = winner[1];
  winner[1] += pool;
  console.log(`${winner[0]} wins the pot! Had ${previousAmt+amount} but now has \$${winner[1]}`);
  console.log('                                                       ');
}

const main = (participants: [string, number][], amount: number) => {
  // no one can partake unless they all meet requirements
  verifyParticipants(participants, amount);

  // precalculate who receives the pot in which round
  const order = getOrder(participants.length);

  // an assertion would be nice here, order === set(order)
  // or just confirm that order has no duplicates
  console.log(`Winner order is ${order}`);

  // each participant has a round where they win
  for (let round in participants) {
      console.log(`Round: ${Number(round)+1}`)
      console.log('~~~~~~~~');
      transact(participants, amount, order[round]);
  }
}

// START HERE
const participants: [string, number][] = [ ['Person 1', 200], ['Person 2', 90], ['Person 3', 100], ['Person 4', 45] ];
main(participants, 10);