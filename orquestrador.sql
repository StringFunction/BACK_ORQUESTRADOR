-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 04/09/2026 às 23:10
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `orquestrador`
--

DELIMITER $$
--
-- Procedimentos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `gerar_agendamentos_do_dia` ()   BEGIN

    DECLARE dia_atual VARCHAR(20);

    SET dia_atual = CASE DAYOFWEEK(CURDATE())
        WHEN 1 THEN 'domingo'
        WHEN 2 THEN 'segunda'
        WHEN 3 THEN 'terca'
        WHEN 4 THEN 'quarta'
        WHEN 5 THEN 'quinta'
        WHEN 6 THEN 'sexta'
        WHEN 7 THEN 'sabado'
    END;

    INSERT INTO age_movimento (
        agendamento
     
    )
    SELECT
        a.id
        
    FROM agendamentos a
    WHERE
        UPPER(TRIM(a.dias_semanas)) = 'TODOS'
        OR (
            UPPER(TRIM(a.dias_semanas)) = 'SEMANA'
            AND DAYOFWEEK(CURDATE()) BETWEEN 2 AND 6
        )

        OR FIND_IN_SET(
            dia_atual,
            LOWER(
                REPLACE(a.dias_semanas, ' ', '')
            )
        ) > 0;



END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `mover_dados` ()   BEGIN

    -- Inicia uma transação
    START TRANSACTION;

    -- Insere os dados da Tabela A na Tabela B
    INSERT INTO registro (id_agendamento, situacao, duracao, erro)
    SELECT 
        ag_mv.agendamento,
        ag_mv.situacao,
        ag_mv.duracao,
        ag_mv.erro
    FROM age_movimento as ag_mv;

    -- Apaga os dados da Tabela A
    DELETE FROM age_movimento;

    -- Confirma as alterações
    COMMIT;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `bots`
--

