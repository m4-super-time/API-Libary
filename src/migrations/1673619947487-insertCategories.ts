import { MigrationInterface, QueryRunner } from "typeorm";

export class insertCategories1673619947487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO  categories (category_name, description)
      VALUES ('Direito','Livros sobre doutrinas brasileiras'),
      ('Acao','Livros genero acao'),
      ('Ficcao','Criacao de caracter artistico, baseada na imaginacao, mesmo se idealizada a partir de dados reais'),
      ('Literatura','Textos escritos, em prosa ou em verso, de acordo com principios teoricos e praticos, 
      o exercicio dessa tecnica ou da eloquencia e poesia'),
      ('Suspense','Escrita que provoca sentimento de incerteza ou ansiedade'),
      ('Drama','Drama, leituras Comicas esta misturado ao tragico,
       e uma serie de episodios complicados, comoventes ou pateticos'),
       ('Romance','Leitura sobre historias de amor e paixao classicas ou contemporaneas'),
       ('Distopia','A distopia e a representacao de uma realidade ou sociedade imaginaria opressora e aterrorizante'),
       ('Outros', 'Diversos tipos de leitura');
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE  FROM  categories;`);
  }
}
