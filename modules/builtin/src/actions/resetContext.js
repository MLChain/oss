/**
 * Resets the NLU context to the default scope.
 *
 * This method is contextual to the current user and chat session.
 *
 * @title Reset Context
 * @category NLU
 * @author Mlchain, Inc.
 */
const resetContext = () => {
  event.state.session.nluContexts = []
}

return resetContext()
