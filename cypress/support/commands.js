// Comando para Login usando as variáveis do env.json
Cypress.Commands.add('login', () => {
    cy.visit('https://seubarriga.wcaquino.me/');
    // Pega os valores direto do seu arquivo de ambiente
    cy.get('#email').type(Cypress.env('user_name'));
    cy.get('#senha').type(Cypress.env('user_password'));
    cy.contains('button', 'Entrar').click();
    // Verifica se o login foi bem sucedido
    cy.get('.alert').should('be.visible');
});

// Comando para Adicionar Conta
Cypress.Commands.add('adicionarConta', () => {
    const nomeAleatorio = `Conta_${Math.floor(Math.random() * 10000)}`;
    cy.contains('a', 'Contas').click();
    cy.contains('a', 'Adicionar').click();
    cy.get('#nome').type(nomeAleatorio);
    cy.get('.btn-primary').click();
});

// Comando para Remover a Última Conta da lista
Cypress.Commands.add('removerUltimaConta', () => {
    cy.contains('a', 'Contas').click();
    cy.contains('a', 'Listar').click();
    // Seleciona o último link de exclusão da tabela
    cy.get('#tabelaContas tbody tr').last().find('a[href*="remover"]').click();
});

// Preenchendo campos de movimentação e apagando (Teste de Estresse/Limpeza)
Cypress.Commands.add('testarLimpezaDeCampos', (dados) => {
    cy.contains('a', 'Criar Movimentação').click();
    cy.get('[name="tipo"]').select(dados.tipo);
    cy.get('[name="data_transacao"]').type(dados.dataTransacao).clear();
    cy.get('[name="data_pagamento"]').type(dados.dataPagamento).clear();
    cy.get('[name="descricao"]').type(dados.descricao).clear();
    cy.get('[name="interessado"]').type(dados.interessado).clear();
    cy.get('[name="valor"]').type(dados.valor).clear();
    cy.get('.btn').click();
});

// Comando para Criar Movimentação
Cypress.Commands.add('criarMovimentacao', (dados) => {
    const valorRandom = Math.floor(Math.random() * 10000) + 1;
    cy.contains('a', 'Criar Movimentação').click();
    cy.get('[name="tipo"]').select(dados.tipo);
    cy.get('[name="data_transacao"]').clear().type(dados.dataTransacao);
    cy.get('[name="data_pagamento"]').clear().type(dados.dataPagamento);
    cy.get('[name="descricao"]').type(dados.descricao);
    cy.get('[name="interessado"]').type(dados.interessado);
    cy.get('[name="valor"]').type(valorRandom.toString());
    cy.get('.btn').click();
});

// Comando para Remover Último Registro do Resumo Mensal
Cypress.Commands.add('removerUltimoResumoMensal', (mes, ano) => {
    cy.contains('a', 'Resumo Mensal').click();
    cy.get('[name="mes"]').select(mes);
    cy.get('[name="ano"]').select(ano);
    cy.get('.btn').click();
    // Aguarda a tabela carregar e clica no último ícone de remover (lixeira/x)
    cy.get('table tbody tr').last().find('a[href*="remover"]').click();
});