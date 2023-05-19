import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:"teams"})
export class Teams {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, unique:true, length: 30})
    name: string;

}