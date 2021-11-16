import autocannon from "autocannon";

export const bench = async () => {
  let results = await autocannon({
    url: "http://localhost:3500/limbs",
    method: "POST",
    body: JSON.stringify({ arms: 10, legs: 10 }),
    headers: { "Content-type": "application/json" },
    expectBody: JSON.stringify({ limbs: 20 }),
  });

  let table = autocannon.printResult(results);
  console.log(table);

  return results;
}