CREATE TABLE `bots` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` text DEFAULT NULL,
  `desenvolvedor` int(11) DEFAULT NULL,
  `situacao` varchar(255) DEFAULT NULL,
  `tempo_execucao` time DEFAULT NULL,
  `maquina` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `bots`
--

INSERT INTO `bots` (`id`, `nome`, `descricao`, `desenvolvedor`, `situacao`, `tempo_execucao`, `maquina`) VALUES
(1, 'RPA_TESTE', 'TESTE DE TESTE', 12345, 'Agendado', '00:00:30', 1),
(2, 'RPA_IMPORTACAO_XML', 'Importação de XMLs', 12345, 'Agendado', '00:01:20', 1),
(3, 'RPA_RELATORIO_DIARIO', 'Geração de relatório diário', 12345, 'Agendado', '00:02:15', 1),
(4, 'RPA_ENVIO_EMAIL', 'Envio automático de e-mails', 12345, 'Agendado', '00:00:45', 1),
(5, 'RPA_CONSULTA_NOTAS', 'Consulta de notas fiscais', 12345, 'Agendado', '00:03:10', 1),
(6, 'RPA_BAIXA_FINANCEIRO', 'Baixa de títulos financeiros', 12345, 'Agendado', '00:04:25', 1),
(7, 'RPA_EXPORTAR_DADOS', 'Exportação de dados', 12345, 'Agendado', '00:01:55', 1),
(8, 'RPA_ATUALIZA_CADASTRO', 'Atualização de cadastro', 12345, 'Agendado', '00:02:40', 1),
(9, 'RPA_VALIDAR_DOCUMENTOS', 'Validação de documentos', 12345, 'Agendado', '00:05:30', 1),
(10, 'RPA_GERAR_PLANILHA', 'Geração de planilhas', 12345, 'Agendado', '00:01:35', 1),
(11, 'RPA_ENVIO_WHATSAPP', 'Envio de mensagens WhatsApp', 12345, 'Agendado', '00:00:55', 1),
(12, 'RPA_CONCILIACAO', 'Conciliação bancária', 12345, 'Agendado', '00:06:20', 1),
(13, 'RPA_BACKUP', 'Rotina de backup', 12345, 'Agendado', '00:03:45', 1),
(14, 'RPA_MONITORAMENTO', 'Monitoramento de processos', 12345, 'Agendado', '00:00:35', 1),
(15, 'RPA_PROCESSAR_PEDIDOS', 'Processamento de pedidos', 12345, 'Agendado', '00:04:10', 1),
(16, 'RPA_ATUALIZAR_ESTOQUE', 'Atualização de estoque', 12345, 'Agendado', '00:02:50', 1),
(17, 'RPA_GERAR_BOLETO', 'Geração de boletos', 12345, 'Agendado', '00:01:25', 1),
(18, 'RPA_CANCELAR_PEDIDOS', 'Cancelamento de pedidos', 12345, 'Agendado', '00:03:05', 1),
(19, 'RPA_CONSULTAR_CLIENTES', 'Consulta de clientes', 12345, 'Agendado', '00:01:15', 1),
(20, 'RPA_IMPORTAR_PLANILHA', 'Importação de planilhas', 12345, 'Agendado', '00:02:30', 1),
(21, 'RPA_GERAR_RELATORIO', 'Geração de relatório gerencial', 12345, 'Agendado', '00:04:45', 1),
(22, 'RPA_PROCESSAR_FINANCEIRO', 'Processamento financeiro', 12345, 'Agendado', '00:05:15', 1),
(23, 'RPA_VERIFICAR_ERROS', 'Verificação de erros', 12345, 'Agendado', '00:01:05', 1),
(24, 'RPA_SINCRONIZAR_DADOS', 'Sincronização de dados', 12345, 'Agendado', '00:03:35', 1),
(25, 'RPA_GERAR_DASHBOARD', 'Atualização do dashboard', 12345, 'Agendado', '00:02:20', 1),
(26, 'RPA_ENVIAR_RELATORIO', 'Envio de relatório', 12345, 'Agendado', '00:01:40', 1),
(27, 'RPA_PROCESSAR_NFE', 'Processamento de NF-e', 12345, 'Agendado', '00:04:55', 1),
(28, 'RPA_VALIDAR_CLIENTES', 'Validação de cadastro de clientes', 12345, 'Agendado', '00:02:05', 1),
(29, 'RPA_ATUALIZAR_PRECOS', 'Atualização de preços', 12345, 'Agendado', '00:03:25', 1),
(30, 'RPA_FECHAMENTO_DIARIO', 'Fechamento diário', 12345, 'Agendado', '00:07:10', 1),
(31, 'RPA_LIMPEZA_SISTEMA', 'Limpeza de arquivos temporários', 12345, 'Agendado', '00:01:50', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `maquinas`
--

CREATE TABLE `maquinas` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `tipo_maquina` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `maquinas`
--

INSERT INTO `maquinas` (`id`, `nome`, `ip`, `tipo_maquina`) VALUES
(1, 'teste', '192.168.17.23', 'fisica');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `matricula` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) DEFAULT '123456789',
  `hash_senha` varchar(255) DEFAULT NULL,
  `usuario_ativo` tinyint(1) DEFAULT 1,
  `acesso` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`matricula`, `nome`, `email`, `senha`, `hash_senha`, `usuario_ativo`, `acesso`) VALUES
(8946, 'condo do forro', 'tiago@sasa.com.br', '78945', NULL, 1, 1),
(12345, 'francisco', 'francisco.clecio@carmais.com.br', '123456789', NULL, 1, 1),
(86646, 'maria', 'mariao@sasa.com.br', '78945', NULL, 1, 1),
(789456, 'tiago', 'tiago@sasa.com.br', '78945', NULL, 1, 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `bots`
--
ALTER TABLE `bots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `desenvolvedor` (`desenvolvedor`),
  ADD KEY `maquina` (`maquina`);

--
-- Índices de tabela `maquinas`
--
ALTER TABLE `maquinas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`matricula`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `bots`
--
ALTER TABLE `bots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de tabela `maquinas`
--
ALTER TABLE `maquinas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `bots`
--
ALTER TABLE `bots`
  ADD CONSTRAINT `bots_ibfk_1` FOREIGN KEY (`desenvolvedor`) REFERENCES `usuarios` (`matricula`),
  ADD CONSTRAINT `bots_ibfk_2` FOREIGN KEY (`maquina`) REFERENCES `maquinas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
