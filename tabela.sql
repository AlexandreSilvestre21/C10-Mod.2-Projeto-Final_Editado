CREATE TABLE jogos
(
    nome character varying NOT NULL,
    genero character varying NOT NULL,
    imagem character varying NOT NULL,
    id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
    descritivo varchar NOT NULL,
    PRIMARY KEY(id)
)