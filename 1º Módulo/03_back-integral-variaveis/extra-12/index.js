const m = 90000;
const c = 60000;
const n = 24;
const i = (Math.pow((m/c),(1/n))-1)*100;

console.log(`O seu financiamento de ${c} reais teve uma taxa de juros de ${i.toFixed(3)}%, pois após ${n} meses você teve que pagar ${m} reais.`);