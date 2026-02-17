CREATE TABLE `Produto` (
	`Id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Nome` text NOT NULL,
	`Preco` real NOT NULL,
	`Descricao` text,
	`ClienteId` integer NOT NULL,
	`DataCadastro` text NOT NULL,
	FOREIGN KEY (`ClienteId`) REFERENCES `Cliente`(`Id`) ON UPDATE no action ON DELETE cascade
);
