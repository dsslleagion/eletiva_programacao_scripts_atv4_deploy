import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Teams } from "./Teams";
import { CONSTRAINT } from "sqlite3";

@Entity({ name: "match" })
export class Match {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false, type: 'date', default:()=>"CURRENT_TIMESTAMP"})
    date:Date;

    // cascade define que ao excluir o usuário os gastos serão excluídos
    @ManyToOne((type) => Teams, { onDelete: 'CASCADE' })
    // JoinColum é usado para definir o lado da relação que contém a "join column" com a FK
    @JoinColumn({
        name: "idhost",
        referencedColumnName: "id", // id da entidade User
        foreignKeyConstraintName: "fk_host_id" // pode ser qualquer nome usado para você identificar a FK
    })
    host: Teams;

     // cascade define que ao excluir o usuário os gastos serão excluídos
     @ManyToOne((type) => Teams, { onDelete: 'CASCADE' })
     // JoinColum é usado para definir o lado da relação que contém a "join column" com a FK
     @JoinColumn({
         name: "idvisitor",
         referencedColumnName: "id", // id da entidade User
         foreignKeyConstraintName: "fk_visitor_id" // pode ser qualquer nome usado para você identificar a FK
     })
     visitor: Teams;
 

}