describe('Teste do site Seu Barriga com Comandos Customizados', () => {

  beforeEach(() => {
    // Usando o comando de login
    cy.login('user_name', 'user_password');
  });

  it('Deve adicionar e logo em seguida remover a conta', () => {
    // 1. Adiciona uma conta nova (garante que ela existe e está vazia)
    cy.adicionarConta();
    cy.get('.alert').should('contain', 'sucesso');

    // 2. Remove a conta que acabamos de criar (ela será a última da lista)
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
      interessado: 'Adriano Abner'
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