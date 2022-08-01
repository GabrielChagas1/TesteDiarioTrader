import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Departamento } from './Departamento';

@Entity("centroCustos")
export class CentroCusto{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    nome: string

    @Column({type: 'text'})
    descricao: string

    @OneToMany(() => Departamento, departamento => departamento.centroCusto)
    departamentos: Departamento[]

}