describe('Teste do site Seu Barriga com Comandos Customizados', () => {

  beforeEach(() => {
    // Usando o comando de login
    cy.login('user_name', 'user_password');
  });

  it('Adicionando conta', () => {
    cy.adicionarConta('Segunda conta Test');
    cy.get('.alert').should('contain', 'sucesso');
  });

  it('Removendo a conta criada', () => {
    cy.removerUltimaConta();
    cy.get('.alert').should('contain', 'sucesso');
  });

  it('Deve digitar e apagar todos os campos antes de enviar', () => {
    const dadosTeste = {
      dataTransacao: '26/01/2026',
      dataPagamento: '27/01/2026',
      descricao: 'Teste de estresse',
      interessado: 'Adriano',
      valor: '1500',
      tipo: 'Despesa'
    };

    cy.testarLimpezaDeCampos(dadosTeste);

    cy.get('.alert-danger li').should('have.length', 6);
  });

  it('Criando movimentação', () => {
    const movimentacao = {
      tipo: 'Despesa',
      dataTransacao: '14/01/2026',
      dataPagamento: '20/01/2026',
      descricao: 'Passeio no salão de carros',
      interessado: 'Adriano Abner',
      valor: '67.00'
    };

    cy.criarMovimentacao(movimentacao);
    cy.get('.alert').should('contain', 'sucesso');
  });

  it('Verificando resumo mensal e removendo registro', () => {
    // Remove o último registro de Janeiro/2026
    cy.removerUltimoResumoMensal('Janeiro', '2026');
    cy.get('.alert').should('contain', 'sucesso');
  });
});