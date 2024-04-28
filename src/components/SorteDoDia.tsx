import React, { useState, useEffect } from 'react';

export default function SorteDoDia() {
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    
    const buscarMensagens = async () => {
      try {
        // Fazer a solicitação GET para o arquivo JSON
        const response = await fetch('/sorteDoDia.json');
        
        if (!response.ok) {
          throw new Error('Falha ao carregar as mensagens');
        }

        // Extrair o array de mensagens do objeto JSON
        const data = await response.json();
        const mensagens = data.mensagens;

        // Gerar um número aleatório entre 0 e o comprimento do array de mensagens
        const indiceAleatorio = Math.floor(Math.random() * mensagens.length);

        // Atualizar o estado com a mensagem aleatória
        setMensagem(mensagens[indiceAleatorio]);
      } catch (error) {
        console.error('Erro ao buscar as mensagens:', error);
        // Lidar com erros, se necessário
      }
    };

    // Chamar a função para buscar as mensagens ao montar o componente
    buscarMensagens();

    // Não é necessário adicionar dependências ao useEffect neste caso, 
    // já que não estamos utilizando nenhum estado ou propriedade no array de dependências.
  }, []);

  return (
    <div>
      <p className='text-zinc-500 max-sm:text-center'><b>Sorte de hoje</b>: {mensagem}</p>
    </div>
  );
}
