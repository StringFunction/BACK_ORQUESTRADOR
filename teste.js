const data_atual = new Date()
const dia_Semana = data_atual.getDay()
const lista_Semana = {
    0: "Domingo",
    1: "Segunda-feira",
    2: "Terça-feira",
    3: "Quarta-feira",
    4: "Quinta-feira",
    5: "Sexta-feira",
    6: "Sábado"
};

console.log(lista_Semana[dia_Semana]);
const dados = [
    {"id" : "clecio",  "tipo" : ["Diariamente"]},
    {"id" : "clecio",  "tipo" : ["Domingo","Segund"]},
    {"id" : "clecio",  "tipo" : ["Segunda-feira"]}
]

const resultados = dados.filter(e => 
  e.tipo.some(tipo => 
    lista_Semana[dia_Semana].includes(tipo) || tipo === "Diariamente"
  )
);
console.log(resultados);
