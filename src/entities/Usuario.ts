import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Departamento } from './Departamento';

@Entity('usuarios')
export class Usuario{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    nome: string

    @Column({type: 'text'})
    email: string

    @Column({type: 'text'})
    telefone: string

    @Column({type: 'text'})
    cargo: string

    @ManyToOne(() => Departamento, departamento => departamento.usuarios, {
        onDelete: 'CASCADE'
    }) 
    @JoinColumn({name: 'departamento_id'})  
    departamento: Departamento
}