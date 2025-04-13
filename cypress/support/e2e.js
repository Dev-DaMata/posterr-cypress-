
import './commands';
import './commands/post'
import './commands/repost'
// import './commands/user';  PARA ADICIONAR OS COMMANDOS DA PASTA COMMANDS


const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/;
Cypress.on('uncaught:exception', (err) => {
  /* returning false here prevents Cypress from failing the test */
  if (resizeObserverLoopErrRe.test(err.message)) {
    return false;
  }
});
