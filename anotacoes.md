Workflow de produção:

Para iniciar uma nova produção, devemos:

Informar o tanque (obrigatório),
Informar a espécie (obrigatório),
informar o ciclo de produção inicial (opcional?).

Exemplo:
    produção 1 no tanque #07679, produzindo Tilápias, onde o ciclo atual está como "produção de alevinos"

Funções:
    (PERMITIR MAIS DE UMA PRODUÇÃO NO MESMO TANQUE?)

    cadastrar nova produção -> precisa informar o tanque, a espécie que será produzida e o ciclo de produção corrente,

    ler produções -> deve retornar as informações mais importantes de cada produção, com seu respectivo ciclo em andamento, sua especie e seu tanque. Além de retornar o total gasto até o momento, a receita obtida e o lucro (para o caso de produções que foram finalizadas).

    atualizar produção -> atualizar qual espécie está sendo produzida, qual o ciclo atual ou o tanque em que está sendo produzida, não permitir atualizar após a produção ser finalizada, para manter o histórico constante.

    apagar produção -> perigoso, talvez uma melhor opção seja finalizar a produção e não permitir a exclusão?

    iniciar produção (começa do primeiro ciclo cadastrado. Seria diferente de criar uma produção com um ciclo em específico),

    finalizar produção (entende-se que o peixes foram coletados, 
        pode ser um ciclo de produção fixo ou apenas parar de contar o tempo e finalizar os cálculos de gastos e lucros obtidos)

    avançar ciclo de produção (manter uma ordem dos ciclos de produção cadastrados),

    filtrar produções por tanque, espécie ou ciclo de produção atual (incluindo produções não iniciadas e finalizadas).

