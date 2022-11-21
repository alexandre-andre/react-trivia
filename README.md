# Projeto de Trivia!


---
# Habilidades

  - Criar um store Redux em aplicações React

  - Criar reducers no Redux em aplicações React

  - Criar actions no Redux em aplicações React

  - Criar dispatchers no Redux em aplicações React

  - Conectar Redux aos componentes React

  - Criar actions assíncronas na sua aplicação React que faz uso de Redux.


---

## O que foi desenvolvido
O projeto foi desenvolvido em grupo e quase em sua totalidade em pair-programming.

Jogo de perguntas e respostas baseado no jogo **Trivia** _(tipo um show do milhão americano rs)_ utilizando _React e Redux_, desenvolvendo em grupo suas funcionalidades de acordo com as demandas definidas em um quadro _Kanban_. Confira o Slack para saber como acessar o quadro! Para viver um cenário mais próximo do mercado de trabalho, você deve fazer uma cópia desse quadro para utilizar com seu grupo. É de suma importância que o grupo se organize utilizando o quadro para maior eficiência e para que se minimizem os conflitos que a união de vários códigos trará. A partir dessas demandas, teremos uma aplicação onde a pessoa usuária poderá:

  - Logar no jogo e, se o email tiver cadastro no site [Gravatar](https://pt.gravatar.com/), ter sua foto associada ao perfil da pessoa usuária.
  - Acessar a página referente ao jogo, onde se deverá escolher uma das respostas disponíveis para cada uma das perguntas apresentadas. A resposta deve ser marcada antes do contador de tempo chegar a zero, caso contrário a resposta deverá ser considerada errada.
  - Ser redirecionada, após 5 perguntas respondidas, para a tela de score, onde o texto mostrado depende do número de acertos.
  - Visualizar a página de ranking, se quiser, ao final de cada jogo.
  - Configurar algumas opções para o jogo em uma tela de configuração acessível a partir do cabeçalho do app.

---

# Requisitos do projeto

### Tela de início/login

#### 1. Crie a tela de login, onde a pessoa que joga deve preencher as informações para iniciar um jogo ✅

  **PRIORIDADE 0** - Criar a tela de login contendo as informações de nome e email, onde a pessoa que joga deve conseguir escrever seu nome e email nos inputs e o botão de jogar ("Play") deve estar desabilitado caso não tenha alguma dessas informações.
  
Recomendamos que o Redux e o Router sejam configurados nesse requisito, para que os demais possam ser feitos paralelamente!


#### 2. Crie o botão de iniciar o jogo ✅

  **PRIORIDADE 1** - O botão "Play" deve fazer requisição para a API para obter o token e redirecionar a pessoa para tela de jogo

  
#### 3. Crie um botão que leva a pessoa para tela de configuração ✅

  **PRIORIDADE 1** - A tela inicial deve conter um botão que leve para a configuração do jogo

### Tela de jogo

#### 4. Crie um _header_ que deve conter as informações da pessoa jogadora ✅

  **PRIORIDADE 1** - O header deve conter as informações sobre a pessoa jogadora, como a imagem do Gravatar, o nome e o placar

  

#### 5. Crie a página de jogo que deve conter as informações relacionadas à pergunta ✅

  **PRIORIDADE 1** - Deve ser feita a requisição para a API para popular o jogo com as perguntas, categoria e alternativas

  

#### 6. Desenvolva o jogo onde só deve ser possível escolher uma resposta correta por pergunta ✅

  **PRIORIDADE 2** - A pergunta deve ter apenas uma alternativa correta


#### 7. Desenvolva o estilo que, ao clicar em uma resposta, a correta deve ficar verde e as incorretas, vermelhas ✅

  **PRIORIDADE 2** - Ao responder a pergunta, se a alternativa for correta, deve ficar verde, caso contrário, vermelha


#### 8. Desenvolva um timer onde a pessoa que joga tem 30 segundos para responder ✅

  **PRIORIDADE 3** - A página deve conter um timer que com o tempo máximo de 30 segundos para responder, caso ultrapasse o tempo, a pergunta é considerada errada


#### 9. Crie o placar com as seguintes características: ✅

  **PRIORIDADE 3** - Ao clicar na resposta correta, pontos devem ser somados no placar da pessoa que está jogando


#### 10. Crie um botão de "Next" que apareça após a resposta ser dada ✅

  **PRIORIDADE 3** - Deve aparecer um botão de próxima ("Next") (pergunta) após a resposta ser dada


#### 11. Desenvolva o jogo de forma que a pessoa que joga deve responder 5 perguntas no total ✅

  **PRIORIDADE 2** - O jogo deve ser composto por 5 perguntas, onde, a cada nova pergunta, o timer é reiniciado e após respondê-las, a pessoa que joga deve ser redirecionada para a tela de feedback


### Tela de feedback

#### 12. Desenvolva o header de _feedback_ que deve conter as informações da pessoa jogadora ✅

  **PRIORIDADE 0** - A tela de feedback deve conter as informações da pessoa que joga, incluindo o placar com o valor referente ao desempenho no jogo

  
#### 13. Crie a mensagem de _feedback_ para ser exibida a pessoa usuária ✅

  **PRIORIDADE 1** - A tela de feedback deve exibir uma mensagem relacionada ao desempenho da pessoa que jogou


#### 14. Exiba as informações relacionadas aos resultados obtidos para a pessoa usuária ✅

  **PRIORIDADE 1** - A tela de feedback deve exibir informações sobre o desempenho da pessoa, como o placar final e o número de perguntas que acertou

  * O placar final deve ser mostrado em um elemento com o atributo `data-testid` com o valor `feedback-total-score`
  * O número de perguntas que a pessoa acertou deve ser exibido em um elemento com o atributo `data-testid` com o valor `feedback-total-question`


#### 15. Crie a opção para a pessoa jogadora poder jogar novamente ✅

  **PRIORIDADE 3** - A pessoa terá a opção jogar novamente ("Play Again"), que ao ser clicada, levará para a tela de inicial

  * Ao clicar no botão "Play Again", a pessoa deve ser redirecionada para a tela de início (login)
  * O botão para "Play Again" deve possuir o atributo `data-testid` com o valor `btn-play-again`


#### 16. Crie a opção para a pessoa jogadora poder visualizar a tela de _ranking_ ✅

  **PRIORIDADE 3** - Deve existir um botão que redirecione a pessoa para a tela de ranking


### Tela de ranking

#### 17. Crie um botão para ir ao início ✅

  **PRIORIDADE 2** - O botão deve redirecionar a pessoa para a tela de inicial (login)



#### 18. Crie o conteúdo da tela de _ranking_ ✅

  **PRIORIDADE 2** - A tela de ranking deve possuir uma lista com a imagem, nome e pontuação das pessoas que jogaram e deve ficar armazenado no localStorage


##### 19. Ao mudar o valor do dropdown categoria, apenas perguntas da categoria selecionada devem aparecer para a pessoa que está jogando. Essa configuração será identificada pela chave category no retorno da API; ✅

##### 20. Ao mudar o valor do dropdown dificuldade, apenas perguntas da dificuldade selecionada devem aparecer para a pessoa que está jogando. Essa configuração será identificada pela chave difficulty no retorno da API; ✅

##### 21. Ao mudar o valor do dropdown tipo, apenas perguntas do tipo selecionado devem aparecer para a pessoa que está jogando. Essa configuração será identificada pela chave type no retorno da API. ✅

