import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import Empresas from './Empresas';

@Entity('Ncms', { database: 'apirecolhimento' })
class Ncms {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  empresaId: number;

  @Column()
  descricao: string;

  @Column()
  numeroNcm: string;

  @Column()
  cest: string;

  @Column()
  mva: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    type => Empresas,
    Empresas => {
      Empresas.id;
    }
  )
  @JoinTable({
    name: 'Ncms_Empresas',
    joinColumns: [{ name: 'id' }],
    inverseJoinColumns: [{ name: 'empresaId' }]
  })
  vendedores: Empresas[];
}
export default Ncms;
