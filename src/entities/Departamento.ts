import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CentroCusto } from './CentroCusto';
import { Usuario } from './Usuario';

@Entity('departamentos')
export class Departamento{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    nome: string

    @Column({type: 'text'})
    descricao: string

    @ManyToOne(() => CentroCusto, centroCusto => centroCusto.departamentos, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'centroCusto_id'})
    centroCusto: CentroCusto

    @OneToMany(() => Usuario, usuario => usuario.departamento)
    usuarios: Usuario[]
}